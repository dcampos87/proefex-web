# Fase 3.1.2 — Content Mock Strategy (estrategia de contenido MOCK)

**Estado:** `PHASE_3_1_2_CONTENT_MOCK_READY — REQUIRES_PROEFEX_APPROVAL`
**Base:** `9a2c3de` (F3.1.1 business content matrix · `PHASE_3_1_1_BUSINESS_CONTENT_MATRIX_COMPLETE — REQUIRES_PROEFEX_INPUT`)
**Alcance:** dataset MOCK estructuralmente completo + validador + criterios de reemplazo. **No** inicia F3.2: sin migraciones nuevas, sin CMS UI, sin API endpoints, sin storage, sin autenticación, sin cambios de frontend.

> **Principio:** *El contenido real puede esperar. La capacidad del CMS para administrarlo, no.*

---

## 1. MOCK ≠ contenido real

| Clase | Significado | Dónde se declara |
|---|---|---|
| `CONFIRMED` | Información oficial de PROEFEX (pilares, sectores, nombres de productos, campos de lead, Certmind claim) | `confirmedFields` de cada registro |
| `MOCK` | Contenido de prueba creado solo para validar el modelo. **Nunca** se presenta como información de PROEFEX | `contentSource: "MOCK"` + directorio `data/mock/` |
| `CONTENT_REQUIRED` | Hueco que solo PROEFEX puede llenar (legal, contacto, media real, URLs, features) | `contentRequiredFields` de cada registro |

Reglas:

1. Todo registro del dataset lleva `contentSource` (`MOCK` | `PROEFEX` | `IMPORTED`). En F3.1.2 el dataset es 100% `MOCK` (el validador lo exige).
2. Los campos confirmados se listan explícitamente en `confirmedFields`; nada más es oficial.
3. Clientes ficticios: `Mock Manufacturing Co.`, `Demo Retail Group`, `Example Health Organization`. Autores: `Demo Author`, `Mock Editorial Team`. Hitos: `DEMO MILESTONE`. Legal: `LEGAL MOCK — REPLACE BEFORE PRODUCTION`. Media: `MOCK MEDIA`.
4. Métricas de casos siempre con `mock: true`. Nada de certificaciones, premios, partners, testimonios, direcciones, teléfonos, emails o cifras comerciales inventados.
5. Klyra: URL = `null` + nota "Sin dominio confirmado" (D56). No se inventa dominio.

## 2. Ubicación y source of truth

```text
data/mock/*.json        ← dataset MOCK (fuente de la fase, NO importado por el frontend)
scripts/validate-mock-dataset.mjs  ← validador (npm run validate:mock)
```

- El dataset **no vive dentro de `src/`** y ningún componente React lo importa: se respeta la cadena `CONTENT → CMS/DB → API → Next.js → SSR/ISR` (mandato §4). Los arrays de contenido del frontend (`nav-data.ts`, etc.) quedan intactos; la migración a contenido servido por CMS ocurre en F3.2+.
- Los `id` son legibles (`prd-turu-crm`) como placeholders de prueba; el schema real usa UUIDs (`cms-schema.md`). El reemplazo no depende de los ids.
- La estructura de cada registro replica los campos del modelo F3.1 (`content-architecture.md`): campos de auditoría, `status`, `seo` embebido, referencias por id (nunca media inline).

## 3. Cobertura del dataset (19 archivos, 108 registros, 266 relaciones)

| Entidad | Archivo | Registros | Notas |
|---|---|---|---|
| Universe (5) | `universes.json` | 5 | Nombres/frases CONFIRMED; tagline/description MOCK |
| Sector (8) | `sectors.json` | 8 | Nombres CONFIRMED; descripciones MOCK |
| InsightCategory | `insight-categories.json` | 6 | `proposed` — D55 intacto, el validador lo exige |
| Author | `authors.json` | 2 | Ficticios inequívocos |
| MediaAsset | `media-assets.json` | 13 | IMAGE/VIDEO/DOCUMENT, poster+mobile, og 1200×630 |
| CTA | `ctas.json` | 6 | 6 tipos del modelo |
| Service | `services.json` | 11 | 5 universos, estados variados, N:M con sectores |
| Product | `products.json` | 6 | Nombres CONFIRMED; features/URL MOCK/CONTENT_REQUIRED |
| CaseStudy | `case-studies.json` | 3 | public/anonymous, testimonial con y sin consent |
| Insight | `insights.json` | 6 | Una por categoría, 5 estados, variantes SEO |
| Page | `pages.json` | 7 | Los 7 templates, solo bloques de `@proefex/blocks-schema` |
| Navigation | `navigation.json` | 11 | Espejo D26/D35, un nivel bajo universo |
| SiteSettings | `site-settings.json` | 1 | Contacto/GA4 = CONTENT_REQUIRED; sin secretos |
| LeadForm + Consent | `lead-form.json` | 1 | Destino+10 campos CONFIRMED; textos MOCK |
| LegalDocument | `legal.json` | 4 | `LEGAL MOCK`, draft, noindex |
| Milestone | `milestones.json` | 3 | `DEMO MILESTONE`, draft |
| Redirect | `redirects.json` | 2 | Patrón /saas→/solutions, /blog→/insights |
| ContentRevision | `revisions.json` | 6 | Versionado + rollback, una entidad con 4 revisiones |
| AuditLog | `audit-log.json` | 7 | Acciones del enum F3.1 §3.17, orden temporal |

