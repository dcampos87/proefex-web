import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";

/**
 * A5 — cache y revalidación nativos de OpenNext/Cloudflare (Alternativa A
 * aprobada; ver docs/architecture/A5-WEB-REVALIDATION.md).
 *
 * - `incrementalCache: r2IncrementalCache` — almacén R2 del cache incremental
 *   (binding `NEXT_INC_CACHE_R2_BUCKET`, prefijo `NEXT_INC_CACHE_R2_PREFIX`,
 *   ambos declarados en wrangler.jsonc).
 * - `tagCache: d1NextTagCache` — tag cache en D1 (binding `NEXT_TAG_CACHE_D1`,
 *   tabla `revalidations`) que da soporte a `revalidateTag` con invalidación
 *   on-demand. Con revalidación exclusivamente on-demand no se declara queue
 *   (solo sería necesaria para TTL de seguridad) ni cache purge.
 *
 * Solo capacidades nativas de @opennextjs/cloudflare 1.20.8: no existe cache
 * propio ni modelo de datos adicional.
 */
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  tagCache: d1NextTagCache,
});
