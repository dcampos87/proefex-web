import Link from "next/link";

/**
 * Filas editoriales numeradas — lenguaje editorial-technology de la
 * recalibración visual (benchmark weevolveit, no copia). Sustituye al
 * patrón de grid de cards como jerarquía principal de servicios:
 * tipografía grande + fileos hairline + metadatos mono.
 * `accent` opcional para heredar el acento del universo actual
 * (por defecto usa var(--accent) del scope [data-universe]).
 * `variant="door"`: filas-puerta de la Home (Acto 02) — número y título
 * más grandes, acento propio por pilar (--row-accent) y metadata mono.
 */
export function EditorialRows({
  items,
  accent,
  variant,
  ariaLabel,
}: {
  items: { index: string; label: string; desc?: string; href: string; badge?: string; accent?: string; meta?: string }[];
  accent?: string;
  variant?: "default" | "door";
  ariaLabel: string;
}) {
  const style = accent ? ({ ["--accent" as string]: accent } as React.CSSProperties) : undefined;
  return (
    <nav aria-label={ariaLabel}>
      <ul className="ed-rows" role="list" style={style}>
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className={variant === "door" ? "ed-row ed-row--door" : "ed-row"}
              style={
                it.accent
                  ? ({ ["--accent" as string]: it.accent, ["--row-accent" as string]: it.accent } as React.CSSProperties)
                  : undefined
              }
            >
              <span className="ed-row-idx" aria-hidden="true">{it.index}</span>
              <span>
                <span className="ed-row-title">{it.label}</span>
                {it.desc ? <span className="ed-row-desc">{it.desc}</span> : null}
              </span>
              <span className="ed-row-arrow" aria-hidden="true">
                {it.meta ? <span className="ed-row-meta mr-3">{it.meta}</span> : null}
                {it.badge ? <span className="content-required mr-2" style={{ fontSize: "0.6rem" }}>{it.badge}</span> : null}→
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
