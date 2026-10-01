# Fase 3.1.2 — CMS Readiness Checklist

**Estado:** `PHASE_3_1_2_CONTENT_MOCK_READY — REQUIRES_PROEFEX_APPROVAL`
**Objetivo:** verificar, con el dataset MOCK (`data/mock/`, validador `npm run validate:mock`), que el modelo de F3.1 puede soportar todo el contenido esperado por PROEFEX antes de construir el CMS (F3.2).

Leyenda: ✔ probado con MOCK · ◐ preparado en el modelo, implementación en F3.2+ · ✗ bloqueado por contenido real.

## 1. Cobertura por tipo de contenido

| Capacidad | Soporte del modelo | Probado con MOCK | Pendiente de contenido real |
|---|---|---|---|
| Home | `Page` template CORE | ✔ `pg-home` (HeroCore→ServiceGrid→SectorGrid→SaaSShowcase→BlogGrid→CTA) | Copy final (D13) |
| Cinco universos | `Universe` (5 códigos exactos) | ✔ 5 registros, tokens por referencia (D47) | Tagline/description oficiales |
| Services | `Service` N:1 universo + N:M sectores/productos/casos | ✔ 11 servicios en 5 universos | Copy comercial definitivo |
| Solutions | `Product` productKind saas | ✔ 6 productos (Klyra reserved, sin dominio) | Matriz D15 (features, URLs, estado comercial) |
| Sectors | `Sector` (8 confirmados) | ✔ 8 registros con relaciones | Descripciones oficiales |
| Cases | `CaseStudy` + clientVisibility + results | ✔ 3 casos (public/anonymous, consent G7) | Casos y autorizaciones reales |
| Insights | `Insight` → Category + Author, URL `/insights/[categoria]/[slug]` (D3) | ✔ 6 insights, 6 categorías `proposed` | Lista definitiva (D55), autores reales |
| Authors | `Author` con bio+foto (G8) | ✔ 2 autores ficticios inequívocos | Personas reales |
| Media | `MediaAsset` IMAGE/VIDEO/DOCUMENT, poster, mobile, og | ✔ 13 assets (sin media real, D45) | Media real de PROEFEX |
| Pages | 7 templates + bloques de `@proefex/blocks-schema` | ✔ 7 páginas, composiciones distintas | — |
| SEO | `SEO` embebido, gates G1/G6 | ✔ completo/incompleto/noindex/canonical | SEO real al publicar |
| Legal | `LegalDocument` versionado, noindex | ✔ 4 documentos `LEGAL MOCK` | Textos definitivos (D17) |
| Contact | `SiteSettings.contact` + `LocalBusiness` gate | ✔ campos null (no inventados) | Datos reales (D17) |
| Navigation | `Navigation` labels/URLs/orden/visibilidad | ✔ espejo D26/D35, sin rediseño | — |
| CTAs | `CTA` catálogo reutilizable, 6 tipos | ✔ 6 CTAs con trackingId | Copy final |
| 12+ years | Modelo de hitos (año, título, evidencia, media, orden) | ✔ 3 `DEMO MILESTONE` en draft | Año + evidencia real (D43) |
| LeadForm | Campos fijos D17 + selects dinámicos desde CMS | ✔ destino+10 campos CONFIRMED | Integración Turu CRM (DEFERRED) |
| Consent | `privacy`/`analytics`/`marketing` independientes (D52) | ✔ 3 consentimientos versionados | Textos legales |
| Revisions | `content_revisions` (versionado, rollback) | ✔ entidad con 4 revisiones + rollback | — |
| Audit | `audit_log` append-only | ✔ 7 acciones del enum, orden temporal | — |
| Workflow | DRAFT→IN_REVIEW→SCHEDULED→PUBLISHED→ARCHIVED | ✔ cobertura completa validada | — |

## 2. Verificaciones técnicas ejecutadas

| Verificación | Resultado |
|---|---|
| `npm run validate:mock` (slugs, relaciones, estados, SEO, media, gates) | OK — 108 registros, 266 relaciones, 0 errores |
| Cobertura de los 5 estados editoriales | OK |
| Variantes SEO (completo/incompleto/noindex/canonical) | OK |
| Bloques solo de `@proefex/blocks-schema` (sin page builder) | OK |
| Navegación con un nivel máximo bajo el universo (D26) | OK |
| Sin secretos en SiteSettings; GA4 = solo ID de medición | OK |
| Klyra sin dominio inventado (D56) | OK |
| `tsc --noEmit` (typecheck) | OK — sin cambios en `src/` |
| `git diff --check` (whitespace) | OK |
| Cambios de código en frontend/CSS/motion/navegación | NINGUNO (scope guard §34) |

## 3. Respuesta al criterio de éxito (mandato §32)

> *"¿Podría reemplazar mañana todo el contenido MOCK por contenido real de PROEFEX sin modificar la arquitectura del CMS, API o frontend?"*

**`YES`** — el reemplazo es solo de datos (`contentSource: MOCK → PROEFEX` + `contentRequiredFields` llenados), sujeto a que los datos reales respeten el modelo aprobado. Procedimiento: `content-mock-strategy.md` §7.

No se identificó ninguna entidad o relación del alcance que impida el reemplazo. Dos aclaraciones de modelo (sin cambio de schema): `Product` pertenece a SOLVE por `productKind` (relación derivada), y `Page` admite slug raíz vacío para la Home.

## 4. Condiciones para F3.2 (no autorizada aún)

1. Aprobación de PROEFEX de esta fase (`REQUIRES_PROEFEX_APPROVAL`).
2. Respuestas del negocio (matrices F3.1.1): Solutions (D15), categorías insights (D55), media real (D45), legal/contacto (D17), autores y personas RBAC (D14), datos 12+ años.
3. Decisiones PROPOSED pendientes: D46–D52 (arquitectura F3.1), D58/D59 (esta fase).
