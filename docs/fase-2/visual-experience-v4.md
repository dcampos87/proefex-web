# Visual Experience v4 — Fase 2.3 · Entrega

Recalibración de experiencia visual · 12 años · Media-first · Theme system.

Base: `65618cd` (`PHASE_2_2_CSS_RENDERING_FIXED — REQUIRES_PROEFEX_APPROVAL`).

**Estado final: `PHASE_2_3_VISUAL_EXPERIENCE_COMPLETE — REQUIRES_PROEFEX_APPROVAL`**

NO se inició Fase 3.

---

## 1. Resumen ejecutivo

La experiencia evoluciona de "website corporativo por bloques" a "ecosistema tecnológico que se explora" (mandato §2), sin tocar la arquitectura técnica (mandato §28):

- **Home reescrita como recorrido editorial de 9 actos** con media con protagonismo real (hero audiovisual preparado), la trayectoria **12+ años** como pieza tipográfica dominante con línea temporal, y CTA de cierre fuerte.
- **Sistema de media reutilizable** (`MediaFrame` + `MediaHeroVideo`) con 6 variantes, listo para CMS: image/video/poster/focal/overlay/caption/credit/priority/lazy/reduced-motion.
- **Theme system Light/Dark/System** global, persistente, sin flash, **independiente de los universos**: TECH y Grow Up conservan identidad fija en cualquier tema.
- **Templates internos diferenciados** (service / product / industry) con ritmo editorial propio por tipo de página.
- **View Transitions progresivas** (`@view-transition` nativo + fallback instantáneo + reduced-motion).
- Navegación limpia de F2.2 **se conserva** (mandato §16); se añade solo el control de tema.

## 2. Benchmark (weevolveit.com — sin copia)

Ver `visual-benchmark-gap-v4.md` (tabla de 10 áreas + gap restante). Conclusión: el nivel de sofisticación/navegación/composición se acerca al objetivo con identidad propia; el salto definitivo depende de media real y contenido (Fase 3/CMS).

## 3. Home — 9 actos (D38, D43)

| Acto | Contenido |
|---|---|
| 01 IMPACTO | Hero audiovisual: copy + `MediaFrame` media-hero 4/3 (slot video + poster provisional) |
| 02 EXPERIENCIA | Cifra 12+ protagonista + línea 2012→2026 (hitos `CONTENT_REQUIRED`) |
| 03 ECOSISTEMA | Cinco puertas de universos (filas editoriales con acento por universo) |
| 04 CAPACIDADES | Pieza destacada + media editorial + metodología (Entender→Diseñar→Integrar→Evolucionar) |
| 05 INDUSTRIAS | 8 sectores como filas editoriales ("Capacidades aplicables al sector") |
| 06 PROYECTOS | `media-case` 21/9 con tag `CASO REAL — PENDIENTE` (nada inventado) |
| 07 PRODUCTOS | Productos SOLVE como filas editoriales (solo Turu CRM tiene descripción real) |
| 08 INSIGHTS | Índice editorial consolidado |
| 09 CTA | Cierre fuerte en universo core |

## 4. Theme system (D39, D40)

Ver `theme-system.md`. Script inline pre-paint (`localStorage('pfx-theme')`), tokens dark por especificidad para core/learns/equip/solve, `ThemeToggle` en header + drawer.

## 5. Media system (D41, D42)

Ver `media-system.md`. `MediaFrame` (server) + `MediaHeroVideo` (client gate por reduced-motion). Placeholders provisionales en `public/media/` con tag `VISUAL PROVISIONAL`.

## 6. Templates internos (§19)

