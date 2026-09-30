# Documento 07 — Arquitectura API

**Fase:** 0 — Definición
**Estado:** Propuesta para revisión

---

## 1. Propósito de la capa API

`proefex-api` centraliza la lógica de negocio e integraciones para que ni la web ni el CMS contengan reglas de negocio acopladas. La web consume contenido (vía Content API del CMS) y llama a `proefex-api` para **acciones** (leads, formularios, automatizaciones futuras).

## 2. Responsabilidades

| Dominio | Responsabilidad |
|---|---|
| Leads y contacto | Recepción, validación, spam-protection, distribución (email, webhook a CRM) |
| Integraciones | Conectores hacia sistemas externos (CRM, correo, automatización) |
| Webhooks | Endpoints entrantes y salientes con firma (HMAC) |
| Automatización futura | Eventos de negocio (nuevo lead, nuevo caso publicado) → handlers |
| LMS futuro | Proxy/catálogo hacia el LMS cuando exista |
| Analytics internos | Eventos de negocio (no reemplaza analítica web) |

## 3. Stack y despliegue

- **Opción recomendada:** Cloudflare Workers (Hono o similar, TypeScript). Sin servidores, latencia global, integrado con el hosting y rate limiting del edge.
- **Alternativa:** servicio Node (Fastify) desplegado si se requieren librerías sin soporte Workers. *Decisión a validar (Doc 19).*

## 4. Contrato de API

- REST versionada bajo `/v1`.
- Autenticación:
  - Endpoints públicos (formularios): protección anti-spam (turnstile/honeypot) + rate limiting por IP.
  - Endpoints internos: token de servicio firmado (web → api) o Supabase JWT.
  - Webhooks salientes: firma HMAC-SHA256 en header con timestamp.
- Errores: RFC 7807 (`application/problem+json`) con código, mensaje y trace id.
- Validación: esquemas Zod compartidos (`@proefex/api-schema`).
- Documentación: OpenAPI generada desde los esquemas, publicada internamente.

## 5. Endpoints iniciales (fase 1)

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/v1/leads` | Contacto / formulario genérico (origen, datos, consentimiento) |
| POST | `/v1/webhooks/cms/publish` | Recibe evento de publicación CMS → dispara revalidación web |
| GET | `/v1/health` | Health check |

## 6. Endpoints previstos (fases posteriores)

- `POST /v1/events` — registro de eventos de negocio.
- `GET /v1/lms/catalog` — catálogo referencial del LMS futuro.
- Integraciones concretas de CRM/email cuando el cliente defina proveedores.

## 7. Rate limiting y protección

- Por IP y por endpoint en Cloudflare (edge) + control fino en la API.
- Formularios: Turnstile/honeypot, límite por sesión, campos de max-length.
- Reintentos idempotentes con claves de idempotencia en POST críticos.

## 8. Observabilidad

- Logs estructurados (JSON) con request id.
- Alertas de errores 5xx y latencia p95.
- Auditoría de llamadas con secretos (nunca en logs).

## 9. Relación con Supabase

- La API usa service-role key **solo** dentro del servidor (nunca expuesta al cliente).
- Operaciones de contenido quedan en el CMS; la API no duplica lógica editorial.
- RLS es la última barrera; la API valida y limita antes de tocar la base.
