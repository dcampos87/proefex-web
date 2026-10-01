# Recalibración visual de Fase 2 — Experiencia premium editorial

**Estado:** `PHASE_2_RECALIBRATED — REQUIRES_PROEFEX_APPROVAL`
**Benchmark de referencia:** `weevolveit.com` (análisis del 2026-09-30; home, `/services`, `/method`, página de servicio, casos). **No es una copia**: calidad + lenguaje + UX + arquitectura.

---

## §29 — Documentación obligatoria de referencia

### Qué tomamos como referencia (lenguaje, no contenido)

1. **Nivel de sofisticación**: dark premium y composición editorial; espacio negativo generoso.
2. **Tipografía protagonista**: titulares grandes fragmentados, labels/metadata en mono, jerarquía por escala tipográfica.
3. **Megamenú amplio y jerárquico**: servicios organizados por categorías, cada ítem con **descripción corta de una línea**, ítems "destacados", y links "ver todo".
4. **Home que orienta y deriva**: la referencia no vuelca el catálogo en la Home; cada bloque deriva a páginas internas que narran.
5. **Método como narrativa propia**: una sección de proceso numerada como pieza de confianza.
6. **Casos como evidencia** y navegación contextual entre páginas (no siempre se vuelve a Home).
7. **Footer amplio** tipo mega-footer con toda la arquitectura.

### Qué hacemos diferente en PROEFEX (identidad propia)

1. **Cinco pilares** (CREATE / GROW / LEARN / EXPERIENCE / SOLVE) con universo visual propio cada uno; la referencia es una sola marca.
2. **Cero copia** de textos, imágenes, código, layouts exactos o recursos; composición y lenguaje recalibrados al sistema PROEFEX (tokens propios, universos propios).
3. **Sin WebGL/Three.js/GSAP**: la referencia usa esas tecnologías; PROEFEX logra un lenguaje equivalente con motion nativo (CSS + IntersectionObserver, D19) manteniendo el presupuesto de JS.
4. **Metodología propia**: Entender → Diseñar → Integrar → Evolucionar (no el método de cinco fases de la referencia).
5. **Contenido honesto**: `CONTENT_REQUIRED` en vez de cifras, clientes o resultados (§33).
6. **Paletas propias por universo** (incluida Grow Up #22272E/#00FFE6, D25), no la paleta de la referencia.

---

## Entregables (§32)

| # | Entregable | Implementación |
|---|---|---|
| 1 | UX Architecture | 50 rutas (5 landings + hijas + plantillas + 37 stubs); fuente única `nav-data.ts`; modelo 3 niveles (D26 vigente) |
| 2 | Mega Menu | Panel premium: columna rail (intro + CTA + links transversales) + 5 tarjetas de pilar con **descripciones por ítem** (`NavChild.desc`) + **bloque DESTACADO** por pilar (`NavChild.featured`) + fondo translúcido con blur (backdrop-filter) |
| 3 | Home | 7 secciones cortas: Hero → Ecosistema (filas editoriales 01–05) → Capacidad destacada → Experiencia destacada (`CONTENT_REQUIRED`) → Cómo trabajamos (4 pasos propios) → Insights → CTA. Lógica: introducir → orientar → demostrar → derivar (§7) |
| 4 | Five Pillar Pages | Las 5 landings usan ahora **filas editoriales numeradas** (`EditorialRows`) en lugar de grids de cards; cada una conserva su hero y universo |
| 5 | Visual System | Capa editorial en `globals.css`: `.page-reveal` (entrada de página), `.kicker-line`, `.display-xl`, `.ed-rows/.ed-row*`, `.stat-strip`, `.mega-featured`, `.footer-wordmark` |
| 6 | Page Templates | Servicio (`/tech/desarrollo-de-software`) y producto (`/solutions/turu-crm`) ya existentes; **nuevos índices editoriales**: `/casos`, `/insights` (+4 categorías stub), `/sectores` (+8 sectores stub) |
| 7 | Motion System | **Page reveal** nativo (opacity+translate 420ms, solo con JS, anulado en reduced-motion); microinteracciones en filas (slide de flecha, offset de hover); megamenú 180ms (existente) |
| 8 | Showcase | Sección "Referencia weevolveit — qué tomamos / qué hacemos diferente", demo de filas editoriales, enlaces a índices; noindex |
| 9 | Documentation | Este documento + decision-register (D28–D30) + `docs/README.md` + `phase-2-execution.md` |

## Validación (§30/§34/§35)

- **Build**: typecheck OK; 50/50 páginas estáticas; **First Load JS compartido 103 kB** (≤180 kB, sin cambios — sin librerías nuevas).
- **Responsive**: overflow horizontal = 0 a 320px en 14 rutas auditadas (fix aplicado: `min-w-0` en columnas del showcase).
- **A11y**: megamenú `aria-expanded/controls` + Escape + foco devuelto (verificado automatizadamente); drawer con focus trap; filas editoriales son links con `:focus-visible`; page-reveal y microinteracciones anuladas con `prefers-reduced-motion`.
- **Contraste**: labels de pilar en mega-footer aclarados con `color-mix(…, white)` para AA sobre fondo azul oscuro.
- **Consola**: únicamente 404 de `favicon.ico` (preexistente, pendiente para Fase 3).

## QA visual (§30)

Megamenú con descripciones y destacados verificado en screenshot (1440px); Home editorial (filas 01–05 tipográficas, método numerado); footer wordmark gigante correcto; TECH mantiene "Sistema Encendido"; Grow Up mantiene grafito+cian; drawer móvil jerárquico correcto (375px).

## NO implementado (§31, conforme a autorización)

CMS, contenido definitivo, Turu CRM, GA4, LMS, blog real, casos reales, staging, producción, automatizaciones. Metodología definitiva de PROEFEX queda sujeta a aprobación (la actual es propuesta de UX).