`RouteStub` acepta `variant`: **service** (Problema→Qué→Cómo→Capacidades→Casos), **product** (Qué resuelve→Capacidades→Experiencia→Integraciones), **industry** (Contexto→Capacidades→Casos). `scripts/gen-stubs.cjs` infiere la variante por ruta (tech/* y grow-up/* → service; solutions/* → product; sectores/* → industry); 34 stubs regenerados con guard de no-destrucción.

## 7. Fix técnico durante QA (no creativo)

Overflow horizontal de 19px en `/tech` a 320px: `min-width:auto` de grid/flex impedía encoger `.ed-row` y las filas del panel de sistema de `HeroTech`. Fix mínimo: `minmax(0, 1fr)` en las columnas centrales de `.ed-row`/`.ed-row--door`/`.method-rows` + `min-w-0`/`flex-wrap` en `HeroTech`. Verificado delta=0 en 320/1920 para 11 rutas.

## 8. QA y screenshots (Puppeteer + Edge headless, prod build)

`30/30 PASS` — guion `theme-qa.js`:

- Temas: default (system), ciclo completo, persistencia post-reload pre-paint, dark aplicado.
- Theme×Universe: TECH navy `rgb(0,18,51)` y Grow Up `rgb(34,39,46)` + acento `rgb(0,255,230)` intactos en dark.
- Variantes: SERVICIO / PRODUCTO / SECTOR presentes en rutas de muestra.
- Media: MediaFrame en Home; sin autoplay con `prefers-reduced-motion` (emulado).
- Overflow: 0 en 320 y 1920 px (7 rutas × 2 viewports).
- Drawer 375: toggle de tema presente.

Screenshots (QA temporal, `%TEMP%\pfx-qa\t23-*.png`): home light/dark 1440, tech light/dark, grow-up dark, service dark, home dark 375, drawer dark 375.

Único error de consola: `favicon.ico` 404 — preexistente, pendiente Fase 3 (asset de marca).

## 9. Performance

- First Load JS: **103 kB** compartido; Home 112 kB (límite 180 kB — cumplido).
- Build limpio: 50 rutas estáticas.
- 0 dependencias nuevas (sin GSAP/Three.js/WebGL/librerías de animación).

## 10. Accesibilidad

- Toggle de tema: botón real, `aria-label` estado+siguiente, foco visible.
- Dark mode: contraste AA en surfaces/borders/muted (Grow Up cian/grafito 11.77:1, blanco/grafito 15.02:1 — verificado en 2.1).
- `prefers-reduced-motion`: sin autoplay de video, View Transitions anuladas, reveals estáticos.
- Touch targets ≥44px en drawer; megamenú F2.2 intacto (aria-expanded/controls, Escape, focus trap).

## 11. Decisiones (ver `decision-register.md`)

D38 (recalibración 9 actos) · D39 (theme system sin flash) · D40 (theme ≠ universe) · D41 (MediaFrame/media system) · D42 (placeholders provisionales) · D43 (12+ narrativo) · D44 (View Transitions progresivas) — todas `PROPOSED`.

## 12. Pendientes y riesgos

| Ítem | Estado |
|---|---|
| Media real (foto/video PROEFEX) | `CONTENT_REQUIRED` — bloquea el impacto final del hero (D5 deferred) |
| Hitos históricos del timeline 12+ | `CONTENT_REQUIRED` (no inventados) |
| Favicon/asset de marca | 404 pendiente Fase 3 |
| Copy comercial definitivo | D12 dirección conceptual; textos provisionales marcados |
| Parallax/scroll-driven avanzado | Explorado a nivel progresivo; profundizar solo con aprobación PROEFEX |

**Riesgos**: la percepción "media-first" con placeholders puede subestimar el resultado final; se recomienda evaluar con al menos un video real de hero antes del cierre visual definitivo.

## 13. Aprobación

La aprobación visual final corresponde a PROEFEX. Tras aprobación → Fase 3 (no iniciada).

---

# ANEXO FASE 2.4 — Real Media Validation (sobre este documento, commit `76d8f13`)

**Estado: `PHASE_2_4_CONTENT_BLOCKED — REQUIRES_PROEFEX_INPUT`** · Ver `media-validation-inventory.md` y `visual-benchmark-gap-v5.md`.

## Hallazgo principal

No existe media real de PROEFEX en el repositorio (búsqueda exhaustiva de todos los formatos + revisión de `content-inventory.md`, que registra los assets como `UNKNOWN`). No se fabricó ni se sustituyó con stock (mandato §2). El sistema de media queda **listo y probado** para integrar material real vía props CMS sin cambios de arquitectura.

## Assets en el repo (únicos 3, provisionales D42)

`hero-ecosistema.webp` 1600×896 / 1002 kB · `capacidades-ingenieria.webp` 1600×896 / 1419 kB · `productos-solutions.webp` 1600×896 / 854 kB — todos `AVAILABLE_BUT_NEEDS_OPTIMIZATION` (peso > recomendado; re-optimizar al reemplazar por media real) y con tag visible `VISUAL PROVISIONAL`.

## Assessment de los 9 actos (con placeholders, light+dark)

| Acto | Evaluación | Nota |
|---|---|---|
| 01 IMPACTO | Cumple con placeholder | Fuerte en composición; el impacto "premium" definitivo requiere hero video real → `HERO_VIDEO_REQUIRED` |
| 02 EXPERIENCIA (12+) | Cumple | Cifra dominante + timeline; funciona como elemento de confianza; hitos `CONTENT_REQUIRED` (nada inventado) |
| 03 ECOSISTEMA | Cumple | Cinco puertas con identidad por universo; se perciben como mundos, no cards |
| 04 CAPACIDAD | Cumple | Media editorial + metodología 01–04; capacidad tecnológica visible |
| 05 INDUSTRIAS | Cumple con observación | Filas editoriales correctas; descripciones honestas `CONTENT_REQUIRED` — la presencia sectorial ganará con casos reales |
| 06 PROYECTOS | Estructura lista | `media-case` 21/9 + tag `CASO REAL — PENDIENTE`; sin evidencia aún → `CONTENT_REQUIRED` |
| 07 SOLUTIONS | Cumple con observación | 6 productos como filas; solo Turu CRM tiene descripción real; product shots convertirán el índice en vitrina |
| 08 INSIGHTS | Cumple | Índice editorial con carácter propio |
| 09 CTA | Cumple | Cierre directo con CTA principal |

## 12+ años

`12+` y `2012 → 2026` se mantienen. La composición comunica trayectoria/madurez/continuidad. No existen hitos históricos verificables en el repo → no se proponen (mandato §6).

## Validación técnica (build `76d8f13` + QA Puppeteer/Edge)

- Build limpio, 50 rutas, First Load JS **103 kB** compartido (límite 180 kB). 0 dependencias nuevas.
- Overflow **0 px** en 375/768/1440/1920 × 8 rutas (32 checks).
- Media system en runtime: 3 frames en Home, `alt` en 3/3 imágenes, `sizes` responsive en 3/3, hero eager (`loading` ausente + `complete:true` bajo `priority`) y resto lazy — verificado a nivel de atributos DOM (la heurística inicial de la suite marcó falso positivo por propiedad `loading`="auto" del navegador).
- Theme light/dark/system: persistencia y ausencia de flash re-verificadas en 2.3 con toggles reales; en 2.4 los falsos negativos de la suite (localStorage reinyectado por `evaluateOnNewDocument` en cada navegación) se identificaron como artefactos del script, no de la app. Computed backgrounds por tema: light `#FFF/#F4F6F9`, dark `#0B1120/#070D19`.
- Foco visible en toggle; favicon 404 preexistente sigue registrado como pendiente separado.

## Decisiones nuevas

- **D45** `PROPOSED`: Media real de PROEFEX requerida para el cierre visual — el gap restante es de contenido, no de sistema. Ver `decision-register.md`.

## Riesgos

1. Los placeholders, siendo IA-generados y etiquetados, comunican honestidad pero limitan la percepción premium hasta su reemplazo.
2. Peso de placeholders (0.85–1.4 MB) — irrelevante para producción si se reemplazan; si se mantuvieran, optimizar.
3. Sin video real, el slot `MediaHeroVideo` permanece sin demostrar en producción (solo QA de fallback).
