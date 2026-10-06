/**
 * Configuración central del cliente de `proefex-api` (F3.2).
 *
 * Fuente de verdad del contrato: `proefex-api` (commit `0d3cbee`), no copias
 * históricas del workspace (`AGENTS.md` §24). Rutas públicas verificadas:
 *
 *   GET /v1/content/navigation
 *   GET /v1/content/settings
 *   GET /v1/content/pages/home
 *   GET /v1/content/:type
 *   GET /v1/content/:type/:slug
 *
 * Este módulo es SERVER-ONLY: la Web pública consume el contrato público del
 * API desde el servidor (SSG/ISR), nunca desde el cliente ni con secretos
 * (`AGENTS.md` §14, §26, §27).
 */

export type ApiEnvironment = "development" | "staging" | "production";

export const API_ENVIRONMENTS: readonly ApiEnvironment[] = ["development", "staging", "production"];

/** Variable con la base URL del API (incluye el prefijo de versión, p. ej. `/v1`). */
export const API_BASE_URL_VAR = "PROEFEX_API_BASE_URL";

/** Variable que selecciona el entorno del API cuando no se deduce de `NODE_ENV`. */
export const API_ENVIRONMENT_VAR = "PROEFEX_API_ENV";

/**
 * Dominio público aprobado del contrato (`AGENTS.md` §3/§16/§17).
 * Es el ÚNICO lugar del repositorio donde vive esta URL: cualquier otro
 * consumidor la obtiene a través de esta configuración.
 */
export const PRODUCTION_API_BASE_URL = "https://api.proefexperu.com/v1";

/**
 * `proefex-api` en local: `npm run dev` ejecuta `wrangler dev` sin `--port`,
 * por lo que escucha en 8787 (verificado en `proefex-api/package.json` y su
 * `wrangler.jsonc`, que sólo declara el entorno `local`).
 */
export const LOCAL_API_BASE_URL = "http://localhost:8787/v1";

/**
 * Valores por defecto por entorno.
 *
 * - `development`: API local.
 * - `staging`: **PENDIENTE**. `proefex-api` todavía no declara un entorno
 *   staging (su `wrangler.jsonc` sólo tiene `local`), así que no se inventa una
 *   URL: exige `PROEFEX_API_BASE_URL`.
 * - `production`: dominio público aprobado del contrato.
 */
export const API_DEFAULT_BASE_URLS: Readonly<Record<ApiEnvironment, string | null>> = {
  development: LOCAL_API_BASE_URL,
  staging: null,
  production: PRODUCTION_API_BASE_URL,
};

/** Timeout por defecto de una lectura de contenido. */
export const DEFAULT_API_TIMEOUT_MS = 5_000;

export type ApiConfigDisabledReason = "unconfigured" | "invalid-base-url";

export interface ApiConfigEnabled {
  readonly enabled: true;
  readonly environment: ApiEnvironment;
  /** Origen absoluto sin barra final, ya normalizado. */
  readonly baseUrl: string;
  readonly source: "environment-variable" | "default";
}

export interface ApiConfigDisabled {
  readonly enabled: false;
  readonly environment: ApiEnvironment;
  readonly reason: ApiConfigDisabledReason;
  /** Mensaje para operadores (nunca se muestra al usuario final). */
  readonly detail: string;
}

export type ApiConfig = ApiConfigEnabled | ApiConfigDisabled;

/** Fuente de variables de entorno (inyectable para poder probar la resolución). */
export type ApiEnvSource = Readonly<Record<string, string | undefined>>;

/**
 * Entorno del API.
 *
 * `PROEFEX_API_ENV` tiene prioridad; si falta o no es válido se deduce de
 * `NODE_ENV` (`production` → production; cualquier otro → development). Un
 * valor desconocido nunca habilita un entorno no previsto: se ignora.
 */
export function resolveApiEnvironment(
  env: ApiEnvSource,
  nodeEnv: string | undefined = env["NODE_ENV"],
): ApiEnvironment {
  const explicit = (env[API_ENVIRONMENT_VAR] ?? "").trim().toLowerCase();
  if (explicit.length > 0 && (API_ENVIRONMENTS as readonly string[]).includes(explicit)) {
    return explicit as ApiEnvironment;
  }
  return nodeEnv === "production" ? "production" : "development";
}

type BaseUrlResult = { ok: true; baseUrl: string } | { ok: false; detail: string };

/**
 * Normaliza y valida la base URL.
 *
 * Rechaza credenciales embebidas, query, fragmento y esquemas distintos de
 * http(s). La barra final se elimina para que la composición de rutas sea
 * determinista.
 */
function normalizeBaseUrl(raw: string): BaseUrlResult {
  let parsed: URL;
  try {
    parsed = new URL(raw.trim());
  } catch {
    return { ok: false, detail: "no es una URL absoluta" };
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, detail: "debe usar http o https" };
  }
  if (parsed.username.length > 0 || parsed.password.length > 0) {
    return { ok: false, detail: "no debe incluir credenciales" };
  }
  if (parsed.search.length > 0 || parsed.hash.length > 0) {
    return { ok: false, detail: "no debe incluir query ni fragmento" };
  }
  const path = parsed.pathname.replace(/\/+$/, "");
  return { ok: true, baseUrl: `${parsed.origin}${path}` };
}

/**
 * Resuelve la configuración del API. Falla cerrado: una base URL inválida o
 * ausente (entorno sin default) deja el cliente deshabilitado en lugar de
 * apuntar a un destino adivinado.
 */
export function resolveApiConfig(
  env: ApiEnvSource,
  nodeEnv: string | undefined = env["NODE_ENV"],
): ApiConfig {
  const environment = resolveApiEnvironment(env, nodeEnv);
  const raw = (env[API_BASE_URL_VAR] ?? "").trim();

  if (raw.length > 0) {
    const normalized = normalizeBaseUrl(raw);
    if (!normalized.ok) {
      return {
        enabled: false,
        environment,
        reason: "invalid-base-url",
        detail: `${API_BASE_URL_VAR} inválida: ${normalized.detail}`,
      };
    }
    return {
      enabled: true,
      environment,
      baseUrl: normalized.baseUrl,
      source: "environment-variable",
    };
  }

  const fallback = API_DEFAULT_BASE_URLS[environment];
  if (fallback === null) {
    return {
      enabled: false,
      environment,
      reason: "unconfigured",
      detail: `define ${API_BASE_URL_VAR} para el entorno "${environment}"`,
    };
  }
  return { enabled: true, environment, baseUrl: fallback, source: "default" };
}

let cachedConfig: ApiConfig | null = null;

/** Configuración efectiva del proceso actual (memoizada). */
export function getApiConfig(): ApiConfig {
  cachedConfig ??= resolveApiConfig(process.env, process.env.NODE_ENV);
  return cachedConfig;
}
