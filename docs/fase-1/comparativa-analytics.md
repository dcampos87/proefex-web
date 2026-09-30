# Comparativa de herramientas de analytics — D18 (Fase 1)

**Estado:** `REQUIRES_PROEFEX_INPUT` — comparativa y recomendación entregadas; decisión final antes del lanzamiento público (F2). No se implementa nada todavía.

## Requisitos (Doc 19 D18 / A6)

- Eventos: `page_view`, `form_submit`, `cta_click`, `section_view`, cambios de universo, `outbound_click`.
- Campañas (UTM), conversiones (formularios, CTA SaaS/productos).
- Consentimiento categorizado (necesarias / analíticas) — nada se carga antes del consentimiento.
- Sin perjuicio de performance (presupuesto JS) ni de privacidad.

## Comparativa

| Criterio | GA4 | Plausible / Umami (self-hosted) | Cloudflare Web Analytics |
|---|---|---|---|
| Modelo | SaaS de Google | SaaS de pago / self-hosted open source | Gratis, integrado al CDN |
| Peso en cliente | ~40–80KB+ (gtag); requiere consentimiento explícito | <1KB, cookieless | ~1KB, cookieless |
| Eventos personalizados | Sí, completos | Sí (API de eventos) | Limitados (auto + algunos custom) |
| Conversiones/embudos | Sí | Básicos | No |
| Privacidad / carga legal | Alta complejidad (consentimiento, DPA, posibles transferencias) | Baja (cookieless; puede correr sin banner estricto según jurisdicción) | Muy baja |
| Riesgo de bloqueo por ad-blockers | Alto | Bajo-medio | Bajo |
| Costo | Gratis | Plausible desde ~USD 9/mes; Umami self-hosted (costo de servidor) | Gratis |
| Afinidad con stack Cloudflare | Neutra | Neutra | Nativa |
| Preparado para e-commerce/CRM futuro | Sí | Parcial | No |

## Recomendación

**Arquitectura en dos capas:**

1. **Base siempre activa (cookieless):** Cloudflare Web Analytics para métricas de tráfico sin fricción de consentimiento y sin costo de performance.
2. **Capa de eventos/conversiones con consentimiento:** Umami o Plausible self-hosted (en `proefex-infrastructure`) para eventos de negocio (`form_submit`, `cta_click`, conversiones) — baja huella, datos propios, sin transferencias a terceros.

**GA4 solo si** el equipo de marketing de PROEFEX requiere integraciones con el ecosistema Google Ads/Search Console avanzadas; en ese caso se carga exclusivamente tras consentimiento y se documenta en la política de cookies.

## Pendiente de PROEFEX

- [ ] Preferencia sobre la recomendación de dos capas.
- [ ] ¿Existe requisito de Google Ads / ecosistema Google? (condiciona GA4)
- [ ] Jurisdicción y texto de política de cookies (aporte legal).
- [ ] Confirmación de que la medición no debe cargar antes del consentimiento (requisito aprobado en arquitectura).
