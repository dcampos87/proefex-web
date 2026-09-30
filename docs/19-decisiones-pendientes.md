# Documento 19 — Decisiones (v2 — Revisión Agent Master)

**Fase:** 0 — Definición
**Versión:** 2 (segunda revisión de Fase 0)
**Estado global de Fase 0:** `READY_FOR_HUMAN_APPROVAL` (no aprobada automáticamente)

---

## 0. Principio de gobernanza

La documentación 01–18 es una **PROPUESTA**. Ninguna decisión está aprobada automáticamente. Estados utilizados:

| Estado | Significado |
|---|---|
| `APPROVED_PENDING_HUMAN_CONFIRMATION` | Dirección decidida tras revisión; requiere confirmación humana formal |
| `REQUIRES_PROEFEX_INPUT` | Bloqueada hasta recibir información real del equipo PROEFEX |
| `PROPOSED` | Propuesta abierta, aún no evaluada a fondo |
| `DEFERRED` | Pospuesta conscientemente hasta tener datos (no bloquea lo demás) |
| `REJECTED` | Descartada |

Regla: **no se inventa información para cerrar una decisión.** Lo que falte se marca `REQUIRES_PROEFEX_INPUT`.

## 1. Tabla maestra

| ID | Decisión | Estado | Fase máx. de cierre |
|---|---|---|---|
| D1 | Motor del CMS (alcance acotado) | `APPROVED_PENDING_HUMAN_CONFIRMATION` | Antes de iniciar Fase 1 |
| D2 | Capa API: Cloudflare Workers + Hono | `APPROVED_PENDING_HUMAN_CONFIRMATION` | Antes de iniciar Fase 1 |
| D3 | URL del blog `/insights/[categoria]/[slug]` | `APPROVED_PENDING_HUMAN_CONFIRMATION` | Antes de iniciar Fase 1 |
| D4 | i18n: español inicial, preparado para `/en/` | `APPROVED_PENDING_HUMAN_CONFIRMATION` | Antes de iniciar Fase 1 |
| D5 | Arquitectura de vídeo | `DEFERRED` | Antes de Fase 2 (hero) / Fase 3 |
| D6 | Narrativa de home (recorrido por universos) | `APPROVED_PENDING_HUMAN_CONFIRMATION` | Antes de iniciar Fase 1 |
| D7 | Dirección visual TECH (moodboards) | `REQUIRES_PROEFEX_INPUT` | Durante Fase 1 (diseño) |
| D8 | Dirección visual Grow Up (moodboards) | `REQUIRES_PROEFEX_INPUT` | Durante Fase 1 (diseño) |
| D9 | 3D en hero TECH: no por defecto | `APPROVED_PENDING_HUMAN_CONFIRMATION` | Antes de iniciar Fase 1 |
| D10 | IoT: URL canónica única | `APPROVED_PENDING_HUMAN_CONFIRMATION` | Antes de iniciar Fase 1 |
| D11 | Tipografía mono (muestra restringida) | `REQUIRES_PROEFEX_INPUT` | Durante Fase 1 (diseño) |
| D12 | Copy: validación con 10 titulares | `REQUIRES_PROEFEX_INPUT` | Durante Fase 1 (diseño) |
| D13 | Inventario de contenido | `REQUIRES_PROEFEX_INPUT` | Crítico antes de Fase 2; no bloquea infra de Fase 1 |
| D14 | Roles RBAC activos iniciales | `APPROVED_PENDING_HUMAN_CONFIRMATION` | Antes de iniciar Fase 1 |
| D15 | Estado de los productos SaaS | `REQUIRES_PROEFEX_INPUT` | Antes de Fase 3 |
| D16 | Learning / Certmind | `REQUIRES_PROEFEX_INPUT` | Antes de Fase 3 (página Learning) |
| D17 | Contacto y leads | `REQUIRES_PROEFEX_INPUT` | Antes de Fase 2 (formularios) |
| D18 | Analítica y consentimiento | `REQUIRES_PROEFEX_INPUT` | Antes del lanzamiento de Fase 2 |

