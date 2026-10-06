import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { ContentSummaryList } from "@/components/content/ContentSummaryList";
import { EditorialRows } from "@/components/ui/EditorialRows";
import { Reveal } from "@/components/motion/Reveal";
import { listContent } from "@/lib/content";

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
 * ÍNDICE DE INSIGHTS — plantilla editorial (§26/§18). Los artículos publicados se
 * leen del CMS vía `proefex-api` (F3.2); las categorías siguen siendo el mapa de
 * arquitectura del sitio y siguen marcadas CONTENT_REQUIRED mientras no exista
 * material autorizado (D3).
 */
export default async function InsightsPage() {
  const published = await listContent("insights", { limit: 24 });
  const insights = published.data?.items ?? [];

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
          {insights.length === 0 ? (
            <p className="content-required w-fit">CONTENT_REQUIRED — artículos reales (Fase 3, D3)</p>
          ) : null}
        </Reveal>
        {insights.length > 0 ? (
          <Reveal delay={100}>
            <ContentSummaryList items={insights} ariaLabel="Artículos publicados en el CMS de PROEFEX" />
          </Reveal>
        ) : null}
        <Reveal delay={120}>
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
