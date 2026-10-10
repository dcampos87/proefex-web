/**
 * Cliente HTTP interno de `proefex-api` (F3.2, tags A5 activados).
 *
 * Único punto del repositorio donde se hacen llamadas HTTP al API: base URL,
 * cabeceras, `X-Request-Id`, ETag, timeout, errores RFC 7807, validación de la
 * respuesta y etiquetado del Data Cache de Next se resuelven aquí
 * (`AGENTS.md` §3/§16). Ninguna página construye URLs ni llama a `fetch`
 * directamente.
 *
 * Alcance (A5): las lecturas de contenido se hacen en el servidor con
 * `cache: "force-cache"` y `next: { tags }`, de modo que cada entrada del Data
 * Cache queda asociada a los tags del catálogo cerrado
 * (`content:<type>[:<slug|home>]`, `content:navigation`, `content:settings`)
 * y `POST /api/revalidate` puede invalidarlas con `revalidateTag`. En build,
 * las rutas estáticas registran esos tags y OpenNext (R2 + D1) los consulta en
 * runtime para servir o regenerar.
 */

import {
  getApiConfig,
  DEFAULT_API_TIMEOUT_MS,
  type ApiConfig,
} from "./config.ts";
import {
  ApiError,
  apiErrorFromProblem,
  apiErrorFromStatus,
  apiErrorFromTransportError,
  apiErrorInvalidResponse,
  apiErrorUnconfigured,
  withApiErrorContext,
} from "./errors.ts";
import { REQUEST_ID_HEADER, contentRequestId, normalizeRequestId } from "./request-id.ts";
import { parseProblemDetails } from "./validators.ts";

/** Las lecturas de contenido son cacheables: mantiene las rutas estáticas. */
export const DEFAULT_CACHE: RequestCache = "force-cache";

/**
 * Init de `fetch` extendido con la opción `next` de Next.js (Data Cache con
 * tags). Se declara localmente para no depender de los tipos globales de Next
 * en pruebas (`node:test` importa este módulo sin framework).
 */
type TaggedRequestInit = RequestInit & { next?: { tags: string[] } };

export interface ApiRequestOptions {
  /** Parámetros de query (`undefined` se omite). */
  query?: Readonly<Record<string, string | number | undefined>>;
  /** Id de correlación; si falta se deriva de forma determinista de la ruta. */
  requestId?: string;
  /** `If-None-Match` para lecturas condicionales (ETag). */
  ifNoneMatch?: string;
  timeoutMs?: number;
  cache?: RequestCache;
  /**
   * Tags A5 del catálogo cerrado que etiquetan esta lectura en el Data Cache
   * de Next (`next: { tags }`). Solo los asigna la capa de dominio con tags
   * derivados, nunca valores arbitrarios del llamante.
   */
  tags?: readonly string[];
  /** Inyectable en pruebas: evita la red y el parcheo de `fetch` de Next. */
  fetchImpl?: typeof fetch;
  /** Inyectable en pruebas: configuración efectiva del cliente. */
  config?: ApiConfig;
}

export interface ApiResponse<T> {
  /** `null` cuando el API respondió 304 (el llamante conserva su copia). */
  data: T | null;
  etag: string | null;
  /**
   * Id de correlación de la respuesta: el reportado por el API
   * (`X-Request-Id`) y, si no lo envía, el que se envió en la petición.
   */
  requestId: string;
  status: number;
  notModified: boolean;
}

function buildQuery(query: ApiRequestOptions["query"]): string {
  if (query === undefined) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) params.set(key, String(value));
  }
  const serialized = params.toString();
  return serialized.length > 0 ? `?${serialized}` : "";
}

/** Compone la URL absoluta; rechaza rutas relativas (error de programación). */
export function buildApiUrl(
  baseUrl: string,
  path: string,
  query?: ApiRequestOptions["query"],
): string {
  if (!path.startsWith("/")) throw new Error(`[proefex-api] la ruta debe empezar por "/": ${path}`);
  return `${baseUrl}${path}${buildQuery(query)}`;
}

