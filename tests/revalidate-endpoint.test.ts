/**
 * Endpoint firmado de revalidación A5 (frontera API → Web).
 *
 * Verifica el contrato que `proefex-api` (commit `0d3cbee`) espera:
 * `X-Proefex-Signature: t=<unix>, v1=<hex>` con
 * `HMAC-SHA256(REVALIDATION_SECRET, "<t>.<cuerpo_crudo>")`, ventana
 * anti-replay de 300 s, catálogo cerrado de tags (sin wildcards ni tag raíz),
 * deduplicación y orden determinista. El handler se prueba con el reloj, el
 * entorno y `revalidateTag` inyectados: sin red y sin cargar `next/cache`.
 */

import assert from "node:assert/strict";
import { test } from "node:test";

import {
  MAX_BODY_BYTES,
  REVALIDATION_SECRET_VAR,
  SIGNATURE_HEADER,
  isAllowedRevalidationTag,
  isWithinReplayWindow,
  parseSignatureHeader,
} from "../src/lib/revalidate/contract.ts";
import { handleRevalidateRequest } from "../src/lib/revalidate/handler.ts";

/** ≥ 32 caracteres, como el mínimo que impone el API. */
const SECRET = "revalidacion-secret-de-prueba-0123456789abcdef";
const WRONG_SECRET = "otro-secret-completamente-distinto-0123456789";
const NOW_MS = 1_769_000_000_000;
const NOW_SECONDS = Math.floor(NOW_MS / 1000);

const encoder = new TextEncoder();

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

interface CallOptions {
  body?: string;
  /** Secret con el que se FIRMA (por defecto el correcto). */
  signSecret?: string;
  /** Valor de la variable de entorno (null la elimina). */
  envSecret?: string | null;
  timestamp?: number;
  /** Cabecera de firma literal (null la elimina). */
  signatureHeader?: string | null;
  method?: string;
  requestId?: string;
}

async function call(options: CallOptions = {}): Promise<{ response: Response; revalidated: string[] }> {
  const body = options.body ?? '{"tags":["content:sectors","content:sectors:industria"]}';
  const timestamp = options.timestamp ?? NOW_SECONDS;
  const signature = await hmacHex(options.signSecret ?? SECRET, `${timestamp}.${body}`);

  const headers: Record<string, string> = {
    "content-type": "application/json; charset=utf-8",
  };
  const signatureHeader =
    options.signatureHeader === undefined
      ? `t=${timestamp}, v1=${signature}`
      : options.signatureHeader;
  if (signatureHeader !== null) headers[SIGNATURE_HEADER] = signatureHeader;
  if (options.requestId !== undefined) headers["X-Request-Id"] = options.requestId;

  const method = options.method ?? "POST";
  const request = new Request("https://www.proefexperu.com/api/revalidate", {
    method,
    headers,
    body: method === "POST" ? body : undefined,
  });

  const revalidated: string[] = [];
  const env: Record<string, string | undefined> = {};
  if (options.envSecret !== null) env[REVALIDATION_SECRET_VAR] = options.envSecret ?? SECRET;

  // El handler registra cada resultado: se silencia para no ruidar la salida.
  const originalInfo = console.info;
  const originalWarn = console.warn;
  console.info = () => {};
  console.warn = () => {};
  try {
    const response = await handleRevalidateRequest(request, {
      env,
      now: () => NOW_MS,
      revalidateTag: (tag) => revalidated.push(tag),
    });
    return { response, revalidated };
  } finally {
    console.info = originalInfo;
    console.warn = originalWarn;
  }
}

