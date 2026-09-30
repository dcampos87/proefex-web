import { Reveal } from "@/components/motion/Reveal";

export interface SectorItem {
  name: string;
  href?: string;
}

/**
 * SectorGrid — grid de sectores (Doc 15 §2.3: scroll-snap sm · 2 cols md · 4 cols lg).
 * Nombres según mapa del sitio (Doc 03). Sin casos hasta contenido real.
 */
export function SectorGrid({ items }: { items: SectorItem[] }) {
  return (
    <ul
      className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      role="list"
    >
      {items.map((s, i) => (
        <Reveal as="li" key={s.name} delay={i * 60} className="card p-5 text-center hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
          {s.href ? (
            <a
              href={s.href}
              className="underline-anim"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--text)",
                display: "inline-block",
                minHeight: 44,
                lineHeight: "44px",
              }}
            >
              {s.name}
            </a>
          ) : (
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--text)",
                display: "inline-block",
                lineHeight: "44px",
              }}
            >
              {s.name}
            </span>
          )}
        </Reveal>
      ))}
    </ul>
  );
}
