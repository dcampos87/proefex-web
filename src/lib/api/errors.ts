/**
 * Errores del cliente de `proefex-api` (F3.2).
 *
 * Un único tipo (`ApiError`) con una `kind` cerrada: la capa de dominio y las
 * páginas deciden a partir de `kind`, nunca de cadenas de mensaje. Los mensajes
 * son seguros para logs: no transportan cuerpos de respuesta ni datos internos
 * del API (`AGENTS.md` §46).
 */

export type ApiErrorKind =
  /** El API no está configurado en este entorno (fail closed). */
  | "unconfigured"
  /** La petición no llegó a completarse (DNS, conexión, TLS). */
  | "network"
  /** `AbortSignal` disparado por timeout. */
  | "timeout"
  /** 404 — recurso inexistente o no publicado (el API no distingue ambos). */
  | "not-found"
  | "unauthorized"
  | "forbidden"
  | "method-not-allowed"
  /** Petición rechazada por el cliente antes de salir (slug fuera de contrato). */
  | "bad-request"
  | "validation"
  | "payload-too-large"
  | "unsupported-media-type"
  | "rate-limited"
  /** 5xx del propio API. */
  | "server"
  /** 502 — el upstream (Supabase) falló. */
  | "upstream"
  | "unavailable"
  /** El cuerpo no cumple el contrato público. */
  | "invalid-response"
  /** Fallo no clasificado del cliente. */
  | "unknown";

export interface ApiErrorContext {
  path?: string | null;
  requestId?: string | null;
}

export interface ApiErrorInit extends ApiErrorContext {
  kind: ApiErrorKind;
  message: string;
  status?: number | null;
  code?: string | null;
  retryable?: boolean;
  cause?: unknown;
}

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status: number | null;
  readonly code: string | null;
  readonly requestId: string | null;
  readonly path: string | null;
  readonly retryable: boolean;

  constructor(init: ApiErrorInit) {
    super(init.message, init.cause === undefined ? undefined : { cause: init.cause });
    this.name = "ApiError";
    this.kind = init.kind;
    this.status = init.status ?? null;
    this.code = init.code ?? null;
    this.requestId = init.requestId ?? null;
    this.path = init.path ?? null;
    this.retryable = init.retryable ?? false;
  }
}

export function isApiError(value: unknown): value is ApiError {
  return value instanceof ApiError;
}

/** Códigos de aplicación del contrato del API (`lib/errors.ts` de `proefex-api`). */
const KIND_BY_CODE: Readonly<Record<string, ApiErrorKind>> = {
  PROEFEX_BAD_REQUEST: "bad-request",
  PROEFEX_UNAUTHORIZED: "unauthorized",
  PROEFEX_FORBIDDEN: "forbidden",
  PROEFEX_NOT_FOUND: "not-found",
  PROEFEX_METHOD_NOT_ALLOWED: "method-not-allowed",
  PROEFEX_PAYLOAD_TOO_LARGE: "payload-too-large",
  PROEFEX_UNSUPPORTED_MEDIA_TYPE: "unsupported-media-type",
  PROEFEX_VALIDATION_ERROR: "validation",
  PROEFEX_RATE_LIMITED: "rate-limited",
  PROEFEX_CONFIG_ERROR: "server",
  PROEFEX_INTERNAL_ERROR: "server",
  PROEFEX_UPSTREAM_ERROR: "upstream",
  PROEFEX_SERVICE_UNAVAILABLE: "unavailable",
};

function kindFromStatus(status: number): ApiErrorKind {
  switch (status) {
    case 400:
      return "bad-request";
    case 401:
      return "unauthorized";
    case 403:
      return "forbidden";
    case 404:
      return "not-found";
    case 405:
      return "method-not-allowed";
    case 413:
      return "payload-too-large";
    case 415:
      return "unsupported-media-type";
    case 422:
      return "validation";
    case 429:
      return "rate-limited";
    case 502:
      return "upstream";
    case 503:
      return "unavailable";
    default:
      return status >= 500 ? "server" : "bad-request";
  }
}

function isRetryableKind(kind: ApiErrorKind): boolean {
  return (
    kind === "network" ||
    kind === "timeout" ||
    kind === "rate-limited" ||
    kind === "server" ||
    kind === "upstream" ||
    kind === "unavailable"
  );
}

/** Añade contexto de traza a un error ya construido, conservando su semántica. */
export function withApiErrorContext(error: ApiError, context: ApiErrorContext): ApiError {
  return new ApiError({
    kind: error.kind,
    message: error.message,
    status: error.status,
    code: error.code,
    retryable: error.retryable,
    path: context.path ?? error.path,
    requestId: context.requestId ?? error.requestId,
    cause: error,
  });
}

export function apiErrorFromProblem(
  problem: { status: number; code: string; title: string },
  context: ApiErrorContext,
): ApiError {
  const kind = KIND_BY_CODE[problem.code] ?? kindFromStatus(problem.status);
  return new ApiError({
    kind,
    // Sólo el título público del problema: nunca `detail`/`errors` de un 5xx.
    message: problem.title,
    status: problem.status,
    code: problem.code,
    retryable: isRetryableKind(kind),
    ...context,
  });
}

export function apiErrorFromStatus(status: number, context: ApiErrorContext): ApiError {
  const kind = kindFromStatus(status);
  return new ApiError({
    kind,
    message: `proefex-api respondió ${status}`,
    status,
    retryable: isRetryableKind(kind),
    ...context,
  });
}

export function apiErrorFromTransportError(cause: unknown, context: ApiErrorContext): ApiError {
  const isAbort =
    cause instanceof Error && (cause.name === "AbortError" || cause.name === "TimeoutError");
  const kind: ApiErrorKind = isAbort ? "timeout" : "network";
  return new ApiError({
    kind,
    message: isAbort
      ? "la petición a proefex-api agotó el tiempo de espera"
      : "no se pudo contactar proefex-api",
    retryable: true,
    cause,
    ...context,
  });
}

export function apiErrorInvalidResponse(detail: string, context: ApiErrorContext): ApiError {
  return new ApiError({
    kind: "invalid-response",
    message: `respuesta de proefex-api fuera de contrato: ${detail}`,
    ...context,
  });
}

export function apiErrorUnconfigured(detail: string, context: ApiErrorContext): ApiError {
  return new ApiError({
    kind: "unconfigured",
    message: `proefex-api sin configurar: ${detail}`,
    ...context,
  });
}

export function apiErrorBadRequest(detail: string, context: ApiErrorContext): ApiError {
  return new ApiError({
    kind: "bad-request",
    message: `petición no enviada a proefex-api: ${detail}`,
    ...context,
  });
}

/** Normaliza cualquier valor lanzado a `ApiError`. */
export function toApiError(value: unknown, context: ApiErrorContext = {}): ApiError {
  if (isApiError(value)) return withApiErrorContext(value, context);
  return new ApiError({
    kind: "unknown",
    message: "fallo no identificado en el cliente de proefex-api",
    cause: value,
    ...context,
  });
}

/**
 * Descripción segura para logs: permite correlacionar una incidencia sin
 * exponer secretos, HMAC ni cuerpos de respuesta.
 */
export function describeApiError(error: ApiError): string {
  const parts = [`kind=${error.kind}`];
  if (error.status !== null) parts.push(`status=${error.status}`);
  if (error.code !== null) parts.push(`code=${error.code}`);
  if (error.path !== null) parts.push(`path=${error.path}`);
  parts.push(`requestId=${error.requestId ?? "none"}`);
  return parts.join(" ");
}
