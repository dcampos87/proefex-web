# Recalibración Fase 2 — Experiencia multipágina + megamenú + 5 líneas

**Estado:** `PHASE_2_RECALIBRATED — REQUIRES_PROEFEX_APPROVAL`
**Autorización:** Recalibración de Fase 2 (instrucción humana posterior al cierre `e337cca`). NO autoriza Fase 3, CMS, contenido definitivo, Turu CRM, GA4 productivo, LMS ni despliegue.

---

## A. Nueva arquitectura (sitemap implementado)

Principio: **PROEFEX no es una sola landing; es un ecosistema digital navegable.** La Home es *ecosystem entry point*; cada línea tiene landing propia, navegación contextual y páginas hijas.

```text
PROEFEX (Nivel 1)
├── / (Home reducida — entry point)
├── /nosotros (ancla; página en Fase 3)      /sectores  /casos  /insights  /contacto
│
├── CREATE  → /tech (PROEFEX TECH)
│   ├── /tech/desarrollo-de-software ★ plantilla de servicio
│   ├── /tech/automatizacion  /tech/ia-empresarial  /tech/transformacion-digital
│   ├── /tech/implementacion-de-software
│   └── /tech/ingenieria (+ /drones, /iot)
├── GROW     → /grow-up (Grow Up)
│   └── /grow-up/marketing-bpo  /growth-marketing  /consultoria
├── LEARN    → /learns (PROEFEX LEARNS)
│   └── /learns/cursos  /learns/certificacion
├── EXPERIENCE → /equip (PROEFEX EQUIP)
│   └── /equip/tecnologia  /pantallas  /interactivas  /totems  /alquiler
└── SOLVE    → /solutions (PROEFEX SOLUTIONS)
    ├── /solutions/turu-crm ★ plantilla de producto
    └── /solutions/proefact  /my-bpass  /atendigo  /eleventto  /klyra
```

- 38 rutas compiladas. Las no priorizadas (D13) son **stubs de arquitectura** (`RouteStub`: breadcrumbs + `CONTENT_REQUIRED`, noindex) generadas por `scripts/gen-stubs.cjs`.
- **D24 (conflicto):** Doc 04 define `/tech/[categoria]/[servicio]`, `/saas/[producto]`, `/productos/[slug]`; la recalibración propone rutas planas por pilar. Implementadas las propuestas **para preview**; mapa definitivo `REQUIRES_PROEFEX_INPUT` antes de Fase 3.

## B. Navegación

- **Megamenú desktop** (`Header.tsx` + `nav-data.ts`): botón "Ecosistema" → panel con tarjeta por pilar (acento por universo, jerarquía de 3 niveles, badge `F3` = ruta futura). `aria-expanded/controls`, Escape con retorno de foco, cierre por click-fuera y al navegar, apertura 180ms. Panel sobre tema core (chrome de marca).
- **Drawer móvil**: overlay con acordeones nativos `<details>` por pilar + links Nivel 1 + CTA. Focus trap, Escape, bloqueo de scroll.
- **Fuente única**: `src/components/layout/nav-data.ts` alimenta megamenú, drawer, subnav y footer (`built` marca páginas reales vs stubs).
- **Modelo de 3 niveles (§23)**: N1 PROEFEX · N2 pilares CREATE/GROW/LEARN/EXPERIENCE/SOLVE · N3 servicios/productos/contenidos.

## C. Cinco líneas (visual + UX)

| Pilar | Universo | Dirección | Paleta | Firma |
|---|---|---|---|---|
| CREATE | TECH | "Sistema Encendido" (D7-A) | azul profundo #001233 + naranja #F7931E | grid tecnológico, panel "SISTEMA/ESTADO", mono, esquinas rectas |
| GROW | Grow Up | "Grafismo Kinético" (D8-B) **recalibrado** | grafito #22272E + cian #00FFE6 (reemplaza coral/amarillo) | marquee editorial, formas recortadas, display XL |
| LEARN | LEARNS | Conocimiento y progreso | menta claro + verde #0A7A52 | sobrio-profesional, sin estética escolar |
| EXPERIENCE | EQUIP | Tecnología tangible | cálido + rojo #D64022 | físico, espacio, dispositivo |
| SOLVE | SOLVE | Productos listos | azul frío #005A9E | software, integración, productividad |

Contrastes verificados WCAG 2.2 AA (cian/grafito 11.8:1; blanco/grafito 15:1; verde 4.9:1; rojo 4.6:1; azul 7.1:1). Core permanece como capa transversal que conecta los cinco pilares (no es una sexta línea).

## D. Home nueva

