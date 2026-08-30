/**
 * Cloudflare Pages Function: proxy para enviar leads a n8n.
 *
 * El formulario del frontend hace POST a /api/leads y esta Function
 * reenvía el payload al webhook de n8n usando la variable de entorno
 * N8N_WEBHOOK_URL configurada en Cloudflare Pages (runtime, no build time).
 *
 * Esto resuelve el problema de SSG puro donde process.env se quema en
 * el build y no puede leer variables de entorno en runtime.
 */

interface Env {
  N8N_WEBHOOK_URL: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.N8N_WEBHOOK_URL) {
    return new Response(JSON.stringify({ error: "N8N_WEBHOOK_URL not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: string;
  try {
    body = await request.text();
    JSON.parse(body);
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const responseBody = await response.text();

    return new Response(responseBody, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: "Failed to reach webhook", detail: message }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};
