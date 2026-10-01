# Fase 3.1.1 — Business Content Decisions (Matriz de decisiones de negocio)

**Estado:** `PHASE_3_1_1_BUSINESS_CONTENT_MATRIX_COMPLETE — REQUIRES_PROEFEX_INPUT`
**Base:** `3257ef6` (Fase 3.1 content architecture · `PHASE_3_1_CONTENT_ARCHITECTURE_COMPLETE — REQUIRES_PROEFEX_APPROVAL`)
**Alcance:** preparar y estructurar las decisiones de negocio que PROEFEX debe completar antes de construir el CMS. **No** inicia F3.2, no modifica Supabase schema, no modifica API, no modifica frontend, no modifica diseño.

**Regla transversal:** nada de este documento es inventado. Toda celda vacía o marcada `CONTENT_REQUIRED` / `PROPOSED` / `UNKNOWN` espera datos reales de PROEFEX. Ninguna decisión de negocio pasa a `APPROVED` automáticamente.

---

## 1. Cinco pilares (información confirmada)

Registrados como confirmados (mandato F3.1.1 §3). No se modifican.

| Pilar      | Marca             | Frase                       | Código     |
| ---------- | ----------------- | --------------------------- | ---------- |
| CREATE     | PROEFEX TECH      | Desarrollo y Digitalización | CREATE     |
| GROW       | Grow Up           | Marketing y Growth          | GROW       |
| LEARN      | PROEFEX LEARNS    | Formación y Certificación   | LEARN      |
| EXPERIENCE | PROEFEX EQUIP     | Tecnología y equipamiento   | EXPERIENCE |
| SOLVE      | PROEFEX Solutions | Productos y soluciones      | SOLVE      |

Coherente con `content-architecture.md` §3.1 (entidad `Universe`, 5 códigos exactos, D47).

---

## 2. Solutions — matriz de validación

Seis productos SOLVE (mandato F3.1.1 §4). Ningún dato ha sido rellenado: cada campo espera confirmación de PROEFEX (regla dura D15: no inventar funcionalidades ni estados comerciales).

| Producto  | Nombre oficial | URL | Descripción | Features | Estado |
| --------- | -------------- | --- | ----------- | -------- | ------ |
| Turu CRM  | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | PENDIENTE_VALIDACIÓN |
| PROEFACT  | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | PENDIENTE_VALIDACIÓN |
| My Bpass  | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | PENDIENTE_VALIDACIÓN |
| AtendiGo  | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | PENDIENTE_VALIDACIÓN |
| Eleventto | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | PENDIENTE_VALIDACIÓN |
| Klyra     | `CONTENT_REQUIRED` | Sin dominio confirmado (registrado igualmente) | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | PENDIENTE_VALIDACIÓN |

Notas:

- **Klyra queda registrado** aunque todavía no tenga dominio (mandato §4). La celda URL se marca "Sin dominio confirmado" hasta que PROEFEX indique lo contrario.
- `Nombre oficial` = denominación comercial exacta (mayúsculas, espacios, marca registrada si aplica).
- `Estado` por producto: PROEFEX debe indicar si se publica, se muestra como "próximamente" o no se publica (matriz D15, Doc 19).
- Esta matriz alimenta directamente `Product` (content-architecture §3.4): `name`, `shortDescription`, `description`, `features` (solo funcionalidades confirmadas).

---

## 3. Insights — categorías propuestas

La URL definitiva del blog es `/insights/[categoria]/[slug]` (D3): las categorías deben ser una **lista cerrada y gobernada**, con slug URL-safe (minúsculas, sin acentos, guiones). **Ninguna categoría es definitiva** hasta aprobación de PROEFEX; todas se registran como `PROPOSED`.

Propuesta semilla (coherente con `content-architecture.md` §3.6: una por pilar + transversal):

| Categoría | Slug | Descripción | Prioridad | Aprobada |
| --------- | ---- | ----------- | --------- | -------- |
| Tecnología y digitalización | `tecnologia` | Contenido del universo CREATE (PROEFEX TECH) | `CONTENT_REQUIRED` | `PROPOSED` |
| Marketing y growth | `marketing` | Contenido del universo GROW (Grow Up) | `CONTENT_REQUIRED` | `PROPOSED` |
| Formación y certificación | `formacion` | Contenido del universo LEARN (PROEFEX LEARNS) | `CONTENT_REQUIRED` | `PROPOSED` |
| Tecnología y equipamiento | `equipamiento` | Contenido del universo EXPERIENCE (PROEFEX EQUIP) | `CONTENT_REQUIRED` | `PROPOSED` |
| Productos y soluciones | `soluciones` | Contenido del universo SOLVE (PROEFEX Solutions) | `CONTENT_REQUIRED` | `PROPOSED` |
| Empresa (transversal) | `empresa` | Contenido corporativo transversal: trayectoria, cultura, anuncios | `CONTENT_REQUIRED` | `PROPOSED` |

