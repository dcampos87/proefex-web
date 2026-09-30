# Documento 16 — Performance y Accesibilidad

**Fase:** 0 — Definición
**Estado:** Propuesta para revisión

---

# Parte A — Performance

## 1. Presupuestos (no negociables)

| Métrica | Presupuesto | Medición |
|---|---|---|
| LCP | ≤ 2.5s (p75 móvil real) | RUM + CrUX |
| CLS | ≤ 0.1 | RUM |
| INP | ≤ 200ms | RUM |
| JS bundle inicial | ≤ 180KB gzip | bundle analyzer en CI |
| CSS inicial | ≤ 40KB gzip | CI |
| Peso total primera carga (landing) | ≤ 1.2MB | CI |
| Fuentes | ≤ 2 familias × 2 pesos | — |
| TTFB | < 500ms vía CDN | Cloudflare |

## 2. Estrategias clave

### 2.1 Render y datos
- SSR/ISR: HTML completo desde el servidor; el contenido principal no depende de JS.
- Revalidación on-demand por webhook (no rebuild masivos).
- Sin llamadas cliente-críticas antes de interactividad.

### 2.2 JavaScript
- Server Components por defecto; `"use client"` solo en islas interactivas.
- Code-splitting automático por ruta + dinámico para: partículas, 3D, reproductores, mapas.
- Librerías de animación lazy-loaded cuando el primer gesto de la página no las requiere.
- Tree-shaking estricto; prohibido importar librerías completas para una función.

### 2.3 Imágenes y media
- Reglas completas en Doc 13: AVIF/WebP, srcset, lazy bajo el fold, priority solo en LCP, dimensiones siempre explícitas (CLS=0).
- Video: poster + facade; autoplay de fondo solo lg+ y con pausa por visibilidad.

### 2.4 Fuentes
- Self-hosted (next/font), subsetting latino, `font-display: swap` con size-adjust para minimizar shift.
- Precarga solo de los pesos del hero.

### 2.5 Animaciones GPU-friendly
- Solo `transform`/`opacity` (Doc 12 §1). `will-change` puntual y liberado.
- Canvas/3D pausados fuera de viewport; `IntersectionObserver` obligatorio.
- Long tasks: ninguna animación en el hilo durante hidratación.

### 2.6 CDN y caché
- Cloudflare: HTML con `s-maxage` + `stale-while-revalidate`; assets immutable por hash.
- Cache keys limpias; invalidación por webhook de CMS.

### 2.7 Monitoring
- Lighthouse CI en staging por página clave (presupuestos como aserciones).
- RUM con `web-vitals` → endpoint de analítica propio (muestreado).
- Alerta cuando p75 de CWV se degrada en producción.

## 3. Proceso

Ninguna página se publica sin pasar el checklist de presupuestos en staging con perfil móvil (throttling 4G). Un efecto visual que rompa el presupuesto se rediseña o se restringe por breakpoint, no se "optimiza después".

---

# Parte B — Accesibilidad

## 4. Objetivo

**WCAG 2.2 nivel AA** como criterio de aceptación de todo componente y página.

## 5. Compromisos por área

| Área | Compromiso |
|---|---|
| Contraste | AA (4.5:1 texto, 3:1 textos grandes/UI); validado por token en design system; scrims sobre imagen/video |
| Teclado | Toda función accesible por teclado; orden de tabulación lógico; sin trampas de foco; skip-link al contenido |
| Focus visible | Focus ring 2px de alto contraste en todo lo interactivo; nunca `outline: none` sin reemplazo |
| Estructura | HTML semántico (header/nav/main/section/footer), un H1, jerarquía correcta, landmarks |
| Imágenes | Alt obligatorio en CMS; decorativas con `alt=""` |
| Video | Subtítulos para contenido con habla; transcripción |
| Formularios | Labels reales, errores con `aria-describedby`, foco al primer error, mensajes útiles |
| Navegación | Menús con `aria-expanded/controls`, megamenú operable por teclado, breadcrumbs |
| Motion | `prefers-reduced-motion` respetado globalmente (Doc 12 §7); nada parpadea > 3/s |
| Zoom/Reflow | Usable a 200% zoom y 320px de ancho (reflow) |
| Target size | Mínimo 24×24 (WCAG 2.2), recomendado 44×44 táctil |
| Drag interactions | Ninguna función solo por arrastre sin alternativa |

## 6. Tema oscuro TECH

El universo TECH usa fondo oscuro: los tokens de texto/superficie de TECH se validan con el mismo criterio AA. Nunca se introduce texto gris de bajo contraste "por estética".

## 7. Pruebas

1. **Automatizadas:** axe-core en CI por página clave + linting de a11y en componentes.
2. **Manuales por release:** recorrido por teclado de flujos críticos (nav → servicio → contacto → envío), lectores de pantalla (NVDA/VoiceOver) en páginas nuevas.
3. **Checklist de componente:** todo componente nuevo del design system documenta estados de teclado y screen reader antes de aprobarse.

## 8. Criterio de aceptación global

Una página no está "terminada" si no pasa simultáneamente: presupuestos de performance (§1) + WCAG 2.2 AA (§5) + responsive checklist (Doc 15 §5).