async function readProblem(response: Response): Promise<unknown> {
  try {
    const text = await response.text();
    return text.length === 0 ? null : (JSON.parse(text) as unknown);
  } catch {
    return null;
  }
}

/**
 * GET contra `proefex-api`.
 *
 * Lanza siempre `ApiError` ante cualquier fallo (configuración, red, timeout,
 * estado HTTP, cuerpo fuera de contrato): la capa de dominio decide después si
 * un fallo implica fallback o error de página.
 */
export async function apiGet<T>(
  path: string,
  parse: (value: unknown) => T,
  options: ApiRequestOptions = {},
): Promise<ApiResponse<T>> {
  const config = options.config ?? getApiConfig();
  const requestId = normalizeRequestId(options.requestId) ?? contentRequestId(path);

  if (!config.enabled) {
    throw apiErrorUnconfigured(config.detail, { path, requestId });
  }

  const url = buildApiUrl(config.baseUrl, path, options.query);
  const headers: Record<string, string> = {
    Accept: "application/json",
    [REQUEST_ID_HEADER]: requestId,
  };
  const ifNoneMatch = options.ifNoneMatch?.trim();
  if (ifNoneMatch !== undefined && ifNoneMatch.length > 0) {
    headers["If-None-Match"] = ifNoneMatch;
  }

  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? DEFAULT_API_TIMEOUT_MS;

  const init: TaggedRequestInit = {
    method: "GET",
    headers,
    cache: options.cache ?? DEFAULT_CACHE,
    signal: AbortSignal.timeout(timeoutMs),
  };
  if (options.tags !== undefined && options.tags.length > 0) {
    init.next = { tags: [...options.tags] };
  }

  let response: Response;
  try {
    response = await fetchImpl(url, init);
  } catch (cause) {
    throw apiErrorFromTransportError(cause, { path, requestId });
  }

  const etag = response.headers.get("etag");
  // El API devuelve el `X-Request-Id` de la petición (o el suyo propio) en la
  // respuesta: es el identificador con el que quedó registrada en su log, así que
  // tiene prioridad sobre el que generamos aquí para la correlación de extremo a
  // extremo.
  const reportedRequestId = normalizeRequestId(response.headers.get(REQUEST_ID_HEADER));
  const effectiveRequestId = reportedRequestId ?? requestId;

  if (response.status === 304) {
    return { data: null, etag, requestId: effectiveRequestId, status: 304, notModified: true };
  }

  if (!response.ok) {
    const problem = parseProblemDetails(await readProblem(response));
    if (problem !== null) {
      throw apiErrorFromProblem(problem, {
        path,
        requestId: reportedRequestId ?? normalizeRequestId(problem.requestId) ?? requestId,
      });
    }
    throw apiErrorFromStatus(response.status, { path, requestId: effectiveRequestId });
  }

  const contentType = (response.headers.get("content-type") ?? "").toLowerCase();
  if (contentType.startsWith("text/html")) {
    throw apiErrorInvalidResponse("el API devolvió HTML en lugar de JSON", {
      path,
      requestId: effectiveRequestId,
    });
  }

  let raw: string;
  try {
    raw = await response.text();
  } catch (cause) {
    throw apiErrorFromTransportError(cause, { path, requestId: effectiveRequestId });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw) as unknown;
  } catch {
    throw apiErrorInvalidResponse("el cuerpo no es JSON válido", { path, requestId: effectiveRequestId });
  }

  try {
    return {
      data: parse(body),
      etag,
      requestId: effectiveRequestId,
      status: response.status,
      notModified: false,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw withApiErrorContext(error, { path, requestId: effectiveRequestId });
    }
    throw apiErrorInvalidResponse("el cuerpo no cumple el contrato", {
      path,
      requestId: effectiveRequestId,
    });
  }
}
