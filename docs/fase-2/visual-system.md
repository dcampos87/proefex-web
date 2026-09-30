# Fase 2 — Sistema Visual

Fuente de verdad: `src/app/globals.css` (tokens CSS) + `src/design-system/tokens.ts` (espejo TS). Los componentes consumen **solo tokens semánticos** — nunca hex directos.

## 1. Tokens

### 1.1 Color
- Marca (fijos): `--pfx-blue #002254`, `--pfx-orange #F7931E`, `--pfx-red #D64022`, `--pfx-yellow #EFB729`, `--pfx-blue-light #005A9E`, `--pfx-white`, `--pfx-gray #414141`.
- Semánticos por universo (`[data-universe]`): `--bg`, `--bg-sunken`, `--surface`, `--surface-hover`, `--text`, `--text-body`, `--text-muted`, `--text-inverse`, `--accent`, `--accent-contrast`, `--accent-2/3` (Grow Up), `--border`, `--border-strong`.
- Regla TECH: el naranja es **señal, no superficie** (nunca fondo grande naranja).
- Contraste AA validado en los pares usados: blanco 75–100% sobre `#001233`; `#414141`/azul sobre blanco; naranja solo en textos grandes/UI o con contraste-verificación.

### 1.2 Tipografía (D11 aprobada)
| Token | Fuente | Uso |
|---|---|---|
| `--font-sans` | Lexend Deca (variable 400–700, self-hosted) | cuerpo, títulos TECH, UI |
| `--font-display` | Poppins (600/700, self-hosted) | titulares, botones, expresivo Grow Up |
| `--font-mono` | Source Code Pro (400, self-hosted) | **solo**: etiquetas `01 / DESARROLLO`, metadatos, specs, estados de sistema, dominios, placeholders `CONTENT_REQUIRED` |

**Cuándo NO usar Source Code Pro:** titulares, cuerpo de lectura, navegación, botones, formularios. No convertir el sitio en interfaz de código.

Escala fluida (`clamp`, sin saltos por breakpoint): `display-2xl` (solo Grow Up), `display-xl`, `display-lg`, `heading`, `body-lg`, `body`, `caption`, `label-mono` (0.8125rem, uppercase, tracking 0.14em).

### 1.3 Espaciado / radios / sombras / layout
- Escala 4–160px (`--space-1..16`).
- Contenedor 1280px (contenido) / 1440px (ancho); gutter fluido `clamp(20px, 5vw, 48px)`.
- Secciones: `padding-block clamp(64px, 9vw, 160px)` (sm: 48–96).
- Radios: 6/12/20/full — **TECH fuerza 4/8px** (esquinas técnicas).
- Sombras y-negativa mínimas; TECH usa borde 1px (sombras `none`).

## 2. Los tres universos

| | CORE | TECH (D7-A) | GROW UP (D8-B) |
|---|---|---|---|
| Fondo | blanco / `#F4F6F9` | `#001233` + capas `rgba(255,255,255,.04)` | blanco / `#FDF6EC` |
| Texto | azul / gris | blanco 100/75/60% | azul / gris |
| Acento | naranja (acción) | naranja (señal) | coral `#D64022` + amarillo `#EFB729` |
| Tipografía | Poppins títulos + Lexend | Lexend + mono en etiquetas | Poppins XXL rotada, palabra destacada |
| Gráfica | cards limpias, grilla sobria | grid tecnológico 5% con máscara, `tech-panel` con marcas de encuadre, numeración mono | formas flat (círculo/coral/azul), marquee, stickers |
| Motion | `out` + stagger 70ms | `tech` + stagger 40ms, "ignite" secuencial | spring conceptual + stagger 110ms, marquee |

**Regla D6/Doc 09:** los universos no se homogenizan; comparten tokens base, grilla, accesibilidad y componentes fundamentales. En la home el cambio de universo es un **corte limpio de fondo** (el cambio es el mensaje); Grow Up añade marquee como costura de transición.

## 3. Teming por sección

Cada sección de universo declara `data-universe="core|tech|growup"`; la regla `[data-universe] { background-color: var(--bg); color: var(--text-body); }` pinta el tema y todos los descendientes heredan tokens. `body` mantiene `data-universe="core"` por defecto (header/footer claros).

## 4. Placeholder de contenido

`.content-required` — chip mono punteado para marcar `CONTENT_REQUIRED`. Variante clara automática sobre `footer` y `[data-universe="tech"]`. **Nunca debe llegar a producción.**

## 5. Media

Abstracciones listas para el CMS (Doc 13): placeholders de imagen con `role="img"` + etiqueta, `VideoSection` con facade/poster (D5 diferido). Sin proveedor de video asumido.