---

## 2. Detalle por decisión

### D1 — Motor del CMS — `APPROVED_PENDING_HUMAN_CONFIRMATION`

- **Decisión actual:** custom Next.js + Supabase.
- **Evaluación Agent Master:** dirección correcta, pero el alcance anterior era ambiguo y podía interpretarse como "CMS empresarial completo desde cero". Se acota.
- **Recomendación:** mantener la recomendación con **alcance acotado** (ver Doc 06 §1.1): páginas, bloques estructurados, media, SEO, blog, categorías, autores, navegación, configuración global, formularios, usuarios, roles, publicación, preview. Futuras solo bajo demanda: workflow avanzado, DAM, traducción avanzada, personalización, automatización editorial. **Límite documentado: nunca un page builder libre tipo Elementor.**
- **Impacto:** define el 100% del trabajo de Fase 1.
- **Información requerida:** confirmación humana formal.
- **Fase máx. de cierre:** antes de iniciar Fase 1.

### D2 — Capa API: Cloudflare Workers + Hono — `APPROVED_PENDING_HUMAN_CONFIRMATION`

- **Evaluación:** coherente con el hosting y el edge; sin contras relevantes para el alcance actual.
- **Documentación requerida (ya cubierta en Doc 07, confirmada):** responsabilidades (leads, integraciones, webhooks, automatizaciones), límites (no duplica lógica editorial del CMS), autenticación (token de servicio / JWT Supabase), autorización (permisos server-side + RLS como última barrera), validación (Zod compartido), rate limiting (edge + fino en API), integraciones (con proveedores que defina PROEFEX).
- **Impacto:** bajo; migración futura a servicio Node posible.
- **Fase máx. de cierre:** antes de iniciar Fase 1.

### D3 — URL del blog `/insights/[categoria]/[slug]` — `APPROVED_PENDING_HUMAN_CONFIRMATION`

- **Evaluación:** patrón válido; exige reglas operativas claras.
- **Reglas documentadas:**
  - **Canonical:** absoluta, en la URL con categoría; cambia de categoría ⇒ cambia URL ⇒ redirect 301 automático desde el CMS (tabla `redirects`).
  - **Cambio de categoría:** genera 301 y actualización de sitemap; prohibido dejar la URL antigua viva.
  - **Slug:** estable e independiente de la categoría; la categoría es metadato + prefijo de URL.
  - **Sitemap:** solo la URL canónica actual; sin URLs con parámetros.
  - **Breadcrumbs:** Insights → Categoría → Post, con `BreadcrumbList` schema.
  - **Schema:** `Article` con `articleSection` = categoría.
- **Riesgo aceptado:** recategorizar posts genera redirects (costo operacional menor).
- **Fase máx. de cierre:** antes de iniciar Fase 1 (afecta templates y sitemap).

### D4 — i18n — `APPROVED_PENDING_HUMAN_CONFIRMATION`

- **Evaluación:** español primero evita complejidad innecesaria; la preparación para `/en/` futuro es solo arquitectónica (URLs, modelo de campos traducibles, `hreflang` placeholder en documentación).
- **Recomendación:** NO implementar traducción; NO introducir librerías i18n ahora.
- **Fase máx. de cierre:** antes de iniciar Fase 1.

### D5 — Arquitectura de vídeo — `DEFERRED`

- **Cambio respecto a v1:** ya no se propone Supabase Storage como solución obligatoria para todo vídeo. Arquitectura diferenciada (Doc 13 §8):
  - **Assets generales** (imágenes, SVG, documentos): Supabase Storage + Cloudflare transform.
  - **Vídeo:** servicio especializado (Cloudflare Stream, CDN especializada o equivalente) **cuando el volumen y uso lo justifiquen**.
