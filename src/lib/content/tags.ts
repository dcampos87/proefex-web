/**
 * Catálogo determinista de tags de contenido (F3.2; aplicados al cache en A5).
 *
 * Reproduce EXACTAMENTE la nomenclatura que `proefex-api` deriva y emite al
 * Web en la orden de revalidación (`proefex-api/src/modules/webhooks/cache-tags.ts`
 * + `src/config/constants.ts`, commit `0d3cbee`):
 *
 *   content:<tipo>                    → invalida el listado de un tipo
 *   content:<tipo>:<slug|home>        → invalida una entrada
 *   content:navigation                → árbol de navegación
 *   content:settings                  → configuración pública del sitio
 *
 * ALCANCE (A5): las funciones de dominio de `src/lib/content` devuelven estos
 * tags y el cliente del API los aplica al Data Cache de Next
 * (`next: { tags }`). El mismo catálogo cerrado valida el payload de
 * `POST /api/revalidate` (`src/lib/revalidate/contract.ts`): sin wildcards, sin
 * tag raíz y sin tags arbitrarios.
 */

import type { ContentType } from "../api/types.ts";

export const CONTENT_TAG_PREFIX = "content";

/** Singleton de navegación (no se emite hoy desde el CMS; sí está en el enum del API). */
export const NAVIGATION_CONTENT_TAG = `${CONTENT_TAG_PREFIX}:navigation`;

/** Singleton de configuración pública del sitio. */
export const SETTINGS_CONTENT_TAG = `${CONTENT_TAG_PREFIX}:settings`;

/** Slug reservado para la home del CMS (`pages.slug = ""`). */
export const HOME_CONTENT_SLUG = "home";

/** Tag de listado: invalida todas las entradas de un tipo. */
export function contentTypeTag(type: ContentType): string {
  return `${CONTENT_TAG_PREFIX}:${type}`;
}

/**
 * Normaliza el slug de una entrada.
 * El CMS representa la home con slug vacío; el contrato de tags la publica como
 * `home` (`content:pages:home`).
 */
export function normalizeContentSlug(slug: string): string {
  const trimmed = slug.trim();
  return trimmed.length === 0 ? HOME_CONTENT_SLUG : trimmed;
}

/** Tag de entrada: `content:<tipo>:<slug|home>`. */
export function contentEntryTag(type: ContentType, slug: string): string {
  return `${CONTENT_TAG_PREFIX}:${type}:${normalizeContentSlug(slug)}`;
}

/** Tags de una lectura de listado. */
export function contentListTags(type: ContentType): readonly string[] {
  return [contentTypeTag(type)];
}

/**
 * Tags de una lectura de entidad: el listado de su tipo y la entrada.
 * Coincide con la derivación del API (deduplicada y ordenada).
 */
export function contentEntryTags(type: ContentType, slug: string): readonly string[] {
  const typeTag = contentTypeTag(type);
  const entryTag = contentEntryTag(type, slug);
  return typeTag === entryTag ? [typeTag] : [typeTag, entryTag];
}

export function navigationTags(): readonly string[] {
  return [NAVIGATION_CONTENT_TAG];
}

export function settingsTags(): readonly string[] {
  return [SETTINGS_CONTENT_TAG];
}
