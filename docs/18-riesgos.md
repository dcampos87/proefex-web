# Documento 18 — Riesgos Técnicos y de Producto

**Fase:** 0 — Definición
**Versión:** 2 (revisión Agent Master — incluye riesgos específicos ampliados)
**Estado:** Propuesta para revisión

---

| # | Riesgo | Impacto | Prob. | Mitigación |
|---|---|---|---|---|
| 1 | **La experiencia visual rompe la performance** (partículas, 3D, video, motion) | Alto | Alta | Presupuestos duros (Doc 16), checklist de animación (Doc 12 §8), restricciones por breakpoint; efectos que no pasen presupuesto se descartan, no se "optimizan después" |
| 2 | **CMS sobre-ingenierizado** — construir demasiado editor antes de validar uso | Alto | Media | Fase 1 entrega 3 bloques piloto; validación con usuarios reales del CMS antes de construir el resto; el catálogo de bloques crece por demanda |
| 3 | **CMS sub-ingenierizado** — quedarse corto y acabar editando código para cambiar contenido | Medio | Media | El modelo de bloques cubre las 19 secciones del brief; regla: todo contenido recurrente debe ser administrable |
| 4 | **Contenido real insuficiente** (fotos, textos, casos) — riesgo de caer en placeholders o contenido inventado | Alto | Alta | Dependencias explícitas por fase (Doc 17 §3); el sistema se publica con secciones vacías/ocultas antes que con contenido falso; shotlist fotográfico definido temprano |
| 5 | **TECH y Grow Up se homogenizan** por presión de reutilización de componentes | Alto | Media | Universos como temas separados con revisión de diseño específica; prueba de "¿esto parece Grow Up o parece TECH?" en review |
| 6 | **Complejidad del CMS custom** (Opción A) excede la capacidad de mantenimiento | Medio | Media | Si se aprueba la Opción A: alcance del editor acotado y paquete de esquemas bien testeado; alternativa B documentada (Doc 06 §2) |
| 7 | **Cuatro repos = sobrecarga de coordinación** | Medio | Media | CI/CD automatizado, paquete compartido versionado, convenciones documentadas en infra |
| 8 | **SEO dañado por transiciones y render client-heavy** | Alto | Baja | SSR/ISR obligatorio; contenido en HTML; transiciones solo cosméticas (View Transitions con fallback) |
| 9 | **Dependencia de material de terceros sin licencia** (fotos, videos, iconos) | Medio | Media | Campos de licencia/crédito obligatorios en el CMS (Doc 13 §7); shotlist propio |
| 10 | **Alcance del MVP se expande** ("agreguemos también…") | Medio | Alta | Priorización P0–P3 congelada por fase; cualquier añadido entra al backlog de la fase siguiente |
| 11 | **Accesibilidad del universo oscuro TECH** (grises de bajo contraste "por estética") | Medio | Media | Contraste validado por token, no por ojo (Doc 16 §6) |
| 12 | **Vendor lock-in con Cloudflare/Supabase** | Bajo | Media | Stack estándar (Next.js/Postgres); migración posible documentada; sin soluciones propietarias críticas |
| 13 | **Formularios y spam** en producción pública | Bajo | Alta | Turnstile/honeypot + rate limiting desde el día uno (Doc 07 §7) |
| 14 | **LMS anticipado por presión comercial** antes de estar definido | Medio | Media | Contrato arquitectónico claro (subdominio + API); Learning queda en presentación; la decisión de construir LMS es un proyecto aparte |
| 15 | **Equipo edita prod sin control** (CMS flexible + varios roles) | Medio | Baja | Flujo editorial con revisión, RBAC + RLS, auditoría, ambientes separados (Docs 06 §5, 19) |

## Riesgos aceptados conscientemente

- **Sin contenido inventado**, algunas secciones lanzarán visualmente "vacías" (casos, stats, testimonios): decisión de marca, no defecto.
- **El motion diferenciado por universo** implica mantener dos lenguajes de animación: costo aceptado porque es el diferencial del proyecto.

## Plan de contingencia resumido