8 secciones compactas (Hero core → Ecosistema → Cinco pilares → Capacidades → Cómo se conectan → Featured solutions → Insights → CTA final) que **derivan tráfico** a las landings; el contacto es página propia `/contacto`. Especificación previa (`homepage-spec.md`) queda sustituida por esta composición; D6 (recorrido continuo) pasa a aplicar a la narrativa interna de cada landing.

## E. Páginas diseñadas/prototipadas

1. Home `/` · 2. `/tech` · 3. `/grow-up` · 4. `/learns` · 5. `/equip` · 6. `/solutions` · 7. `/contacto` · 8. **Plantilla servicio** `/tech/desarrollo-de-software` (breadcrumbs + subnav + hero + propuesta + Process + CTA) · 9. **Plantilla producto** `/solutions/turu-crm` · 10. `/showcase` (catálogo de universos, megamenú, subnav, breadcrumbs, stubs; noindex) · 25 stubs de arquitectura.

## F. Grow Up — nueva paleta

Fundamento `#22272E` (fondo/superficie) + `#00FFE6` (acento fuerte). Documentado en tokens `[data-universe="growup"]`; `.btn-secondary:hover` y `.content-required` adaptados a superficies oscuras. La paleta coral/amarillo anterior queda **retirada**.

## G. Componentes (nuevos/modificados)

- Nuevos: `MegaMenu` (en `Header.tsx`), `SubNav`, `Breadcrumbs` (JSON-LD `BreadcrumbList`), `RouteStub`, `nav-data.ts`.
- Modificados: `Header` (megamenú + drawer + universo por ruta), `Footer` (estructura por pilares), Home, 5 landings, `/contacto`, `/showcase`, `tokens.ts` (`Universe` ×6, `pillarAccents`, `universeMotion`).
- Reutilizados sin cambios: primitivas, bloques, Reveal, heroes, `ContactSection`.

## H. Motion

Sin cambios de sistema (D19 vigente). Se añade `universeMotion` para los 6 universos y motion propio del megamenú (apertura 180ms, hover discreto, reduced-motion anula). Sin librerías nuevas.

## I. Accessibility (validación QA)

- Megamenú y drawer: `aria-expanded/controls`, Escape, focus trap y retorno de foco — verificado automatizado (31 y 34 links).
- Header **universo-aware** (fix de QA): hereda tokens `[data-universe]` por ruta (`usePathname` → `data-universe` en `<header>`) para no perder contraste sobre héroes oscuros; verificado `rgb(255,255,255)` en tech/growup y navy en universos claros.
- Reflow 320px sin overflow horizontal en las 10 rutas auditadas. Subnav/breadcrumbs con `aria-current`/`aria-label`.

## J. Performance

First Load JS compartido **103 kB**; ruta máxima **107 kB** ≤ 180 kB (+4 kB por megamenú). 0 dependencias nuevas. Build estático-prerender de 38 rutas.

## K. Decisiones nuevas (registro completo en `docs/decision-register.md`)

| ID | Decisión | Estado |
|---|---|---|
| D24 | Arquitectura multipágina por 5 pilares con rutas planas (conflicto parcial con Doc 04) | `PROPOSED` — mapa definitivo `REQUIRES_PROEFEX_INPUT` |
| D25 | Grow Up: paleta #22272E/#00FFE6 reemplaza coral/amarillo | `APPROVED` (mandato de recalibración) · `IMPLEMENTED` |
| D26 | Modelo 3 niveles + megamenú + 5 líneas como estrategia de marca | `APPROVED` (mandato) · `IMPLEMENTED` |
| D27 | Header universo-aware (tokens por ruta) | `PROPOSED` (implementado; fix de QA) |

## L. Pendientes / matriz de contenido (§26)

| Página | Contenido requerido | Estado |
|---|---|---|
| Home | Copy + media | `CONTENT_REQUIRED` |
| Tech (y hijas) | Copy + media | `CONTENT_REQUIRED` |
| Grow Up (y hijas) | Copy + media | `CONTENT_REQUIRED` |
| Learns | Copy + catálogo cursos | `CONTENT_REQUIRED` |
| Equip | Catálogo | `CONTENT_REQUIRED` |
| Solutions | Fichas de producto (D15) | `CONTENT_REQUIRED` |
| Sectores / Casos / Insights | Descripciones / casos reales / artículos | `CONTENT_REQUIRED` |
| Contacto | Textos legales (D17) | `CONTENT_REQUIRED` |

`REQUIRES_PROEFEX_INPUT`: mapa de URLs (D24), D13 inventario, D15 matriz SaaS. Nota menor: `favicon.ico` no existe (404 preexistente, añadir en Fase 3).
