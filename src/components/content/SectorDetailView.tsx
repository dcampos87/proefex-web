import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/nav/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import type { SectorDetail } from "@/lib/api/types";

/**
 * Detalle de sector servido por el CMS (F3.2).
 *
 * Compone primitivas existentes (Breadcrumbs, Reveal, tokens y clases de
 * `globals.css`): no introduce un renderer de bloques nuevo ni un sistema visual
 * paralelo. Sólo se muestra contenido publicado en el CMS — nada se inventa:
 * `shortDescription`, `description` y `visualRef` provienen del contrato público
 * del API.
 *
 * `heroMedia` NO se renderiza todavía: la media del CMS llega por URL absoluta y
 * el sistema de media real (Doc 13 / binding `IMAGES`) sigue pendiente, de modo
 * que usar `next/image` exigiría configurar hosts remotos sin conocerlos. Queda
 * registrado como pendiente en docs/fase-3/f3.2-data-layer.md.
 */

interface SectorDetailViewProps {
  sector: SectorDetail;
  crumbs: Crumb[];
  backHref: string;
  backLabel: string;
}

export function SectorDetailView({ sector, crumbs, backHref, backLabel }: SectorDetailViewProps) {
  const intro = sector.shortDescription;
  const body = sector.description !== null && sector.description !== intro ? sector.description : null;

  return (
    <div data-universe="core">
      <section
        className="relative"
        style={{
          paddingTop: "calc(var(--header-h) + clamp(48px, 8vw, 96px))",
          paddingBottom: "clamp(48px, 7vw, 96px)",
          background: "linear-gradient(180deg, var(--bg-sunken) 0%, var(--bg) 100%)",
        }}
      >
        <div className="container-pfx flex flex-col gap-5">
          <Breadcrumbs items={crumbs} />
          <Reveal className="flex flex-col gap-4">
            <p className="label-mono">
              PROEFEX — SECTORES
              <span aria-hidden="true" style={{ color: "var(--accent)" }}> / SECTOR</span>
            </p>
            <h1 style={{ fontSize: "var(--text-display-lg)" }}>{sector.title}</h1>
            {intro !== null ? (
              <p className="max-w-[60ch]" style={{ fontSize: "var(--text-body-lg)" }}>
                {intro}
              </p>
            ) : null}
            {body !== null ? (
              <p className="max-w-[70ch]" style={{ color: "var(--text-body)" }}>
                {body}
              </p>
            ) : null}
            {sector.visualRef !== null ? (
              <p className="label-mono" style={{ color: "var(--text-muted)" }}>
                {sector.visualRef}
              </p>
            ) : null}
            <p className="mt-2">
              <Link href={backHref} className="btn btn-secondary w-fit">
                ← {backLabel}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