| Si ocurre | Entonces |
|---|---|
| Presupuesto CWV imposible con efecto X | Se restringe a lg+ o se reemplaza por versión estática animada con CSS |
| CMS custom se retrasa | Activar Opción B (Payload/Strapi) con el mismo modelo de bloques; el frontend no cambia |
| Contenido no llega | Lanzar por fases con secciones ocultas; no placeholders |

---

## Riesgos v2 — ampliación específica (revisión Agent Master)

Cada riesgo con: probabilidad · impacto · mitigación · responsable · momento de revisión.
Referencia de probabilidad/impacto: Alta / Media / Baja.

| ID | Riesgo | Prob. | Impacto | Mitigación | Responsable | Revisión |
|---|---|---|---|---|---|---|
| R16 | **Exceso de motion** — se acumulan animaciones "porque quedan bien" y degradan INP/legibilidad | Alta | Alto | Inventario de motion con función obligatoria (Doc 12 §1); checklist de aprobación (§8); máx. 1 animación protagonista por viewport; review en dispositivo gama media throttled | Design Lead + Tech Lead | Fin de cada sprint de diseño |
| R17 | **Vídeo pesado** — heroes con vídeo rompen LCP en móvil | Media | Alto | Reglas Doc 13 §4: poster primero, solo lg+, carga tras LCP, pausa por visibilidad, fallback estático en móvil y reduced-motion; D5 `DEFERRED` hasta inventario | Tech Lead | Antes de Fase 2 (hero) |
| R18 | **Dependencia de assets externos** (fotos/vídeos de stock o de terceros sin licencia clara) | Media | Medio | Campos de licencia/crédito obligatorios en CMS (Doc 13 §7); `LICENSE_REQUIRED` bloquea publicación; preferencia por producción propia (shotlists Docs 10–11) | Content Lead | Antes de publicar cada asset; auditoría trimestral |
| R19 | **Falta de contenido real** — secciones vacías retrasan lanzamiento comercial | Alta | Alto | Inventario (content-inventory.md) completado temprano; dependencias por fase (Doc 17 §3); lanzamiento con secciones ocultas antes que placeholders; prohibición de contenido inventado | Product Owner (PROEFEX) | Comités de Fase: inicio de F1, F2 y F3 |
| R20 | **CMS custom demasiado grande** — el editor crece hacia un producto empresarial no solicitado | Media | Alto | Alcance acotado y documentado (Doc 06 §1.1) con lista de exclusiones; validación de 3 bloques piloto antes de construir el resto; cualquier ampliación requiere justificación y aprobación | Tech Lead | Cierre de Fase 1 y de cada fase |
| R21 | **Diferencias visuales entre universos insuficientes** — TECH y Grow Up terminan pareciéndose | Media | Alto | Universos como temas separados; criterio de diferenciación en moodboards (D7/D8); pregunta "¿esto parece TECH o Grow Up?" en cada review de diseño | Design Lead | En cada review de diseño; crítica al elegir moodboards |
| R22 | **Mantenimiento de tres temas** (core/tech/growup) multiplica esfuerzo de QA y regresiones visuales | Media | Medio | Tokens compartidos como única API (Doc 14 §2); componentes con variantes por universo centralizadas; visual regression (screenshots) en CI a partir de Fase 2; Storybook como fuente de verdad | Tech Lead + Design Lead | Fin de cada sprint |
| R23 | **Producción audiovisual insuficiente o tardía** — shotlists definidos pero sin plan de rodaje | Alta | Medio | Shotlists por universo aprobados en Fase 1; plan de producción con calendario en paralelo al desarrollo; banco mínimo viable por universo antes de F2 | Product Owner (PROEFEX) + Content Lead | Cierre de Fase 1 |
| R24 | **Mobile performance degradada** por efectos que solo se probaron en desktop | Media | Alto | Restricciones por breakpoint (Doc 15 §2.4); Lighthouse CI con perfil móvil y throttling; checklist de página (Doc 15 §5) obligatorio; presupuesto CWV en CI | Tech Lead + QA | En cada PR de página; p75 real mensual en producción |
