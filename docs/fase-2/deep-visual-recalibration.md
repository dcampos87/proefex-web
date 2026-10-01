# FASE 2.1 — DEEP VISUAL RECALIBRATION + GROW UP UNIVERSE

Estado: `PHASE_2_1_COMPLETE — REQUIRES_PROEFEX_APPROVAL`

Base: `cffde32` (Visual Acceptance Review, PASS WITH OBSERVATIONS).
Mandato: intervención visual dirigida — NO nueva Fase 2, NO cambios de arquitectura técnica, NO dependencias nuevas.

---

## 1. Visual objective

Evolucionar de "sitio corporativo moderno con componentes premium" a "ecosistema digital premium, editorial y tecnológico con identidad propia":

- tipografía protagonista y estructura editorial antes del contenido,
- Home como 7 actos con impacto (no catálogo),
- páginas internas con gramática común pero personalidad propia,
- Grow Up como universo visual completo (no solo landing recoloreada),
- chrome (header → página → CTA → footer) perteneciente a un solo universo.

## 2. Benchmark interpretation

Referencia: weevolveit.com — solo como benchmark de sofisticación, composición, navegación y tipografía protagonista. Sin copia (textos, layouts, código, identidad). Lo tomado / lo diferente está documentado en `recalibracion-visual.md` §29 y sigue vigente. En Fase 2.1 se trabaja específicamente: composición editorial de héroes, puertas de pilar, numeración protagonista y coherencia por universo.

## 3. Current visual gaps (identificados en la evaluación humana)

1. La experiencia no alcanzaba el nivel de sofisticación/composición del benchmark.
2. Grow Up no era un universo integral: su paleta no propagaba a navegación, footer, hijas ni componentes.

Ambos se abordan en esta fase (§4–§11). Gaps restantes: §16.

## 4. Home changes (7 actos)

- **Acto 01 — Hero**: `HeroCore` ahora admite `ghostIndex` + `rail`. Home usa índice fantasma "05" (cinco pilares) y rail vertical `CREATE / GROW / LEARN / EXPERIENCE / SOLVE` (solo lg+, decorativo). En <640px el índice fantasma se reduce y atenúa para no invadir CTAs.
- **Acto 02 — Ecosistema**: las cinco filas son **puertas de pilar** (`EditorialRows variant="door"`): número grande con el acento del universo (`--row-accent` por pilar), título a escala editorial, tagline y metadata mono del pilar (CREATE/GROW/…) a la derecha.
- **Acto 03 — Capacidad destacada**: bloque dominante existente se conserva (pieza editorial a dos columnas, no grid de cards).
- **Acto 04 — Experiencia destacada**: sigue `CONTENT_REQUIRED` (no hay caso real; no se inventa).
- **Acto 05 — Metodología**: filas `.method-rows` — el número es protagonista (grande, neutro) y toma el acento en hover/focus; narrativa de progresión, no cuatro cards.
- **Acto 06 — Insights**: se elimina el `BlogGrid` genérico de la Home; se reemplaza por un **índice editorial de categorías** (EditorialRows → /insights/[categoria]) + nota `CONTENT_REQUIRED` (D3: sin CMS). El BlogGrid sigue disponible para la página /insights en Fase 3.
- **Acto 07 — CTA + Footer**: sin cambios funcionales; footer ahora universo-aware (§9).

## 5. Internal page changes

- `RouteStub` acepta `universe` y envuelve todo en `data-universe`; `gen-stubs.cjs` regeneró 34 stubs con el universo de su árbol (guard: solo sobrescribe archivos que contienen "RouteStub", protegiendo páginas custom).
- Toda página de un árbol de pilar comparte ahora el universo de su landing: header, breadcrumbs, CONTENT_REQUIRED, CTA y footer del mismo lenguaje visual.
- Las landings ya existentes (héroes, filas editoriales, subnav) no se re-arquitectaron: la intervención fue de capa visual y chrome.

## 6. Mega menu changes

Sin cambios funcionales (auditado PASS en la review anterior). Revisión visual por screenshot 1440px: proporciones rail/columnas/destacados correctas, jerarquía legible, sin overflow. Se mantiene como pieza central de navegación.

## 7. Grow Up universe system

- Tokens semánticos en `[data-universe="growup"]` (globals.css), derivados exclusivamente de `#22272E` + `#00FFE6`:
  `--grow-bg #22272e · --grow-surface #262c35 · --grow-surface-elevated #2d3440 · --grow-text #fff · --grow-text-muted rgba(255,255,255,.62) · --grow-accent #00ffe6 · --grow-accent-contrast #0d1117 · --grow-border rgba(255,255,255,.14) · --grow-focus #00ffe6 · --grow-hover rgba(0,255,230,.08) · --grow-footer-bg #1b2027`.
- Componentes del universo consumen tokens (`component → semantic token → universe`); nada de colores sueltos.
- `--accent-2/--accent-3` del universo también derivan de la paleta (cian profundo / azul), de modo que las formas del HeroCreative ya no provienen de la paleta coral/amarillo obsoleta (comentario de componente actualizado).
- CTA de cierre de `/grow-up` movido al universo Grow Up: tarjeta `--grow-surface` + borde `--grow-border` (antes: tarjeta azul core que rompía la armonía Header→Page→CTA→Footer).

## 8. Header adaptation

