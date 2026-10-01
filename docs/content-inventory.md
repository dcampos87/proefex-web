# Content Inventory — PROEFEX (D13)

**Estado de la decisión:** `REQUIRES_PROEFEX_INPUT` — **CRÍTICA**
**Regla:** ningún elemento ha sido inventado ni asumido. El equipo PROEFEX debe completar el estado real de cada ítem.

## Estados

| Estado | Significado |
|---|---|
| `AVAILABLE` | Existe y está disponible para usarse en la plataforma |
| `MISSING` | Confirmado que no existe; hay que crearlo o definir que no se publicará |
| `REQUIRES_UPDATE` | Existe pero está desactualizado; requiere revisión |
| `LICENSE_REQUIRED` | Existe pero se debe confirmar la licencia/derechos de uso |
| `UNKNOWN` | No sabemos si existe — requiere respuesta del equipo PROEFEX |

Único criterio aplicado en esta primera versión: lo definido en el brief original se marca `AVAILABLE`; todo lo demás es `UNKNOWN` (no `MISSING`, porque no lo hemos verificado).

---

## 1. Marca

| Elemento | Estado | Notas / Formato requerido |
|---|---|---|
| Logo principal (horizontal) | `UNKNOWN` | SVG preferible |
| Logotipos PROEFEX TECH y GROW UP (si existen como sub-marcas) | `UNKNOWN` | Definir si hay versiones propias por universo |
| Versiones de logo (mono, negativo, favicon) | `UNKNOWN` | SVG/PNG |
| Manual de marca | `UNKNOWN` | PDF o documento |
| Colores de marca | `AVAILABLE` | Definidos en brief: #002254, #F7931E, #D64022, #EFB729, #005A9E, #FFFFFF, #414141 |
| Tipografías (licencias y archivos) | `AVAILABLE` (familia) / `UNKNOWN` (archivos y licencia) | Poppins, Lexend Deca Regular — confirmar licencias de uso web |
| Iconografía existente | `UNKNOWN` | SVG |
| Plantillas/cómiciones comerciales previas | `UNKNOWN` | PDF/presentaciones |

## 2. Servicios

| Elemento | Estado | Notas |
|---|---|---|
| Descripciones de cada servicio TECH (texto) | `UNKNOWN` | Uno por servicio del mapa del sitio |
| Descripciones de servicios Grow Up | `UNKNOWN` | Marketing BPO, Growth, Consultoría |
| Beneficios / diferenciadores por servicio | `UNKNOWN` | Sin claims no confirmables |
| Procesos / metodología (pasos) | `UNKNOWN` | Para bloque Process |
| Materiales comerciales (brochures, presentaciones) | `UNKNOWN` | `LICENSE_REQUIRED` si se reutilizan |
| Precios (si aplica y si se publican) | `UNKNOWN` | Por defecto NO publicar |

## 3. PROEFEX TECH

| Elemento | Estado | Notas |
|---|---|---|
| Fotografías (oficinas, equipos, proyectos) | `UNKNOWN` | Alta resolución, licencia confirmada |
| Vídeos | `UNKNOWN` | Alimenta D5 (inventario: duración, volumen, formato) |
| Screenshots de software/interfaces propias | `UNKNOWN` | Sin datos de clientes visibles sin autorización |
| Proyectos / casos reales disponibles | `UNKNOWN` | Con autorización de cliente si aplica |
| Material de drones / topografía / geodesia | `UNKNOWN` | Fotos y vídeo de campo |
| Material de IoT / infraestructura | `UNKNOWN` | |
| Material de IA / automatización | `UNKNOWN` | Evitar stock genérico |

## 4. Grow Up

| Elemento | Estado | Notas |
|---|---|---|
| Portfolio de trabajos/campañas | `UNKNOWN` | Con autorización de cada marca |
| Piezas creativas (gráfica, redes, video) | `UNKNOWN` | |
| Fotografías propias del equipo/estudio | `UNKNOWN` | Editorial |
| Vídeos / motion reel | `UNKNOWN` | |
| Resultados/casos con métricas autorizadas | `UNKNOWN` | Solo con consentimiento explícito |

## 5. SaaS

| Elemento | Estado | Notas |
|---|---|---|
| Información y descripción de cada producto (Turu CRM, PROEFACT, My Bpass, AtendiGo, Eleventto, Klyra) | `UNKNOWN` | Ver matriz D15 en Doc 19 |
| Logos de cada producto | `UNKNOWN` | |
| Screenshots | `UNKNOWN` | |
| URLs (sitio/app de cada producto) | `UNKNOWN` | |
| Estados comerciales | `UNKNOWN` | No asumir; ver D15 |

## 6. Learning

| Elemento | Estado | Notas |
|---|---|---|
| Texto del partnership con Certmind (claim autorizado) | `UNKNOWN` | Ver checklist D16 |
| Catálogo de cursos referenciable | `UNKNOWN` | |
| Logos Certmind | `UNKNOWN` | `LICENSE_REQUIRED` |
| Enlaces oficiales | `UNKNOWN` | |

## 7. Productos (equipamiento)

