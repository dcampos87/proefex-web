# Documento 08 — Arquitectura SEO / GEO

**Fase:** 0 — Definición
**Estado:** Propuesta para revisión

---

## 1. Objetivos

1. **SEO técnico y on-page** impecable desde el día uno (SSR/ISR garantiza HTML indexable).
2. **GEO (Generative Engine Optimization):** el contenido debe ser legible y citable por motores generativos (IA) — entidades claras, respuestas directas, estructura semántica.

## 2. Fundamentos técnicos

| Elemento | Implementación |
|---|---|
| Render | SSR/ISR en Next.js; contenido principal en HTML sin dependencia de JS |
| Metadatos | Metadata API por página/colección, con plantillas por tipo (`%title% | PROEFEX`) |
| Canonical | Absoluto, auto + override en CMS |
| Sitemap | XML segmentado (pages, servicios, productos, saas, sectores, casos, posts) autogenerado al publicar |
| robots.txt | Permite www, bloquea admin/api/staging, referencia sitemap |
| Redirects | Tabla en CMS → reglas Cloudflare; nunca cadenas |
| 404/410 | Página personalizada por universo |
| Hreflang | Solo cuando se apruebe i18n |

## 3. Datos estructurados (JSON-LD)

| Página | Schema |
|---|---|
| Organization (global) | `Organization` con logo, sameAs (redes reales), contactPoint |
| Sitio | `WebSite` con potencial `SearchAction` (cuando exista búsqueda) |
| Home | `Organization` + `ProfessionalService` |
| Servicios | `Service` con `provider`, `areaServed` (Perú), `hasOfferCatalog` |
| Sectores | Contenido con `about` hacia entidades Service |
| Productos | `Product` con specs |
| SaaS | `SoftwareApplication` con `applicationCategory` |
| Casos | `Article`/`CaseStudy` (schema.org + Article como base indexable) |
| Posts | `Article` con `author`, `datePublished`, `publisher` |
| FAQ | `FAQPage` en bloques FAQ y páginas de servicio |
| Breadcrumbs | `BreadcrumbList` global |

Generación: helper `jsonLd()` por tipo de página; validación con Rich Results Test en CI ligero.

## 4. Estrategia GEO

Principios aplicados al modelo de contenidos (Doc 05):

1. **Entidades explícitas:** cada servicio/sector/producto es una entidad con nombre, definición corta (1–2 frases directas), y relaciones declaradas ("PROEFEX TECH implementa ERP Odoo en el sector minería").
2. **Respuestas directas:** cada página de servicio/sector abre con un párrafo-respuesta (qué, para quién, qué problema resuelve) antes del contenido narrativo.
3. **FAQ por entidad:** preguntas frecuentes reales por servicio y sector con schema `FAQPage` — principal superficie de citación por IA.
4. **Datos estructurados consistentes** (sección 3) como fuente de verdad de entidades.
5. **Contenido profundo sobre delgado:** páginas de sector/servicio con contenido sustancial; categorías y tags sin contenido no se indexan.
6. **Frescura:** blog con fechas visibles y `dateModified` reales.
7. **Autoridad de marca:** descripciones coherentes de "quién es PROEFEX" idénticas en todas las superficies (about, schema, meta).

## 5. SEO on-page

- Un H1 por página; jerarquía semántica H2/H3.
- Enlazado interno: cada servicio enlaza a sectores, casos y productos relacionados (las relaciones del CMS son también el grafo de enlazado).
- Textos ancla descriptivos; nunca "click aquí".
- Imágenes: alt descriptivo (obligatorio en CMS), nombres de archivo limpios.
- URLs limpias (Doc 04).
- Open Graph + Twitter Cards con plantillas y og-image generada por página (template dinámico `opengraph-image`).

## 6. Core Web Vitals como señal SEO

Presupuestos definidos en Documento 16 (LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms). La verificación de CWV en staging es parte del checklist de publicación de cualquier página nueva.

## 7. Medición

- Search Console (propiedad www) + monitoreo de indexación por tipo de página.
- Analítica respetando consentimiento (cookie banner configurable en CMS).
- KPIs iniciales: páginas indexadas, impresiones/clics por colección, CWV reales (CrUX), citas/ menciones en motores generativos (revisión manual periódica).
