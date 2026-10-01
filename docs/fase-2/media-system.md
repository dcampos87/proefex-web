# Media System — Fase 2.3 (D41, D42)

Sistema de media reutilizable, first-media, preparado para CMS (mandato §10–§11, §21–§22). Sin librerías de video externas.

## Componentes

### `MediaFrame` (`src/components/media/MediaFrame.tsx`)

Componente server (sin JS cliente). Props alineadas al contrato de CMS:

| Prop | Tipo | Uso |
|---|---|---|
| `src` / `alt` | string | Imagen (Next `Image`); `alt` obligatorio |
| `variant` | `media-hero` \| `media-wide` \| `media-editorial` \| `media-tall` \| `media-product` \| `media-case` | Rol editorial del media |
| `aspect` | string CSS | Ratio por defecto según variante (ej. caso 21/9, tall 3/4) |
| `objectPosition` | string | Focal point configurable |
| `sizes` / `priority` / `loading` | — | Performance: priority en hero, lazy en el resto |
| `overlay` | `soft` \| `strong` \| `none` | Overlay para legibilidad |
| `tag` | string | Badge editorial (ej. `VISUAL PROVISIONAL`, `CASO REAL — PENDIENTE`) |
| `caption` / `credit` | string | Caption y crédito/copyright |
| `video` | `MediaVideoSource` | Slot de video (ver abajo) |

### `MediaHeroVideo` (`src/components/media/MediaHeroVideo.tsx`)

Componente **client** que activa el video solo cuando corresponde:

- Solo monta `src`/`autoplay` si NO hay `prefers-reduced-motion: reduce`.
- Video siempre `autoplay muted loop playsInline` (nunca audio automático).
- Sin JS o con reduced-motion: se ve el **poster** — el contenido nunca depende del video.
- Interfaz lista para CMS: `src`, `poster`, `mobileSrc` opcional.

### Reglas de uso

- `media-hero`: protagonista del hero (Home Acto 01; futuras landings).
- `media-wide`: banda panorámica entre capítulos.
- `media-editorial`: objeto editorial con caption (Acto 04).
- `media-tall`: retrato vertical.
- `media-product`: demostración de producto (Solutions).
- `media-case`: evidencia de caso, ratio 21/9 (Acto 06).
- `media-background`: decorativo — nunca imprescindible para entender el contenido.

## Arquitectura de video (contrato para Fase 3 / CMS)

| Tipo | Controles | Nota |
|---|---|---|
| Hero video | autoplay/muted/loop + poster obligatorio + fallback | implementado como slot |
| Editorial video | play/pause | pendiente de activos |
| Case study video | controles completos | pendiente de activos |
| Product video | demostración corta | pendiente de activos |
| Background video | decorativo | opcional, siempre con poster |

Sin proveedor externo (D5 `DEFERRED`); no se incorporan dependencias.

## Placeholders provisionales (D42)

`public/media/`: `hero-ecosistema.webp`, `capacidades-ingenieria.webp`, `productos-solutions.webp` — generados como visual provisional, marcados con tag `VISUAL PROVISIONAL` en UI. Reemplazo directo por media real vía CMS (mismas props). Reglas por asset: `alt`, `title` opcional, `caption`, focal point, asset mobile opcional, `loading`, `priority`, crédito.

## Verificación

- QA Puppeteer: `MediaFrame` presente en Home; sin `video` autoplay con reduced-motion (emulación verificada).
- Build limpio; aporte a First Load JS: 0 dependencias nuevas (server component + ~1 kB client del video gate).
