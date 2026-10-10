/**
 * Cliente HTTP de `proefex-api` (F3.2).
 *
 * Cubre éxito, 304, 404, 5xx, respuesta fuera de contrato, fallos de transporte,
 * configuración ausente y propagación de `X-Request-Id`. No hay red real: el
 * `fetch` se inyecta por opción, que es exactamente el punto de extensión que
 * usa el cliente.
 */

import assert from "node:assert/strict";
import { test } from "node:test";

import { apiGet, buildApiUrl } from "../src/lib/api/client.ts";
import type { ApiConfig } from "../src/lib/api/config.ts";
import { ApiError, describeApiError } from "../src/lib/api/errors.ts";
import { contentRequestId } from "../src/lib/api/request-id.ts";
import { parseContentList } from "../src/lib/api/validators.ts";

const ENABLED_CONFIG: ApiConfig = {
  enabled: true,
  environment: "production",
  baseUrl: "https://api.example.com/v1",
  source: "environment-variable",
};

const DISABLED_CONFIG: ApiConfig = {
  enabled: false,
  environment: "staging",
  reason: "unconfigured",
  detail: "define PROEFEX_API_BASE_URL para el entorno \"staging\"",
};

const LIST_BODY = {
  type: "cases",
  items: [
    {
      type: "cases",
      slug: "planta-industrial",
      title: "Planta industrial",
      summary: "Resumen publicado",
      publishedAt: "2026-02-01T00:00:00.000Z",
      heroMedia: null,
    },
  ],
  page: { limit: 24, count: 1, nextCursor: null },
};

interface FetchCall {
  url: string;
  init: RequestInit;
}

function stubFetch(
  responder: Response | (() => Promise<Response> | Response),
): { impl: typeof fetch; calls: FetchCall[] } {
  const calls: FetchCall[] = [];
  const impl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), init: init ?? {} });
    return typeof responder === "function" ? await responder() : responder;
  }) as typeof fetch;
  return { impl, calls };
}

function jsonResponse(body: unknown, init: { status?: number; headers?: Record<string, string> } = {}): Response {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: { "content-type": "application/json; charset=utf-8", ...init.headers },
  });
}

function problem(status: number, code: string, title: string, requestId = "req-api-0001"): Response {
  return jsonResponse(
    {
      type: "https://api.proefexperu.com/problems/example",
      title,
      status,
      code,
      instance: "/v1/content/cases",
      requestId,
    },
    { status, headers: { "content-type": "application/problem+json" } },
  );
}

async function captureError(promise: Promise<unknown>): Promise<ApiError> {
  try {
    await promise;
  } catch (error) {
    assert.ok(error instanceof ApiError, `se esperaba ApiError, se recibió ${String(error)}`);
    return error;
  }
  throw new Error("se esperaba un ApiError y la promesa resolvió");
}

test("buildApiUrl compone la ruta y serializa la query omitiendo undefined", () => {
  assert.equal(buildApiUrl("https://api.example.com/v1", "/content/cases"), "https://api.example.com/v1/content/cases");
  assert.equal(
    buildApiUrl("https://api.example.com/v1", "/content/cases", { limit: 24, cursor: undefined }),
    "https://api.example.com/v1/content/cases?limit=24",
  );
});

test("buildApiUrl rechaza rutas relativas", () => {
  assert.throws(() => buildApiUrl("https://api.example.com/v1", "content/cases"), /debe empezar/);
});

test("respuesta válida: parsea, expone ETag y envía las cabeceras del contrato", async () => {
  const { impl, calls } = stubFetch(
    jsonResponse(LIST_BODY, { headers: { etag: 'W/"abc123"' } }),
  );

  const response = await apiGet("/content/cases", (value) => parseContentList(value, "cases"), {
    fetchImpl: impl,
    config: ENABLED_CONFIG,
  });

  assert.equal(response.status, 200);
  assert.equal(response.notModified, false);
  assert.equal(response.etag, 'W/"abc123"');
  assert.equal(response.data?.items.length, 1);
  assert.equal(response.data?.type, "cases");
  // El API no reportó un id propio: se conserva el enviado.
  assert.equal(response.requestId, contentRequestId("/content/cases"));

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.example.com/v1/content/cases");
  const headers = calls[0].init.headers as Record<string, string>;
  assert.equal(headers["Accept"], "application/json");
  assert.equal(headers["X-Request-Id"], contentRequestId("/content/cases"));
  assert.equal(calls[0].init.cache, "force-cache");
  assert.ok(calls[0].init.signal instanceof AbortSignal);
});

