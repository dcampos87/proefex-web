import { Reveal } from "@/components/motion/Reveal";

export interface TestimonialItem {
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
}

/**
 * Testimonial — cita (Doc 05 §2.10). Estructura creada, sin datos:
 * se publica solo con testimonio real + consentimiento explícito
 * (campo `consent` obligatorio en el modelo). No se inventan testimonios.
 */
export function Testimonial({ testimonial }: { testimonial?: TestimonialItem }) {
  if (!testimonial) {
    return (
      <Reveal className="card flex flex-col items-center gap-3 p-8 text-center">
        <span className="content-required">CONTENT_REQUIRED — testimonial autorizado</span>
        <p className="max-w-[48ch]" style={{ color: "var(--text-body)", fontSize: "var(--text-caption)" }}>
          Este bloque queda reservado para testimonios reales con consentimiento explícito del autor.
        </p>
      </Reveal>
    );
  }
  return (
    <Reveal as="blockquote" className="card flex flex-col gap-4 p-8">
      <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-heading)", color: "var(--text)" }}>
        “{testimonial.quote}”
      </p>
      <footer style={{ color: "var(--text-body)", fontSize: "var(--text-caption)" }}>
        — {testimonial.authorName}
        {testimonial.authorRole ? `, ${testimonial.authorRole}` : ""}
        {testimonial.company ? ` · ${testimonial.company}` : ""}
      </footer>
    </Reveal>
  );
}
