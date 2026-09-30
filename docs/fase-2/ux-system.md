# Fase 2 — Sistema UX

## 1. Navegación (Doc 14 §6, Doc 15 §2.1)

- **Header global**: fijo, 64→56px al scroll con blur/borde (`.is-scrolled`). Logo tipográfico "PROEFEX." (el asset de logo real es `CONTENT_REQUIRED`).
- **lg+**: links inline con subrayado animado desde la izquierda + CTA "Contacto" persistente.
- **sm/md**: overlay fullscreen (`.mobile-nav`) con stagger 60ms/ítem, `role="dialog" aria-modal`, focus trap (Tab cíclico), cierre con Escape (devuelve foco al toggle) y al navegar. CTA Contacto persiste al pie en todos los breakpoints.
- **Fase 2:** los href son anclas de la home (única página). En Fase 3 se sustituyen por rutas del mapa Doc 03 — decisión D23 (PROPOSED).

## 2. Homepage como narrativa (D6)

Orden: Hero Core → Ecosistema (Core) → TECH → Grow Up → Learning → SaaS/Productos → Sectores/Casos → Insights → Contacto. Cada sección comunica una sola idea; el recorrido alterna claro → oscuro → creativo → claro. Detalle: `homepage-spec.md`.

## 3. Formulario de contacto (D17)

Campos exactos: Nombre*, Apellidos*, Empresa, Cargo, Email*, Teléfono* (selector de código de país + número), Servicio* (lista del ecosistema), Sector* (lista del mapa), Mensaje*.

Estados implementados:
- Validación inline con mensajes concretos en español; errores con `role="alert"`, `aria-invalid`, `aria-describedby`.
- Foco automático al primer campo inválido (WCAG 3.3.1).
- Loading ("Enviando…", `role="status"` sr-only) → éxito con check animado y `role="status"` + acción "Enviar otro mensaje".
- Sin `noValidate` nativo silencioso: validación propia accesible.
- **La entrega real a Turu CRM es Fase 3+**; el éxito actual es una simulación etiquetada como tal en la UI.

## 4. Reglas de contenido (no invención)

- Titulares: solo los conceptuales aprobados en D12 (≤12 palabras).
- Cifras/testimonios/casos/clientes: no se renderizan sin datos reales. `StatsSection`, `Testimonial`, `LogoWall` y `CaseStudyCard` tienen estado vacío honesto o `CONTENT_REQUIRED`.
- SaaS: nombres y dominios documentados; descripciones `CONTENT_REQUIRED`; Klyra como "Próximamente" (reservado).
- Learning: banda breve + badge "Certmind — Partner Oficial" (D16); catálogo `CONTENT_REQUIRED`.

## 5. Analytics (D18 — conceptual, sin implementación)

Puntos de medición definidos para Fase 3+ (naming GA4 sugerido, snake_case):

| Evento | Trigger | Componente |
|---|---|---|
| `cta_click` | CTA primario/secundario | Button/CTASection |
| `nav_click` | links header/menú móvil/footer | Header/Footer |
| `universe_section_view` | visibilidad ≥50% de sección de universo | secciones home |
| `form_start` | primer input del formulario | ContactSection |
| `form_error` | validación fallida (por campo) | ContactSection |
| `form_submit` | envío validado | ContactSection |
| `saas_card_click` | card de producto | SaaSShowcase |

Consentimiento: ningún script en Fase 2; la integración GA4 requiere banner/consentimiento (pendiente, Fase 3+; ver D18).

## 6. Estados de UI cubiertos

hover/focus-visible/active/disabled en botones y links; error/loading/éxito en formulario; is-scrolled en header; abierto/cerrado en menú móvil; estados vacíos de contenido. Todo operable por teclado.
