# Visual Benchmark Gap v4 — Fase 2.3

Benchmark conceptual: `https://weevolveit.com/` — usado **solo** como nivel de experiencia (sofisticación, narrativa, media, navegación). Sin copia de textos, layouts, imágenes, código ni identidad (mandato §27).

Estado previo: `PHASE_2_2_CSS_RENDERING_FIXED` (commit `65618cd`). Esta revisión se ejecutó antes de implementar y después, para validar el cierre.

## Tabla de gap (10 áreas)

| Área | Estado PROEFEX actual | Benchmark | Cambio realizado en 2.3 |
|---|---|---|---|
| Hero | Texto + CTA; media como acompañante | Composición audiovisual con media protagonista | Home: hero split con `MediaFrame` 4/3 (slot de video + poster + caption/credit) con peso visual equivalente al titular |
| Navigation | Megamenú editorial simplificado (F2.2), limpio | Navegación por exploración de "mundos" | Se conserva la navegación limpia (mandato §16); se añade control de tema al header y drawer |
| Media | Thumbnails/cards puntuales | Media estructural: transiciones, evidencia, textura, storytelling | Sistema `MediaFrame` (6 variantes) + `MediaHeroVideo` (autoplay muted loop, poster, reduced-motion, lazy); media en Actos 01/04/06 de Home |
| Typography | Display editorial consolidado en 2.1/2.2 | Tipografía protagonista con metadata | Se mantiene; cifra **12+** como pieza tipográfica dominante (`.years-figure`, clamp 6–15rem) |
| Motion | Reveal/ignite/marquee nativos (D19) | Movimiento sutil y premium | Se mantiene; View Transitions progresivas (D44) + fallback instantáneo; `prefers-reduced-motion` respetado |
| Page depth | Stubs de arquitectura uniformes | Páginas internas con ritmo propio | `RouteStub` con variantes **service / product / industry** (esqueletos editoriales propios, F3 llenará contenido) |
| 12+ years | "12+ años" inexistente como pieza narrativa | Trayectoria como proof point central | Acto 02: cifra protagonista + línea temporal `2012 → 2026` (hitos `CONTENT_REQUIRED`, nada inventado) |
| Theme | Solo tema fijo (claro en universos base) | — (no aplica al benchmark; mandato PROEFEX) | Sistema light/dark/system con persistencia y sin flash (D39); TECH y Grow Up conservan identidad fija (D40) |
| Internal pages | Plantilla única de stub | Gramática común + personalidad por tipo | Variantes de plantilla por tipo de página (§19) + media slot listo para CMS |
| Footer | Mega-footer universo-aware (D34) | Footer como cierre de marca | Se mantiene; verificado en dark (core/learns/equip/solve) y en universos de identidad fija |

## Lectura del gap restante

1. **Media real**: los 3 placeholders (`public/media/*.webp`, tag `VISUAL PROVISIONAL`) son provisionales; el nivel del benchmark en media solo será alcanzable con material audiovisual real (D5/D42, Fase 3/CMS).
2. **Contenido**: hitos del timeline 12+, casos, productos — todo marcado `CONTENT_REQUIRED`.
3. **Video**: la arquitectura está lista; sin proveedor/activos definidos no hay autoplay real aún (D5 `DEFERRED`).
4. **Parallax/scroll storytelling**: se exploró a nivel CSS progresivo; profundizar en Fase 3 si PROEFEX lo aprueba.

No se copió ningún elemento identificable del benchmark.
