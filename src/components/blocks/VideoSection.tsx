import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

interface VideoSectionProps {
  title?: string;
  /** Poster obligatorio (Doc 13); en Fase 2 el proveedor de video está diferido (D5). */
  posterSrc?: string;
  playLabel?: string;
}

/**
 * VideoSection — facade con poster (Doc 15 §2.5): nada se carga hasta
 * interacción; en móvil poster + botón play; autoplay solo lg+ cuando se
 * defina el proveedor (D5 diferido, no bloquea Fase 2).
 */
export function VideoSection({ title, posterSrc, playLabel = "Reproducir video" }: VideoSectionProps) {
  return (
    <Reveal>
      <div
        className="relative flex aspect-video items-center justify-center overflow-hidden border"
        style={{
          borderRadius: "var(--radius-md)",
          background: posterSrc ? undefined : "var(--bg-sunken)",
          borderStyle: posterSrc ? undefined : "dashed",
          borderColor: posterSrc ? undefined : "var(--border-strong)",
        }}
      >
        {posterSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- facade pre-integración CMS (Fase 3 usa next/image)
          <img src={posterSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <span className="content-required">VIDEO POSTER — CONTENT_REQUIRED (D5 diferido)</span>
        )}
        <Button
          variant="primary"
          className="relative"
          aria-label={playLabel}
          onClick={undefined}
          disabled={!posterSrc}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          {playLabel}
        </Button>
      </div>
    </Reveal>
  );
}
