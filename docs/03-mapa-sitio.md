# Documento 03 — Mapa Completo del Sitio

**Fase:** 0 — Definición
**Estado:** Propuesta para revisión
**Leyenda:** 🔧 = requiere contenido CMS nuevo · ♻️ = contenido existente reutilizable · ⛔ = no construir en fase 1

---

## 1. Árbol completo

```text
www.proefexperu.com
│
├── / (Home) 🔧
│
├── /nosotros
│   ├── /nosotros (Sobre PROEFEX) 🔧
│   ├── /nosotros/equipo 🔧 (solo con contenido real)
│   └── /nosotros/valores 🔧
│
├── /tech  (área PROEFEX TECH · universo visual TECH) 🔧
│   ├── /tech (landing del área)
│   ├── /tech/desarrollo-a-medida
│   │   ├── /tech/desarrollo-a-medida/web-software
│   │   ├── /tech/desarrollo-a-medida/app-software
│   │   ├── /tech/desarrollo-a-medida/software-especializado
│   │   └── /tech/desarrollo-a-medida/implementacion-de-software
│   ├── /tech/gestion-empresarial
│   │   ├── /tech/gestion-empresarial/crm
│   │   ├── /tech/gestion-empresarial/erp
│   │   ├── /tech/gestion-empresarial/odoo
│   │   └── /tech/gestion-empresarial/correo-corporativo
│   ├── /tech/infraestructura
│   │   ├── /tech/infraestructura/cloud-privado
│   │   ├── /tech/infraestructura/aulas-virtuales
│   │   └── /tech/infraestructura/iot
│   ├── /tech/ia-automatizacion
│   │   ├── /tech/ia-automatizacion/ia-empresarial
│   │   └── /tech/ia-automatizacion/automatizacion-digital
│   ├── /tech/consultoria
│   │   └── /tech/consultoria/transformacion-digital
│   └── /tech/ingenieria
│       ├── /tech/ingenieria/geodesia-topografia-drones
│       └── /tech/ingenieria/iot (alias de infraestructura/iot — resolver duplicidad)
│
├── /grow-up  (marca propia · universo visual Grow Up) 🔧
│   ├── /grow-up (landing del área)
│   ├── /grow-up/marketing-bpo
│   ├── /grow-up/growth-marketing
│   └── /grow-up/consultoria-de-marketing
│
├── /learning 🔧
│   └── /learning (partner Certmind, catálogo referencial) ⛔ LMS propio
│
├── /productos 🔧
│   ├── /productos (catálogo)
│   ├── /productos/pantallas-comerciales
│   ├── /productos/pizarras-interactivas
│   ├── /productos/totems
│   └── /productos/alquiler-de-equipos
│
├── /saas 🔧
│   ├── /saas (portfolio)
│   ├── /saas/turu-crm
│   ├── /saas/proefact
│   ├── /saas/my-bpass
│   ├── /saas/atendigo
│   ├── /saas/eleventto
│   └── /saas/klyra
│
├── /sectores 🔧
│   ├── /sectores (grid de sectores)
│   ├── /sectores/industria
│   ├── /sectores/salud
│   ├── /sectores/retail
│   ├── /sectores/educacion
│   ├── /sectores/servicios
│   ├── /sectores/mineria
│   ├── /sectores/restaurantes
│   └── /sectores/banca-y-seguros
│
├── /casos 🔧 (solo con casos reales aprobados)
│   ├── /casos (listado)
│   └── /casos/[slug]
│
├── /insights (blog) 🔧
│   ├── /insights (listado por categorías/tags)
│   ├── /insights/[categoria]
│   └── /insights/[categoria]/[slug]
│
├── /contacto 🔧
│
├── /legal
│   ├── /legal/terminos
│   ├── /legal/privacidad
│   └── /legal/cookies
│
├── /gracias (post-conversión) 🔧
│
├── admin.proefexperu.com  (CMS — app independiente) ⛔ fuera del mapa público
├── api.proefexperu.com    (API — app independiente)  ⛔ fuera del mapa público
└── learn.proefexperu.com  (LMS futuro) ⛔ fase posterior
```

## 2. Notas sobre el mapa

1. **IoT duplicado:** el brief menciona IoT en ingeniería y en infraestructura. Se propone una sola página canónica (`/tech/infraestructura/iot`) enlazada desde ambas secciones, para evitar contenido duplicado (SEO). *Decisión a validar.*
2. **Casos:** el listado se publica vacío o se oculta hasta existir contenido real; no se inventan casos (Regla 24).
3. **Learning:** página de presentación del área con información del partnership de Certmind provista por el cliente. El LMS (`learn.`) no se construye.
4. **SaaS:** cada producto puede migrar en el futuro a dominio o subdominio propio; la URL actual queda como página canónica gestionada por CMS con redirección configurable.
5. **Search:** se propone una búsqueda simple por colecciones (blog, servicios, productos) en fase 2; no en MVP.

## 3. Priorización para construcción

| Prioridad | Páginas | Justificación |
|---|---|---|
| P0 (MVP) | Home, TECH (área + 6 landings de servicio agrupadas), Grow Up (área + 3 servicios), Contacto, Legales | Núcleo comercial |
| P1 | Productos, SaaS (portfolio + 6 fichas), Sectores (grid + 8 verticales) | Catálogo y verticalización |
| P2 | Insights (blog completo), Casos, Sobre PROEFEX | Contenido, SEO/GEO |
| P3 | Learning, /gracias, búsqueda | Complementos |
