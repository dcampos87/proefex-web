import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { ContentSummaryList } from "@/components/content/ContentSummaryList";
import { EditorialRows } from "@/components/ui/EditorialRows";
import { Reveal } from "@/components/motion/Reveal";
import { listContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Casos de éxito — PROEFEX",
  description: "Casos del ecosistema PROEFEX: evidencia real de trabajo, sin resultados inventados.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/casos" },
};

/**
 * ÍNDICE DE CASOS — plantilla editorial (§25). Los casos son evidencia; el
 * material publicado se lee del CMS vía `proefex-api` (F3.2). Sin publicaciones
 * autorizadas el índice conserva el marcador CONTENT_REQUIRED y sigue noindex:
 * la API no rellena contenido, sólo expone lo ya publicado.
 */
export default async function CasosPage() {
  const published = await listContent("cases", { limit: 24 });
  const cases = published.data?.items ?? [];

  return (
    <section data-universe="core" className="section" aria-labelledby="casos-title">
      <div className="container-pfx flex flex-col gap-8">
        <Breadcrumbs items={[{ label: "PROEFEX", href: "/" }, { label: "Casos de éxito" }]} />
        <Reveal className="flex flex-col gap-4">
          <p className="kicker-line">EVIDENCIA</p>
          <h1 id="casos-title" className="display-xl max-w-[20ch]">
            Casos de éxito, contados con evidencia.
          </h1>
          <p className="max-w-[60ch]" style={{ color: "var(--text-body)" }}>
            Lo que se hizo, cómo se hizo y qué cambió. Sin cifras ni clientes
            inventados: cada caso se publica con material autorizado.
          </p>
          {cases.length === 0 ? (
            <p className="content-required w-fit">CONTENT_REQUIRED — casos reales autorizados (Fase 3)</p>
          ) : null}
        </Reveal>
        {cases.length > 0 ? (
          <Reveal delay={100}>
            <ContentSummaryList items={cases} ariaLabel="Casos publicados en el CMS de PROEFEX" />
          </Reveal>
        ) : null}
        <Reveal delay={120}>
          <EditorialRows
            ariaLabel="Casos por línea de negocio"
            items={[
              { index: "01", label: "CREATE — PROEFEX TECH", desc: "Software, automatización, IA, ingeniería.", href: "/tech" },
              { index: "02", label: "GROW — Grow Up", desc: "Marketing, growth y consultoría.", href: "/grow-up" },
              { index: "03", label: "SOLVE — PROEFEX Solutions", desc: "Productos del ecosistema.", href: "/solutions" },
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}
