import type { ContentSummary } from "@/lib/api/types";

/**
 * Lista editorial de contenido publicado (F3.2).
 *
 * Reutiliza el lenguaje de filas editoriales ya existente (`ed-rows`/`ed-row`,
 * ver `components/pages/RouteStub.tsx`) para no introducir un sistema visual
 * nuevo. No hay destinos de detalle todavía: el mapa de URLs de segundo y tercer
 * nivel sigue en `REQUIRES_PROEFEX_INPUT` (D24), así que las filas NO son
 * enlaces en lugar de apuntar a rutas inexistentes.
 */

const DATE_FORMAT = new Intl.DateTimeFormat("es-PE", { year: "numeric", month: "short" });

function formatPublishedAt(value: string | null): string | null {
  if (value === null || value.trim().length === 0) return null;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? null : DATE_FORMAT.format(new Date(timestamp));
}

interface ContentSummaryListProps {
  items: readonly ContentSummary[];
  ariaLabel: string;
}

export function ContentSummaryList({ items, ariaLabel }: ContentSummaryListProps) {
  return (
    <ul className="ed-rows" role="list" aria-label={ariaLabel} style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {items.map((item, index) => {
        const date = formatPublishedAt(item.publishedAt);
        return (
          <li key={`${item.type}:${item.slug}`} className="ed-row ed-row--static">
            <span className="ed-row-idx" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="ed-row-title">{item.title}</span>
              {item.summary !== null ? <span className="ed-row-desc">{item.summary}</span> : null}
            </span>
            <span className="ed-row-arrow" aria-hidden="true">
              {date !== null && item.publishedAt !== null ? (
                <time dateTime={item.publishedAt} className="ed-row-meta">
                  {date}
                </time>
              ) : null}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
