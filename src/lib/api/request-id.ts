/**
 * Correlación de peticiones Web → `proefex-api` (F3.2).
 *
 * El API acepta `X-Request-Id` con un patrón seguro
 * (`^[A-Za-z0-9._-]{8,128}$`) y lo devuelve en cada respuesta y en los
 * documentos RFC 7807, de modo que una incidencia se puede rastrear de extremo a
 * extremo sin PII (`AGENTS.md` §13/§46).
 *
 * Nota de diseño (etapa SSG): durante el render estático no existe una petición
 * de usuario entrante. Enviar un id aleatorio por llamada cambiaría la clave del
 * Data Cache de Next en cada build (los headers forman parte de esa clave), así
 * que las lecturas usan un id DETERMINISTA derivado de la clave de contenido.
 * Cuando la Web pase a render dinámico (A5), la página reenviará el
 * `X-Request-Id` de la petición entrante.
 */

export const REQUEST_ID_HEADER = "X-Request-Id";

/** Patrón del contrato del API (`config/constants.ts` de `proefex-api`). */
export const REQUEST_ID_PATTERN = /^[A-Za-z0-9._-]{8,128}$/;

export const WEB_REQUEST_ID_PREFIX = "web";

/** Id único por petición entrante (uso futuro en render dinámico). */
export function newRequestId(): string {
  return `${WEB_REQUEST_ID_PREFIX}-${crypto.randomUUID()}`;
}

/** Devuelve el id si cumple el contrato del API; `null` en caso contrario. */
export function normalizeRequestId(value: string | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  const trimmed = value.trim();
  return REQUEST_ID_PATTERN.test(trimmed) ? trimmed : null;
}

/**
 * Id determinista para una lectura de contenido cacheable.
 *
 * `web.content.<clave>` — estable entre builds para la misma lectura, seguro
 * para logs y sin datos personales.
 */
export function contentRequestId(key: string): string {
  const sanitized = key
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, ".")
    .replace(/^\.+|\.+$/g, "")
    .slice(0, 100);
  return `${WEB_REQUEST_ID_PREFIX}.${sanitized.length > 0 ? sanitized : "content"}`;
}
