# Fase 2 — Especificación de la Homepage

Archivo: `src/app/page.tsx`. Narrativa continua (D6) — cada acto conecta con el siguiente; los universos son el mensaje.

| # | Acto | Universo | Contenido | Copy (D12, conceptual) |
|---|---|---|---|---|
| 1 | Hero | core | `HeroCore` + badge kicker | "Un solo ecosistema para construir, crecer y aprender." + "Tecnología, ingeniería y creatividad, integradas." |
| 2 | Ecosistema | core | `ServiceGrid` 4 áreas (A Construir / B Crecer / C Aprender / D Entregar) | "Lo que su empresa necesita, funcionando como un sistema." |
| 3 | TECH | tech | `HeroTech` (panel de sistema) + `ServiceGrid` tech 4 módulos numerados `01 / DESARROLLO`… | "Sistemas que se integran. No herramientas que se acumulan." + titulares TECH D12 |
| 4 | GROW UP | growup | `Marquee` (costura de transición) + `HeroCreative` + `ServiceGrid` 3 servicios | "Hacemos crecer marcas." + "El marketing que se nota." |
| 5 | Learning | core | banda split con badge "Certmind — Partner Oficial" (D16) | "Capacitamos a los equipos que operan el cambio" |
| 6 | SaaS + Productos | core (sunken) | `SaaSShowcase` 6 productos + `ServiceGrid` 4 categorías de equipamiento (Doc 03) | — |
| 7 | Sectores × Casos | core | `SectorGrid` 8 sectores + `CaseStudyCard` vacío | — |
| 8 | Insights | core (sunken) | `BlogGrid` con placeholders | — |
| 9 | Contacto | core | `ContactSection` (D17) | "Hablemos de lo que su empresa necesita" |

## Reglas aplicadas

- Un solo H1 (hero); secciones con H2 (`aria-labelledby` en todas).
- Alternancia de fondos (blanco / sunken / oscuro / cálido) como ritmo visual; el corte de universo es intencional.
- Sin cifras, clientes, casos ni testimonios inventados; evidencia = estado vacío o `CONTENT_REQUIRED`.
- Anclas `#tech`, `#grow-up`, `#saas`, `#contacto`… con `scroll-margin-top` compensado por el header.
- Mobile-first: grids colapsan (1→2→3 cols), composición Grow Up simplificada sin perder asimetría.

## Variante TECH de hero (arquitectura preparada)

`HeroTech` es autónomo y puede usarse como hero de la futura `/tech` (Doc 10 §4) con `enableParticles`/video del schema cuando D5 se cierre. Ídem `HeroCreative` para `/grow-up`.
