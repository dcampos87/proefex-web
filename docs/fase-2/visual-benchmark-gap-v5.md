# Visual Benchmark Gap v5 — Fase 2.4

Benchmark conceptual: `https://weevolveit.com/` — solo como nivel de impacto/experiencia, sin copia (mandato §13).

Contexto: Fase 2.4 es **validación con media real**. El hallazgo principal es que **no existe media real de PROEFEX en el repositorio** (ver `media-validation-inventory.md`): la experiencia se valida con los 3 placeholders provisionales etiquetados (D42). Este gap v5 evalúa la experiencia en ese escenario y determina qué falta para el nivel de impacto objetivo.

## Tabla comparativa

| Área | Estado PROEFEX (2.4) | Benchmark | Gap / Acción requerida |
|---|---|---|---|
| Impacto | Hero con media protagonista + 9 actos; correcto en light/dark, 0 overflow | Impacto inmediato con piezas audiovisuales reales propias | **Alto**: el impacto final requiere video/hero real (`HERO_VIDEO_REQUIRED`) — con placeholder alcanza nivel "bueno", no "premium" |
| Navegación | Header limpio + ecosistema editorial + theme toggle; persiste de 2.2/2.3 | Navegación por exploración, sofisticada | **Bajo**: paridad estructural alcanzada; sin cambios requeridos |
| Composición | Editorial consolidada (filas, metadata, whitespace); validada por acto | Composición dominada por tipografía y ritmo | **Bajo**: mantener; ajustes finos cuando llegue media real (crops/focales) |
| Ritmo | Alternancia de superficies correcta (white/#F4F6F9 ↔ #0B1120/#070D19) | Ritmo con transiciones y capítulos multimedia | **Medio**: transiciones entre actos mejorables con media real entre capítulos (slots ya listos) |
| Media | Sistema completo (MediaFrame, 6 variantes, video gate, focal, overlay, caption/credit, priority/lazy verificados en runtime) | Media real integrada como lenguaje | **Alto**: sistema listo, contenido inexistente — bloqueado por activos de PROEFEX |
| Profundidad | Templates internos por variante (service/product/industry); páginas stub honestas | Páginas profundas con casos y evidencia | **Medio**: la profundidad percibida requiere casos reales + media (`CONTENT_REQUIRED`) |
| Motion | Reveal/ignite + View Transitions; reduced-motion correcto | Motion sutil y premium | **Bajo**: paridad razonable; sin dependencias |
| Sensación premium | Sólida y coherente; placeholders visibles con tag honesto | Premium basado en marca propia | **Medio-Alto**: los tags `VISUAL PROVISIONAL` comunican honestidad pero restan acabado premium hasta el reemplazo |

## Qué necesita la experiencia para el nivel de impacto objetivo

1. **Video de hero real** (10–20 s, loop, mute, versión mobile) → slot ya implementado y probado (poster + fallback + reduced-motion).
2. **Banco fotográfico propio** (5–10 piezas): proyectos TECH en campo, equipo, oficina, piezas Grow Up → reemplazo directo vía props CMS.
3. **Product shots** de los 6 productos SOLVE → convierte Acto 07 y `/solutions/*` de índice editorial a vitrina real.
4. **Casos reales autorizables** → activa Acto 06 y `/casos` como evidencia.
5. Logo vectorial + favicon (pendiente preexistente).

Con el material anterior, ninguna cambio arquitectónico es necesario: el gap es de **contenido, no de sistema**.

## Decisión de estado

`PHASE_2_4_CONTENT_BLOCKED — REQUIRES_PROEFEX_INPUT`: la validación técnica/visual de la experiencia está completa (39/39 checks efectivos, ver abajo), pero el objetivo de la fase —validar con media real— no puede ejecutarse sin activos que solo PROEFEX puede proveer.
