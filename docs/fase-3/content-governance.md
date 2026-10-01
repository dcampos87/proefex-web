# Fase 3.1 — Content Governance

**Estado:** `PHASE_3_1_CONTENT_ARCHITECTURE_COMPLETE — REQUIRES_PROEFEX_APPROVAL`
**Alcance:** reglas de operación del contenido: RBAC, flujo editorial, gates de publicación, consentimiento, inventario y decisiones pendientes. Modelos y schema: `content-architecture.md` / `cms-schema.md`.

---

## 1. Principios de gobernanza

1. **Cero contenido ficticio.** Nada se publica sin ser provisto y verificado por PROEFEX. Los placeholders `VISUAL PROVISIONAL` (D42) son el único material no real permitido y están etiquetados en UI.
2. **El CMS controla contenido, no diseño.** Ningún rol puede alterar layout, colores estructurales, tokens de universo o navegación saturada (D25/D26/D35/D40 vigentes).
3. **Publicar es una acción con permiso explícito** (`content.publish`) — nunca un efecto de estar autenticado.
4. **Todo lo publicado es recuperable** (revisiones + rollback, mandato §30).
5. **Toda acción relevante queda auditada** (`audit_log`, append-only).

---

## 2. Flujo editorial (estados)

```
DRAFT → IN_REVIEW → SCHEDULED → PUBLISHED → ARCHIVED
   ▲         │            │          │
   └─────────┴────────────┴──────────┘   (ediciones/rollback = nuevo DRAFT)
```

| Estado | Significado | Quién lo fija |
|---|---|---|
| `DRAFT` | En edición | AUTHOR+ |
| `IN_REVIEW` | Pendiente de aprobación editorial | AUTHOR+ (o editor) |
| `SCHEDULED` | Aprobado con `publishedAt` futura | EDITOR+ (`content.publish`) |
| `PUBLISHED` | Visible en producción | EDITOR+ (`content.publish`) |
| `ARCHIVED` | Retirado; URL → redirect 301 si corresponde | EDITOR+ |

- `SCHEDULED` publica automáticamente a la hora programada (job del CMS) y dispara el webhook de revalidación (A5).
- Nunca se muestra contenido no publicado en producción: RLS (`cms-schema.md` §6) + filtro en API.
- Edición de una entidad publicada = nuevo borrador sobre revisión congelada; publicar de nuevo genera revisión y webhook.

---

## 3. RBAC (roles y permisos)

Roles aprobados (D14) — sin roles nuevos:

| Permiso | SUPER_ADMIN | ADMIN | EDITOR | AUTHOR | SEO_MANAGER |
|---|---|---|---|---|---|
| `content.read` (todos los estados) | ✔ | ✔ | ✔ | ✔ | ✔ |
| `content.write` | ✔ | ✔ | ✔ | ✔ (solo propios) | ✖ |
| `content.publish` | ✔ | ✔ | ✔ | ✖ | ✖ |
| `seo.manage` | ✔ | ✔ | ✔ | ✖ | ✔ |
| `blog.write` | ✔ | ✔ | ✔ | ✔ | ✖ |
| `blog.publish` | ✔ | ✔ | ✔ | ✖ | ✖ |
| `lms.manage` | ✔ | ✔ | ✖ | ✖ | ✖ |
| `users.manage` | ✔ | ✖ | ✖ | ✖ | ✖ |
| `settings.manage` | ✔ | ✔ | ✖ | ✖ | ✖ |

Notas:

- `AUTHOR` crea/edita **sus** borradores (insights y contenidos propios); no publica.
- `SEO_MANAGER` administra metadatos SEO y no toca contenido de cuerpo.
- `lms.manage` queda reservado (el LMS real vivirá en `learn.proefexperu.com`, Doc 05 §2.13) — solo catálogo referencial en el CMS.
- Personas reales para cada rol: pendiente de PROEFEX (D14, `PROEFEX_INPUT_REQUIRED`) — no se crean usuarios reales en F3.1.
- Administración de permisos vía claims (`app_permissions`) para que RLS los evalúe (`cms-schema.md` §5.1).

---

## 4. Gates de publicación (validaciones bloqueantes)

Una entidad no puede pasar a `SCHEDULED`/`PUBLISHED` si falla alguno:

| # | Gate | Fuente |
|---|---|---|
| G1 | SEO completo: metaTitle ≤60, metaDescription ≤160, ogImage o fallback definido | Doc 05 §5 |
| G2 | `alt` presente en toda imagen referenciada (a11y) | Doc 13 §5 |
| G3 | `copyrightStatus ≠ PENDING_REVIEW` en toda media referenciada | F3.1 (mandato §12) |
| G4 | `clientVisibility` resuelto en casos; nombre de cliente solo se publica si `public` **y** con autorización explícita registrada | F3.1 (mandato §9) |
| G5 | Sin campos `CONTENT_REQUIRED` pendientes (features de producto, hitos 12+ años, etc.) | D15, D43 |
| G6 | `SEO.schemaType`: solo si el tipo tiene todos sus datos obligatorios (no se genera schema incompleto) | Doc 08 §3 |
| G7 | Consentimiento de testimonios/citas (`consent: true`) | Doc 05 §2.10 |
| G8 | Autor real asignado en `Insight` (authorship GEO) | F3.1 (mandato §10) |

---

## 5. SEO/GEO — reglas de operación