- **No se decide proveedor definitivo** hasta el inventario audiovisual real (`content-inventory.md`).
- **Especificación ya definida (independiente del proveedor):** vídeo hero (solo lg+, muted, poster, pausa por visibilidad), clips cortos, vídeos largos, poster obligatorio, lazy loading, facade con thumbnail, responsive, mobile fallback (poster estático), compresión (presupuestos Doc 13), accesibilidad (subtítulos si hay habla).
- **Impacto si se difiere:** no bloquea Fase 1; bloquea la implementación del hero con vídeo de Fase 2 (puede lanzarse con poster estático).
- **Información requerida:** inventario de vídeo (duración, volumen, formato, licencias).

### D6 — Narrativa de home — `APPROVED_PENDING_HUMAN_CONFIRMATION`

- **Decisión actual:** recorrido por universos: Hero → TECH → Grow Up → Learning → SaaS + Productos → Sectores + Casos → Insights → Contacto.
- **Evaluación:** la estructura queda **conceptualmente aprobada**, con una condición explícita: la home NO es una sucesión de bloques, sino una **narrativa continua**. Requisitos de diseño:
  - **Transición entre universos** como momento firma (wash de tema, Doc 12 §3.5).
  - Cambio de **color** gradual o por transición de tema, nunca corte seco entre universos.
  - Cambio de **densidad visual** (respiro entre actos).
  - Cambio de **motion** (ritmo TECH preciso vs ritmo Grow Up elástico).
  - Cambio de **lenguaje fotográfico** coherente con cada universo (Docs 10–11).
  - Cambio de **composición** (modular TECH vs editorial Grow Up).
  - **Continuidad de navegación:** header/indicador de universo persiste; el usuario nunca se siente perdido.
- **Criterio de éxito:** el usuario percibe que recorrió un ecosistema PROEFEX, no "8 bloques independientes". Se validará en revisión de diseño de Fase 1.
- **Fase máx. de cierre:** antes de iniciar Fase 1 (define la home y el sistema de transiciones).

### D7 — Dirección visual TECH — `REQUIRES_PROEFEX_INPUT`

- **Evaluación:** no puede seleccionarse una dirección definitiva sin que los moodboards existan y sean revisados por PROEFEX.
- **Requisito para Fase 1 (primer entregable de diseño):** **dos propuestas visuales claramente diferenciadas**. Cada moodboard debe mostrar, aplicado sobre contenido real de marca (no imágenes de referencia sueltas):
  color · tipografía · fotografía · vídeo · composición · UI · textura · iluminación · motion (referencia animada) · hero · sección interior · mobile · transición.
- **Objetivo:** que el equipo PROEFEX pueda **elegir** una dirección, no validar una impuesta.
- **Fase de cierre:** durante Fase 1 (diseño), antes de construir componentes TECH.

### D8 — Dirección visual Grow Up — `REQUIRES_PROEFEX_INPUT`

- **Mismo nivel de profundidad que D7:** dos propuestas diferenciadas, cada una mostrando: fotografía · composición · tipografía · color · collage · motion · hero · sección · mobile · transición.
- **Criterio extra:** las dos direcciones deben demostrar suficiente distancia respecto a TECH (anti-homogeneización, riesgo 5 del Doc 18).
- **Fase de cierre:** durante Fase 1 (diseño).

### D9 — 3D en hero TECH — `APPROVED_PENDING_HUMAN_CONFIRMATION`

- **Decisión:** 2D/parallax inicialmente. No 3D pesado por defecto.
- **Condiciones para introducir 3D posteriormente (todas obligatorias):** pieza visual justificada · performance medida · sin perjuicio de Core Web Vitals · fallback estático · estrategia mobile definida.
- **Fase máx. de cierre:** antes de iniciar Fase 1.

### D10 — IoT — `APPROVED_PENDING_HUMAN_CONFIRMATION`

- **Decisión:** URL canónica única `/tech/infraestructura/iot`, con doble entrada de navegación permitida. Requisitos: una única página canónica, canonical correcto, breadcrumbs coherentes, internal linking desde ambas áreas.
- **Fase máx. de cierre:** antes de iniciar Fase 1.

