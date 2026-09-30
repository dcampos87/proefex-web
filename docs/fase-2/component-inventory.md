# Fase 2 — Inventario de Componentes

Ruta: `src/components/`. Primitivas → bloques → formularios → layout → motion. Todos consumen tokens semánticos; estados hover/focus-visible/active/disabled verificados.

## 1. Primitivas (`ui/`)

| Componente | Variantes | Notas a11y |
|---|---|---|
| `Button` | primary / secondary / ghost (+`on-dark`), md/sm | `<a>` o `<button>`; alto ≥48 (40 en sm); focus ring 2px global |
| `Badge` | default | chip de borde |
| `SectionHeader` | kicker mono + display-lg + intro; align left/center | `as` h1/h2; un H1 por página |

## 2. Heroes (`heroes/`) — F2.3

| Componente | Universo | Motion | Notas |
|---|---|---|---|
| `HeroCore` | core | reveal-lines + delays ≤420ms | gradiente sunken→bg; CTAs |
| `HeroTech` | tech | reveal-lines + panel `.ignite` secuencial | grid de fondo 5%, `tech-panel` con marcas de encuadre; sin canvas/3D (D9) |
| `HeroCreative` | growup | reveal-lines; formas flat estáticas | Poppins display-2xl rotada, `highlightWord` coral subrayado; rotaciones ≤2deg |

## 3. Bloques (`blocks/`)

| Componente | Esquema blocks-schema | Estados vacíos |
|---|---|---|
| `ServiceGrid` | `ServiceGrid` | — (contenido explícito) |
| `SaaSShowcase` | `SaaSShowcase` | descripción `CONTENT_REQUIRED`; Klyra "Próximamente" |
| `SectorGrid` | `SectorGrid` | — |
| `StatsSection` | `StatsSection` | 4 slots `CONTENT_REQUIRED` |
| `Process` | `Process` | — |
| `Timeline` | `Timeline` | — |
| `FAQBlock` | `FAQ` | `<details>/<summary>` nativos (sin JS) |
| `BlogGrid` | `BlogGrid` | 3 cards `CONTENT_REQUIRED` |
| `LogoWall` | `LogoWall` | estado vacío honesto |
| `ImageTextSplit` | `ImageTextSplit` | media placeholder |
| `VideoSection` | `VideoSection` | facade + poster `CONTENT_REQUIRED` (D5) |
| `Testimonial` | `Testimonial` | bloqueado sin consentimiento |
| `CaseStudyCard` | `CaseStudy` | estado vacío honesto |
| `CTASection` | `CTA` | panel azul de marca |
| `Marquee` | (preset marquee) | pausa hover/focus; duplicado `aria-hidden` |

## 4. Formularios (`forms/`)

- `ContactSection` — ver `ux-system.md` §3. Campos D17 completos; errores accesibles; foco al primer error; loading/éxito simulados.

## 5. Layout (`layout/`)

- `SiteHeader` (client): scroll-state, nav lg+, toggle móvil (oculto lg+ vía CSS, no inline), overlay con focus trap.
- `SiteFooter`: azul de marca, 4 columnas, mono kickers, legal (rutas futuras), contacto `CONTENT_REQUIRED`.

## 6. Motion (`motion/`)

- `Reveal` (client): variantes `fade-rise` / `reveal-lines` / `ignite`; props `delay`, `as`, `style`; stagger interno de `.ignite`; reduced-motion → estático.

## 7. Bloques en `@proefex/blocks-schema` (19/19)

HeroCore, HeroTech, HeroCreative, CTA, ServiceGrid, SectorGrid, SaaSShowcase, StatsSection, Process, Timeline, FAQ, BlogGrid, LogoWall, ImageTextSplit, VideoSection, Testimonial, CaseStudy, ContactSection + `blockProps` común + `publishWebhookSchema` (A5). `pageBlockSchema` = unión discriminada del registro completo. Compatible hacia atrás con Fase 1.

## 8. Pendiente de componentes (Fase 3+)

Megamenú TECH (Doc 15 §2.1), Tabs, Tooltip, Modal/Sheet genérico, Breadcrumbs, Pagination, Skeleton reutilizables — se construyen con las páginas que los requieran.
