import { Reveal } from "@/components/motion/Reveal";
import type { ReactNode } from "react";

export interface CaseStudyItem {
  title: string;
  sector?: string;
  summary?: string;
  href?: string;
  media?: ReactNode;
}

/**
 * CaseStudyCard — caso destacado (Doc 05 §2.6). Publicación condicionada a
 * material real autorizado; sin casos → estado vacío honesto (Doc 03 §2.2).
 */
export function CaseStudyCard({ study }: { study?: CaseStudyItem }) {
  if (!study) {
    return (
      <Reveal className="card flex flex-col items-center gap-3 p-8 text-center">
        <span className="content-required">CONTENT_REQUIRED — caso de éxito</span>
        <p className="max-w-[52ch]" style={{ color: "var(--text-body)", fontSize: "var(--text-caption)" }}>
          Los casos se publican cuando existan proyectos aprobados por el cliente. No se presentan casos ficticios.
        </p>
      </Reveal>
    );
  }
  return (
    <Reveal className="card overflow-hidden hover:shadow-[var(--shadow-lift)]">
      <div
        className="flex aspect-[16/9] items-center justify-center"
        style={{ background: "var(--bg-sunken)" }}
      >
        {study.media ?? <span className="content-required">MEDIA — CONTENT_REQUIRED</span>}
      </div>
      <div className="flex flex-col gap-2 p-6">
        {study.sector ? <span className="label-mono">{study.sector}</span> : null}
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-heading)", color: "var(--text)" }}>
          {study.title}
        </h3>
        {study.summary ? <p style={{ color: "var(--text-body)" }}>{study.summary}</p> : null}
      </div>
    </Reveal>
  );
}
