/**
 * Contrato de la frontera API → Web para revalidación (A5).
 *
 * Fuente de verdad: `proefex-api` commit `0d3cbee`
 * (`src/lib/signature.ts` + `src/modules/webhooks/invalidation.ts`), verificado
 * en la auditoría `docs/architecture/A5-WEB-REVALIDATION.md` §3. Este módulo
 * espeja EXACTAMENTE ese contrato; cualquier divergencia rompería la firma o
 * dejaría pasar tags que el API no emite.
 *
 *   POST /api/revalidate
 *   Header:  X-Proefex-Signature: t=<unix>, v1=<hex>
 *   Firma:   HMAC-SHA256(REVALIDATION_SECRET, "<t>.<cuerpo_crudo>")
 *   Body:    {"tags":["content:<type>[:<slug|home>]","content:navigation",...]}
 *
 * Reglas de seguridad (`AGENTS.md` §21):
 * - La ventana anti-replay (300 s) se evalúa ANTES del trabajo criptográfico.
 * - La firma se verifica sobre el cuerpo CRUDO con `crypto.subtle.verify`
 *   (comparación en tiempo constante, nunca hex como cadena).
 * - El catálogo de tags es cerrado y determinista: se rechazan wildcards, el
 *   tag raíz y cualquier tag que el API no pueda derivar.
 * - El motivo exacto de un rechazo nunca viaja en la respuesta: se registra en
 *   el log del servidor (`handler.ts`).
 */

import { CONTENT_SLUG_PATTERN, CONTENT_TYPES } from "../api/types.ts";
import {
  CONTENT_TAG_PREFIX,
  NAVIGATION_CONTENT_TAG,
  SETTINGS_CONTENT_TAG,
} from "../content/tags.ts";

/** Cabecera de firma del contrato API → Web. */
export const SIGNATURE_HEADER = "X-Proefex-Signature";

/** Secret del Worker (compartido con `REVALIDATION_SECRET` del API, ≥ 32 caracteres). */
export const REVALIDATION_SECRET_VAR = "REVALIDATION_SECRET";

/** Ventana anti-replay contractual, en segundos (§21; coincide con el API). */
export const REPLAY_WINDOW_SECONDS = 300;

/** Tamaño máximo razonable del cuerpo crudo (auditoría A5 §3.5). */
export const MAX_BODY_BYTES = 8_192;

/** Número máximo de tags por petición (auditoría A5 §3.5). */
export const MAX_TAGS = 50;

/** Longitud máxima del slug de un tag (contrato del API: máx 200). */
const MAX_SLUG_LENGTH = 200;

/** Patrón estricto del header, idéntico al del API. */
const SIGNATURE_HEADER_PATTERN = /^t=(\d{1,12}),\s*v1=([a-f0-9]{64})$/;

const SINGLETON_TAGS: ReadonlySet<string> = new Set([NAVIGATION_CONTENT_TAG, SETTINGS_CONTENT_TAG]);

const TYPE_TAGS: ReadonlySet<string> = new Set(
  CONTENT_TYPES.map((type) => `${CONTENT_TAG_PREFIX}:${type}`),
);

const encoder = new TextEncoder();

export interface ParsedSignature {
  /** Marca de tiempo declarada por el emisor, en segundos unix. */
  readonly timestamp: number;
  /** Firma hexadecimal (minúsculas, 64 caracteres). */
  readonly signature: string;
}

/** Parseo estricto de la cabecera. Un valor malformado se trata como ausente. */
export function parseSignatureHeader(value: string | null | undefined): ParsedSignature | null {
  if (value === null || value === undefined) return null;
  const match = SIGNATURE_HEADER_PATTERN.exec(value.trim());
  if (match === null) return null;
  const rawTimestamp = match[1];
  const signature = match[2];
  if (rawTimestamp === undefined || signature === undefined) return null;
  const timestamp = Number(rawTimestamp);
  if (!Number.isSafeInteger(timestamp) || timestamp < 0) return null;
  return { timestamp, signature };
}

/**
 * Ventana anti-replay: `|now - t| <= 300 s`. Se evalúa antes del HMAC para que
 * un `t` absurdo no consuma trabajo criptográfico.
 */
