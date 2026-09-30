# Documento 05 — Modelo de Contenidos

**Fase:** 0 — Definición
**Estado:** Propuesta para revisión

---

## 1. Principios del modelo

1. **Contenido estructurado sobre bloques tipados:** cada página es una lista ordenada de bloques con esquema validado (Zod). El editor elige bloques, no dibuja layouts libres.
2. **Colecciones reutilizables:** servicios, productos, sectores, casos y posts son entidades propias con página autogenerada; no páginas sueltas.
3. **Todo campo editorial tiene SEO:** título, descripción, OG image y estado editorial en cada entidad indexable.
4. **Sin contenido ficticio:** el modelo soporta testimonios, casos y cifras, pero se publican vacíos hasta que el cliente entregue material real.

## 2. Entidades principales

### 2.1 `pages` (páginas compuestas por bloques)

| Campo | Tipo | Notas |
|---|---|---|
| id, slug | uuid, text | Slug único con histórico para redirects |
| title | text | H1 por defecto |
| universe | enum: `core` \| `tech` \| `growup` | Define tema visual y acento |
| seo | jsonb | title, description, ogImage, canonicalOverride, noindex |
| blocks | jsonb[] | Lista ordenada de bloques (sección 3) |
| status | enum: draft, in_review, scheduled, published | Flujo editorial |
| published_at | timestamptz | Permite programación |
| created_by, updated_by | uuid | Auditoría |

### 2.2 `services` (servicios TECH y Grow Up)

| Campo | Tipo | Notas |
|---|---|---|
| id, slug | | |
| brand | enum: `tech` \| `growup` | Línea a la que pertenece |
| category | text | Ej. "desarrollo-a-medida" (TECH) |
| parent_id | uuid nullable | Servicios con sub-servicios |
| name, tagline, description | text | |
| content | jsonb | Bloques de la página del servicio |
| icon / illustration | media ref | |
| features | jsonb[] | Lista de capacidades |
| related_services, related_sectors, related_saas, related_products | m2m | Relaciones comerciales |
| faqs | m2m → faqs | FAQ específica del servicio (clave para GEO) |
| seo, status, published_at | | Igual que pages |

### 2.3 `products` (equipamiento comercial)

Campos: id, slug, name, category (`pantallas` | `pizarras` | `totems` | `alquiler`), description, specs (jsonb), gallery (media[]), content (blocks), related_services, seo, status.

### 2.4 `saas_products`

Campos: id, slug, name, tagline, description, content (blocks), features, screenshots (media[]), future_own_domain (text nullable — dominio propio futuro), status_provisional (`announced` | `available`), seo, status.

> Nota: `available` solo cuando el cliente confirme el estado real de cada producto. Sin datos, se publica como "próximamente" o no se publica.

### 2.5 `sectors`

Campos: id, slug, name, description, content (blocks), pain_points (jsonb[]), related_services (m2m), related_cases (m2m), faqs (m2m), icon, seo, status.

### 2.6 `cases` (casos/proyectos — vacío hasta contenido real)

Campos: id, slug, title, client_name (opcional, con consentimiento), sector, services (m2m), challenge, solution, results (jsonb — solo métricas provistas por el cliente), gallery, quote (solo con autorización explícita), seo, status.

### 2.7 `posts` (blog)

Campos: id, slug, title, excerpt, content (rich text estructurado por bloques: párrafo, heading, imagen, cita, código, video, CTA), cover_image, category_id, tags[], author_id, reading_time (calculado), related_posts (auto + manual), seo, status, published_at (programación), schema_type (`Article`).

### 2.8 `authors`, `categories`, `tags`

- `authors`: nombre, cargo, bio, foto, links. Vinculados a `cms_users` opcionalmente.
- `categories`: nombre, slug, description, seo (páginas indexables).
- `tags`: libres, no indexables individualmente (noindex) para evitar páginas delgadas.

### 2.9 `faqs`