Verificaciones realizadas:

- ✔ Los slugs son compatibles con `/insights/[categoria]/[slug]`: minúsculas, sin acentos ni espacios, sin caracteres especiales.
- ✔ Los slugs no colisionan con rutas existentes (`/tech`, `/grow-up`, `/learns`, `/equip`, `/solutions`, `/insights`, `/contacto`).
- ✔ La lista es cerrada y gobernada (`InsightCategory` como entidad controlada); los tags siguen no indexables.

Pendiente de PROEFEX: aprobar, renombrar, eliminar o añadir categorías. La lista final es requisito para crear el enum en Supabase (bloquea F3.2, no antes).

---

## 4. Authors — matriz

No se inventan personas ni se usan nombres de ejemplo como contenido real (mandato §6). Requerido para authorship GEO (`Insight.author → Author`, gate G8).

| Persona | Cargo | Bio | Foto | Puede publicar | Estado |
| ------- | ----- | --- | ---- | -------------- | ------ |
| (pendiente PROEFEX — no se registran personas de ejemplo) | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` |

Lo que PROEFEX debe entregar por autor: nombre real, cargo, bio breve (recomendado 50–100 palabras), foto (con derechos de uso) y rol de publicación (mapea a RBAC §5).

---

## 5. RBAC — matriz de personas

Roles existentes, sin roles nuevos (D14): `SUPER_ADMIN`, `ADMIN`, `EDITOR`, `AUTHOR`, `SEO_MANAGER`. Matriz de permisos por rol: `content-governance.md` §3. No se piden contraseñas ni secretos; solo la asignación de personas.

| Persona | Role | Permisos especiales | Estado |
| ------- | ---- | ------------------- | ------ |
| (pendiente PROEFEX) | `SUPER_ADMIN` | Según matriz content-governance §3 | `CONTENT_REQUIRED` |
| (pendiente PROEFEX) | `ADMIN` | Según matriz content-governance §3 | `CONTENT_REQUIRED` |
| (pendiente PROEFEX) | `EDITOR` | Según matriz content-governance §3 | `CONTENT_REQUIRED` |
| (pendiente PROEFEX) | `AUTHOR` | Según matriz content-governance §3 (solo contenidos propios) | `CONTENT_REQUIRED` |
| (pendiente PROEFEX) | `SEO_MANAGER` | Según matriz content-governance §3 (solo `seo.manage`) | `CONTENT_REQUIRED` |

Notas:

- No se crean usuarios reales en F3.1.1 (mandato §18).
- Una persona puede concentrar varios roles; PROEFEX define la asignación.
- La administración de permisos se hará vía claims (`app_permissions`) cuando se construya el CMS (F3.2+).

---

## 6. Legal / Contact — checklist

Todos los ítems quedan `CONTENT_REQUIRED` si no existe información confirmada. No se inventa información legal (mandato §8). El mecanismo técnico de consentimiento ya está definido (D52: triple consentimiento versionado `privacy`/`analytics`/`marketing`), pero **los textos legales son responsabilidad de PROEFEX**.

| Ítem | Estado | Notas |
| ---- | ------ | ----- |
| Razón social | `CONTENT_REQUIRED` | Requerida para schema `Organization`/`LocalBusiness` |
| Dirección | `CONTENT_REQUIRED` | Requerida para `LocalBusiness` (gate G6: solo con datos verificados) |
| Teléfono | `CONTENT_REQUIRED` | `SiteSettings` + contacto |
| Email | `CONTENT_REQUIRED` | `SiteSettings` + contacto |
| Horario | `CONTENT_REQUIRED` | `LocalBusiness` (openingHours) |
| Términos y condiciones | `CONTENT_REQUIRED` | Texto aportado por PROEFEX/legal |
| Política de privacidad | `CONTENT_REQUIRED` | Texto aportado por PROEFEX/legal; requisito del consentimiento `privacy` |
| Política de cookies | `CONTENT_REQUIRED` | Ligada a GA4 (D18) y consentimiento `analytics` |
| Tratamiento de datos personales | `CONTENT_REQUIRED` | Base legal, finalidad y retención de `form_submissions` antes de conectar Turu CRM |
| Consentimiento de formularios | `CONTENT_REQUIRED` (texto) / Mecanismo definido (D52) | Los textos versionados de cada consentimiento los provee PROEFEX |

---

## 7. Leads — confirmación

Lo ya confirmado (D17, autorización Fase 2) se registra como aprobado:

| Elemento | Estado |
| -------- | ------ |
| Destino de leads: **Turu CRM** | `APPROVED` (D17) |
| Campos del formulario (los 10 siguientes) | `APPROVED` (D17) |

Campos confirmados:

1. Nombre
2. Apellidos
3. Empresa
4. Cargo
5. Email
6. Teléfono
7. Código de país
8. Servicio (select desde `Service`)
9. Sector (select desde `Sector`)
10. Mensaje

Pendiente únicamente la información técnica de integración (se resuelve en fase posterior, no bloquea la matriz):

| Ítem técnico | Estado |
| ------------ | ------ |
| Endpoint / método de conexión a Turu CRM | `DEFERRED` (fase de integración) |
| Autenticación y credenciales (secretos de entorno de `proefex-api`, nunca en el CMS) | `DEFERRED` |
| Mapeo de campos formulario → CRM | `DEFERRED` |
| Retención y propósito de `form_submissions` | `DEFERRED` (requiere definición legal, §6) |

---

## 8. Media — checklist de entrega

Todo queda `CONTENT_REQUIRED` hasta entrega real (D45: el repositorio no contiene fotografía/video/logo reales de PROEFEX). Formatos y requisitos: `content-architecture.md` §4–5 y `fase-2/media-validation-inventory.md`.

### Brand

| Asset | Estado | Formato |
| ----- | ------ | ------- |
| Logo SVG | `CONTENT_REQUIRED` | Vectorial |
| Logo PNG | `CONTENT_REQUIRED` | Alta resolución |
| Isotipo | `CONTENT_REQUIRED` | SVG |
| Favicon | `CONTENT_REQUIRED` | Multi-tamaño (ico/png) |
| Variantes light/dark | `CONTENT_REQUIRED` | SVG/PNG |

### Home

| Asset | Estado | Notas |
| ----- | ------ | ----- |
| Hero video | `CONTENT_REQUIRED` | Autoplay permitido solo en hero (D41); poster obligatorio |
| Hero poster | `CONTENT_REQUIRED` | Fallback obligatorio del hero video |
| Imágenes editoriales | `CONTENT_REQUIRED` | ≥1920px de ancho |

### TECH

| Asset | Estado |
| ----- | ------ |
| Fotografías | `CONTENT_REQUIRED` |
| Videos | `CONTENT_REQUIRED` |
| Drones | `CONTENT_REQUIRED` |
| IoT | `CONTENT_REQUIRED` |
| Software | `CONTENT_REQUIRED` |
| Ingeniería | `CONTENT_REQUIRED` |

### GROW UP

| Asset | Estado |
| ----- | ------ |
| Campañas | `CONTENT_REQUIRED` |
| Fotografías | `CONTENT_REQUIRED` |
| Videos | `CONTENT_REQUIRED` |
| Piezas gráficas | `CONTENT_REQUIRED` |

### SOLUTIONS

| Asset | Estado |
| ----- | ------ |
| Logos (6 productos) | `CONTENT_REQUIRED` |
| Screenshots | `CONTENT_REQUIRED` |
| Mockups | `CONTENT_REQUIRED` |
| Videos | `CONTENT_REQUIRED` |

### CASES

| Asset | Estado | Notas |
| ----- | ------ | ----- |
| Imágenes | `CONTENT_REQUIRED` | Sin datos de clientes visibles sin autorización |
| Videos | `CONTENT_REQUIRED` | |
| Permisos de publicación | `CONTENT_REQUIRED` | Requisito del gate G4 (`clientVisibility`) |

---

## 9. Case studies — matriz

No se inventan casos ni resultados (mandato §11). `results` solo admite métricas provistas por el cliente (content-architecture §3.5). El nombre del cliente solo se publica si `clientVisibility=public` **y** existe autorización explícita (gate G4).

| Caso | Cliente | Puede publicarse cliente | Sector | Universo | Assets | Resultados | Estado |
| ---- | ------- | ------------------------ | ------ | -------- | ------ | ---------- | ------ |
| (pendiente PROEFEX — no se registran casos de ejemplo) | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` (`public`/`anonymous`) | (de los 8 confirmados, §11) | (uno de los 5 pilares, §1) | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` (solo métricas autorizadas) | `CONTENT_REQUIRED` |

---

## 10. 12+ años — matriz

La cifra "12+ años" está aprobada como narrativa central (D43, Fase 2.3), pero **los datos que la respaldan no existen en el repositorio** y no se inventa historia empresarial. Se solicitan solamente datos verificables. No es necesaria una timeline completa de 12 años.

| Información | Dato | Fuente | Publicable | Estado |
| ----------- | ---- | ------ | ---------- | ------ |
| Año de inicio | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` |
| Hitos relevantes | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` |
| Evolución | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` |
| Productos creados | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` |
| Alianzas / certificaciones publicables | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` |

