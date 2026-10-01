# Fase 3.1 — CMS Schema (Mapeo Supabase)

**Estado:** `PHASE_3_1_CONTENT_ARCHITECTURE_COMPLETE — REQUIRES_PROEFEX_APPROVAL`
**Alcance:** mapeo conceptual del modelo (`content-architecture.md`) a Supabase. **No se crean migraciones finales** en F3.1, salvo las necesarias para validar el schema (mandato §33).

---

## 1. Convenciones

- Motor: Supabase Postgres (D1). Acceso vía CMS (Next.js) y `proefex-api` (D2); el navegador nunca accede al CMS directo para contenido público (A4/A5).
- Todo campo JSON validado con Zod en paquetes compartidos (`@proefex/blocks-schema`, futuro `@proefex/api-schema`) — la base confía pero la validación vive en la app.
- Enum de status transversal:

```sql
CREATE TYPE content_status AS ENUM ('draft','in_review','scheduled','published','archived');
```

> Compatibilidad: `@proefex/blocks-schema` define hoy 4 estados; extender a `archived` es cambio de paquete en fase posterior.

---

## 2. Campos estándar de auditoría

Toda tabla de contenido incluye (mandato §33):

| Campo | Tipo | Notas |
|---|---|---|
| id | uuid default `gen_random_uuid()` | PK |
| created_at | timestamptz default `now()` | |
| updated_at | timestamptz default `now()` | trigger de actualización |
| created_by | uuid references `cms_users(id)` | |
| updated_by | uuid references `cms_users(id)` | |

---

## 3. Enums

| Enum | Valores |
|---|---|
| `content_status` | draft, in_review, scheduled, published, archived |
| `universe_code` | CREATE, GROW, LEARN, EXPERIENCE, SOLVE |
| `universe_theme` | core, tech, growup, learns, equip, solve |
| `media_type` | IMAGE, VIDEO, DOCUMENT |
| `copyright_status` | OWNED, LICENSED, PENDING_REVIEW |
| `product_kind` | saas, equipment |
| `client_visibility` | public, anonymous |
| `cta_type` | internal, external, contact, form, product, download |
| `cta_variant` | primary, secondary, ghost |
| `nav_visibility` | all, desktop, mobile |
| `redirect_status_code` | 301, 302 |
| `role` | SUPER_ADMIN, ADMIN, EDITOR, AUTHOR, SEO_MANAGER |
| `permission` | content.read, content.write, content.publish, seo.manage, blog.write, blog.publish, lms.manage, users.manage, settings.manage |
| `audit_action` | create, update, delete, publish, unpublish, login, role_change |
| `consent_type` | privacy, analytics, marketing |

---

## 4. Tablas de contenido

> Tipos abreviados: `t` = text, `b` = bool, `i` = int, `ts` = timestamptz, `j` = jsonb. Todas heredan campos §2. RLS en §6.

### 4.1 `universes`

| Columna | Tipo | Constraints |
|---|---|---|
| code | `universe_code` | UNIQUE NOT NULL |
| name / short_name / tagline / description / pillar | t | name NOT NULL |
| accent | t | **referencia a token** (`tech`,`growup`,`learns`,`equip`,`solve`) — CHECK contra lista, no hex |
| theme | `universe_theme` | |
| slug | t | UNIQUE |
| hero_media_id | uuid → `media_assets(id)` | |
| navigation_order | i | UNIQUE |
| status | `content_status` | |
| seo | j (`seoSchema`) | |

### 4.2 `sectors`

name, slug (UNIQUE), short_description, description, hero_media_id → media_assets, visual_ref (t, nombre de icono del set), featured (b), order (i), status, seo. Tabla puente `sectors` NO duplica sector en páginas (los m2m viven en services/products).

### 4.3 `services`

| Columna | Tipo | Constraints |
|---|---|---|
| universe_id | uuid → `universes(id)` | NOT NULL |
| name / slug | t | slug UNIQUE |
| short_description / description | t | |
| hero_media_id | uuid → media_assets | |
| gallery | uuid[] → media_assets | array de refs |
| capabilities | j[] | `{title, description}` |
| cta | j (`ctaSchema`) | |
| featured | b | |
| order | i | |
| status | `content_status` | |
| seo | j | |

