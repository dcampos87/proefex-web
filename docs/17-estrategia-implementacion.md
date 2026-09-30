# Documento 17 — Estrategia de Implementación

**Fase:** 0 — Definición
**Estado:** Propuesta para revisión

---

## 1. Secuencia general

```text
FASE 0 (actual)   Documentación y decisiones   ← estamos aquí
FASE 1            Cimientos: repos, infra, design system, CMS base
FASE 2            MVP comercial: Home + TECH + Grow Up + Contacto
FASE 3            Catálogo: Productos, SaaS, Sectores
FASE 4            Contenido: Blog, Casos, SEO/GEO hardening
FASE 5            Preparación LMS + automatizaciones (API activa)
```

Cada fase termina en producción funcional (staging → prod) con criterios de salida verificables. No se acumula deuda de "demo".

## 2. Detalle por fase

### FASE 1 — Cimientos
| Entregable | Detalle |
|---|---|
| Repos y CI/CD | 4 repos, pipelines Cloudflare, entornos staging/prod |
| Infraestructura | DNS, Supabase (2 proyectos), Storage, secretos |
| Design system | Tokens, 3 universos, primitivos, sección shell — con Storybook |
| CMS base | Auth + RBAC, editor de bloques, media, preview, 3 bloques piloto (HeroCore, HeroTech, CTA) |
| Paquete compartido | `@proefex/blocks-schema` |

**Salida:** un bloque piloto renderizado en staging desde CMS a web, con motion y reduced-motion funcionando.

### FASE 2 — MVP comercial
- Home con narrativa de universos (Doc 09 §3).
- Landing `/tech` + landings de servicios tech (P0 del mapa).
- Landing `/grow-up` + 3 servicios.
- Contacto con lead → API.
- SEO base: metadatos, sitemap, schema Organization, redirects.
- **Salida:** site navegable en producción con contenido real provisto, CWV en presupuesto.

### FASE 3 — Catálogo
- Productos (4 categorías), SaaS (portfolio + 6 fichas), Sectores (grid + 8 verticales).
- Bloques: ProductShowcase, SaaSShowcase, SectorGrid, FAQ.
- **Salida:** catálogo administrable 100% por CMS.

### FASE 4 — Contenido y visibilidad
- Blog completo (categorías, autores, programación, relacionados).
- Casos (cuando exista contenido real) y testimonials autorizados.
- GEO: FAQPage por servicio/sector, respuestas directas, enlazado interno completo.
- Search Console, analítica con consentimiento.
- **Salida:** blog publicando, schema validado, sitemap dinámico.

### FASE 5 — Ecosistema
- API expandida (eventos, integraciones definidas por el cliente).
- Learning page final + contratos para `learn.proefexperu.com`.
- automatizaciones de leads hacia CRM (según proveedor que defina el cliente).

## 3. Dependencias del cliente (críticas)

| Dependencia | Bloquea | Fase |
|---|---|---|
| Contenido real: textos de servicios, datos de contacto, materiales gráficos/foto-video | Fase 2 completa | 2 |
| Confirmación de motor de CMS y decisiones del Doc 19 | Fase 1 | 1 |
| Aprobación de moodboards/direcciones visuales (Docs 10–11) | Diseño de universos | 1–2 |
| Definición de proveedores de integración (CRM, email) | Fase 5 | 5 |
| Material de casos/testimonios autorizado | Publicación de casos | 4 |

## 4. Metodología

- Trabajo por sprints con demo al final de cada uno.
- Definición de done por página: contenido CMS + CWV + a11y + responsive (criterio de aceptación global, Doc 16 §8).
- Staging siempre desplegado; revisión del cliente en staging, no en capturas.
- QA: revisión manual por dispositivo + Lighthouse CI + axe en CI.

## 5. Post-lanzamiento

- Monitoreo de CWV reales, indexación y errores.
- Ciclo mensual de mejora de contenidos vía CMS (sin depender de desarrollo).
- Backlog continuo de motion/diseño alimentado por métricas de comportamiento.
