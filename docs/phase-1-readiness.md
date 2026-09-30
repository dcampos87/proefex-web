# Fase 1 Readiness — PROEFEX

**Estado de Fase 0:** `READY_FOR_HUMAN_APPROVAL` (pendiente de aprobación humana; no aprobada automáticamente)

---

## ¿Qué está listo?

| Área | Estado |
|---|---|
| Documentación Fase 0 (19 documentos + inventario + registro + este doc) | ✅ Coherente tras auditoría (ver Anexo A) |
| Arquitectura técnica (Docs 01, 07) | ✅ Propuesta completa, sin contradicciones bloqueantes |
| Arquitectura de información, mapa y URLs (Docs 02–04) | ✅ Propuesta completa (D10 cerrada: IoT canónico) |
| Modelo de contenidos y esquema de bloques (Doc 05) | ✅ Propuesta completa |
| Alcance del CMS acotado (Doc 06 §1.1) | ✅ Límite explícito documentado |
| Dirección creativa y universos (Docs 09–11) | ✅ Conceptos definidos; **pendiente moodboards** (D7/D8) |
| Motion, media, design system, responsive, performance/a11y (Docs 12–16) | ✅ Propuestas completas; D5 vídeo `DEFERRED`, D11 mono abierta |
| Decisiones clasificadas (Doc 19 v2 + decision-register) | ✅ D1–D18 con estado, responsable y próxima acción |
| Inventario de contenido (content-inventory.md) | ✅ Creado — pendiente de completar por PROEFEX |
| Riesgos con probabilidad/impacto/mitigación/responsable/revisión (Doc 18 v2) | ✅ Ampliados |

## ¿Qué está bloqueado?

| Bloqueo | Por qué | Qué desbloquea resolverlo |
|---|---|---|
| Aprobación humana de Fase 0 | Requisito de gobernanza | Todo: ninguna tarea de Fase 1 comienza antes |
| D7/D8 (moodboards TECH y Grow Up) | Requieren producción de diseño + elección PROEFEX | Componentes de universo, diseño de páginas |
| D13 (inventario de contenido) | Requiere respuesta del equipo PROEFEX | Contenido real de páginas (no bloquea infra) |
| D5 (proveedor de vídeo) | Requiere inventario audiovisual | Hero con vídeo de Fase 2 (puede lanzarse con poster) |
| D17 (destino de leads + legales) | Requiere datos reales de contacto y textos legales | Formularios en producción |

## ¿Qué requiere información PROEFEX?

1. **Inventario de contenido** (`content-inventory.md`) — crítico.
2. **Elección de dirección visual** TECH y Grow Up (una vez producidos los moodboards).
3. **Matriz SaaS** (D15): estado, URLs, logos de los 6 productos.
4. **Checklist Learning/Certmind** (D16).
5. **Contacto**: email receptor de leads, CRM destino, política de privacidad, textos legales (D17).
6. **Analítica**: herramienta preferida y política de cookies (D18).
7. **Asignación de personas a roles RBAC** (D14).

## ¿Qué puede empezar en Fase 1 (tras aprobación humana)? — NO ejecutar aún

Estas tareas **no dependen** de las decisiones de contenido (D13, D15, D16, D17) ni de los moodboards:

1. Creación de repositorios (`proefex-web`, `proefex-cms`, `proefex-api`, `proefex-infrastructure`) y CI/CD.
2. Ambientes staging/prod y DNS en Cloudflare (www, admin, api, staging).
3. Proyectos Supabase (staging + prod): PostgreSQL, Auth, Storage; migraciones iniciales del modelo Doc 05.
4. Estructura de seguridad: RLS, RBAC, gestión de secretos, rate limiting base.
5. Paquete compartido `@proefex/blocks-schema` (esquemas Zod de bloques).
6. Design system: tokens y primitivos (independientes del moodboard elegido; los temas por universo se afinan después).
7. Producción de los **moodboards** TECH y Grow Up (primer entregable de diseño, alimenta D7/D8).
8. Comparativa de herramientas de analítica (D18).
9. Presentación de muestras de tipografía mono (D11).

## ¿Qué NO debe empezar?

1. ❌ Diseño final de páginas por universo (antes de moodboards aprobados).
2. ❌ Contenido de páginas (textos, copys) — depende de D12 y del inventario.
3. ❌ Implementación de formularios en producción (D17 sin cerrar).
4. ❌ Hero con vídeo (D5 diferida; poster estático como fallback).
5. ❌ Implementación de analítica (D18 sin cerrar).
6. ❌ Cualquier desarrollo del LMS o de `learn.proefexperu.com`.
7. ❌ Catálogo SaaS/Products/sectores completo (D15 sin cerrar).
8. ❌ Publicación de secciones con contenido ficticio (prohibido por las reglas de Fase 0).

