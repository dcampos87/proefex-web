# Media Validation Inventory — Fase 2.4

Inspección del repositorio completo en el commit `76d8f13` para localizar media real (fotografías, video, logos, screenshots, renders, material TECH/Grow Up/productos).

## 1. Método

- Búsqueda exhaustiva de extensiones de media en todo el repo (excluyendo `node_modules`/`.next`): `jpg jpeg png webp gif svg mp4 webm mov avif ico pdf`.
- Revisión de documentos que referencian assets (`docs/content-inventory.md`, `docs/13-sistema-media.md`, docs de dirección visual).

## 2. Resultado de la búsqueda

**No existe media real de PROEFEX en el repositorio.** Cero archivos de fotografía, video, logo, screenshot o render reales. Esto es consistente con `docs/content-inventory.md`, que registra todos los assets (logos, fotografías, piezas creativas, logos de producto, fotografía de producto EQUIP) en estado `UNKNOWN` — pendientes de entrega por PROEFEX.

## 3. Inventario de assets existentes (placeholders provisionales, D42)

Únicos archivos de media en el repo. **No son material de PROEFEX**: son visuales provisionales generados (IA), etiquetados en UI con `VISUAL PROVISIONAL`, creados en Fase 2.3 para validar el sistema de media. No se presentan como material real de la compañía.

| Archivo | Tipo | Dimensiones | Peso | Universo | Posible uso | Calidad | Estado |
|---|---|---|---|---|---|---|---|
| `public/media/hero-ecosistema.webp` | Imagen (IA, provisional) | 1600×896 | 1002 kB | core | Hero Home (Acto 01, poster del slot de video) | Aceptable como provisional; composición genérica | `AVAILABLE_BUT_NEEDS_OPTIMIZATION` |
| `public/media/capacidades-ingenieria.webp` | Imagen (IA, provisional) | 1600×896 | 1419 kB | core/tech | Acto 04 capacidades (media-editorial) | Aceptable como provisional; peso alto | `AVAILABLE_BUT_NEEDS_OPTIMIZATION` |
| `public/media/productos-solutions.webp` | Imagen (IA, provisional) | 1600×896 | 854 kB | solve | Acto 07 productos (media-product) | Aceptable como provisional | `AVAILABLE_BUT_NEEDS_OPTIMIZATION` |

Notas:
- Los 3 archivos superan el peso recomendado para web (>300–500 kB). Al ser reemplazados por media real, optimizar (ancho objetivo 1920–2560 máx., WebP/AVIF, <300 kB, `next/image` ya sirve responsive).
- No hay `favicon.ico` ni logo vectorial (wordmark actual es tipográfico) — pendiente registrado desde Fase 1.

## 4. Assets requeridos (CONTENT_REQUIRED — verificar con PROEFEX)

| Asset | Universo | Destino en la experiencia | Estado |
|---|---|---|---|
| Video de hero (10–20 s, loop, sin audio, versión mobile opcional) | core | Home Acto 01 (slot `MediaHeroVideo` ya implementado) | `HERO_VIDEO_REQUIRED` |
| Fotografía institucional (oficinas, equipo, proyectos reales) | core/tech/growup | Actos 01/04/06, landings | `CONTENT_REQUIRED` |
| Material TECH (ingeniería, IoT, drones, automatización en campo) | tech | `/tech` y hijas | `CONTENT_REQUIRED` |
| Material Grow Up (piezas creativas, campañas, contenido) | growup | `/grow-up` y hijas | `CONTENT_REQUIRED` |
| Screenshots/product shots de: Turu CRM, PROEFACT, My Bpass, AtendiGo, Eleventto, Klyra | solve | `/solutions/*`, Home Acto 07 | `CONTENT_REQUIRED` |
| Logos de productos (y de distribuidores EQUIP con autorización) | solve/equip | Landings, LogoWall | `CONTENT_REQUIRED` |
| Logo PROEFEX vectorial + favicon + versiones mono/negativo | core | Header, footer, favicon | `CONTENT_REQUIRED` |
| Casos reales con permiso de mención | core | Home Acto 06, `/casos` | `CONTENT_REQUIRED` |

## 5. Conclusión

La experiencia actual funciona con placeholders claramente etiquetados y el sistema de media está preparado para recibir material real sin cambios de arquitectura (`MediaFrame` consume props CMS). **Fase 2.4 no puede integrar media real porque no existe en el repositorio** — no se fabrica ni se usa stock como si fuera material de PROEFEX (mandato §2).

Estado resultante: `PHASE_2_4_CONTENT_BLOCKED — REQUIRES_PROEFEX_INPUT`.