test("X-Request-Id explícito se respeta y uno inválido se sustituye por el determinista", async () => {
  const first = stubFetch(jsonResponse(LIST_BODY));
  const explicit = await apiGet("/content/cases", (value) => parseContentList(value, "cases"), {
    fetchImpl: first.impl,
    config: ENABLED_CONFIG,
    requestId: "web.content.cases.list",
  });
  assert.equal(explicit.requestId, "web.content.cases.list");

  const second = stubFetch(jsonResponse(LIST_BODY));
  const invalid = await apiGet("/content/cases", (value) => parseContentList(value, "cases"), {
    fetchImpl: second.impl,
    config: ENABLED_CONFIG,
    requestId: "id con espacios y\nsalto",
  });
  assert.equal(invalid.requestId, contentRequestId("/content/cases"));
  assert.equal((second.calls[0].init.headers as Record<string, string>)["X-Request-Id"], invalid.requestId);
});

test("If-None-Match se reenvía y un 304 se informa sin lanzar", async () => {
  const { impl, calls } = stubFetch(new Response(null, { status: 304, headers: { etag: 'W/"v2"' } }));

  const response = await apiGet("/content/cases", (value) => parseContentList(value, "cases"), {
    fetchImpl: impl,
    config: ENABLED_CONFIG,
    ifNoneMatch: 'W/"v1"',
  });

  assert.equal(response.notModified, true);
  assert.equal(response.status, 304);
  assert.equal(response.data, null);
  assert.equal(response.etag, 'W/"v2"');
  assert.equal((calls[0].init.headers as Record<string, string>)["If-None-Match"], 'W/"v1"');
});

test("un id reportado por el API en la respuesta prevalece para la correlación", async () => {
  const { impl } = stubFetch(
    jsonResponse(LIST_BODY, { headers: { "x-request-id": "req-api-echo-02" } }),
  );

  const response = await apiGet("/content/cases", (value) => parseContentList(value, "cases"), {
    fetchImpl: impl,
    config: ENABLED_CONFIG,
    requestId: "web.content.cases.list",
  });

  assert.equal(response.requestId, "req-api-echo-02");
});

test("404 del contrato produce kind=not-found con el requestId del API", async () => {
  const { impl } = stubFetch(problem(404, "PROEFEX_NOT_FOUND", "El recurso solicitado no existe", "req-api-7777"));

  const error = await captureError(
    apiGet("/content/cases/no-existe", (value) => parseContentList(value, "cases"), {
      fetchImpl: impl,
      config: ENABLED_CONFIG,
    }),
  );

  assert.equal(error.kind, "not-found");
  assert.equal(error.status, 404);
  assert.equal(error.code, "PROEFEX_NOT_FOUND");
  assert.equal(error.requestId, "req-api-7777");
  assert.equal(error.retryable, false);
  // Sólo el título público del problema: nunca `detail` ni `errors`.
  assert.equal(error.message, "El recurso solicitado no existe");
});

test("5xx produce kind=server, reintentable y sin filtrar detalle interno", async () => {
  const { impl } = stubFetch(problem(500, "PROEFEX_INTERNAL_ERROR", "Error interno"));

  const error = await captureError(
    apiGet("/content/cases", (value) => parseContentList(value, "cases"), { fetchImpl: impl, config: ENABLED_CONFIG }),
  );

  assert.equal(error.kind, "server");
  assert.equal(error.status, 500);
  assert.equal(error.retryable, true);
  assert.equal(describeApiError(error).includes("requestId="), true);
});

test("502 del upstream se clasifica aparte para poder distinguirlo", async () => {
  const { impl } = stubFetch(problem(502, "PROEFEX_UPSTREAM_ERROR", "Fallo del origen de datos"));
  const error = await captureError(
    apiGet("/content/cases", (value) => parseContentList(value, "cases"), { fetchImpl: impl, config: ENABLED_CONFIG }),
  );
  assert.equal(error.kind, "upstream");
  assert.equal(error.retryable, true);
});

