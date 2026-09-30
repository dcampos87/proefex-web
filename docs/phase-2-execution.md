# Fase 2 — Design System + UX/UI + Dirección Creativa + Motion — Estado de Ejecución

**Autorización:** Fase 2 `AUTHORIZED_TO_START` (aprobación humana 2026-09-30) + **Recalibración multipágina autorizada** (instrucción humana posterior)
**Estado al cierre de este bloque:** `PHASE_2_RECALIBRATED — REQUIRES_PROEFEX_APPROVAL`
**Fases 3–7:** `NOT_AUTHORIZED`

---

## 1. Entregables — Design System

| Entregable | Estado | Detalle |
|---|---|---|
| Tokens completos (color, tipo fluida, espaciado, radios, sombras, surfaces) | ✅ | `src/app/globals.css` + `src/design-system/tokens.ts` |
| Temas de universo con valores congelados (D7-A / D8-B) | ✅ | `[data-universe]` pinta fondo/texto; TECH esquinas rectas, sombras off |
| Tipografía self-hosted (D11: Source Code Pro aprobada) | ✅ | `next/font/local`: Lexend variable, Poppins 600/700, SCP 400 (`src/fonts/`) |
| Escala tipográfica fluida (clamp) | ✅ | display-2xl → label-mono (Doc 14 §3) |

## 2. Entregables — Componentes

| Entregable | Estado | Detalle |
|---|---|---|
| Primitivas (Button, Badge, SectionHeader) | ✅ | variantes + estados; focus ring global |
| Heroes por universo (HeroCore / HeroTech / HeroCreative) | ✅ | D7-A: panel de sistema con ignite secuencial; D8-B: kinético; D9: sin 3D/canvas |
| Bloques (15 nuevos) | ✅ | ServiceGrid, SaaSShowcase, SectorGrid, StatsSection, Process, Timeline, FAQBlock, BlogGrid, LogoWall, ImageTextSplit, VideoSection, Testimonial, CaseStudyCard, CTASection, Marquee |
| Navegación (Header + menú móvil + Footer) | ✅ | focus trap, Escape, CTA persistente, scroll-state |
| Formulario de contacto (D17) | ✅ | UX completa; sin integración Turu CRM (fase posterior) |
| Motion system (D19) | ✅ | Reveal nativo + firma por universo; reduced-motion; 0 kB de librerías |
| `@proefex/blocks-schema` 19/19 | ✅ | catálogo completo + `pageBlockSchema` discriminado; compatible con Fase 1 |

## 3. Entregables — Experiencia

| Entregable | Estado | Detalle |
|---|---|---|
| Homepage narrativa (D6) | ✅ | 9 actos: Hero → Ecosistema → TECH → Grow Up → Learning → SaaS → Sectores/Casos → Insights → Contacto |
| Showcase de diseño (preview) | ✅ | `/showcase` (noindex): primitivas, universos, bloques, estados vacíos |
| Responsive (mobile-first) | ✅ | verificado 320/960/1440; reflow sin overflow |
| Accesibilidad (WCAG 2.2 AA) | ✅ | ver `fase-2/phase-2-validation.md` §2 |
| Performance | ✅ | First Load JS 103 kB ≤ 180 kB; sin librería de animación; fuentes self-hosted |

## 4. Lo que NO se hizo (conforme a la autorización)

Sin CMS, sin autenticación/RBAC funcional, sin API productiva, sin conexión Turu CRM, sin GA4, sin contenido Supabase, sin LMS, sin blog funcional, sin páginas de área definitivas (`/tech`, `/grow-up`), sin DNS/despliegue, sin 3D, sin librerías nuevas de animación.

## 5. Bloqueos externos (`PROEFEX_INPUT_REQUIRED`) — vigentes

1. Cloudflare (despliegue staging → Lighthouse real).
2. Supabase staging/prod.
3. Repositorios remotos.
4. **Inventario de contenido (D13) — crítico para Fase 3.**
5. Matriz de estado SaaS (D15), textos legales (D17), consentimiento analítica (D18).
6. Logo oficial (asset) y material audiovisual (D5, Doc 13).

## 6. Cambios arquitectónicos (regla 25/30)

Ninguno fuera de alcance. Desviaciones documentadas como decisiones D19–D23 en `decision-register.md` (todas `PROPOSED`, implementadas y revertibles).

## 7. Preview

- Home: `http://localhost:3000/` (`npm run dev`) o `next start`.
- Showcase: `/showcase`.

---

# Recalibración Fase 2 — Multipágina + megamenú + 5 líneas

> Documento autoritativo de la recalibración: **[`fase-2/recalibracion-multipage.md`](fase-2/recalibracion-multipage.md)** (arquitectura, navegación, universos, QA, matriz de contenido). Resumen de entregables:

| Entregable | Estado | Detalle |
|---|---|---|
| Arquitectura multipágina (D24) | ✅ | 38 rutas: 5 landings de pilar + plantillas servicio/producto + `/contacto` + 25 stubs `CONTENT_REQUIRED` |
| Megamenú desktop + drawer móvil (D26) | ✅ | Escape, focus trap, aria-expanded/controls verificados automatizadamente |
| SubNav + Breadcrumbs (JSON-LD) | ✅ | `aria-current="page"`; fuente única `nav-data.ts` |
| Home reducida (entry point) | ✅ | 8 secciones compactas que derivan tráfico a pilares; contacto a `/contacto` |
| 6 universos visuales | ✅ | Core + TECH + Grow Up (**nueva paleta #22272E/#00FFE6 — D25**) + LEARNS + EQUIP + SOLVE; AA verificado |
| Header universo-aware (D27) | ✅ | Fix de QA: tokens por ruta, contraste sobre héroes oscuros |
| QA build/performance | ✅ | typecheck + build OK; First Load JS 107 kB ≤ 180 kB; overflow 320px = 0 en 10 rutas |
| Decisiones y matriz de contenido | ✅ | D23 `DEPRECATED` → D24–D27 en `decision-register.md`; matriz en `recalibracion-multipage.md` §L |

**NO hecho (conforme a la autorización):** sin CMS, sin contenido definitivo, sin Turu CRM, sin GA4 productivo, sin LMS, sin blog real, sin DNS/despliegue. Pendiente de decisión humana: mapa de URLs (conflicto D24 vs Doc 04).

**Fase 3 requeriría:** resolución D24, contenido (D13/D15/D17), CMS + API, integraciones.
