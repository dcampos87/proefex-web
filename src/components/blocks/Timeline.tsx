import { Reveal } from "@/components/motion/Reveal";

export interface TimelineItem {
  period: string;
  title: string;
  description?: string;
}

/**
 * Timeline — historia/proceso vertical (Doc 05 §3, universo Core).
 * Solo se publica con hitos reales aprobados; caso contrario, CONTENT_REQUIRED.
 */
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative flex flex-col gap-8 border-l-2 pl-6" style={{ borderColor: "var(--border-strong)" }} role="list">
      {items.map((item, i) => (
        <Reveal as="li" key={i} delay={i * 90} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2"
            style={{ background: "var(--bg)", borderColor: "var(--accent)" }}
          />
          <p className="label-mono">{item.period}</p>
          <h3
            className="mt-1"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--text-heading)",
              color: "var(--text)",
            }}
          >
            {item.title}
          </h3>
          {item.description ? (
            <p className="mt-1" style={{ color: "var(--text-body)" }}>
              {item.description}
            </p>
          ) : null}
        </Reveal>
      ))}
    </ol>
  );
}