Notas:

- El año de inicio debe ser verificado por PROEFEX (la línea narrativa 2012→2026 usada en Fase 2 es conceptual, D43; el año exacto no está confirmado como dato).
- Cada hito requiere fuente (documento interno, registro público, certificado) para ser publicable.
- Alianzas/certificaciones solo se publican si existen y se autorizan (incluye Certmind, §12).

---

## 11. Certmind — PROEFEX LEARNS

Registrado explícitamente (confirmado en la autorización de Fase 2, D16):

> **PROEFEX LEARNS: Certmind = Partner Oficial**

Reglas:

- **No se convierte en certificación propia**: Certmind es un partner; PROEFEX no emite certificaciones a nombre propio por este hecho.
- **No se modifica el wording sin aprobación de PROEFEX**: la frase exacta "Partner Oficial" es el único claim autorizado; cualquier variante requiere decisión nueva.
- Catálogo de cursos referenciable: `CONTENT_REQUIRED` (sin LMS; solo catálogo referencial en el CMS).
- Logos de Certmind: `CONTENT_REQUIRED` + `LICENSE_REQUIRED` (confirmar derechos de uso).

---

## 12. Sectores (ocho confirmados)

Los ocho sectores confirmados, sin noveno sector y sin sectores nuevos (mandato §14; coherente con `content-architecture.md` §3.2):