test("firma válida: revalida los tags del payload (deduplicados y ordenados)", async () => {
  const { response, revalidated } = await call({
    body: '{"tags":["content:sectors:industria","content:sectors","content:sectors:industria"]}',
    requestId: "web-revalidate-test-1234",
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.deepEqual(revalidated, ["content:sectors", "content:sectors:industria"]);
  assert.equal(response.headers.get("X-Request-Id"), "web-revalidate-test-1234");
});

test("firma válida: el requestId entrante inválido se sustituye por uno nuevo", async () => {
  const { response } = await call({ requestId: "no válido!" });
  const requestId = response.headers.get("X-Request-Id") ?? "";
  assert.match(requestId, /^[A-Za-z0-9._-]{8,128}$/);
});

test("firma inválida (secret distinto): 401 opaco, sin revalidar", async () => {
  const { response, revalidated } = await call({ signSecret: WRONG_SECRET });

  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: "unauthorized" });
  assert.deepEqual(revalidated, []);
});

test("cabecera de firma ausente: 401 sin revalidar", async () => {
  const { response, revalidated } = await call({ signatureHeader: null });

  assert.equal(response.status, 401);
  assert.deepEqual(revalidated, []);
});

test("cabecera de firma malformada: 401 sin revalidar", async () => {
  for (const header of ["", "t=abc, v1=xyz", "t=1234", "v1=deadbeef", `t=${NOW_SECONDS}, v1=XYZ`]) {
    const { response, revalidated } = await call({ signatureHeader: header });
    assert.equal(response.status, 401, `cabecera "${header}" debe rechazarse`);
    assert.deepEqual(revalidated, []);
  }
});

test("timestamp expirado (301 s en el pasado): 401 sin consumir revalidación", async () => {
  const { response, revalidated } = await call({ timestamp: NOW_SECONDS - 301 });

  assert.equal(response.status, 401);
  assert.deepEqual(revalidated, []);
});

test("timestamp futuro (301 s): 401 (anti-replay simétrico)", async () => {
  const { response, revalidated } = await call({ timestamp: NOW_SECONDS + 301 });

  assert.equal(response.status, 401);
  assert.deepEqual(revalidated, []);
});

test("timestamp en el límite exacto de la ventana (300 s): se acepta", async () => {
  const { response, revalidated } = await call({ timestamp: NOW_SECONDS - 300 });

  assert.equal(response.status, 200);
  assert.ok(revalidated.length > 0);
});

test("payload inválido: JSON malformado → 400", async () => {
  const { response, revalidated } = await call({ body: '{"tags":' });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "invalid-request" });
  assert.deepEqual(revalidated, []);
});

test("payload inválido: estructuras arbitrarias → 400", async () => {
  const bodies = [
    "",
    "[]",
    '{"tags":"content:cases"}',
    '{"tags":[]}',
    '{"tags":["content:cases"],"extra":1}',
    '{"tags":["content:cases",42]}',
    "null",
  ];
  for (const body of bodies) {
    const { response, revalidated } = await call({ body });
    assert.equal(response.status, 400, `body ${body || "(vacío)"} debe rechazarse`);
    assert.deepEqual(revalidated, []);
  }
});

test("tag inválido (fuera del catálogo): 400 sin revalidar", async () => {
  for (const tag of ["foo:bar", "sectors", "content:navigation:arbol", "content:navigation_items"]) {
    const { response, revalidated } = await call({ body: JSON.stringify({ tags: [tag] }) });
    assert.equal(response.status, 400, `tag "${tag}" debe rechazarse`);
    assert.deepEqual(revalidated, []);
  }
});

test("wildcards rechazados: ni raíz ni sufijo", async () => {
  for (const tag of ["*", "content", "content:*", "content:sectors:*", "content:*:industria"]) {
    const { response, revalidated } = await call({ body: JSON.stringify({ tags: [tag] }) });
    assert.equal(response.status, 400, `tag "${tag}" debe rechazarse`);
    assert.deepEqual(revalidated, []);
  }
});

test("tags ordenados de forma determinista independientemente del orden de llegada", async () => {
  const { response, revalidated } = await call({
    body: JSON.stringify({
      tags: ["content:insights", "content:cases:z", "content:cases", "content:cases:a"],
    }),
  });

  assert.equal(response.status, 200);
  assert.deepEqual(revalidated, ["content:cases", "content:cases:a", "content:cases:z", "content:insights"]);
});

