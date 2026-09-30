# Decision Register — PROEFEX

Registro vivo de todas las decisiones. Estados: `APPROVED` (aprobada por humano) · `APPROVED_PENDING_HUMAN_CONFIRMATION` · `REQUIRES_PROEFEX_INPUT` · `PROPOSED` · `DEFERRED` · `REJECTED`.

> **2026-09-30 — Aprobación humana formal de Fase 0.** Aprobadas: D1, D2, D3, D4, D6, D9, D10, D14 y A1–A8. Permanecen abiertas: D5, D7, D8, D11, D12, D13, D15, D16, D17, D18. Fase 1 `AUTHORIZED_TO_START`. Fases 2–7 `NOT_AUTHORIZED`.

Detalle completo de cada decisión: `docs/19-decisiones-pendientes.md`.

## Decisiones de producto y tecnología

| ID | Decisión | Estado | Responsable | Impacto | Próxima acción |
|---|---|---|---|---|---|
| D1 | Motor del CMS: custom Next.js + Supabase, alcance acotado (Doc 06 §1.1), nunca page builder | `APPROVED` (humano, 2026-09-30) | Agent Master | Crítico — define Fase 1 | Ejecutar en Fase 1 dentro del alcance aprobado |
| D2 | Capa API: Cloudflare Workers + Hono | `APPROVED` (humano, 2026-09-30) | Agent Master | Medio | Estructura API foundations en Fase 1 |
| D3 | URL blog: `/insights/[categoria]/[slug]` + reglas de canonical/redirect | `APPROVED` (humano, 2026-09-30) | Agent Master | Medio (SEO) | Reflejar en schemas/templates (Fase 2+) |
| D4 | i18n: español inicial; arquitectura preparada para `/en/`; no implementar | `APPROVED` (humano, 2026-09-30) | Agent Master | Medio | Solo preparación arquitectónica |
| D5 | Arquitectura de vídeo diferenciada; proveedor especializado a evaluar | `DEFERRED` | Agent Master + PROEFEX | Medio — bloquea hero con vídeo (F2) | Completar inventario audiovisual |
| D6 | Narrativa de home como recorrido continuo por universos | `APPROVED` (humano, 2026-09-30) | Agent Master | Alto — define home y transiciones | Aplicar en diseño (post-moodboards) |
| D9 | Sin 3D por defecto en hero TECH (2D/parallax) | `APPROVED` (humano, 2026-09-30) | Agent Master | Bajo (performance protegida) | Aplicar en diseño |
| D10 | IoT: página canónica única `/tech/infraestructura/iot` | `APPROVED` (humano, 2026-09-30) | Agent Master | Bajo (SEO) | Reflejar en mapa/sitemap (F2) |
| D14 | Roles RBAC iniciales: SUPER_ADMIN, ADMIN, EDITOR, AUTHOR, SEO_MANAGER | `APPROVED` (humano, 2026-09-30) | Agent Master | Medio (seguridad) | Implementar RBAC/RLS (F1); personas pendientes (`PROEFEX_INPUT_REQUIRED`) |

## Decisiones de diseño

| ID | Decisión | Estado | Responsable | Impacto | Próxima acción |
|---|---|---|---|---|---|
| D7 | Dirección visual TECH: 2 moodboards diferenciados (13 elementos c/u) | `REQUIRES_PROEFEX_INPUT` | Design Lead → PROEFEX elige | Alto | Moodboards A/B producidos en Fase 1 → PROEFEX elige |
| D8 | Dirección visual Grow Up: 2 moodboards diferenciados | `REQUIRES_PROEFEX_INPUT` | Design Lead → PROEFEX elige | Alto | Moodboards A/B producidos en Fase 1 → PROEFEX elige |
| D11 | Tipografía mono: muestras (JetBrains Mono, IBM Plex Mono, Source Code Pro) con uso restringido | `REQUIRES_PROEFEX_INPUT` | Design Lead → PROEFEX | Bajo | Comparativa entregada en Fase 1 → PROEFEX elige |
| D12 | Copy: 10 titulares conceptuales para validar tono (Doc 19 §D12) | `REQUIRES_PROEFEX_INPUT` | Content + PROEFEX | Medio | Titulares entregados en Fase 1 → validar tono |

## Decisiones de contenido y operación

| ID | Decisión | Estado | Responsable | Impacto | Próxima acción |
|---|---|---|---|---|---|
| D13 | Inventario de contenido (`content-inventory.md`) | `REQUIRES_PROEFEX_INPUT` — **CRÍTICA** | PROEFEX | Crítico para F2; no bloquea infra F1 | Completar inventario |
| D15 | Estado de productos SaaS (matriz Doc 19) | `REQUIRES_PROEFEX_INPUT` | PROEFEX | Medio — bloquea F3 | Completar matriz |
| D16 | Learning/Certmind: checklist de información | `REQUIRES_PROEFEX_INPUT` | PROEFEX | Bajo — placeholder posible antes | Responder checklist |
| D17 | Contacto y leads: formulario propuesto + destino/legal | `REQUIRES_PROEFEX_INPUT` | PROEFEX | Medio — bloquea formularios F2 | Definir destino de leads y textos legales |
| D18 | Analítica y consentimiento: arquitectura propuesta, herramienta a evaluar | `REQUIRES_PROEFEX_INPUT` | Agent Master + PROEFEX | Medio | Comparativa entregada en Fase 1 → decisión antes de lanzar F2 |

## Decisiones arquitectónicas confirmadas

| ID | Decisión | Estado | Responsable | Impacto | Próxima acción |
|---|---|---|---|---|---|
| A1 | Dominio canónico en `www.proefexperu.com`; apex con 301 | `APPROVED` (humano, 2026-09-30) | Agent Master | Bajo | Aplicar en Cloudflare (requiere acceso a cuenta — `PROEFEX_INPUT_REQUIRED`) |
| A2 | Subdominios: admin / api / staging; learn reservado sin DNS | `APPROVED` (humano, 2026-09-30) | Agent Master | Medio | Configurar en Cloudflare (`PROEFEX_INPUT_REQUIRED`) |
| A3 | Sin monorepo; paquete compartido `@proefex/blocks-schema` | `APPROVED` (humano, 2026-09-30) | Agent Master | Medio | Paquete creado en Fase 1 |
| A4 | Render SSR/ISR con revalidación por webhook; contenido en HTML | `APPROVED` (humano, 2026-09-30) | Agent Master | Alto (SEO/CWV) | Aplicar en configuración Next.js (F1) |
| A5 | Flujo de publicación: CMS → api → revalidación web (punto único de integración) | `APPROVED` (humano, 2026-09-30) | Agent Master | Medio | Contrato definido en Fase 1 |
| A6 | Presupuestos de performance y WCAG 2.2 AA como criterio de aceptación | `APPROVED` (humano, 2026-09-30) | Agent Master | Alto | Base de CI (F1) |
| A7 | `prefers-reduced-motion` como parte del sistema global (no post-venta) | `APPROVED` (humano, 2026-09-30) | Agent Master | Medio (a11y) | Implementado en globals del design system (F1) |
| A8 | Backups, PITR, migraciones versionadas, separación de ambientes | `APPROVED` (humano, 2026-09-30) | Agent Master | Alto (seguridad) | Migraciones versionadas en repo (F1); Supabase requiere cuenta (`PROEFEX_INPUT_REQUIRED`) |