- SEO por defecto desde `SiteSettings`; cada entidad puede sobrescribir (SEO embebido).
- Canonical: dominio `www.proefexperu.com` (A1); sin duplicados por parámetros.
- Schema types habilitados por entidad: `WebPage` (pages), `Service`, `Product`, `Article` (insights), `FAQPage` (bloques FAQ), `BreadcrumbList` (auto, solo con jerarquía completa), `VideoObject` (solo video con poster+duration+transcript), `Organization`/`WebSite` (site-level), `LocalBusiness` **solo** con datos reales de contacto/dirección verificados (hoy `UNKNOWN`, D17 — no activo).
- GEO operativo: titulares descriptivos, fechas visibles (`publishedAt`/`updatedAt`), autoría con bio real, FAQs con respuestas completas, relaciones tópicas pobladas (related*), citations en insights cuando PROEFEX provea fuentes. Sin secciones "GEO" ni keyword stuffing.
- Sitemap regenerado en cada publish (webhook, `cms-schema.md` §9). Tags no generan páginas indexables.

---

## 6. Seguridad operativa del contenido

- **Secretos:** API keys, service-role keys y credenciales de Turu CRM viven como secretos de entorno de `proefex-api`/CMS. Jamás en `SiteSettings`, contenido o repositorio.
- **GA4 (D18):** único dato en CMS = ID de medición. El tracking no se activa sin la configuración de consentimiento definida (§7).
- **Datos personales:** `form_submissions` con RLS restrictiva (solo service role); retención yPurpose de uso definidos antes de conectar Turu CRM.
- **Media:** sin datos de clientes visibles sin autorización; material de terceros con licencia confirmada (`LICENSED`).

---

## 7. Consentimiento

| Tipo | Alcance | Estado |
|---|---|---|
| `privacy` | Obligatorio en todo envío de formulario | Texto legal pendiente (PROEFEX) |
| `analytics` | GA4 y medición | GA4 aprobado (D18); implementación en fase posterior |
| `marketing` | Comunicaciones comerciales | Opt-in explícito, checkbox separado |

Reglas:

1. Los tres tipos son **independientes**: aceptar uno no implica los otros.
2. Cada envío registra `{type, version, granted, timestamp}` contra `consent_versions` (texto versionado, auditable).
3. Sin `privacy` concedido, el formulario no se envía.
4. `analytics` concedido = requisito previo para disparar eventos GA4 de esa sesión.
5. Los textos legales no se inventan: `CONTENT_REQUIRED` hasta entrega de PROEFEX.

---

## 8. Content Inventory (matriz F3.1)

Matriz de estado por entidad (mandato §37 — refleja el estado real, sin contenido inventado). Detalle granular por asset: `docs/content-inventory.md` (D13) y `fase-2/media-validation-inventory.md` (D45).

| Entidad | Contenido disponible | Estado |
|---|---|---|
| Home | Parcial | IN_REVIEW |
| TECH | Parcial | IN_REVIEW |
| Grow Up | Parcial | IN_REVIEW |
| Learns | CONTENT_REQUIRED | DRAFT |
| Equip | CONTENT_REQUIRED | DRAFT |
| Solutions | Parcial | IN_REVIEW |
| Sectors | Parcial | DRAFT |
| Cases | CONTENT_REQUIRED | DRAFT |
| Insights | CONTENT_REQUIRED | DRAFT |
| Media | CONTENT_REQUIRED | BLOCKED |

Lectura:

- "Parcial" = estructura y copy conceptual aprobado como dirección (D12) en páginas F2; falta copy comercial definitivo.
- `CONTENT_REQUIRED` = PROEFEX debe proveer (cursos Learns, catálogo EQUIP, casos autorizables, insights con autores reales).
- `Media: BLOCKED` = F2.4/D45 — sin fotografía/video/logo real de PROEFEX en el repositorio.

---

## 9. Decisiones pendientes de PROEFEX (acumuladas)

| ID / tema | Qué se necesita | Desbloquea |
|---|---|---|
| D13 (crítica) | Inventario completo de contenido y assets | Todo el contenido publicable |
| D45 / Media | Hero video, banco fotográfico, product shots, logos, favicon | Cierre visual + MediaAsset real |
| D15 | Matriz de estado comercial de los 6 productos SaaS | `Product.features` y publicación |
| D5 | Proveedor/arquitectura de video | `MediaAsset` VIDEO (source vs CDN) |
| D14 (personas) | Usuarios reales por rol | RBAC operativo |
| D17 (legal) | Textos de privacidad/cookies, datos de contacto reales | LeadForm publicable, `Consent`, `LocalBusiness` |
| Nueva — Categorías insights | Lista final de `InsightCategory` (propuesta: una por pilar + transversales) | URL `/insights/[categoria]/[slug]` |
| Nueva — Autores | Personas reales (nombre, cargo, bio, foto) para `Author` | Insights publicables, authorship GEO |
| D51 (propuesta) | Aprobar estrategia multilingüe locale-keyed | Implementación `en` futura |

---

## 10. Qué NO se hace en F3.1 (recordatorio del mandato §39)

No se construye CMS UI, no se crea la API completa, no se conecta Turu CRM, no se carga contenido ficticio, no se crean usuarios reales, no se publica contenido, no se migra contenido definitivo, no se implementa LMS, y **no se cambia diseño, navegación, universo ni theme**. Fase 2 queda congelada visualmente.
