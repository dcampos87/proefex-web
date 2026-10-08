/**
 * Capa de dominio de contenido (F3.2).
 *
 * Verifica dos contratos clave:
 * 1. Ninguna lectura lanza: los fallos se convierten en `outcome`
 *    (`ok` / `not-found` / `unavailable`) para que una página decida si degrada.
 * 2. Cada lectura devuelve rutas y tags deterministas, listos para A5.
 */

import assert from "node:assert/strict";
import { test } from "node:test";

import type { ApiConfig } from "../src/lib/api/config.ts";
import type { SectorDetail } from "../src/lib/api/types.ts";
import { contentRequestId } from "../src/lib/api/request-id.ts";
import {
  getContentEntry,
  getHomePage,
  getNavigation,
  getSiteSettings,
  listContent,
  type ContentResult,
} from "../src/lib/content/index.ts";

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

const CASE_SUMMARY = {
  type: "cases",
  slug: "planta-industrial",
  title: "Planta industrial",
  summary: null,
  publishedAt: null,
  heroMedia: null,
};

const SECTOR_DETAIL = {
  type: "sectors",
  slug: "industria",
  title: "Industria",
  publishedAt: "2026-01-05T00:00:00.000Z",
  seo: { metaTitle: "Industria — PROEFEX" },
  shortDescription: "Contexto del sector",
  description: "Descripción publicada en el CMS",
  visualRef: null,
  featured: true,
  order: 3,
  heroMedia: null,
};

interface FetchCall {
  url: string;
  init: RequestInit;
}

function stubFetch(responder: Response | (() => Response)): { impl: typeof fetch; calls: FetchCall[] } {
  const calls: FetchCall[] = [];
  const impl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), init: init ?? {} });
    return typeof responder === "function" ? responder() : responder;
  }) as typeof fetch;
  return { impl, calls };
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

/** La capa de dominio registra el fallo (no lo oculta): aquí se silencia la salida. */
async function silenceWarnings<T>(run: () => Promise<T>): Promise<T> {
  const original = console.warn;
  console.warn = () => {};
  try {
    return await run();
  } finally {
    console.warn = original;
  }
}

test("listContent lee el listado del tipo y devuelve su tag de listado", async () => {
  const { impl, calls } = stubFetch(
    jsonResponse({ type: "cases", items: [CASE_SUMMARY], page: { limit: 24, count: 1, nextCursor: null } }),
  );

  const result = await listContent("cases", { limit: 24, fetchImpl: impl, config: ENABLED_CONFIG });

  assert.equal(result.outcome, "ok");
  assert.equal(result.data?.items.length, 1);
  assert.deepEqual(result.tags, ["content:cases"]);
  assert.equal(result.error, null);
  assert.equal(calls[0].url, "https://api.example.com/v1/content/cases?limit=24");
});

test("las lecturas de contenido etiquetan el fetch del API con sus tags A5 (next.tags)", async () => {
  const list = stubFetch(
    jsonResponse({ type: "cases", items: [CASE_SUMMARY], page: { limit: 24, count: 1, nextCursor: null } }),
  );
  await listContent("cases", { fetchImpl: list.impl, config: ENABLED_CONFIG });
  const listInit = list.calls[0].init as RequestInit & { next?: { tags: string[] } };
  assert.deepEqual(listInit.next?.tags, ["content:cases"]);

  const entry = stubFetch(jsonResponse(SECTOR_DETAIL));
  await getContentEntry("sectors", "industria", { fetchImpl: entry.impl, config: ENABLED_CONFIG });
  const entryInit = entry.calls[0].init as RequestInit & { next?: { tags: string[] } };
  assert.deepEqual(entryInit.next?.tags, ["content:sectors", "content:sectors:industria"]);
});

test("listContent no lanza en 404: informa not-found para que la página decida", async () => {
  const { impl } = stubFetch(jsonResponse({ title: "No existe", status: 404, code: "PROEFEX_NOT_FOUND" }, 404));

  const result = await silenceWarnings(() =>
    listContent("insights", { fetchImpl: impl, config: ENABLED_CONFIG }),
  );

  assert.equal(result.outcome, "not-found");
  assert.equal(result.data, null);
  assert.equal(result.error?.kind, "not-found");
  assert.deepEqual(result.tags, ["content:insights"]);
});

test("listContent no lanza en 5xx: informa unavailable", async () => {
  const { impl } = stubFetch(jsonResponse({ title: "Error interno", status: 500, code: "PROEFEX_INTERNAL_ERROR" }, 500));

  const result = await silenceWarnings(() =>
    listContent("cases", { fetchImpl: impl, config: ENABLED_CONFIG }),
  );

  assert.equal(result.outcome, "unavailable");
  assert.equal(result.error?.retryable, true);
});

test("sin configuración el resultado es unavailable y no se hace ninguna petición", async () => {
  const { impl, calls } = stubFetch(jsonResponse({}));

  const result = await silenceWarnings(() =>
    listContent("cases", { fetchImpl: impl, config: DISABLED_CONFIG }),
  );

  assert.equal(result.outcome, "unavailable");
  assert.equal(result.error?.kind, "unconfigured");
  assert.equal(calls.length, 0);
});

test("getContentEntry expone tags de listado y de entidad, con id determinista", async () => {
  const { impl, calls } = stubFetch(jsonResponse(SECTOR_DETAIL));

  const result = await getContentEntry("sectors", "industria", {
    fetchImpl: impl,
    config: ENABLED_CONFIG,
  });

  assert.equal(result.outcome, "ok");
  assert.equal(result.data?.title, "Industria");
  assert.deepEqual(result.tags, ["content:sectors", "content:sectors:industria"]);
  assert.equal(calls[0].url, "https://api.example.com/v1/content/sectors/industria");
  assert.equal(result.requestId, contentRequestId("content.sectors.industria"));
  assert.equal(
    (calls[0].init.headers as Record<string, string>)["X-Request-Id"],
    contentRequestId("content.sectors.industria"),
  );
});

