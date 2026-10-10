import { handleRevalidateRequest } from "@/lib/revalidate/handler";

/**
 * `POST /api/revalidate` — endpoint firmado de la frontera API → Web (A5).
 *
 * Público por HTTPS (el API de `api.proefexperu.com` lo invoca con
 * `X-Proefex-Signature`), pero sólo procesa solicitudes firmadas con
 * `REVALIDATION_SECRET`. Ver `src/lib/revalidate/contract.ts` y `handler.ts`
 * para el contrato completo.
 *
 * ANTES DEL DEPLOY: configurar el secret del Worker
 * `npx wrangler secret put REVALIDATION_SECRET` (≥ 32 caracteres, el mismo
 * valor que `REVALIDATION_SECRET` del API) y completar el `database_id` real
 * de `NEXT_TAG_CACHE_D1` en `wrangler.jsonc`. Sin secret, el endpoint responde
 * 503 y no invalida nada (fail-closed).
 */

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  return handleRevalidateRequest(request);
}
