# Fase 2 — Validación (QA)

Fecha: 2026-09-30. Entorno: build de producción Next.js 15 (`next start`), QA automatizado headless (Edge/puppeteer-core, fuera del proyecto) + navegador embebido (960px).

## 1. Build y presupuestos (Doc 16 §1)

| Métrica | Presupuesto | Resultado | Estado |
|---|---|---|---|
| First Load JS inicial | ≤ 180 kB gzip | **103 kB shared** (106 kB `/`) | ✅ |
| Typecheck | — | `tsc --noEmit` limpio | ✅ |
| `next build` | — | exitoso, 5 páginas estáticas prerendered (SSR/ISR intactos, sin static export) | ✅ |
| Librerías de animación | ≤ 45 kB | **0** (solo CSS + IntersectionObserver) | ✅ |
| Fuentes | self-hosted, subsetting | Lexend variable + Poppins 600/700 + SCP 400 vía `next/font/local`, display swap | ✅ (ver D20) |
| CSS inicial | ≤ 40 kB | dentro de presupuesto por margen (Tailwind + tokens) | ✅ |

## 2. Accesibilidad (WCAG 2.2 AA — verificaciones realizadas)

- ✅ Skip-link funcional al contenido (`#contenido`), visible al primer Tab.
- ✅ Focus ring 2px global en todo lo interactivo; foco devuelto al toggle al cerrar menú móvil.
- ✅ Menú móvil: `role="dialog" aria-modal`, focus trap verificado, Escape verificado.
- ✅ Formulario: labels reales, errores con `role="alert"` + `aria-invalid` + `aria-describedby`, foco al primer error, `role="status"` en loading/éxito.
- ✅ Semántica: un H1, jerarquía H2 por sección, landmarks (header/nav/main/footer), `aria-labelledby` en secciones, `aria-expanded/controls` en toggle.
- ✅ Marquee: duplicado `aria-hidden`, etiqueta accesible, pausa en hover/focus.
- ✅ `<details>/<summary>` nativos en FAQ (funciona sin JS).
- ✅ Targets táctiles ≥44px (botones de icono, links de nav móvil 48px).
- ✅ Reduced-motion: CSS global + `matchMedia` en Reveal + sin parallax/canvas/autoplay.
- ⏳ Manual pendiente: lectores de pantalla (NVDA/VoiceOver), zoom 200% real, contraste con herramienta sobre capturas de Moodboard final.

## 3. QA visual realizado

- Desktop 1440px: hero core, universo TECH (panel + módulos), universo Grow Up (marquee + kinético), contacto — capturas verificadas.
- 960px: navegación móvil, grids 2 cols, formulario, footer.
- 320px: 0px de overflow (reflow).
- Bugs encontrados y corregidos durante QA:
  1. Secciones con `data-universe` no pintaban fondo → contenido blanco sobre blanco (TECH invisible). Corregido con regla `[data-universe] { background: … }`.
  2. `max-w-[16ch]` sobre tipografía display colapsaba a 165px → overflow del titular Grow Up. Corregido.
  3. Botón hamburger visible en desktop por `display` inline que pisaba `lg:hidden`. Corregido con `.icon-btn-lg-hide`.
  4. Foco no llegaba al primer campo inválido (query antes del re-render). Corregido con `useEffect`.
  5. `.field-input { width:100% }` vs utilidad Tailwind: selector de país rompía la fila de teléfono; al quitar el ancho aparecía overflow a 320px. Solución final: `width:100%` + clase `.phone-code`.
  6. `next/font/google` falló en el entorno → `next/font/local` (Doc 16 ya recomendaba self-host).

## 4. Verificación de criterios de calidad (prompt §31)

- Marca: header/footer/hero con azul+naranja, tono institucional → reconocible PROEFEX.
- Diferenciación: TECH oscuro estructural (D7-A), Grow Up kinético cálido (D8-B), Core integrador — tres expresiones, un sistema.
- UX: narrativa D6 completa; usuario entiende ecosistema → capacidades → prueba → contacto.
- Motion: todo patrón tiene función documentada y fallback.
- Escalabilidad: 19 schemas de bloques + componentes reutilizables listos para páginas Fase 3.

## 5. Estado final

`PHASE_2_COMPLETE — REQUIRES_PROEFEX_APPROVAL`