El header ya era universo-aware (D27, `universeForPath`). Verificado en QA: sobre `/grow-up/*` el chrome usa texto blanco y CTA cian sobre grafito; sin rastro del azul TECH.

## 9. Footer adaptation

- `SiteFooter` es client component: `universeForPath(pathname)` → `data-universe` + `--footer-bg`/`--footer-accent` por universo (tech: navy profundo + naranja; growup: grafito `#1b2027` + cian; learns/equip/solve/core: azul de marca + naranja).
- Clase `.site-footer` fuerza texto blanco dentro del footer (los universos claros tienen tokens navy que romperían contraste sobre el footer oscuro).
- **Fondo del documento sincronizado**: el footer cliente escribe `document.body.dataset.universe`, eliminando la banda blanca (`body` con `--bg` core) que aparecía sobre universos oscuros antes del footer. Verificado: body `rgb(34,39,46)` en `/grow-up/*`, `rgb(0,18,51)` en `/tech/*`, blanco en `/`.
- El pilar del universo activo se destaca con `--footer-accent` en el grid del mega-footer.

## 10. Component adaptation

| Componente | Cambio |
|---|---|
| `EditorialRows` | `variant="door"`, acento por ítem (`--row-accent`/`--accent`), metadata mono `ed-row-meta` |
| `HeroCore` | props `ghostIndex` + `rail` (decorativos, aria-hidden) |
| `RouteStub` | prop `universe` (todo el árbol hereda identidad) |
| `SiteFooter` | universo-aware + sincronización de body |
| CSS (globals) | `.ed-row--door`, `.ed-row-meta`, `.method-rows`, `.hero-rail`, `.hero-ghost-index` (nuevos, ahora consumidos) |

## 11. Motion adaptation

Sin dependencias nuevas. Reutiliza el motion nativo existente (reveal-lines, ignite, page reveal, marquee Grow Up, underline-anim). Los nuevos patrones añaden transiciones discretas: acento de número en `.method-rows`, desplazamiento de flecha en puertas. Todo respeta `prefers-reduced-motion` (anulación global ya existente).

## 12. Responsive validation

Overflow horizontal = **0 px** en 320/375/768/1024/1440 para `/`, `/grow-up`, `/grow-up/marketing-bpo`. El rail y la metadata mono se ocultan <640px; el índice fantasma se reduce. Screenshots 1440×900 y 375×812 de las 11 rutas del review (carpeta QA temporal; ver §15).

## 13. Accessibility validation

- Contrastes medidos en runtime sobre Grow Up: cian/grafito **11.77:1**, blanco/grafito **15.02:1**, grafito/cian (CTA) **14.82:1**, muted ≥ AA. Cian nunca se usa como texto pequeño sobre claro.
- Elementos decorativos (`hero-ghost-index`, `hero-rail`, `ed-row-idx`) son `aria-hidden` y no portan información única.
- Megamenú: `aria-expanded`/`aria-controls`, Escape con retorno de foco, disclosure WAI-ARIA por teclado (fix `cffde32`).
- H1 verificado en landings y stubs (`marketing-bpo` → h1 "Marketing BPO").

## 14. Performance validation

- Build de producción: 50 rutas estáticas, **First Load JS compartido 103 kB** (presupuesto ≤180 kB). Sin dependencias nuevas (sin GSAP/Three.js/Framer Motion/WebGL).
- Typecheck limpio.

## 15. Screenshots

Generados con Puppeteer (Edge headless) contra build de producción, viewports 1440×900 y 375×812:

- `/` (hero + puertas + insights), megamenú abierto 1440, drawer 375
- `/tech`, `/grow-up`, `/learns`, `/equip`, `/solutions`
- interna TECH `/tech/ingenieria`, interna Grow Up `/grow-up/marketing-bpo` (incluye footer del universo)
- `/casos`, `/insights`
- footers comparativos Grow Up vs TECH

(archivos `g21-*.png` en la carpeta QA de la sesión; no se versionan en el repo).

## 16. Remaining gaps (para aprobación / Fase 3)

1. **Acto 04 Home** (experiencia destacada) y **casos reales**: `CONTENT_REQUIRED` — requiere material autorizado.
2. **Páginas internas**: los stubs validan arquitectura y universo; el diseño editorial de página de servicio/producto completo llega con contenido (Fase 3).
3. **CTA de cierre de landings** learns/equip/solve (y páginas custom de tech/solutions) aún usan tarjeta azul core: coherente con su footer azul, pero puede migrarse a tokens de universo si se aprueba D34.
4. **Transiciones entre universos**: cambio de chrome por color (inmediato, elegante); transiciones shared-element/clip más elaboradas quedan como propuesta para Fase 3 sin nuevas dependencias.
5. Insights solo tiene índice editorial; artículos reales `CONTENT_REQUIRED` (D3).

## 17. Decision register changes

- **D32** — Deep visual recalibration: `PROPOSED`.
- **D33** — Grow Up como universo visual completo: `PROPOSED`.
- **D34** — Navegación y footer universo-aware: `PROPOSED`.

Ninguna marcada APPROVED automáticamente. Ver `docs/decision-register.md`.

---

**Estado final: `PHASE_2_1_COMPLETE — REQUIRES_PROEFEX_APPROVAL`.**
No se inicia Fase 3 (CMS, contenido, CRM, GA4, LMS, producción requieren autorización posterior).
