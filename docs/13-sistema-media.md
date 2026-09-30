# Documento 13 — Sistema de Media

**Fase:** 0 — Definición
**Estado:** Propuesta para revisión

---

## 1. Alcance

Define los tipos de media soportados por la plataforma y el CMS, y las reglas de rendimiento, responsive y accesibilidad aplicables a todos ellos.

## 2. Tipos de media soportados por el CMS

| Tipo | Formatos | Uso | Gestión en CMS |
|---|---|---|---|
| Imagen | JPEG, PNG, WebP, AVIF (generados), SVG (con sanitización) | Contenido, galerías, covers | Subida, alt obligatorio, focal point, caption, crédito |
| Video (alojado) | MP4/WebM | Video de fondo, secciones de video | Poster obligatorio, duración, peso máx., compresión al subir |
| Video (embed) | YouTube/Vimeo/otro vía URL | VideoSection, blog | URL + thumbnail + lazy embed |
| GIF | gif (se recomienda convertir a MP4 corto) | Micro-demos puntuales | Aviso de peso; conversión sugerida |
| Lottie | JSON | Ilustración animada ligera | Preview, peso máx., fallback estático obligatorio |
| 3D | GLB (puntual, solo hero TECH si se aprueba) | Piezas hero | Lazy load, fallback imagen |
| Audio | — | No contemplado en fase 1 | — |

## 3. Pipeline de imágenes

```text
Subida al CMS → Supabase Storage → transformación on-the-fly (Cloudflare Images/Transform)
→ variantes: thumb 480 · card 768 · wide 1280 · full 1920 (AVIF + WebP + JPEG fallback)
→ servidas por CDN con cache immutables y URL canónica estable
```

Reglas:
1. **`next/image`** en el frontend con `sizes` correctos por layout; nunca `<img>` sin dimensiones (CLS).
2. **Formato moderno por defecto:** AVIF con fallback WebP→JPEG automático.
3. **Responsive images:** `srcset` generado de variantes; el CMS permite focal point para crops inteligentes.
4. **Lazy loading:** `loading="lazy"` por debajo del fold; `priority`/`fetchpriority="high"` solo para el hero/LCP.
5. **Compresión:** presupuesto por imagen: hero ≤ 200KB (AVIF), card ≤ 80KB, thumb ≤ 30KB. El CMS advierte al exceder.
6. **SVG:** solo del sistema de diseño o sanitizados (sin scripts); iconos inline cuando sean críticos.

## 4. Pipeline de video

| Escenario | Regla |
|---|---|
| Video de fondo (hero TECH) | Poster primero; autoplay solo desktop + `muted playsinline`; carga diferida tras LCP; pausa fuera de viewport y en `document.hidden`; desactivado en móvil lento y reduced-motion (poster estático) |
| Video de contenido | Player con controles nativos o embed diferido (facade: thumbnail + click para cargar iframe); nunca autoplay con sonido |
| Peso | Máx. recomendado 8MB por clip corto; compresión H.265/VP9 cuando el soporte lo permita |
| Accesibilidad | Subtítulos obligatorios cuando el video tiene habla; transcripción en el CMS |

## 5. Accesibilidad de media

1. **Alt text obligatorio** para publicar (validado por CMS); decorativas: `alt=""`.
2. Contraste de overlays/textos sobre imagen verificado (scrim cuando haga falta).
3. Controles de video accesibles por teclado; nada de media con flashes > 3/s (WCAG).
4. Lottie con fallback estático con alt.

## 6. Performance — reglas transversales

| Regla | Detalle |
|---|---|
| Presupuesto de página | Media de una landing: ≤ 1.2MB total primera carga (ver Doc 16) |
| CDN | Todo el media vía Cloudflare con `Cache-Control: immutable` + versionado por hash |
| Fuentes de terceros | Ninguna; embeds solo diferidos |
| Formatos de servidor | Conversión y re-encode al subir, no en el cliente |
| Monitorización | Lighthouse CI + CWV reales por tipo de página |

## 7. Organización en el CMS

- Biblioteca con búsqueda por tipo, etiqueta, fecha y uso (dónde se usa cada asset).
- Deduplicación por hash de contenido.
- Marca de "en uso" para evitar borrados accidentales; borrado lógico con revisión.
- Créditos/licencia registrados en campos obligatorios para material de terceros.

## 8. Arquitectura de media diferenciada (revisión Agent Master — D5)

Se separa la gestión por tipo de asset:

| Tipo | Solución propuesta | Estado |
|---|---|---|
| Imágenes, SVG, documentos, assets generales | Supabase Storage + transform/CDN Cloudflare | Propuesta estable |
| Vídeo hero / clips cortos | CDN + poster + facade (reglas §4); proveedor por definir | **DEFERRED (D5)** |
| Vídeos largos / volumen alto | Servicio especializado (Cloudflare Stream u equivalente) | **DEFERRED (D5)** |

**Regla:** no se fija proveedor de vídeo definitivo hasta disponer del inventario audiovisual real (Doc `content-inventory.md`). Las decisiones dependientes: compresión, resolución de másteres, subtítulos y costos.

Pendiente de definición con el cliente:

- Inventario de vídeo existente: duración, volumen, formato, licencias (bloqueante de D5).
- Banco fotográfico actual: qué material real existe y sus licencias.
- Guía de grading/estilo visual para la producción fotográfica (Docs 10–11).
