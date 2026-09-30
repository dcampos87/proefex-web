# Fase 2 — Especificación Responsive

Mobile-first (Doc 15). Breakpoints: `sm` <640 · `md` 640–1023 · `lg` 1024–1439 · `xl` 1440–1919 · `2xl` ≥1920.

## 1. Comportamiento por elemento

| Elemento | sm | md | lg+ |
|---|---|---|---|
| Navegación | overlay fullscreen + CTA al pie | ídem | header inline + CTA; toggle oculto por CSS (`.icon-btn-lg-hide`) |
| Header | 64px (56 al scroll) | ídem | ídem |
| Hero TECH | apilado, panel tras texto; sin partículas | ídem | 2 columnas (texto + panel de sistema) |
| Hero Grow Up | display-2xl escala cartel; formas reducidas; sin cursor-reactive | offsets moderados | composición completa con formas |
| ServiceGrid | 1 col | 2 cols | 3 cols (2 si `columns={2}`) |
| SaaSShowcase | 1 col | 2 cols | 3 cols |
| SectorGrid | 2 cols | 2 cols | 4 cols |
| Stats/Blog | 1–2 cols | 2 cols | 3–4 cols |
| ImageTextSplit | apilado, media primero | ídem | split 50/50 |
| Formulario | 1 col, botón full-width | 2 cols (sm:) | 2 cols + intro 40/60 |
| Secciones | padding 64–96px | — | hasta 160px |

## 2. Tipografía

Escala fluida con `clamp()` — sin saltos entre breakpoints. El titular Grow Up mantiene expresividad en móvil (regla Doc 15 §2.2). `text-wrap: balance` en headings.

## 3. Animaciones por breakpoint (Doc 15 §2.4)

- sm/md: solo entradas esenciales y microinteracciones; sin parallax/partículas/3D (no existen en el sistema).
- lg+: experiencia completa del universo.
- Reduced-motion se aplica igual en todos los breakpoints.

## 4. QA realizado (automatizado/headless)

- 320px: **0px de overflow horizontal** (reflow WCAG 1.4.4) — verificado tras corregir el ancho del selector de país.
- 960px (tablet/laptop pequeño): navegación móvil correcta, grids a 2 cols, sin overflow.
- 1440px: header inline sin toggle, heroes a composición completa, formulario 2 columnas.

## 5. Pendiente de QA manual (checklist Doc 15 §5)

Zoom 200% en navegador real, landscape móvil, zonas de pulgar, Lighthouse mobile con throttling 4G (requiere despliegue en staging, bloqueado por `PROEFEX_INPUT_REQUIRED` de Cloudflare).
