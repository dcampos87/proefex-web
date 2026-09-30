# Fase 2 — Sistema de Motion

Fuente: Doc 12 + `src/components/motion/Reveal.tsx` + bloque Motion de `globals.css`.

## 1. Decisión de implementación (D19 — PROPOSED, ejecutada)

**Sin librería de animación en Fase 2.** El inventario del Doc 12 se cubre con CSS (transiciones GPU-friendly: `transform`/`opacity`/`clip-path`) + `IntersectionObserver` nativo. Motion (Framer Motion) y GSAP quedan diferidos hasta que un efecto lo exija; presupuesto de librerías de animación (≤45KB gzip, Doc 12 §4) se mantiene en **0**.

## 2. Tokens (Doc 12 §2, sin cambios)

Duraciones 120/240/400/700/1100ms; easings `out`, `inOut`, `tech`, `spring` (documentado); stagger tight 40 / base 70 / loose 110. Firma por universo: `--ease-current` + `--stagger-current`.

## 3. Patrones implementados

| Patrón | Función (Doc 12 §1) | Implementación |
|---|---|---|
| Reveal fade+rise 24px | Orientar/enfatizar entradas de sección | `.reveal` + `.is-visible`, una vez, no reversible |
| Revelado por líneas | Entrada de titulares (≤12 palabras, D12) | `.reveal-lines` con `clip-path` + stagger 70ms |
| Ignite (firma TECH) | Reforzar identidad: módulos que encienden | `.ignite` secuencial vía `--reveal-delay` (120ms/row) |
| Marquee (firma Grow Up) | Separador editorial | CSS `@keyframes marquee` 28s lineal, pausa hover/focus |
| Subrayado animado | Orientación en navegación | `.underline-anim` (background-size) |
| Header shrink | Continuidad al scroll | `.site-header.is-scrolled` 64→56px + blur |
| Stagger de menú móvil | Orientar | `.mobile-nav .nav-item` con `--i` |
| Hover cards | Feedback | elevación + borde acento (TECH "enciende" con `--accent`) |

## 4. Reglas duras aplicadas

1. Solo `transform`/`opacity`/`clip-path` — cero animación de layout.
2. Máximo un protagonista por viewport (hero/panel; el resto es apoyo).
3. Toda animación es de entrada única e interrumpible por navegación.
4. **`prefers-reduced-motion`**: el CSS global anula animaciones/transiciones; `Reveal` comprueba `matchMedia` y muestra estático; no hay parallax, canvas, ni autoplay (no se implementaron).
5. **Sin JS el contenido es visible**: los estados ocultos están gated por `html.js` (script inline de 1 línea). Contenido nunca depende de la animación para ser legible.
6. CTAs y navegación nunca retrasados >600ms (delays máximos 420–440ms).

## 5. Presets referenciables por el CMS

`animationPresets` (`tokens.ts` / blocks-schema): `none`, `fade-rise`, `reveal-lines`, `panel-ignite`, `draw-on-scroll`, `counter`, `marquee`, `parallax-subtle`. En Fase 2 se implementan los tres primeros + marquee; `draw-on-scroll`, `counter` y `parallax-subtle` quedan definidos en schema para Fase 3 (counter requiere datos reales; parallax solo lg+).

## 6. Pendiente de motion (Fase 3+)

- Transición de página (View Transitions API + fallback).
- `draw-on-scroll` para diagramas TECH y ruta Grow Up.
- Contadores animados en Stats (con datos reales).
- Wash de gradiente Core→TECH→Grow Up si se prefiere al corte limpio (D22).
