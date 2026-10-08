/**
 * Endpoint firmado de revalidación A5 (frontera API → Web).
 *
 * Orquestación de `POST /api/revalidate` sobre el contrato de `contract.ts`:
 *
 *   1. método y tamaño del cuerpo;
 *   2. presencia del secret del Worker (`REVALIDATION_SECRET`, sin el cual
 *      nada puede verificarse → 503, fail-closed);
 *   3. parseo estricto de `X-Proefex-Signature`;
 *   4. ventana anti-replay (300 s), ANTES del trabajo criptográfico;
 *   5. verificación HMAC-SHA256 sobre el cuerpo crudo;
 *   6. payload contra el catálogo cerrado de tags (deduplicado y ordenado);
 *   7. `revalidateTag` para cada tag permitido (tag cache D1 vía OpenNext).
 *
 * Seguridad (`AGENTS.md` §21/§27/§46):
 * - Las respuestas son opacas: el motivo exacto de un rechazo sólo se registra
 *   en el log del servidor, nunca en el cuerpo.
 * - Los logs nunca incluyen el secret, el HMAC ni el cuerpo; sí requestId,
 *   resultado, timestamp, operación, duración y razón de rechazo.
 * - Sin service_role, sin claves de Supabase/Cloudflare: el endpoint sólo
 *   procesa solicitudes firmadas.
 *
 * `deps` permite inyectar el reloj, el entorno y `revalidateTag` en pruebas
 * (`node:test`) sin cargar `next/cache`.
 */

import { REQUEST_ID_HEADER, newRequestId, normalizeRequestId } from "../api/request-id.ts";
import {
  MAX_BODY_BYTES,
  REVALIDATION_SECRET_VAR,
  SIGNATURE_HEADER,
  isWithinReplayWindow,
  parseRevalidatePayload,
  parseSignatureHeader,
  verifyHmacSha256,
} from "./contract.ts";

export interface RevalidateHandlerDeps {
  /** Entorno del Worker (por defecto `process.env`, poblado por OpenNext). */
  env?: Record<string, string | undefined>;
  /** Reloj inyectable (por defecto `Date.now`). */
  now?: () => number;
  /** `revalidateTag` de `next/cache` (inyectable en pruebas). */
  revalidateTag?: (tag: string) => void;
}

function opaqueBody(error: string): string {
  return JSON.stringify({ error });
}

async function resolveRevalidateTag(
  deps: RevalidateHandlerDeps,
): Promise<(tag: string) => void> {
  if (deps.revalidateTag !== undefined) return deps.revalidateTag;
  const { revalidateTag } = await import("next/cache");
  return revalidateTag;
}

export async function handleRevalidateRequest(
  request: Request,
  deps: RevalidateHandlerDeps = {},
): Promise<Response> {
  const startedAt = Date.now();
  const env = deps.env ?? process.env;
  const now = deps.now ?? (() => Date.now());
  const requestId =
    normalizeRequestId(request.headers.get(REQUEST_ID_HEADER)) ?? newRequestId();

  const respond = (status: number, error: string): Response => {
    const body = status === 200 ? JSON.stringify({ ok: true }) : opaqueBody(error);
    return new Response(body, {
      status,
      headers: {
        "content-type": "application/json; charset=utf-8",
        [REQUEST_ID_HEADER]: requestId,
      },
    });
  };
  const log = (result: "ok" | "rechazado", detail?: string, tags?: number): void => {
    const parts = [
      `[proefex-revalidate] op=revalidate resultado=${result}`,
      `requestId=${requestId}`,
      `ts=${new Date(now()).toISOString()}`,
      `durMs=${Date.now() - startedAt}`,
    ];
    if (tags !== undefined) parts.push(`tags=${tags}`);
    if (detail !== undefined) parts.push(`razon=${detail}`);
    if (result === "ok") console.info(parts.join(" "));
    else console.warn(parts.join(" "));
  };

  if (request.method !== "POST") {
    log("rechazado", "metodo-no-permitido");
    return respond(405, "method-not-allowed");
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isSafeInteger(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    log("rechazado", "cuerpo-excedido");
    return respond(413, "payload-too-large");
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    log("rechazado", "cuerpo-ilegible");
    return respond(400, "invalid-request");
  }
  if (rawBody.length > MAX_BODY_BYTES) {
    log("rechazado", "cuerpo-excedido");
    return respond(413, "payload-too-large");
  }

  const secret = env[REVALIDATION_SECRET_VAR] ?? "";
  if (secret.length === 0) {
    // Fail-closed: sin secret no hay nada verificable. El despliegue debe
    // configurarlo antes de abrir el flujo A5 (ver docs de la fase).
    log("rechazado", "secret-ausente");
    return respond(503, "unavailable");
  }

  const parsedSignature = parseSignatureHeader(request.headers.get(SIGNATURE_HEADER));
  if (parsedSignature === null) {
    log("rechazado", "cabecera-firma-ausente-o-malformada");
    return respond(401, "unauthorized");
  }

  if (!isWithinReplayWindow(parsedSignature.timestamp, now())) {
    log("rechazado", "timestamp-fuera-de-ventana");
    return respond(401, "unauthorized");
  }

  const signatureValid = await verifyHmacSha256(
    secret,
    parsedSignature.timestamp,
    rawBody,
    parsedSignature.signature,
  );
  if (!signatureValid) {
    log("rechazado", "firma-invalida");
    return respond(401, "unauthorized");
  }

  const payload = parseRevalidatePayload(rawBody);
  if (!payload.ok) {
    log("rechazado", `payload-${payload.reason}`);
    return respond(400, "invalid-request");
  }

  const revalidateTag = await resolveRevalidateTag(deps);
  for (const tag of payload.tags) {
    revalidateTag(tag);
  }

  log("ok", undefined, payload.tags.length);
  return respond(200, "ok");
}