| # | Sector | Estado |
| - | ------ | ------ |
| 1 | Industria | `CONFIRMED` |
| 2 | Salud | `CONFIRMED` |
| 3 | Retail | `CONFIRMED` |
| 4 | Educación | `CONFIRMED` |
| 5 | Servicios | `CONFIRMED` |
| 6 | Minería | `CONFIRMED` |
| 7 | Restaurantes | `CONFIRMED` |
| 8 | Banca y Seguros | `CONFIRMED` |

Los slugs de URL por sector se definen en F3.2 a partir de esta lista (no antes). Descripciones y media por sector: `CONTENT_REQUIRED` (P1, §14).

---

## 13. Prioridades

Clasificación inicial (mandato §16). **Revisable**: PROEFEX puede cambiar prioridades en cualquier momento posterior sin decisión estructural.

### P0 — imprescindible para lanzamiento

- Home
- Cinco universos (TECH, Grow Up, Learns, Equip, Solutions)
- Servicios principales
- Solutions
- Contacto
- Legal
- SEO básico
- Media principal

### P1 — lanzamiento ampliado

- Sectores
- Casos
- Insights
- Autores

### P2 — evolución

- Contenido adicional
- Casos adicionales
- Traducción EN (D4/D51: solo arquitectura preparada; no implementar)
- Contenido avanzado

---

## 14. Definition of Done — estado

| Ítem (mandato §19) | Estado |
| ------------------ | ------ |
| Cinco pilares confirmados | ✔ §1 |
| Seis Solutions documentados para validación | ✔ §2 |
| Ocho sectores confirmados | ✔ §12 |
| Insights preparado | ✔ §3 |
| Authors preparado | ✔ §4 |
| RBAC preparado | ✔ §5 |
| Legal preparado | ✔ §6 |
| Lead fields confirmados | ✔ §7 |
| Media checklist creado | ✔ §8 |
| Cases preparado | ✔ §9 |
| 12+ preparado | ✔ §10 |
| Certmind = Partner Oficial registrado | ✔ §11 |
| Content inventory actualizado | ✔ `docs/content-inventory.md` (matriz por entidad) |
| Prioridades P0/P1/P2 | ✔ §13 |
| D53+ registrados si corresponde | ✔ `docs/decision-register.md` (D53–D57) |

---

## 15. Qué necesita responder PROEFEX (resumen operativo)

Para desbloquear F3.2, en orden de impacto:

1. **Validar la matriz Solutions (§2)**: nombre oficial, URL, descripción, features y estado comercial de los 6 productos (D15).
2. **Aprobar la lista de categorías de Insights (§3)**: requisito para crear el enum y la URL `/insights/[categoria]/[slug]`.
3. **Entregar media Brand + Home (§8)**: logo vectorial, favicon, hero video/poster — desbloquea el cierre visual (D45).
4. **Entregar textos legales y datos de contacto (§6)**: desbloquea LeadForm, `Consent` y schema `LocalBusiness`.
5. **Asignar personas a roles RBAC (§5) y autores (§4)**: desbloquea gobernanza operativa e insights publicables.
6. **Confirmar datos de 12+ años (§10)**: año de inicio y hitos verificables con fuente.
7. **Confirmar casos publicables y permisos de cliente (§9)**.

Mientras estas respuestas no lleguen, el estado permanece en `REQUIRES_PROEFEX_INPUT` y **no se inicia F3.2**.