test("429 y 503 son reintentables; 401 y 403 no", async () => {
  const cases: Array<[number, string, string, boolean]> = [
    [429, "PROEFEX_RATE_LIMITED", "rate-limited", true],
    [503, "PROEFEX_SERVICE_UNAVAILABLE", "unavailable", true],
    [401, "PROEFEX_UNAUTHORIZED", "unauthorized", false],
    [403, "PROEFEX_FORBIDDEN", "forbidden", false],
  ];

  for (const [status, code, expectedKind, retryable] of cases) {
    const { impl } = stubFetch(problem(status, code, "Problema"));
    const error = await captureError(
      apiGet("/content/cases", (value) => parseContentList(value, "cases"), { fetchImpl: impl, config: ENABLED_CONFIG }),
    );
    assert.equal(error.kind, expectedKind, `status ${status}`);
    assert.equal(error.retryable, retryable, `status ${status}`);
  }
});

test("un error sin cuerpo RFC 7807 se clasifica por status", async () => {
  const { impl } = stubFetch(new Response("", { status: 500 }));
  const error = await captureError(
    apiGet("/content/cases", (value) => parseContentList(value, "cases"), { fetchImpl: impl, config: ENABLED_CONFIG }),
  );
  assert.equal(error.kind, "server");
  assert.equal(error.status, 500);
});

test("respuesta 200 fuera de contrato produce kind=invalid-response", async () => {
  const { impl } = stubFetch(jsonResponse({ items: "no-es-una-lista" }));

  const error = await captureError(
    apiGet("/content/cases", (value) => parseContentList(value, "cases"), { fetchImpl: impl, config: ENABLED_CONFIG }),
  );

  assert.equal(error.kind, "invalid-response");
  assert.equal(error.status, null);
});

test("respuesta 200 con el tipo equivocado produce kind=invalid-response", async () => {
  const { impl } = stubFetch(jsonResponse({ ...LIST_BODY, type: "insights" }));
  const error = await captureError(
    apiGet("/content/cases", (value) => parseContentList(value, "cases"), { fetchImpl: impl, config: ENABLED_CONFIG }),
  );
  assert.equal(error.kind, "invalid-response");
});

test("JSON malformado produce kind=invalid-response", async () => {
  const { impl } = stubFetch(new Response("{no-json", { status: 200, headers: { "content-type": "application/json" } }));
  const error = await captureError(
    apiGet("/content/cases", (value) => parseContentList(value, "cases"), { fetchImpl: impl, config: ENABLED_CONFIG }),
  );
  assert.equal(error.kind, "invalid-response");
});

test("HTML en lugar de JSON produce kind=invalid-response", async () => {
  const { impl } = stubFetch(new Response("<!doctype html>", { status: 200, headers: { "content-type": "text/html" } }));
  const error = await captureError(
    apiGet("/content/cases", (value) => parseContentList(value, "cases"), { fetchImpl: impl, config: ENABLED_CONFIG }),
  );
  assert.equal(error.kind, "invalid-response");
});

test("fallo de transporte produce kind=network reintentable", async () => {
  const impl = (async () => {
    throw new TypeError("fetch failed");
  }) as typeof fetch;

  const error = await captureError(
    apiGet("/content/cases", (value) => parseContentList(value, "cases"), { fetchImpl: impl, config: ENABLED_CONFIG }),
  );

  assert.equal(error.kind, "network");
  assert.equal(error.retryable, true);
  assert.equal(error.status, null);
});

test("timeout agotado produce kind=timeout reintentable", async () => {
  const impl = (async () => {
    const abort = new Error("The operation was aborted");
    abort.name = "TimeoutError";
    throw abort;
  }) as typeof fetch;

  const error = await captureError(
    apiGet("/content/cases", (value) => parseContentList(value, "cases"), { fetchImpl: impl, config: ENABLED_CONFIG }),
  );

  assert.equal(error.kind, "timeout");
  assert.equal(error.retryable, true);
});

test("sin configuración el cliente falla cerrado y no toca la red", async () => {
  const { impl, calls } = stubFetch(jsonResponse(LIST_BODY));

  const error = await captureError(
    apiGet("/content/cases", (value) => parseContentList(value, "cases"), {
      fetchImpl: impl,
      config: DISABLED_CONFIG,
    }),
  );

  assert.equal(error.kind, "unconfigured");
  assert.equal(calls.length, 0);
});