### D11 — Tipografía mono — `REQUIRES_PROEFEX_INPUT`

- **Cambio respecto a v1:** no se aprueba automáticamente JetBrains Mono.
- **Proceso:** presentar muestras dentro del sistema visual TECH: JetBrains Mono · IBM Plex Mono · Source Code Pro (u otra equivalente) — con pesos y tamaños reales sobre componentes.
- **Uso restringido (si aporta valor):** etiquetas, metadatos, datos técnicos, pequeños elementos UI. **No** convertir TECH en una estética puramente "developer": el mono no se usa en titulares ni en texto corrido.
- **Fase de cierre:** durante Fase 1 (diseño).

### D12 — Copy — `REQUIRES_PROEFEX_INPUT`

- **Decisión:** validar tono con titulares conceptuales antes de escribir copy definitivo. Los siguientes **no son copy definitivo**; sirven para validar tono, personalidad, nivel de tecnicismo, creatividad y claridad comercial. No inventan claims comerciales no confirmados.

**PROEFEX Core (3):**
1. "Un solo ecosistema para construir, crecer y aprender."
2. "Tecnología, ingeniería y creatividad, integradas."
3. "Lo que su empresa necesita, funcionando como un sistema."

**PROEFEX TECH (4):**
1. "Software hecho a la medida de su operación."
2. "IA y automatización, dentro de su negocio."
3. "Ingeniería con drones: el territorio, en datos."
4. "Sistemas que se integran. No herramientas que se acumulan."

**Grow Up (3):**
1. "Hacemos crecer marcas."
2. "Estrategia, contenido y creatividad en movimiento."
3. "El marketing que se nota."

- **Fase de cierre:** durante Fase 1 (diseño/copy), antes de escribir el copy completo del sitio.

### D13 — Inventario de contenido — `REQUIRES_PROEFEX_INPUT` · **CRÍTICA**

- **Acción ejecutada:** creado `docs/content-inventory.md` con las 9 categorías (Marca, Servicios, TECH, Grow Up, SaaS, Learning, Productos, Empresa, Legal) y estados `AVAILABLE` / `MISSING` / `REQUIRES_UPDATE` / `LICENSE_REQUIRED` / `UNKNOWN`.
- **Regla:** ningún elemento fue asumido; todo lo no confirmado queda `UNKNOWN` salvo los definidos en el brief (colores y tipografías → `AVAILABLE`).
- **Impacto:** crítica para diseño y contenido; **no bloquea** la infraestructura de Fase 1 (ver Doc `phase-1-readiness.md`).
- **Fase de cierre:** lo antes posible; bloqueante real para Fase 2 completa.

### D14 — Roles RBAC activos iniciales — `APPROVED_PENDING_HUMAN_CONFIRMATION`

- **Propuesta (sin cambios):** activar en Fase 1: `SUPER_ADMIN`, `ADMIN`, `EDITOR`, `AUTHOR`, `SEO_MANAGER`. Diseñar (no activar): `MARKETING`, `SALES` (Fase 2), `INSTRUCTOR`, `LMS_ADMIN` (Fase LMS).
- **Información requerida:** nombres de personas por rol (puede cerrarse en Fase 1, antes del acceso al CMS).
- **Fase máx. de cierre:** antes del despliegue de admin a usuarios (Fase 1).

### D15 — Estado de los productos SaaS — `REQUIRES_PROEFEX_INPUT`

- **Matriz a completar por PROEFEX** (no asumir ningún estado):