## ¿Qué decisiones deben aprobarse antes de infraestructura?

Confirmación humana formal de: **D1 (CMS acotado), D2 (Workers+Hono), D3 (URL blog), D4 (i18n), D6 (narrativa home), D9 (sin 3D), D10 (IoT canónico), D14 (roles)** — más las confirmaciones arquitectónicas A1–A8 del decision register.

## Regla de desbloqueo parcial

La falta de contenido (D13) **no bloquea toda la Fase 1**: infraestructura, seguridad, esquemas y design system avanzan en paralelo mientras PROEFEX completa el inventario. El contenido es bloqueante solo para el **lanzamiento completo de Fase 2**.

---

## Anexo A — Auditoría de consistencia (Docs 01–18)

Auditoría realizada sobre arquitectura (Next.js, Supabase, Cloudflare, API, CMS, Storage, Auth, RLS, RBAC, dominios, staging, SEO, GEO, media, motion, responsive) y sobre coherencia de diseño (Docs 09–16).

| # | Hallazgo | Severidad | Resolución aplicada |
|---|---|---|---|
| 1 | Doc 01/13 daban a entender Supabase Storage como solución única de vídeo; Doc 19 v1 lo dejaba a decisión futura | Menor | Resuelto: arquitectura de media diferenciada (Doc 13 §8), D5 `DEFERRED`, Doc 01 actualizado |
| 2 | "CMS custom" podía interpretarse como CMS empresarial completo | Medio | Resuelto: límite de alcance explícito (Doc 06 §1.1), lista de exclusiones |
| 3 | Ambigüedad de flujo de publicación: Doc 06 (CMS → webhook → web) vs Doc 07 (`api/v1/webhooks/cms/publish`) | Menor | Resuelto: flujo único CMS → api → revalidación web (A5 en decision-register); Doc 06 §3 ya describe el webhook service, Doc 07 el endpoint receptor — coherentes bajo esa lectura, ahora explícita |
| 4 | Doc 14 dejaba la fuente mono "a definir" mientras Doc 19 v1 sugería JetBrains Mono | Menor | Resuelto: D11 `REQUIRES_PROEFEX_INPUT` con muestras y uso restringido |
| 5 | Doc 12 §3.7 permite video de fondo y Doc 16 lo restringe a lg+ | Ninguna (no contradicción) | Confirmado: Doc 12 ya contiene la restricción; sin cambio |
| 6 | Contraste de tokens TECH/GrowUp marcados "a validar" en Doc 14 | Nota | Pendiente de validación con herramienta de contraste en Fase 1 (tarea de design system) |
| 7 | Doc 05 definía `available` para SaaS; Doc 19 v2 define estados más finos (Beta/En desarrollo/Próximamente/Interno/No publicar) | Menor | Resuelto: el enum de `saas_products.status_provisional` se alineará con la matriz D15 en Fase 1 |
| 8 | Doc 03 mapa incluía búsqueda en "fase 2" del sitio mientras Doc 08 §3 contempla `SearchAction` condicional | Ninguna | Coherentes (búsqueda opcional futura); sin cambio |

**Verificación de diseño (Docs 09–16):** los tres universos comparten sistema común (tokens semánticos, tipografías base, accesibilidad, grilla, motion tokens) con diferenciación suficiente documentada por universo (color, tipografía, composición, motion, fotografía). Riesgo de homogeneización cubierto por riesgo #5 del Doc 18 y por el criterio extra de D8.

**Verificación de performance (instrucción 26):** ningún elemento visual aprobado contradice los presupuestos: hero video solo lg+ con poster/facade (Doc 12/13/16), partículas con límites y pausa (Doc 10/12), 3D excluido por defecto (D9), JS inicial ≤ 180KB con librerías de animación ≤ 45KB (Doc 12/16), fuentes self-hosted con subsetting (Doc 16), imágenes con pipeline AVIF/WebP (Doc 13). Referencias mantenidas: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms.

**Verificación de accesibilidad (instrucción 27):** WCAG 2.2 AA es criterio de aceptación global (Doc 16) y `prefers-reduced-motion` forma parte del sistema desde el diseño (Doc 12 §7, Doc 14/16), no como añadido posterior. Sin cambios requeridos.