## 4. Relaciones probadas (mandato §26)

```text
Universe →1:N→ Service →M:N→ Sector
Service  →M:N→ Product / CaseStudy / Insight
Product  →M:N→ Sector / CaseStudy / Insight
CaseStudy→N:1→ Sector + Universe
Insight  →N:1→ Category + Author (+ Universe)
Page     →1:N→ Bloques tipados (@proefex/blocks-schema)
Todo     →refs→ MediaAsset / CTA / Navigation / SiteSettings
```

El validador falla si **cualquier** referencia no resuelve. Caso exigido por el mandato: un Service (p. ej. `svc-adopcion`) conecta Universe + 2 Products + 1 Case + 1 Insight + Media + CTA + 2 Sectors.

Nota de modelo confirmada durante la fase: `Product` **no tiene FK a Universe** en F3.1 (los SaaS pertenecen a SOLVE por `productKind`). El validador lo trata como relación derivada. No requiere cambio de schema.

## 5. Estados y workflow (mandato §22/§24)

- Los 5 estados (`draft`, `in_review`, `scheduled`, `published`, `archived`) tienen al menos un registro; el validador exige cobertura completa.
- `scheduled` siempre con `publishedAt`; publicado siempre con `publishedAt` y SEO completo (gate G1).
- Revisiones: `ins-01` con 4 revisiones (create → submit_review → publish → update) y `case-mock-manufacturing` con rollback (governance §1.4). El modelo `content_revisions` de F3.1 no se altera.
- Audit log: append-only, en orden temporal, solo acciones del enum aprobado.

## 6. SEO probado (mandato §14)

- 43 registros con SEO completo, 3 incompletos (solo en `draft` — el validador bloquea publicar sin SEO completo).
- 1 registro `noindex,follow` (insight de prueba) y 1 canonical override (`ins-06`).
- metaTitle ≤60 / metaDescription ≤160 verificado en todo el dataset.
- `schemaType` solo con datos obligatorios (G6); autores con bio+foto para authorship GEO (G8).

## 7. Estrategia de reemplazo (criterio de éxito §32)

> *"¿Podría reemplazar mañana todo el contenido MOCK por contenido real de PROEFEX sin modificar la arquitectura del CMS, API o frontend?"* — **SÍ**, siempre que los datos reales respeten el modelo aprobado.

Procedimiento por registro:

1. PROEFEX entrega el dato real (responde las matrices de `business-content-decisions.md`).
2. El registro cambia `contentSource: "MOCK" → "PROEFEX"`, se mueven los campos de `contentRequiredFields` a valores reales y se actualiza `confirmedFields`.
3. El validador corre de nuevo: gates G1–G8 aplican ahora sin la exención MOCK (media con `copyrightStatus` real, hitos con evidencia, legal con texto definitivo).
4. Ningún cambio de schema, API o frontend es necesario: el reemplazo es solo de datos.

Riesgos conocidos del reemplazo (todos documentados, ninguno estructural):

- Media real debe cumplir `alt`, poster y copyright (`OWNED`/`LICENSED`) — D45.
- Los textos legales definitivos requieren versión nueva de `consent_versions`.
- La lista definitiva de categorías puede diferir de las 6 propuestas (solo cambia el enum, decisión PROEFEX).

## 8. Detección de problemas de datos (mandato §27)

`npm run validate:mock` falla ante: slug duplicado/vacío/no-URL-safe, SEO incompleto al publicar, `alt` vacío, media sin copyright válido, relación inválida, entidad publicada sin contenido obligatorio, CTA sin destino, Insight sin categoría/autor, Case sin sector, Product sin universo derivable, Service sin universo, Page sin template o con bloque fuera del registro, `scheduled` sin fecha, tercero nivel de navegación, secreto en settings, métrica sin marca mock, categorías no-`proposed`, hitos sin `DEMO MILESTONE`, legal publicable, estados sin cobertura.

## 9. Qué sigue pendiente de PROEFEX

Intacto de F3.1.1 (sin cerrar): D5, D13, D15, D17, D45, D55, D56, D57 — matriz Solutions, media real, legal/contacto, autores y personas RBAC, datos 12+ años, casos autorizables.
