import Image from "next/image";
import { MediaHeroVideo } from "./MediaHeroVideo";

/**
 * MediaFrame (Fase 2.3, D41): sistema de media reutilizable.
 * Las imágenes y videos son parte estructural del lenguaje visual,
 * no thumbnails decorativos. Preparado para CMS (§22): cada pieza
 * lleva alt, caption/credit opcionales, focal point y loading.
 *
 * Variantes (clase CSS en globals.css):
 *  - media-hero      → fondo/protagonista de hero (overlay + focal)
 *  - media-wide      → banda panorámica entre capítulos
 *  - media-editorial → objeto editorial con caption
 *  - media-tall      → vertical (retrato)
 *  - media-product   → demostración de producto
 *  - media-case      → caso de estudio (evidencia)
 *
 * Video: `videoSrc` habilita el slot de video (autoplay muted loop
 * playsInline + poster). MediaHeroVideo (client) decide el autoplay
 * según prefers-reduced-motion; sin JS o con reduced motion se ve el
 * poster — el contenido nunca depende del video (§11).
 * Nota: las imágenes actuales son placeholders generados, marcados
 * como CONTENT_REQUIRED para reemplazo por media real de PROEFEX.
 */
export interface MediaFrameProps {
  /** Imagen (poster u objeto editorial). Ruta bajo /public. */
  src: string;
  /** Alt obligatorio — descriptivo del contenido visual. */
  alt: string;
  /** Video (futuro CMS): mp4/webm propio, sin proveedores externos. */
  videoSrc?: string;
  variant?: "media-hero" | "media-wide" | "media-editorial" | "media-tall" | "media-product" | "media-case";
  /** Aspect ratio CSS, p. ej. "16 / 9", "21 / 9", "4 / 3", "3 / 4". */
  aspect?: string;
  /** Focal point CSS, p. ej. "50% 30%" (CMS: focal point). */
  focal?: string;
  /** Overlay para legibilidad del texto superpuesto. */
  overlay?: "none" | "soft" | "strong";
  caption?: string;
  credit?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Etiqueta de estado editorial (p. ej. placeholder). */
  tag?: string;
}

export function MediaFrame({
  src,
  alt,
  videoSrc,
  variant = "media-editorial",
  aspect = "16 / 9",
  focal = "50% 50%",
  overlay = "none",
  caption,
  credit,
  priority = false,
  sizes = "100vw",
  className = "",
  tag,
}: MediaFrameProps) {
  return (
    <figure className={`${variant} ${className}`.trim()}>
      <div className="media-frame-box" style={{ aspectRatio: aspect }}>
        {videoSrc ? (
          <MediaHeroVideo src={videoSrc} poster={src} alt={alt} focal={focal} priority={priority} sizes={sizes} />
        ) : (
          <Image
            className="media-frame-img"
            src={src}
            alt={alt}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={sizes}
            style={{ objectPosition: focal }}
          />
        )}
        {overlay !== "none" ? <span className={`media-frame-overlay overlay-${overlay}`} aria-hidden="true" /> : null}
        {tag ? <span className="media-frame-tag">{tag}</span> : null}
      </div>
      {caption || credit ? (
        <figcaption className="media-frame-caption">
          {caption ? <span>{caption}</span> : null}
          {credit ? <span className="media-frame-credit">{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
