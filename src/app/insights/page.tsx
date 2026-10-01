import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { EditorialRows } from "@/components/ui/EditorialRows";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Insights — PROEFEX",
  description: "Pensamiento del ecosistema PROEFEX: tecnología, marketing, innovación y formación.",
  alternates: { canonical: "/insights" },
};

const CATEGORIAS = [
  { slug: "tecnologia", label: "Tecnología" },
  { slug: "marketing", label: "Marketing" },
  { slug: "innovacion", label: "Innovación" },
  { slug: "formacion", label: "Formación" },
];

/**
 * ÍNDICE DE INSIGHTS — plantilla editorial (§26/§18). Experiencia propia
 * integrada a la marca; sin CMS y sin artículos inventados (D3).
 */
export default function InsightsPage() {
  return (
    <section data-universe="core" className="section" aria-labelledby="insights-title">
      <div className="container-pfx flex flex-col gap-8">
        <Breadcrumbs items={[{ label: "PROEFEX", href: "/" }, { label: "Insights" }]} />
        <Reveal className="flex flex-col gap-4">
          <p className="kicker-line">EDITORIAL</p>
          <h1 id="insights-title" className="display-xl max-w-[20ch]">
            Ideas que atraviesan el ecosistema.
          </h1>
          <p className="max-w-[60ch]" style={{ color: "var(--text-body)" }}>
            Tecnología, marketing, innovación y formación, escritas por los
            equipos de cada línea. La publicación inicia con el contenido
            autorizado.
          </p>
          <p className="content-required w-fit">CONTENT_REQUIRED — artículos reales (Fase 3, D3)</p>
        </Reveal>
        <Reveal delay={100}>
          <EditorialRows
            ariaLabel="Categorías de Insights"
            items={CATEGORIAS.map((c, i) => ({
              index: `0${i + 1}`,
              label: c.label,
              desc: "Artículos de la categoría: CONTENT_REQUIRED (Fase 3).",
              href: `/insights/${c.slug}`,
              badge: "F3",
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}