test("getContentEntry mapea el detalle al DTO del tipo solicitado", async () => {
  const { impl } = stubFetch(jsonResponse(SECTOR_DETAIL));

  const result = await getContentEntry("sectors", "industria", {
    fetchImpl: impl,
    config: ENABLED_CONFIG,
  });

  assert.equal(result.data?.type, "sectors");
  assert.equal(result.data?.shortDescription, "Contexto del sector");
  assert.equal(result.data?.featured, true);
  assert.equal(result.data?.order, 3);
});

test("getContentEntry rechaza un slug fuera del contrato sin salir a la red", async () => {
  const { impl, calls } = stubFetch(jsonResponse(SECTOR_DETAIL));

  for (const invalid of ["", "  ", "Industria", "industria!", "../etc/passwd"]) {
    const result: ContentResult<SectorDetail> = await silenceWarnings(() =>
      getContentEntry("sectors", invalid, { fetchImpl: impl, config: ENABLED_CONFIG }),
    );
    assert.equal(result.outcome, "unavailable", `slug "${invalid}"`);
    assert.equal(result.error?.kind, "bad-request", `slug "${invalid}"`);
    assert.equal(result.data, null);
  }

  assert.equal(calls.length, 0);
});

test("getContentEntry no acepta un detalle de otro tipo (contrato cruzado)", async () => {
  const { impl } = stubFetch(jsonResponse(SECTOR_DETAIL));

  const result = await silenceWarnings(() =>
    getContentEntry("products", "industria", { fetchImpl: impl, config: ENABLED_CONFIG }),
  );

  assert.equal(result.outcome, "unavailable");
  assert.equal(result.error?.kind, "invalid-response");
});

test("getHomePage usa el singleton del contrato y deriva content:pages:home", async () => {
  const { impl, calls } = stubFetch(
    jsonResponse({
      type: "pages",
      slug: "",
      title: "PROEFEX",
      publishedAt: null,
      seo: null,
      template: "HOME",
      blocks: [{ type: "hero", props: { title: "PROEFEX" } }],
    }),
  );

  const result = await getHomePage({ fetchImpl: impl, config: ENABLED_CONFIG });

  assert.equal(result.outcome, "ok");
  assert.equal(result.data?.template, "HOME");
  assert.equal(result.data?.blocks.length, 1);
  assert.deepEqual(result.tags, ["content:pages", "content:pages:home"]);
  assert.equal(calls[0].url, "https://api.example.com/v1/content/pages/home");
});

test("getNavigation y getSiteSettings leen los singleton y devuelven sus tags", async () => {
  const navigation = stubFetch(
    jsonResponse({
      items: [
        {
          label: "PROEFEX",
          href: "/",
          parentHref: null,
          visibility: "all",
          order: 1,
          featured: false,
        },
      ],
    }),
  );
  const navResult = await getNavigation({ fetchImpl: navigation.impl, config: ENABLED_CONFIG });
  assert.equal(navResult.outcome, "ok");
  assert.equal(navResult.data?.items[0].label, "PROEFEX");
  assert.deepEqual(navResult.tags, ["content:navigation"]);
  assert.equal(navigation.calls[0].url, "https://api.example.com/v1/content/navigation");

  const settings = stubFetch(
    jsonResponse({
      siteName: "PROEFEX",
      description: null,
      contact: {},
      socialLinks: [],
      defaultSeo: {},
      analytics: {},
      footer: {},
      legalLinks: [],
      announcement: {},
      logoMedia: null,
      faviconMedia: null,
    }),
  );
  const settingsResult = await getSiteSettings({ fetchImpl: settings.impl, config: ENABLED_CONFIG });
  assert.equal(settingsResult.outcome, "ok");
  assert.equal(settingsResult.data?.siteName, "PROEFEX");
  assert.deepEqual(settingsResult.tags, ["content:settings"]);
  assert.equal(settings.calls[0].url, "https://api.example.com/v1/content/settings");
});

test("navegación y settings también degradan sin lanzar cuando el API falla", async () => {
  const failing = stubFetch(jsonResponse({ title: "Error interno", status: 500, code: "PROEFEX_INTERNAL_ERROR" }, 500));

  const [nav, settings] = await silenceWarnings(() =>
    Promise.all([
      getNavigation({ fetchImpl: failing.impl, config: ENABLED_CONFIG }),
      getSiteSettings({ fetchImpl: failing.impl, config: ENABLED_CONFIG }),
    ]),
  );

  assert.equal(nav.outcome, "unavailable");
  assert.equal(settings.outcome, "unavailable");
  assert.deepEqual(nav.tags, ["content:navigation"]);
  assert.deepEqual(settings.tags, ["content:settings"]);
});

test("el id de correlación es estable entre llamadas equivalentes (cache-determinista)", async () => {
  const first = stubFetch(jsonResponse(SECTOR_DETAIL));
  const second = stubFetch(jsonResponse(SECTOR_DETAIL));

  const a = await getContentEntry("sectors", "industria", { fetchImpl: first.impl, config: ENABLED_CONFIG });
  const b = await getContentEntry("sectors", "industria", { fetchImpl: second.impl, config: ENABLED_CONFIG });

  assert.equal(a.requestId, b.requestId);
});