export function isWithinReplayWindow(
  timestamp: number,
  nowMs: number,
  windowSeconds: number = REPLAY_WINDOW_SECONDS,
): boolean {
  const nowSeconds = Math.floor(nowMs / 1000);
  return Math.abs(nowSeconds - timestamp) <= windowSeconds;
}

function hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
  const output = new Uint8Array(hex.length / 2);
  for (let index = 0; index < output.length; index += 1) {
    output[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  return output;
}

/**
 * Verifica `v1 = HMAC-SHA256(secret, "<t>.<cuerpo_crudo>")` sobre el cuerpo
 * crudo recibido. El mensaje usa la forma canónica del número (`${timestamp}`),
 * exactamente como firma el API (`messageFor`). Comparación en tiempo
 * constante vía `crypto.subtle.verify`.
 */
export async function verifyHmacSha256(
  secret: string,
  timestamp: number,
  rawBody: string,
  signatureHex: string,
): Promise<boolean> {
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    return await crypto.subtle.verify(
      "HMAC",
      key,
      hexToBytes(signatureHex),
      encoder.encode(`${timestamp}.${rawBody}`),
    );
  } catch {
    // Un secreto o una firma con forma inesperada no debe propagar el error.
    return false;
  }
}

/**
 * Catálogo cerrado de tags. Acepta ÚNICAMENTE:
 *
 * - `content:<type>` con `type` ∈ los 7 tipos del contrato del API;
 * - `content:<type>:<slug|home>` con slug válido según el patrón del contrato;
 * - `content:navigation` y `content:settings` (singletons).
 *
 * Se rechazan el tag raíz (`content`), wildcards (`*`), tipos no emitidos por
 * el API (`navigation_items`, `site_settings`) y cualquier otra forma.
 */
export function isAllowedRevalidationTag(tag: string): boolean {
  if (SINGLETON_TAGS.has(tag)) return true;
  if (TYPE_TAGS.has(tag)) return true;
  if (!tag.startsWith(`${CONTENT_TAG_PREFIX}:`)) return false;
  const rest = tag.slice(CONTENT_TAG_PREFIX.length + 1);
  const separator = rest.indexOf(":");
  if (separator === -1) return false;
  const type = rest.slice(0, separator);
  if (!TYPE_TAGS.has(`${CONTENT_TAG_PREFIX}:${type}`)) return false;
  const slug = rest.slice(separator + 1);
  if (slug.length === 0 || slug.length > MAX_SLUG_LENGTH) return false;
  return CONTENT_SLUG_PATTERN.test(slug);
}

export type RevalidatePayloadError =
  | "body-vacio"
  | "json-invalido"
  | "estructura-invalida"
  | "tags-invalidos"
  | "demasiados-tags"
  | "tag-no-permitido";

export type RevalidatePayload =
  | { readonly ok: true; readonly tags: readonly string[] }
  | { readonly ok: false; readonly reason: RevalidatePayloadError };

/**
 * Valida el payload contra el contrato y lo normaliza de forma determinista:
 * deduplica y ordena los tags (igual que el emisor del API). Rechaza
 * estructuras arbitrarias: el objeto debe tener exactamente la clave `tags`
 * con un arreglo no vacío de strings permitidos.
 */
export function parseRevalidatePayload(rawBody: string): RevalidatePayload {
  if (rawBody.trim().length === 0) return { ok: false, reason: "body-vacio" };

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody) as unknown;
  } catch {
    return { ok: false, reason: "json-invalido" };
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return { ok: false, reason: "estructura-invalida" };
  }
  const keys = Object.keys(parsed);
  if (keys.length !== 1 || keys[0] !== "tags") {
    return { ok: false, reason: "estructura-invalida" };
  }
  const tags = (parsed as { tags: unknown }).tags;
  if (!Array.isArray(tags) || tags.length === 0) {
    return { ok: false, reason: "tags-invalidos" };
  }
  if (tags.length > MAX_TAGS) {
    return { ok: false, reason: "demasiados-tags" };
  }
  for (const tag of tags) {
    if (typeof tag !== "string" || tag.length === 0) {
      return { ok: false, reason: "tags-invalidos" };
    }
    if (!isAllowedRevalidationTag(tag)) {
      return { ok: false, reason: "tag-no-permitido" };
    }
  }

  return { ok: true, tags: [...new Set(tags)].sort() };
}
