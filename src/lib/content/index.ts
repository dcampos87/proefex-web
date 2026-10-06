/**
 * Capa de datos de contenido (F3.2).
 *
 *   page / server component
 *          ↓
 *   dominio (este módulo)
 *          ↓
 *   cliente de API (`src/lib/api`)
 *          ↓
 *   proefex-api
 *          ↓
 *   Supabase
 *
 * Reglas:
 * - Las páginas NUNCA llaman a `fetch` ni conocen rutas del API: piden dominio.
 * - La Web nunca lee Supabase directamente para contenido público.
 * - Ninguna función lanza por fallos de red/contrato: devuelven un
 *   `ContentResult` con `outcome` explícito, de modo que una página decide si
 *   degrada a su contenido editorial propio. Un fallo nunca se oculta: se
 *   registra de forma segura (`describeApiError`).
 * - Cada lectura devuelve los `tags` que A5 necesitará para invalidarla, pero
 *   todavía NO se etiquetan las llamadas de `fetch` (A5 sigue bloqueado).
 */

import { apiGet, type ApiRequestOptions } from "../api/client.ts";
import type { ApiConfig } from "../api/config.ts";
import {
  apiErrorBadRequest,
  apiErrorInvalidResponse,
  describeApiError,
  toApiError,
  type ApiError,
} from "../api/errors.ts";
import { contentRequestId } from "../api/request-id.ts";
import {
  CONTENT_SLUG_PATTERN,
  type ContentList,
  type ContentType,
  type DetailOf,
  type Navigation,
  type PageDetail,
  type SiteSettings,
} from "../api/types.ts";
import {
  parseContentDetail,
  parseContentList,
  parseNavigation,
  parsePageDetail,
  parseSiteSettings,
} from "../api/validators.ts";
import {
  contentEntryTags,
  contentListTags,
  navigationTags,
  settingsTags,
} from "./tags.ts";

export type ContentOutcome = "ok" | "not-found" | "unavailable";

export interface ContentResult<T> {
  readonly outcome: ContentOutcome;
  readonly data: T | null;
  /** Tags A5 asociados a esta lectura (todavía no aplicados al cache). */
  readonly tags: readonly string[];
  /** ETag del API; se conserva para revalidación condicional futura. */
  readonly etag: string | null;
  readonly requestId: string;
  /** Error tipado cuando `outcome !== "ok"`. */
  readonly error: ApiError | null;
}

export interface ContentRequestOptions {
  /** Id de correlación (se reenviará desde la petición entrante en render dinámico). */
  requestId?: string;
  timeoutMs?: number;
  /** Inyectables en pruebas. */
  fetchImpl?: typeof fetch;
  config?: ApiConfig;
}

export interface ContentListOptions extends ContentRequestOptions {
  limit?: number;
  cursor?: string;
}

interface ContentCall<T> {
  path: string;
  key: string;
  tags: readonly string[];
  query?: ApiRequestOptions["query"];
  parse: (value: unknown) => T;
  options: ContentRequestOptions;
}

/** Ruta pública de un listado (`GET /v1/content/:type`). */
export function contentListPath(type: ContentType): string {
  return `/content/${type}`;
}

/**
 * Ruta pública de una entidad (`GET /v1/content/:type/:slug`).
 * El slug se codifica segmento a segmento para preservar los slugs con `/`
 * (`pages`/legal del CMS) sin romper la ruta paramétrica del API.
 */
export function contentEntryPath(type: ContentType, slug: string): string {
  const segments = slug
    .split("/")
    .filter((segment) => segment.length > 0)
    .map((segment) => encodeURIComponent(segment));
  return `/content/${type}/${segments.join("/")}`;
}

async function readContent<T>(call: ContentCall<T>): Promise<ContentResult<T>> {
  const requestId = call.options.requestId ?? contentRequestId(call.key);
  try {
    const response = await apiGet(call.path, call.parse, {
      query: call.query,
      requestId,
      timeoutMs: call.options.timeoutMs,
      fetchImpl: call.options.fetchImpl,
      config: call.options.config,
    });

    if (response.notModified || response.data === null) {
      throw apiErrorInvalidResponse("el API devolvió 304 sin copia local disponible", {
        path: call.path,
        requestId,
      });
    }

    return {
      outcome: "ok",
      data: response.data,
      tags: call.tags,
      etag: response.etag,
      requestId,
      error: null,
    };
  } catch (error) {
    const apiError = toApiError(error, { path: call.path, requestId });
    const outcome: ContentOutcome = apiError.kind === "not-found" ? "not-found" : "unavailable";
    console.warn(`[proefex-content] ${outcome} ${describeApiError(apiError)}`);
    return {
      outcome,
      data: null,
      tags: call.tags,
      etag: null,
      requestId: apiError.requestId ?? requestId,
      error: apiError,
    };
  }
}

/** Listado paginado de un tipo de contenido. */
export async function listContent(
  type: ContentType,
  options: ContentListOptions = {},
): Promise<ContentResult<ContentList>> {
  const query: Record<string, string | number | undefined> = {};
  if (options.limit !== undefined) query["limit"] = options.limit;
  if (options.cursor !== undefined) query["cursor"] = options.cursor;

  return readContent({
    path: contentListPath(type),
    key: `content.${type}.list`,
    query,
    tags: contentListTags(type),
    parse: (value) => parseContentList(value, type),
    options,
  });
}

/** Detalle de una entidad por slug. */
export async function getContentEntry<T extends ContentType>(
  type: T,
  slug: string,
  options: ContentRequestOptions = {},
): Promise<ContentResult<DetailOf<T>>> {
  const normalized = slug.trim();
  if (normalized.length === 0 || !CONTENT_SLUG_PATTERN.test(normalized)) {
    const path = contentEntryPath(type, normalized);
    const requestId = options.requestId ?? contentRequestId(`content.${type}.${normalized}`);
    const error = apiErrorBadRequest(`slug fuera del patrón del contrato: "${normalized}"`, {
      path,
      requestId,
    });
    console.warn(`[proefex-content] unavailable ${describeApiError(error)}`);
    return {
      outcome: "unavailable",
      data: null,
      tags: contentEntryTags(type, normalized),
      etag: null,
      requestId,
      error,
    };
  }

  return readContent<DetailOf<T>>({
    path: contentEntryPath(type, normalized),
    key: `content.${type}.${normalized}`,
    tags: contentEntryTags(type, normalized),
    parse: (value) => parseContentDetail(value, type) as DetailOf<T>,
    options,
  });
}

/**
 * Home editorial del CMS (`GET /v1/content/pages/home`).
 * El slug vacío del CMS se sirve aquí como singleton, no como entrada.
 */
export async function getHomePage(
  options: ContentRequestOptions = {},
): Promise<ContentResult<PageDetail>> {
  return readContent({
    path: "/content/pages/home",
    key: "content.pages.home",
    tags: contentEntryTags("pages", ""),
    parse: parsePageDetail,
    options,
  });
}

/** Árbol de navegación publicado (`GET /v1/content/navigation`). */
export async function getNavigation(
  options: ContentRequestOptions = {},
): Promise<ContentResult<Navigation>> {
  return readContent({
    path: "/content/navigation",
    key: "content.navigation",
    tags: navigationTags(),
    parse: parseNavigation,
    options,
  });
}

/** Configuración pública del sitio (`GET /v1/content/settings`). */
export async function getSiteSettings(
  options: ContentRequestOptions = {},
): Promise<ContentResult<SiteSettings>> {
  return readContent({
    path: "/content/settings",
    key: "content.settings",
    tags: settingsTags(),
    parse: parseSiteSettings,
    options,
  });
}