Campos: pregunta, respuesta, scope (`global` | entidad+id), orden. Se renderizan con schema `FAQPage`.

### 2.10 `testimonials` ⚠️

Estructura creada pero **sin datos**: quote, author_name, author_role, company, photo, consent (boolean obligatorio). Se publican solo con material real y autorizado.

### 2.11 `media`

Ver Documento 13. Campos: id, type (image/video/svg/lottie/gif/embed), storage_path, alt_text (obligatorio para imágenes), caption, width/height/duration, focal_point, formats generados, peso, credit.

### 2.12 `redirects`, `settings`, `audit_log`

- `redirects`: from, to, status_code (301/302), activo.
- `settings`: global (navegación, footer, redes, datos de contacto, scripts).
- `audit_log`: quién, qué, cuándo, valor anterior/nuevo (Documento 19 seguridad).

### 2.13 `courses` (estado `planned` — no se construye)

Estructura mínima reservada: title, slug, provider (`certmind`), summary, external_url. Solo para poder listar formación referencial; el LMS real vivirá en `learn.proefexperu.com`.

## 3. Bloques de contenido (catálogo inicial)

| Bloque | Propósito | Universo |
|---|---|---|
| HeroTech | Hero oscuro tecnológico (título animado, canvas/particles opcional) | TECH |
| HeroCreative | Hero editorial: tipografía grande, collage, formas | Grow Up |
| HeroCore | Hero institucional claro/azul | Core |
| ServiceGrid | Grid de servicios con cards | Ambos |
| SaaSShowcase | Showcase de productos SaaS | Core |
| ProductShowcase | Ficha/catálogo de equipamiento | Core |
| VideoSection | Video con poster, controls y lazy load | Todos |
| ImageTextSplit | Split con animación de entrada | Todos |
| StatsSection | Cifras (solo datos reales provistos) | Core |
| CaseStudy | Caso destacado | Core |
| FAQ | Acordeón con schema FAQPage | Todos |
| BlogGrid | Últimos posts / por categoría | Core |
| CTA | Llamada a la acción configurable | Todos |
| LogoWall | Aliados/brands (solo reales) | Core |
| Timeline | Historia/proceso | Core |
| Process | Metodología paso a paso | Ambos |
| SectorGrid | Grid de sectores | Core |
| Testimonial | Citas (solo autorizadas) | Core |
| ContactSection | Formulario + datos | Core |

### Propiedades comunes de todo bloque

```ts
interface BlockProps {
  content: Record<string, unknown>;   // contenido validado por esquema del bloque
  media?: MediaRef[];
  layout?: 'default' | 'split' | 'full' | 'overlay';
  theme?: 'core' | 'tech' | 'growup' | 'inherit';
  background?: 'solid' | 'gradient' | 'grid' | 'image' | 'video' | 'none';
  animation?: AnimationPreset | 'none';   // presets del sistema de motion (Doc 12)
  alignment?: 'left' | 'center' | 'right';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  cta?: { label: string; url: string; style: 'primary' | 'secondary' | 'ghost' }[];
  responsive?: { hideOn?: ('mobile'|'tablet'|'desktop')[]; stackedOrder?: number };
}
```

## 4. Flujo editorial

```text
Borrador → En revisión (EDITOR/ADMIN) → Programado → Publicado → (Archivado)
```

- Publicación genera: invalidación de caché/webhook al frontend + actualización de sitemap.
- Previsualización: cada contenido tiene URL de preview autenticada (draft renderizado en el frontend con token).

## 5. Validaciones del modelo

- Cada bloque tiene esquema Zod en un paquete compartido (`@proefex/blocks-schema`) consumido por CMS y frontend.
- Campos obligatorios de SEO antes de publicar (title ≤ 60 chars, description ≤ 160, ogImage presente o fallback).
- `alt_text` obligatorio en imágenes para publicar (accesibilidad).
- Slugs normalizados automáticamente; edición manual permitida con generación de redirect.