Puentes m2m: `service_sectors(service_id, sector_id)`, `service_related_services(service_id, related_service_id)`, `service_cases(service_id, case_id)`, `service_insights(service_id, insight_id)`.

### 4.4 `products`

product_kind (`product_kind`), name, slug (UNIQUE), short_description, description, logo_id → media_assets, hero_media_id, gallery uuid[], screenshots uuid[], video_id → media_assets, features j[], use_cases j[], cta j, status, seo.

Puentes: `product_sectors`, `product_cases`, `product_insights`.

### 4.5 `cases`

title, slug (UNIQUE), client (t, nombre interno), client_visibility (`client_visibility`), sector_id → sectors, universe_id → universes, summary, challenge, solution, process, results j[] (solo métricas provistas), technologies t[], hero_media_id, gallery uuid[], videos uuid[], published_at ts, status, seo.

Puentes: `case_services`, `case_products`.

### 4.6 `insights` e `insight_categories`

`insight_categories`: name, slug (UNIQUE), description, seo, status. **Lista gobernada** — creación restringida por permiso (`content.publish`, ver §6).

`insights`: title, slug (UNIQUE), excerpt, content (j — bloques estructurados), category_id → insight_categories NOT NULL, tags t[], author_id → authors NOT NULL, hero_media_id, published_at ts, updated_at ts, reading_time i (calculado), related_universe_id → universes, status, seo.

Puentes: `insight_services`, `insight_products`, `insight_sectors`.

### 4.7 `authors`

name, slug (UNIQUE), role, bio, photo_id → media_assets, social_links j[], status.

### 4.8 `media_assets`

| Columna | Tipo | Constraints |
|---|---|---|
| type | `media_type` | NOT NULL |
| filename | t | |
| url | t | |
| width / height / duration / file_size | i | |
| mime_type | t | |
| alt | t | CHECK: NOT NULL cuando type='IMAGE' (gate de publicación) |
| title / caption / credit | t | |
| focal_point | j `{x,y}` | |
| mobile_asset_id | uuid → media_assets | |
| poster_id | uuid → media_assets | |
| copyright_status | `copyright_status` | default `PENDING_REVIEW` |
| status | `content_status` | |
| uploaded_at | ts default now() | |

Índices: `(type)`, `(status)`, `(filename)`.

**Storage** (Supabase Storage, buckets): `media/images`, `media/videos`, `media/documents`. Acceso de lectura público solo para assets `published`; escritura solo roles con `content.write`. Los archivos nunca se guardan inline en contenido.

### 4.9 `navigation_items`

label, href, parent_id → navigation_items (nullable), universe_id (nullable), visibility (`nav_visibility`), order (i), featured (b), status.

### 4.10 `site_settings` (singleton, id fijo)

site_name, logo_id → media_assets, favicon_id → media_assets, default_seo j, social_links j[], contact j (datos provistos por PROEFEX — no se inventan, D17), legal_links j[], analytics j (solo IDs de medición GA4 — **nunca secretos**), default_cta j, footer j, announcement j (con enabled + vigencia).

### 4.11 `lead_forms` y `form_submissions`

`lead_forms`: title, description, fields j[] (composición sobre el **conjunto fijo** de campos D17: nombre, apellidos, empresa, cargo, email, telefono, codigo_pais, servicio, sector, mensaje), consent_text, success_message, cta j, status.

`form_submissions` (datos personales — RLS restrictiva, §6): form_id, payload j (validado con Zod), consents j[] `{type, version, granted, timestamp}`, crm_delivery_status (enum: pending, sent, failed — entrega a Turu CRM vía `proefex-api`, fase posterior), created_at.

### 4.12 `redirects`

source (t, UNIQUE), destination (t), status_code (`redirect_status_code`), active (b). Índice `(source) WHERE active`. Anti-cadenas: resolución al destino final en la capa de aplicación (mandato §28).

