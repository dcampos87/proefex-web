import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { EditorialRows } from "@/components/ui/EditorialRows";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Casos de éxito — PROEFEX",
  description: "Casos del ecosistema PROEFEX: evidencia real de trabajo, sin resultados inventados.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/casos" },
};

/**
 * ÍNDICE DE CASOS — plantilla editorial (§25). Los casos son evidencia;
 * sin material real se marca CONTENT_REQUIRED y el índice queda noindex
 * hasta Fase 3.
 */
export default function CasosPage() {
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
          <p className="content-required w-fit">CONTENT_REQUIRED — casos reales autorizados (Fase 3)</p>
        </Reveal>
        <Reveal delay={100}>
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
