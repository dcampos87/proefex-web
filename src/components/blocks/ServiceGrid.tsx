import { Reveal } from "@/components/motion/Reveal";
import type { ReactNode } from "react";

export interface ServiceItem {
  index?: string;
  title: string;
  description?: string;
  href?: string;
  icon?: ReactNode;
  /** Línea mono extra (TECH): specs, stack, estado. */
  meta?: string;
}

interface ServiceGridProps {
  items: ServiceItem[];
  /** tech → cards-instrumento con marcas de encuadre (Doc 10 §2.3). */
  variant?: "core" | "tech" | "growup";
  columns?: 2 | 3;
}

/**
 * ServiceGrid — grid de servicios (Doc 15 §2.3: 1 col sm · 2 cols md · 3 cols lg).
 * Hover: elevación + borde de acento (TECH "enciende" el módulo).
 */
export function ServiceGrid({ items, variant = "core", columns = 3 }: ServiceGridProps) {
  const isTech = variant === "tech";
  const cols =
    columns === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <ul className={`grid gap-5 ${cols}`} role="list">
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item.title}
          variant={isTech ? "ignite" : "fade-rise"}
          delay={i * 80}
          className={isTech ? "tech-panel flex flex-col p-6" : "card flex flex-col p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"}
        >
          <div className="flex items-center justify-between gap-3">
            {item.index ? (
              <span className="label-mono">{isTech ? item.index : item.index}</span>
            ) : null}
            {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
          </div>
          <h3
            className="mt-4"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--text-heading)",
              color: "var(--text)",
            }}
          >
            {item.href ? (
              <a href={item.href} className="underline-anim" style={{ color: "inherit" }}>
                {item.title}
              </a>
            ) : (
              item.title
            )}
          </h3>
          {item.description ? (
            <p className="mt-2" style={{ color: "var(--text-body)" }}>
              {item.description}
            </p>
          ) : null}
          {item.meta ? (
            <p className="mt-4" style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
              {item.meta}
            </p>
          ) : null}
        </Reveal>
      ))}
    </ul>
  );
}