| Campo | Turu CRM | PROEFACT | My Bpass | AtendiGo | Eleventto | Klyra |
|---|---|---|---|---|---|---|
| Descripción | ? | ? | ? | ? | ? | ? |
| Categoría | ? | ? | ? | ? | ? | ? |
| Estado (Disponible/Beta/En desarrollo/Próximamente/Interno/No publicar) | ? | ? | ? | ? | ? | ? |
| ¿Disponible públicamente? | ? | ? | ? | ? | ? | ? |
| URL | ? | ? | ? | ? | ? | ? |
| Logo | ? | ? | ? | ? | ? | ? |
| Screenshots | ? | ? | ? | ? | ? | ? |
| CTA (a dónde lleva) | ? | ? | ? | ? | ? | ? |
| Documentación | ? | ? | ? | ? | ? | ? |
| Contacto comercial | ? | ? | ? | ? | ? | ? |

- **Fase de cierre:** antes de Fase 3 (catálogo SaaS).

### D16 — Learning / Certmind — `REQUIRES_PROEFEX_INPUT`

- **Checklist de información requerida** (nada asumido):
  - [ ] Alcance real del partnership: ¿qué significa ser partner de Certmind? (autorización para el claim textual)
  - [ ] Listado de cursos a referenciar (¿cuáles, con qué textos?)
  - [ ] ¿Enlaces directos a Certmind o a una futura página propia?
  - [ ] ¿Materiales: logos de Certmind (con autorización), fotos, brochures?
  - [ ] ¿Se publican precios, fechas o certificaciones? (por defecto: no)
  - [ ] Canal de contacto para consultas de formación
- **Fase de cierre:** antes de Fase 3 (página Learning completa; el placeholder puede existir antes).

### D17 — Contacto y leads — `REQUIRES_PROEFEX_INPUT`

- **Propuesta inicial de formulario (marcada como PROPUESTA, sujeta a validación):**
  nombre · empresa · email · teléfono · sector (selector desde colección Sectores) · servicio de interés (opcional) · mensaje · consentimiento de privacidad (obligatorio).
- **Información requerida a PROEFEX:**
  - [ ] Destino del lead (email receptor — **no se inventa**)
  - [ ] CRM futuro al que enviar leads (o ninguno en Fase 1)
  - [ ] Texto de política de privacidad (aportado por PROEFEX/legal)
  - [ ] Confirmación de protección anti-spam propuesta (Turnstile + honeypot + rate limiting)
  - [ ] Validación de mensajes de éxito/error propuestos
- **Fase de cierre:** antes de Fase 2 (formularios de contacto).

### D18 — Analítica y consentimiento — `REQUIRES_PROEFEX_INPUT`

- **Propuesta de arquitectura de medición (sin implementar):**
  - Eventos base: `page_view`, `form_submit`, `cta_click`, `section_view` (home), `navigation_universe_change` (transiciones de universo), `outbound_click`.
  - Campañas: parámetros UTM normalizados.
  - Conversiones: envío de formulario, clic a CTA de SaaS/productos.
  - Consentimiento: banner categorizado (necesarias / analíticas), sin cargas antes del consentimiento, política de cookies gestionada desde CMS.
- **Herramientas a evaluar (comparativa en Fase 1, decisión antes del lanzamiento F2):** GA4 · Plausible/Umami (self-hosted, menor carga de privacidad) · Cloudflare Web Analytics.
- **Información requerida:** preferencia de herramienta, política de cookies de PROEFEX, jurisdicción de referencia para privacidad.
- **Fase de cierre:** antes del lanzamiento de Fase 2.

---

## 3. Protocolo de aprobación

Para cada decisión: `Aprobada [opción]` · `Modificada [detalle]` · `Pospuesta [hasta cuándo]` · `Bloqueada [por qué]`.

**Bloqueantes para iniciar Fase 1:** D1, D2, D3, D4, D6, D9, D10, D14 (confirmación humana).
**Cerrables durante Fase 1 con input PROEFEX:** D7, D8, D11, D12.
**No bloquean Fase 1 (infraestructura puede avanzar sin ellas):** D5, D13, D15, D16, D17, D18 — pero D13 y D17 son bloqueantes para el **lanzado completo** de Fase 2.

**Registro vivo:** `docs/decision-register.md`.
