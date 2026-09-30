import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { SubNav } from "@/components/nav/SubNav";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Process } from "@/components/blocks/Process";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CONTACT_HREF, PILLARS } from "@/components/layout/nav-data";

export const metadata: Metadata = {
  title: "Desarrollo de software — PROEFEX TECH",
  description:
    "Software hecho a la medida de su operación: web, apps y software especializado.",
  alternates: { canonical: "/tech/desarrollo-de-software" },
};

const SUBNAV = [
  { label: "Overview", href: "/tech" },
  ...PILLARS[0].children.map((c) => ({ label: c.label, href: c.href })),
];

/**
 * PLANTILLA DE PÁGINA DE SERVICIO (§15, nivel 3) — TECH/Desarrollo.
 * Referencia para las páginas hijas de Fase 3: breadcrumbs + subnav +
 * propuesta + proceso + CTA. Copy conceptual D12; detalle CONTENT_REQUIRED.
 */
export default function DesarrolloSoftwarePage() {
  return (
    <>
      <section data-universe="tech" className="relative" style={{ paddingTop: "calc(var(--header-h) + clamp(40px, 6vw, 80px))", paddingBottom: "clamp(40px, 6vw, 72px)" }}>
        <div className="tech-grid-bg absolute inset-0" aria-hidden="true" />
        <div className="container-pfx relative flex flex-col gap-5">
          <Breadcrumbs
            items={[
              { label: "PROEFEX", href: "/" },
              { label: "PROEFEX TECH", href: "/tech" },
              { label: "Desarrollo de software" },
            ]}
          />
          <Reveal variant="reveal-lines" as="h1">
            {["Software hecho a la", "medida de su operación."].map((line, i) => (
              <span key={i} className="line" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--text-display-lg)", color: "var(--text)" }}>{line}</span>
              </span>
            ))}
          </Reveal>
          <Reveal delay={240}>
            <p className="max-w-[58ch]" style={{ fontSize: "var(--text-body-lg)", color: "var(--text-body)" }}>
              Web, apps y software especializado construidos sobre su proceso
              real, integrados a sus sistemas actuales.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <p>
              <Button href={CONTACT_HREF} variant="primary">Hablar con TECH</Button>
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-4">
              <SubNav items={SUBNAV} ariaLabel="Navegación TECH" currentHref="/tech/desarrollo-de-software" />
            </div>
          </Reveal>
        </div>
      </section>

      <section data-universe="tech" className="section-sm" aria-labelledby="ds-propuesta">
        <div className="container-pfx flex flex-col gap-8">
          <SectionHeader
            kicker="PROPUESTA DE VALOR"
            title="Dentro de su negocio, no alrededor de él."
            intro="Detalle de la propuesta, alcance y evidencia: CONTENT_REQUIRED (Fase 3)."
          />
          <div className="tech-panel p-6 sm:p-8">
            <span className="content-required">CONTENT_REQUIRED — propuesta de valor, casos y FAQ del servicio</span>
          </div>
        </div>
      </section>

      <section data-universe="tech" className="section-sm" style={{ background: "var(--bg-sunken)" }} aria-labelledby="ds-proceso">
        <div className="container-pfx flex flex-col gap-8">
          <SectionHeader kicker="MÉTODO" title="Cómo trabajamos" />
          <Process
            steps={[
              { index: "01", title: "Diagnóstico", description: "Entendemos la operación y los sistemas existentes." },
              { index: "02", title: "Diseño", description: "Diseñamos la solución como sistema integrable." },
              { index: "03", title: "Implementación", description: "Construimos, integramos y acompañamos la operación." },
            ]}
          />
        </div>
      </section>

      <section data-universe="core" className="section-sm" aria-label="Contacto">
        <Reveal className="container-pfx">
          <div className="flex flex-col items-start gap-5 p-8 sm:p-10" style={{ borderRadius: "var(--radius-lg)", background: "var(--pfx-blue)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-heading)", color: "var(--pfx-white)", maxWidth: "30ch" }}>
              ¿Listo para construir el software que su operación necesita?
            </h2>
            <p>
              <Button href={CONTACT_HREF} variant="primary">Solicitar asesoría</Button>
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
