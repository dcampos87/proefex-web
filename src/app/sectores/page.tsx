import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { EditorialRows } from "@/components/ui/EditorialRows";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Sectores — PROEFEX",
  description: "Sectores atendidos por el ecosistema PROEFEX: dimensión transversal sobre las cinco líneas.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/sectores" },
};

const SECTORES = [
  { slug: "industria", label: "Industria" },
  { slug: "salud", label: "Salud" },
  { slug: "retail", label: "Retail" },
  { slug: "educacion", label: "Educación" },
  { slug: "servicios", label: "Servicios" },
  { slug: "mineria", label: "Minería" },
  { slug: "restaurantes", label: "Restaurantes" },
  { slug: "banca-seguros", label: "Banca y seguros" },
];

/**
 * ÍNDICE DE SECTORES — plantilla editorial (§16). Dimensión transversal:
 * no duplica servicios por sector. Rutas hijas solo cuando el inventario
 * de contenido lo permita (Fase 3); el índice permanece noindex.
 */
export default function SectoresPage() {
  return (
    <section data-universe="core" className="section" aria-labelledby="sectores-title">
      <div className="container-pfx flex flex-col gap-8">
        <Breadcrumbs items={[{ label: "PROEFEX", href: "/" }, { label: "Sectores" }]} />
        <Reveal className="flex flex-col gap-4">
          <p className="kicker-line">TRANSVERSAL</p>
          <h1 id="sectores-title" className="display-xl max-w-[20ch]">
            Un ecosistema que cruza sectores.
          </h1>
          <p className="max-w-[60ch]" style={{ color: "var(--text-body)" }}>
            Las capacidades de PROEFEX se combinan según el sector. Las
            páginas por sector se construyen cuando existan descripciones
            autorizadas.
          </p>
          <p className="content-required w-fit">CONTENT_REQUIRED — descripciones por sector (Fase 3)</p>
        </Reveal>
        <Reveal delay={100}>
          <EditorialRows
            ariaLabel="Sectores"
            items={SECTORES.map((s, i) => ({
              index: `0${i + 1}`,
              label: s.label,
              desc: "Página por sector: CONTENT_REQUIRED (Fase 3).",
              href: `/sectores/${s.slug}`,
              badge: "F3",
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}
