# Theme System — Fase 2.3 (D39, D40)

Sistema global de tema **Light / Dark / System**, separado por diseño del sistema de universos (mandato §12–§15).

## Principio: Theme ≠ Universe

| Sistema | Atributo | Define | Valores |
|---|---|---|---|
| Theme | `data-theme` en `<html>` | Preferencia de visualización | `light` \| `dark` |
| Universe | `data-universe` en wrappers de ruta | Identidad de marca | `core` \| `tech` \| `growup` \| `learns` \| `equip` \| `solve` |

Coexisten: `/grow-up` en tema dark sigue siendo Grow Up (#22272E/#00FFE6); `/tech` en dark sigue siendo Sistema Encendido (navy #001233).

## Resolución sin flash (SSR-safe)

Script **inline y sincrónico** en `<body>` de `src/app/layout.tsx`, antes del primer paint:

```
lee localStorage('pfx-theme') → light|dark|system
system → matchMedia('(prefers-color-scheme: dark)')
fija document.documentElement.dataset.theme
fallback try/catch → light
```

`<html>` se serializa con `data-theme="light"` por defecto; el script lo corrige pre-paint. Verificado: `data-theme` correcto inmediatamente tras `domcontentloaded` (pre-hidratación).

## Tokens (globals.css)

- `:root` → tema claro (base).
- `html[data-theme="dark"]` → tokens globales oscuros (surfaces, borders, text, muted).
- `html[data-theme="dark"] [data-universe="core|learns|equip|solve"]` → overrides dark por especificidad.

**TECH y Grow Up no reciben overrides dark**: identidad fija por mandato (§14). En dark, un usuario sobre Grow Up sigue viendo #22272E y acento #00FFE6 (verificado por computed style). Dark mode no es "fondo negro + texto blanco": surfaces escalonadas, borders, muted text, media overlays y focus rediseñados con contraste AA.

## `ThemeToggle` (`src/components/layout/ThemeToggle.tsx`)

- Ciclo `light → dark → system`; etiquetas Claro/Oscuro/Sistema.
- Persiste en `localStorage('pfx-theme')`.
- En `system`, escucha `matchMedia('(prefers-color-scheme: dark)')` en vivo.
- Ubicación: header desktop (junto al CTA) + drawer móvil (`compact`).
- A11y: `<button>` real, `aria-label` con estado actual y siguiente, foco visible heredado.

## QA verificado (Puppeteer, prod build)

| Check | Resultado |
|---|---|
| `data-theme` resuelto por defecto (system) | PASS |
| Ciclo system → light → dark | PASS |
| `data-theme=dark` + body `rgb(11,17,32)` | PASS |
| Persistencia tras reload (pre-paint, sin flash) | PASS |
| `/tech` mantiene navy `rgb(0,18,51)` en dark | PASS |
| `/grow-up` mantiene `rgb(34,39,46)` + acento `rgb(0,255,230)` en dark | PASS |
| Toggle presente en drawer móvil 375px | PASS |
