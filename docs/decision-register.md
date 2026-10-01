# Decision Register — PROEFEX

Registro vivo de todas las decisiones. Estados: `APPROVED` (aprobada por humano) · `APPROVED_PENDING_HUMAN_CONFIRMATION` · `REQUIRES_PROEFEX_INPUT` · `PROPOSED` · `DEFERRED` · `REJECTED`.

> **2026-09-30 — Aprobación humana formal de Fase 0.** Aprobadas: D1, D2, D3, D4, D6, D9, D10, D14 y A1–A8. Permanecen abiertas: D5, D7, D8, D11, D12, D13, D15, D16, D17, D18. Fase 1 `AUTHORIZED_TO_START`. Fases 2–7 `NOT_AUTHORIZED`.
>
> **2026-09-30 — Autorización de Fase 2.** La autorización formal de Fase 2 cerró decisiones: **D7 = dirección A "Sistema Encendido"**, **D8 = dirección B "Grafismo Kinético"**, **D11 = Source Code Pro**, **D12 = titulares aprobados como dirección conceptual** (no copy comercial final), **D16 = Certmind Partner Oficial**, **D17 = destino de leads Turu CRM con campos definidos** (integración en fase posterior), **D18 = GA4** (Fase 2 solo estrategia conceptual). Nuevas decisiones de Fase 2: D19–D23 (`PROPOSED`, ver abajo). Estado: `PHASE_2_COMPLETE — REQUIRES_PROEFEX_APPROVAL`.
>
> **2026-09-30 — Recalibración de Fase 2 (multipágina).** Instrucción humana que reformula la experiencia a **sitio multipágina** con megamenú y **5 líneas de negocio** (CREATE/TECH, GROW/Grow Up, LEARN/Learns, EXPERIENCE/Equip, SOLVE/Solutions). Cierra como `APPROVED`+`IMPLEMENTED`: **D25** (nueva paleta Grow Up #22272E/#00FFE6, retira coral/amarillo) y **D26** (modelo de 3 niveles + megamenú + 5 pilares como estrategia de marca). Nuevas: **D24** (arquitectura de rutas por pilares — conflicto parcial con Doc 04, `REQUIRES_PROEFEX_INPUT` para el mapa definitivo) y **D27** (header universo-aware). Estado: `PHASE_2_RECALIBRATED — REQUIRES_PROEFEX_APPROVAL`. Detalle: `docs/fase-2/recalibracion-multipage.md`.

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
| D7 | Dirección visual TECH: 2 moodboards diferenciados (13 elementos c/u) | `APPROVED` = dirección **A "Sistema Encendido"** (autorización Fase 2, 2026-09-30) · `IMPLEMENTED` en Fase 2 | Design Lead → PROEFEX | Alto | Ejecutada en HeroTech/TECH sections (`visual-system.md` §2) |
| D8 | Dirección visual Grow Up: 2 moodboards diferenciados | `APPROVED` = dirección **B "Grafismo Kinético"** (autorización Fase 2, 2026-09-30) · `IMPLEMENTED` en Fase 2 | Design Lead → PROEFEX | Alto | Ejecutada en HeroCreative/Grow Up sections |
| D11 | Tipografía mono: muestras (JetBrains Mono, IBM Plex Mono, Source Code Pro) | `APPROVED` = **Source Code Pro**, uso restringido (autorización Fase 2, 2026-09-30) · `IMPLEMENTED` | Design Lead → PROEFEX | Bajo | Reglas de uso en `visual-system.md` §1.2 |
| D12 | Copy: 10 titulares conceptuales | `APPROVED` como **dirección conceptual** (no copy comercial final); en uso en la home | Content + PROEFEX | Medio | Copy definitivo con inventario completo (D13) |

## Decisiones de contenido y operación

| ID | Decisión | Estado | Responsable | Impacto | Próxima acción |
|---|---|---|---|---|---|
| D13 | Inventario de contenido (`content-inventory.md`) | `REQUIRES_PROEFEX_INPUT` — **CRÍTICA** | PROEFEX | Crítico para F2; no bloquea infra F1 | Completar inventario |
| D15 | Estado de productos SaaS (matriz Doc 19) | `REQUIRES_PROEFEX_INPUT` | PROEFEX | Medio — bloquea F3 | Completar matriz |
| D16 | Learning/Certmind: checklist de información | `APPROVED` (parcial): **Certmind es Partner Oficial** (autorización Fase 2) · `IMPLEMENTED` como banda UX en home | Agent Master | Bajo | Catálogo de cursos pendiente (`CONTENT_REQUIRED`); sin LMS |
| D17 | Contacto y leads: formulario propuesto + destino/legal | `APPROVED` (parcial): destino **Turu CRM** + campos definidos (autorización Fase 2) · UX `IMPLEMENTED` en Fase 2 | PROEFEX | Medio | Integración real Turu CRM en fase posterior; textos legales pendientes |
| D18 | Analítica y consentimiento: arquitectura propuesta, herramienta a evaluar | `APPROVED` = GA4 (autorización Fase 2, 2026-09-30); implementación y consentimiento en fase posterior | Agent Master + PROEFEX | Medio | Fase 2 documentó solo eventos conceptuales (`ux-system.md` §5) |

## Decisiones nuevas de Fase 2 (PROPOSED — requieren confirmación humana para cerrar)

| ID | Decisión | Estado | Responsable | Impacto | Notas |
|---|---|---|---|---|---|
| D19 | Motion sin librería en Fase 2: CSS + IntersectionObserver; Motion/GSAP diferidos hasta efecto que lo exija | `PROPOSED` (implementado así) | Agent Master | Positivo — 0 kB de animación, presupuesto protegido | Revertible a Motion (Doc 12 §4) si se aprueba |
| D20 | Fuentes self-hosted: Lexend Deca variable + Poppins 600/700 + Source Code Pro 400 (3 familias; desviación justificada del presupuesto "≤2 familias × 2 pesos" por D11) | `PROPOSED` (implementado así) | Agent Master | Bajo (~40–60 KB woff2 totales) | Conformar o recortar pesos |
| D21 | `next/font/local` en lugar de `next/font/google` (el loader de Google falla en el entorno de desarrollo; además es la recomendación del Doc 16 §2.4) | `PROPOSED` (implementado así) | Agent Master | Bajo | |
| D22 | Transición entre universos en home = corte limpio de fondo + marquee como costura (en vez del wash de gradiente del Doc 12 §3.4) | `PROPOSED` (implementado así) | Design Lead | Bajo — refinable en Fase 3 | El cambio de universo ES el mensaje (D6) |
| D23 | Navegación de Fase 2 con anclas a la home; rutas definitivas (Doc 03) al construir páginas en Fase 3 | `PROPOSED` → **`DEPRECATED`** (sustituida por D24 en la recalibración multipágina) | Agent Master | Bajo | |
| D24 | Arquitectura multipágina: rutas planas por pilar (`/tech/…`, `/grow-up/…`, `/learns/…`, `/equip/…`, `/solutions/…`), Home como entry point, 25 stubs de arquitectura. **Conflicto parcial con Doc 04** (`/tech/[categoria]/[servicio]`, `/saas/[producto]`, `/productos/[slug]`) | `PROPOSED` — mapa definitivo `REQUIRES_PROEFEX_INPUT` antes de Fase 3 | Agent Master → PROEFEX | Alto (SEO/URLs) | Implementado para preview; resolver conflicto Doc 04 |
| D25 | Grow Up: nueva paleta #22272E (grafito) + #00FFE6 (cian) reemplaza coral/amarillo | `APPROVED` (mandato de recalibración) · `IMPLEMENTED` | PROEFEX | Alto — identidad Grow Up | Contrastes AA verificados (`recalibracion-multipage.md` §C/§F) |
| D26 | Modelo de navegación de 3 niveles (PROEFEX → 5 pilares → servicios/productos) + megamenú desktop + drawer móvil; 5 líneas como estrategia de marca; Core = capa transversal | `APPROVED` (mandato de recalibración) · `IMPLEMENTED` | PROEFEX | Alto | Fuente única: `nav-data.ts` |
| D27 | Header universo-aware: hereda tokens `[data-universe]` por ruta (`usePathname`) para contraste sobre héroes oscuros | `PROPOSED` (implementado; fix de QA) | Agent Master | Bajo (a11y) | |
| D28 | Recalibración visual premium editorial (benchmark weevolveit.com, **sin copia**): tipografía protagonista, filas editoriales numeradas en lugar de grids de cards, page reveal nativo, mega-footer con wordmark, megamenú con descripciones por ítem y destacados | `PROPOSED` — lenguaje y nivel; identidad PROEFEX intacta (universos/paletas D25–D26 vigentes) | Agent Master → PROEFEX | Medio (dirección visual) | Ver `fase-2/recalibracion-visual.md` §29 |
| D29 | Metodología PROEFEX propuesta: Entender → Diseñar → Integrar → Evolucionar (propia, no la del benchmark) | `PROPOSED` — requiere aprobación de contenido | Agent Master → PROEFEX | Medio (contenido) | |
| D30 | Filas editoriales (`EditorialRows`) como patrón de jerarquía de servicios en landings e índices (casos/insights/sectores); cards solo para comparación puntual | `PROPOSED` (implementado en 5 landings + 3 índices) | Agent Master | Bajo | |
| D32 | Deep visual recalibration (Fase 2.1): composición editorial profunda — puertas de pilar con acento propio, índice fantasma y rail de metadata en héroes, filas de metodología con número protagonista, índice editorial de Insights en Home (sin BlogGrid genérico) | `PROPOSED` — implementado, pendiente aprobación visual | Agent Master → PROEFEX | Medio (dirección visual) | Ver `fase-2/deep-visual-recalibration.md` |
| D33 | Grow Up como universo visual completo: tokens semánticos `--grow-*` (D33), CTA de cierre en universo Grow Up (`--grow-surface`), todo el árbol `/grow-up/*` coherente (header → página → CTA → footer) | `PROPOSED` — implementado, pendiente aprobación visual | Agent Master → PROEFEX | Alto — identidad Grow Up | Paleta base D25 (APPROVED); esta decisión extiende su aplicación |
| D34 | Navegación y footer universo-aware: `universeForPath()` fuente única (header + footer + body), footer consume `--footer-bg`/`--footer-accent` por universo, stubs con universo heredado; fondo del documento sincronizado al universo (sin banda blanca antes del footer en universos oscuros) | `PROPOSED` — implementado, pendiente aprobación | Agent Master → PROEFEX | Medio (coherencia de marca) | Pendiente: CTA de cierre de landings learns/equip/solve aún en universo core |
| D35 | Megamenú del ecosistema simplificado: lista editorial de 5 filas-universo (número/código/nombre/tagline/flecha, acento por universo en hover) + zona transversal secundaria separada; eliminados sub-links, descripciones y bloques DESTACADO del panel (41→10 links); drawer móvil con una fila por universo | `PROPOSED` — implementado (Fase 2.2), pendiente aprobación visual | Agent Master → PROEFEX | Medio (navegación) | Ver `fase-2/visual-navigation-tech-v3.md` |
| D36 | Navegación global con estado activo: `aria-current` + acento en link de sección activo; punto del universo actual junto al trigger "Ecosistema" | `PROPOSED` — implementado (Fase 2.2) | Agent Master → PROEFEX | Bajo (orientación) | Alternativas (underline/chip) en `fase-2/phase-2.2-navigation-tech.md` §12 |
| D37 | PROEFEX TECH refuerza "Sistema Encendido": línea de estado conceptual en hero (SYSTEM/CREATE · STATUS/ACTIVE · MODE/DIGITAL, ignición secuencial) + editorial rows como índice de ingeniería (mayúsculas + numeración en acento, scoped al universo) | `PROPOSED` — implementado (Fase 2.2), paleta TECH intacta | Agent Master → PROEFEX | Medio (identidad TECH) | |

## Decisiones nuevas de Fase 2.3 (PROPOSED — requieren aprobación de PROEFEX)

| ID | Decisión | Estado | Responsable | Impacto | Notas |
|---|---|---|---|---|---|
| D38 | Home como recorrido editorial de 9 actos (hero audiovisual → 12+ → ecosistema → capacidades → industrias → proyectos → productos → insights → CTA); entry point, no catálogo exhaustivo | `PROPOSED` — implementado (Fase 2.3), pendiente aprobación visual | Agent Master → PROEFEX | Alto (experiencia Home) | Ver `fase-2/visual-experience-v4.md` §3 |
| D39 | Theme system Light/Dark/System: script inline pre-paint lee `localStorage('pfx-theme')` y fija `data-theme` (sin flash, SSR-safe); tokens dark por especificidad para universos core/learns/equip/solve; `ThemeToggle` en header + drawer | `PROPOSED` — implementado (Fase 2.3) | Agent Master → PROEFEX | Alto (preferencia de visualización) | Ver `fase-2/theme-system.md` |
| D40 | Theme y Universe son sistemas independientes: `data-theme` en `<html>` ≠ `data-universe` en wrappers; TECH y Grow Up NO reciben overrides dark (identidad fija por mandato) | `PROPOSED` — implementado y verificado por computed style | Agent Master → PROEFEX | Alto (identidad de marca) | `/grow-up` dark = #22272E/#00FFE6 intactos |
| D41 | Sistema de media `MediaFrame` + `MediaHeroVideo`: 6 variantes (hero/wide/editorial/tall/product/case), props CMS (alt, focal, overlay, caption, credit, priority, sizes); video slot autoplay/muted/loop gated por `prefers-reduced-motion` con poster fallback; sin dependencias | `PROPOSED` — implementado (Fase 2.3) | Agent Master → PROEFEX | Alto (lenguaje visual media-first) | Ver `fase-2/media-system.md` |
| D42 | Placeholders audiovisuales provisionales generados (`public/media/*.webp`, tag "VISUAL PROVISIONAL" en UI); reemplazo directo por media real vía CMS en Fase 3 | `PROPOSED` — implementado; no inventan contenido ni claims | Agent Master → PROEFEX | Medio | Riesgo documentado: evaluar con media real antes del cierre visual |
| D43 | Trayectoria "12+ años" como acto narrativo central: cifra tipográfica dominante + línea 2012→2026; hitos `CONTENT_REQUIRED` (nada inventado) | `PROPOSED` — implementado (Fase 2.3) | Agent Master → PROEFEX | Medio (narrativa) | Ver `fase-2/12-years-experience.md` |
| D44 | View Transitions progresivas: `@view-transition { navigation: auto }` nativo, fallback instantáneo, anulado con `prefers-reduced-motion`; sin sistema de transiciones complejo (queda para Fase 3 si se aprueba) | `PROPOSED` — implementado (Fase 2.3) | Agent Master | Bajo (sensación de producto) | |

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
