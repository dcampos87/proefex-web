# Documento 15 — Sistema Responsive

**Fase:** 0 — Definición
**Estado:** Propuesta para revisión

---

## 1. Breakpoints

| Token | Rango | Dispositivos de referencia |
|---|---|---|
| `sm` | < 640px | Móvil (portrait) |
| `md` | 640–1023px | Móvil grande / tablet |
| `lg` | 1024–1439px | Tablet landscape / laptop |
| `xl` | 1440–1919px | Desktop |
| `2xl` | ≥ 1920px | Pantallas grandes |

**Mobile-first:** todos los estilos se escriben desde `sm` hacia arriba. El diseño se aprueba primero en móvil.

## 2. Comportamiento por tipo de elemento

### 2.1 Navegación
- `sm/md`: menú fullscreen con stagger; CTA contacto persistente al pie del menú; navegación táctil ≥ 48px de altura.
- `lg+`: header con megamenú TECH; indicador de universo visible.
- El header nunca oculta el CTA de contacto en ningún breakpoint.

### 2.2 Tipografía
- Escala fluida con `clamp()` (Doc 14) — sin saltos entre breakpoints.
- Grow Up: los titulares XXL se reducen a escala "cartel móvil" (56–72px) manteniendo jerarquía expresiva; nunca se degrada a texto plano.

### 2.3 Grids y composiciones
| Elemento | sm | md | lg+ |
|---|---|---|---|
| ServiceGrid | 1 col | 2 cols | 3 cols |
| SectorGrid | scroll horizontal snap | 2 cols | 4 cols |
| Productos | 1 col | 2 cols | 3 cols |
| BlogGrid | 1 col | 2 cols | 3–4 cols |
| Stats | 2×2 | 4 en fila | 4–6 en fila |
| ImageTextSplit | apilado (media primero) | apilado | split 50/50 |
- Composiciones collage (Grow Up): en móvil se simplifican a 1–2 piezas por composición; la asimetría se conserva con offsets moderados, no se elimina.

### 2.4 Animaciones
- `sm`: solo entradas esenciales y microinteracciones; sin parallax; partículas/3D off; video hero → poster estático.
- `md`: parallax leve permitido; video hero con autoplay silenciado solo si el dispositivo no reporta `save-data`.
- `lg+`: experiencia completa del universo (Doc 12).
- Reduced-motion se aplica igual en todos los breakpoints.

### 2.5 Video
- Móvil: poster estático + botón play (facade). Autoplay de fondo solo lg+.
- Todos los videos contienen poster y no cargan hasta intersección.

### 2.6 Imágenes
- `srcset` por breakpoint con variantes de Doc 13; focal point asegura crops correctos en móvil.
- Heroes: imagen distinta (crop vertical) para móvil cuando la composición lo exija (assets separados gestionados en CMS).

### 2.7 Formularios
- Una columna en sm/md; campos de solo lectura agrupados; teclado correcto por tipo de input (`inputmode`).
- Botones de envío full-width en móvil.

## 3. Pantallas grandes (2xl)

- Contenedores acotados (1440px máx. de contenido útil); el espacio extra se usa en aire y composición, no en estirar texto.
- Heroes TECH pueden expandir la escena (canvas más amplio).
- Verificación de diseño hasta 2560px.

## 4. Interacción por dispositivo

- Todo elemento interactivo ≥ 44×44px táctil.
- Hover-only prohibido: cualquier contenido revelado por hover tiene equivalente por focus/touch (accordion/tap).
- Scroll-snap solo en carruseles con indicadores y control manual.
- Tap targets separados ≥ 8px.

## 5. Verificación (checklist de diseño/qa por página)

1. 320px, 390px, 768px, 1024px, 1440px, 1920px sin overflow horizontal.
2. Zoom 200% usable (WCAG 1.4.4).
3. Landscape móvil sin cortes críticos.
4. Navegación y CTAs alcanzables con pulgar (zona segura).
5. Lighthouse mobile aprobado con presets de red lentos.