### 4.13 `audit_log`

actor uuid → cms_users, action (`audit_action`), entity t, entity_id uuid, timestamp ts default now(), metadata j (diff anterior/nuevo resumido). **Append-only**: sin UPDATE/DELETE en RLS (§6). Índices: `(entity, entity_id)`, `(timestamp DESC)`.

---

## 5. Tablas de sistema

### 5.1 `cms_users`

id (= auth.users.id), email, name, role (`role`), status, last_login_at. Los permisos se resuelven de role → permissions (matriz en `content-governance.md` §3), almacenados como claim JWT (`app_permissions`) vía hook de auth para que RLS pueda evaluarlos.

### 5.2 `content_revisions` (versionado, mandato §30)

| Columna | Tipo |
|---|---|
| id | uuid |
| entity | t (nombre de tabla) |
| entity_id | uuid |
| revision_number | i |
| snapshot | j (estado completo validado) |
| change_note | t |
| created_by / created_at | |

Reglas: cada guardado sobre una entidad `published` crea revisión antes de sobrescribir; `publish` congela la revisión marcada como publicada; rollback = restaurar snapshot como nuevo draft. Nunca se sobrescribe contenido publicado sin revisión recuperable.

### 5.3 `consent_records` / `consent_versions`

`consent_versions`: type (`consent_type`), version i, text, effective_from. `consent_records`: subject_ref (pseudónimo/hashed), form_submission_id nullable, analytics_id nullable, consents j[]. Sin datos personales en texto plano.

---

## 6. RLS (conceptual)

Principio (mandato §34): **Public ve solo `PUBLISHED`. Autenticados según RBAC. Nunca publicar por el hecho de estar autenticado.**

| Contexto | Política |
|---|---|
| `anon` (público) | `SELECT` únicamente filas con `status = 'published'` **y** (`published_at IS NULL OR published_at <= now()`). Aplica a universes, sectors, services, products, cases, insights, insight_categories, pages, media_assets (leídos por las anteriores). |
| `anon` en `form_submissions` | sin acceso; escritura solo vía `proefex-api` (service role, con validación + rate limit en la API). |
| `authenticated` | `SELECT` según permisos del claim: `content.read` → lectura de todos los estados; `blog.write` → solo `insights*` propios en draft/in_review; sin permiso → solo lectura pública (publicar exige `content.publish`, no basta autenticación). |
| `content.write` | INSERT/UPDATE en entidades de contenido; todo UPDATE sobre entidad publicada inserta en `content_revisions` (trigger). |
| `content.publish` | transiciones a `published`/`archived` (CHECK de transición en trigger o en capa app). |
| `settings.manage` | `site_settings`, `navigation_items`, `redirects`, `lead_forms`. |
| `users.manage` | `cms_users`. |
| `audit_log` | INSERT habilitado para roles con escritura; **sin UPDATE/DELETE para nadie** (SUPER_ADMIN incluido). |
| `consent_records` | solo service role. |

La API (`proefex-api`) valida y limita antes de tocar la base; RLS es la última barrera (Doc 07 §9).

---

## 7. Bloques (`pages.blocks`)

`pages`: id, title, slug (UNIQUE), universe_id (nullable = core), template (t: `CORE|UNIVERSE|SERVICE|PRODUCT|SECTOR|CASE_STUDY|INSIGHT` — CHECK), blocks j[] (discriminated union validada), status, seo.

Catálogo de bloques = `blockRegistry` de `@proefex/blocks-schema` (19 bloques F1/F2) **más** los bloques del frontend F2 aún no esquematizados, mapeados 1:1 a componentes existentes:

| Bloque nuevo propuesto | Componente F2 | Notas |
|---|---|---|
| `EditorialRows` | filas editoriales (D30) | items tipados `{index,title,description,href}` |
| `MediaGallery` | `MediaFrame` (D41) | MediaRef[] con variantes |
| `MediaText` | `ImageTextSplit` (renombrar contrato) | alias compatible |
| `InsightGrid` | índice editorial insights (D32) | refs a insights |
| `ProductShowcase` | `SaaSShowcase` | productos por ref, no copia |
| `CaseStudyBlock` | `CaseStudyCard` | caso por ref |