test("múltiples tags: todos se revalidan en una sola petición", async () => {
  const tags = [
    "content:pages:home",
    "content:sectors:industria",
    "content:navigation",
    "content:settings",
  ];
  const { response, revalidated } = await call({ body: JSON.stringify({ tags }) });

  assert.equal(response.status, 200);
  assert.deepEqual(revalidated, [...new Set(tags)].sort());
});

test("ausencia de secret: 503 fail-closed, sin revalidar nada", async () => {
  const { response, revalidated } = await call({ envSecret: null });

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { error: "unavailable" });
  assert.deepEqual(revalidated, []);
});

test("método no POST: 405", async () => {
  const { response } = await call({ method: "GET" });

  assert.equal(response.status, 405);
});

test("cuerpo excedido: 413 antes de cualquier verificación de payload", async () => {
  const body = `{"tags":["${"a".repeat(MAX_BODY_BYTES)}"]}`;
  const { response, revalidated } = await call({ body });

  assert.equal(response.status, 413);
  assert.deepEqual(revalidated, []);
});

test("la respuesta opaca nunca expone el motivo interno ni secretos", async () => {
  const { response } = await call({ signSecret: WRONG_SECRET });
  const text = await response.clone().text();

  assert.equal(text.includes("firma"), false);
  assert.equal(text.includes(SECRET), false);
  assert.equal(text.includes(WRONG_SECRET), false);
});

test("catálogo cerrado: límites exactos de tags permitidos", () => {
  const allowed = [
    "content:navigation",
    "content:settings",
    "content:pages",
    "content:universes",
    "content:sectors",
    "content:services",
    "content:products",
    "content:cases",
    "content:insights",
    "content:pages:home",
    "content:pages:legal/privacidad",
    "content:sectors:industria",
  ];
  for (const tag of allowed) {
    assert.equal(isAllowedRevalidationTag(tag), true, `tag permitido: ${tag}`);
  }

  const rejected = [
    "content",
    "content:",
    "content:sectors:",
    "content:sectors:Industria",
    "content:sectors:industria!",
    "content:site_settings",
    "content:site_settings:algo",
    "navigation",
    "content:videos",
    " content:sectors",
  ];
  for (const tag of rejected) {
    assert.equal(isAllowedRevalidationTag(tag), false, `tag rechazado: ${tag}`);
  }
});

test("parseo de cabecera: forma estricta del contrato", () => {
  const valid = parseSignatureHeader(`t=${NOW_SECONDS}, v1=${"a".repeat(64)}`);
  assert.notEqual(valid, null);
  assert.equal(valid?.timestamp, NOW_SECONDS);

  assert.equal(parseSignatureHeader(null), null);
  assert.equal(parseSignatureHeader(undefined), null);
  assert.equal(parseSignatureHeader("t=1, v1=xyz"), null);
  assert.equal(parseSignatureHeader(`t=${"1".repeat(13)}, v1=${"a".repeat(64)}`), null);
  assert.equal(parseSignatureHeader(`t=${NOW_SECONDS}, v1=${"A".repeat(64)}`), null);
  assert.equal(parseSignatureHeader(`t=-5, v1=${"a".repeat(64)}`), null);
});

test("ventana anti-replay: 300 s contractuales, simétrica", () => {
  assert.equal(isWithinReplayWindow(NOW_SECONDS, NOW_MS), true);
  assert.equal(isWithinReplayWindow(NOW_SECONDS - 300, NOW_MS), true);
  assert.equal(isWithinReplayWindow(NOW_SECONDS + 300, NOW_MS), true);
  assert.equal(isWithinReplayWindow(NOW_SECONDS - 301, NOW_MS), false);
  assert.equal(isWithinReplayWindow(NOW_SECONDS + 301, NOW_MS), false);
});
