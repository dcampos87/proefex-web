# VISUAL NAVIGATION & TECH — v3 (Fase 2.2)

Comparación antes/después de la iteración quirúrgica de navegación y TECH. Screenshots de build de producción (1440×900 / 375×812); sin contenido inventado.

## Navigation Before / After

| Aspecto | Antes (Fase 2.1) | Después (Fase 2.2) |
|---|---|---|
| Header desktop | 5 links + CTA, sin estado activo | Igual jerarquía + `aria-current` con acento en la sección activa + punto del universo actual junto a "Ecosistema" |
| Ruta activa | No indicada | Link activo en acento; dentro de un universo, "Ecosistema" lleva `aria-current="true"` + punto del color del universo (verificado cian en /grow-up) |
| Principio | — | "Menos información visible, más jerarquía" (D36) |

## Mega Menu Before / After

| Aspecto | Antes | Después |
|---|---|---|
| Estructura | Rail explicativo + grid de 5 cards con sub-links por servicio, descripciones, badges F3 y bloque DESTACADO por pilar | 5 filas editoriales: `01 / CREATE — PROEFEX TECH — Desarrollo y Digitalización — →` + zona transversal secundaria |
| Links en panel | 41 | **10** (5 universos + 5 transversales) |
| Escaneo | Requiere lectura | Los 5 universos se entienden de un vistazo |
| Hover | Borde de card | Línea de acento del universo (izquierda), número y flecha toman el acento, desplazamiento sutil |
| Destacados | 1 bloque grande por universo | Eliminados (§8 del mandato) |
| Sub-navegación | Repetida dentro del panel | Vive en las landings (subnav) y breadcrumbs, donde aporta contexto |
| Transversal | Mezclada en el rail | Separada bajo un filete, peso visual menor (mono, muted) |
| A11y | Disclosure WAI-ARIA OK | Se mantiene: Enter abre y el foco entra al panel, Escape devuelve el foco, `aria-expanded/controls`, `aria-current` en la fila del universo activo |

## Mobile drawer Before / After

| Aspecto | Antes | Después |
|---|---|---|
| Estructura | Acordeones `<details>` con todos los sub-servicios | Fila por universo (código pilar + nombre + tagline + →); un solo tap |
| Densidad | Lista larga de links | 5 filas + 5 links transversales + CTA |
| Targets | OK | Todos ≥ 48px (verificado en runtime) |
| A11y | Focus trap + Escape | Idéntico, verificado de nuevo (foco restaurado al toggle) |

## TECH Before / After (D37)

| Aspecto | Antes | Después |
|---|---|---|
| Hero | Kicker + titular + panel de sistema | Añade línea de estado conceptual `SYSTEM / CREATE · STATUS / ACTIVE · MODE / DIGITAL` con ignición secuencial bajo el kicker (decorativa, aria-hidden) |
| Editorial rows | Filas editoriales estándar | Scoped a TECH: títulos en mayúsculas con tracking + numeración en acento — índice de ingeniería, no service cards |
| Color | Azul profundo existente | Sin cambios (no se toca el universo) |
| Sensación | "Página de servicios tecnológicos" | "Entré a un sistema tecnológico" |

## Grow Up Preservation

Sin rediseño (§23 del mandato). Verificado por screenshot 1440/375: grafismo cinético, display XXL, marquee, `#22272E`/`#00FFE6`, footer del universo — todo intacto. Único cambio recibido: los ajustes generales de navegación (fila en megamenú/drawer + punto cian de universo activo en el header).

LEARNS / EQUIP / Solutions: sin cambios de identidad; solo reciben la navegación común.

## Responsive

Overflow horizontal = 0 en 320/375/768/1024/1440 (Home, TECH, TECH interna, Grow Up, Grow Up interna). El megamenú es desktop-only (lg+); en <1024 manda el drawer. Filas del megamenú colapsan a una columna con tagline; probado a 1024.

## Accessibility

- Megamenú y drawer re-verificados por teclado (Enter/Tab/Escape + focus restoration): PASS.
- `aria-current="page"` en links activos; `aria-current="true"` en el trigger y la fila del universo activo.
- Línea de estado TECH e indicadores de universo: decorativos (`aria-hidden`).
- Contrastes sin cambios respecto a Fase 2.1 (medidos: cian/grafito 11.77:1, blanco/grafito 15.02:1).
- `prefers-reduced-motion` anula las nuevas transiciones (heredan del sistema global).

## Performance

First Load JS compartido: **103 kB** (presupuesto ≤180 kB). Sin dependencias nuevas; el rediseño es CSS + markup (el panel perdió ~2 kB de markup de cards).

## Remaining Gaps

1. Sub-links de servicios ya no viven en el megamenú: dependen del megamenú contextual por universo (pendiente: evaluar un panel secundario por universo en Fase 3 si el usuario necesita saltar directo a un servicio).
2. Página `/tech/desarrollo-de-software` sigue siendo stub de arquitectura (contenido en Fase 3).
3. Indicador de universo en header: punto de color; si se prefiere underline o chip, es un cambio de 1 línea (decisión visual de PROEFEX).