**Regla:** no permitir HTML arbitrario como método principal (mandato §25). Todo bloque se agrega al `blockRegistry` con schema Zod; sin schema no existe bloque. La extensión del paquete es fase posterior; F3.1 solo documenta el contrato.

---

## 8. API contract (`proefex-api` → `proefex-web`)

Flujo (A4/A5, mandato §31):

```
CMS (escritura)  →  proefex-api  →  proefex-web (SSR/ISR)  →  revalidation
```

- **Lectura pública de contenido** (REST `/v1`, solo `published`):
  - `GET /v1/content/pages?slug=`
  - `GET /v1/content/universes`, `/sectors`, `/services`, `/products`, `/cases`, `/insights`, `/settings`, `/navigation`, `/redirects`
  - Respuestas incluyen SEO embebido y MediaRefs resueltos (URL + alt + focal + variantes).
  - Errores RFC 7807; validación Zod compartida; OpenAPI generada (Doc 07 §4).
- **Escritura/acciones**: `POST /v1/leads` (formularios → Turu CRM, fase posterior), `/v1/webhooks/cms/publish` (A5, payload `publishWebhookSchema` ya definido en `@proefex/blocks-schema`).
- **Auth**: público lectura con cache; interno con token de servicio firmado o Supabase JWT; service-role solo server-side.

El navegador nunca consulta el CMS directamente para contenido público; toda lectura pasa por la API o por el render SSR/ISR de la web.

---

## 9. Cache / Revalidation (contrato, no implementación)

```
CMS publish
  → webhook firmado (HMAC-SHA256, publishWebhookSchema)
  → proefex-api valida + dispara
  → Next.js web: revalidateTag(`content:<tipo>:<slug>`) + sitemap regenerado
```

- La web etiqueta fetches por tipo (`page`, `service`, `product`, `saas`, `sector`, `case`, `post`) y por slug; el webhook invalida solo lo afectado (ISR quirúrgico, A4).
- Eventos soportados hoy en schema: `published` / `unpublished`. Extensión prevista: `scheduled` (job del CMS dispara al llegar la hora).
- Rollback de revisión dispara el mismo webhook (el estado publicado vuelve a la revisión previa).
- Implementación completa: fases posteriores; F3.1 solo fija el contrato.

---

## 10. Versionado y audit (resumen operativo)

- Draft → revisión implícita (auto-save versionado); Publish → revisión congelada; Rollback → snapshot a draft.
- Toda acción de §3.17 (`create/update/delete/publish/unpublish/login/role_change`) escribe `audit_log` con actor y diff resumido.
- Backups/PITR y separación de ambientes: A8 (requiere cuenta Supabase — `PROEFEX_INPUT_REQUIRED`).

---

## 11. Multilingüe (estrategia, no implementación)

Idioma inicial `es`; `en` preparado pero no implementado (D4, mandato §36). **Sin duplicar tablas.**

Estrategia propuesta:

1. **Hoy (es único):** campos editoriales como columnas/jsonb normales. Cero costo adicional.
2. **Futuro (es + en):** los campos traducibles de cada entidad pública migran a un patrón locale-keyed — `jsonb` con `{ es: "...", en: "..." }` en las mismas columnas, o tablas `<entity>_translations(entity_id, locale, campos)` cuando el volumen lo justifique. La API expone `?locale=en` con fallback `es` si falta traducción (nunca página en blanco).
3. **URLs:** `/en/...` prefijo de ruta (D4); slugs traducibles con `Redirect` desde el slug es si cambia.
4. **Fuera de alcance:** contenido traducido automático, LMS en `en`, schema `inLanguage` — documentados, no construidos.

> Esta estrategia es una decisión propuesta (D51) — requiere aprobación para implementarse en fases posteriores.