| Elemento | Estado | Notas |
|---|---|---|
| Fotografías de producto (pantallas, pizarras, tótems) | `UNKNOWN` | Fondo limpio preferible |
| Fichas técnicas / especificaciones | `UNKNOWN` | |
| Marcas de las que son distribuidores (con autorización para LogoWall) | `UNKNOWN` | |
| Condiciones de alquiler de equipos | `UNKNOWN` | |

## 8. Empresa

| Elemento | Estado | Notas |
|---|---|---|
| Historia / sobre PROEFEX (texto) | `UNKNOWN` | |
| Misión, visión, valores | `UNKNOWN` | |
| Equipo (nombres, cargos, fotos) — opcional | `UNKNOWN` | Solo si PROEFEX decide publicarlo |
| Datos de contacto (email, teléfono, dirección/oficinas) | `UNKNOWN` | **No se inventan** (D17) |
| Redes sociales oficiales | `UNKNOWN` | Para schema `sameAs` |
| Certificaciones / membresías reales | `UNKNOWN` | Solo si existen y se autorizan |

## 9. Legal

| Elemento | Estado | Notas |
|---|---|---|
| Política de privacidad | `UNKNOWN` | Aportada por PROEFEX/legal |
| Política de cookies | `UNKNOWN` | Ligada a D18 |
| Términos y condiciones | `UNKNOWN` | |

---

## Cómo completar este inventario

1. El equipo PROEFEX reemplaza cada `UNKNOWN` por el estado real y adjunta material (o indica `MISSING`).
2. Todo ítem `LICENSE_REQUIRED` debe resolverse **antes** de publicarse en la plataforma.
3. El inventario completado desbloquea: D7/D8 (moodboards con material real), D5 (arquitectura de vídeo), D15 (matriz SaaS), D16 (Learning), y el contenido de Fase 2.

---

## Matriz de contenido por entidad — Fase 3.1 / 3.1.1

Estado de disponibilidad de contenido por entidad del modelo CMS (`docs/fase-3/content-architecture.md`). Gobernanza y detalle: `docs/fase-3/content-governance.md` §8. Matrices de negocio: `docs/fase-3/business-content-decisions.md` (F3.1.1). Sin contenido inventado para completar la matriz.

Estados: `READY` · `CONTENT_REQUIRED` · `IN_REVIEW` · `BLOCKED` (mandato F3.1.1 §15). Prioridad: P0 = imprescindible para lanzamiento · P1 = lanzamiento ampliado · P2 = evolución (revisable por PROEFEX).

| Entidad | Responsable | Contenido disponible | Media disponible | Estado | Prioridad |
|---|---|---|---|---|---|
| Home | PROEFEX (copy final) · Agent Master (estructura) | Parcial (copy conceptual D12) | `CONTENT_REQUIRED` (hero video/poster, editoriales — D45) | IN_REVIEW | P0 |
| TECH | PROEFEX (copy final) · Agent Master (estructura) | Parcial (copy conceptual D12) | `CONTENT_REQUIRED` (fotografía, video, drones, IoT, software — D45) | IN_REVIEW | P0 |
| Grow Up | PROEFEX (copy final) · Agent Master (estructura) | Parcial (copy conceptual D12) | `CONTENT_REQUIRED` (campañas, fotografía, video, piezas — D45) | IN_REVIEW | P0 |
| Learns | PROEFEX | `CONTENT_REQUIRED` (catálogo Certmind referencial, claim "Partner Oficial" D16) | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | P0 |
| Equip | PROEFEX | `CONTENT_REQUIRED` (fichas, marcas, condiciones) | `CONTENT_REQUIRED` (product shots) | `CONTENT_REQUIRED` | P0 |
| Solutions | PROEFEX (matriz §2 de business-content-decisions, D15) | `CONTENT_REQUIRED` (6 productos por validar) | `CONTENT_REQUIRED` (logos, screenshots, mockups, videos) | `CONTENT_REQUIRED` | P0 |
| Sectors | PROEFEX | Parcial (8 sectores confirmados, sin descripciones) | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | P1 |
| Cases | PROEFEX (con autorización de cliente, gate G4) | `CONTENT_REQUIRED` (sin casos registrados) | `CONTENT_REQUIRED` (+ permisos de publicación) | `CONTENT_REQUIRED` | P1 |
| Insights | PROEFEX (categorías §3, autores §4 de business-content-decisions) | `CONTENT_REQUIRED` (categorías PROPOSED, autores pendientes) | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` | P1 |
| Media | PROEFEX (entrega) · Agent Master (integración vía CMS) | `CONTENT_REQUIRED` | `CONTENT_REQUIRED` (checklist completo en business-content-decisions §8) | BLOCKED | P0 |

Lectura:

- `BLOCKED` (Media) = F2.4/D45: sin fotografía/video/logo real de PROEFEX en el repositorio; el sistema de media (D41) está listo para integrarlos.
- `CONTENT_REQUIRED` = PROEFEX debe proveer; no se inventa.
- `IN_REVIEW` = estructura y copy conceptual aprobado como dirección (D12); falta copy comercial definitivo.
