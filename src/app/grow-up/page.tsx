import type { Metadata } from "next";
import { HeroCreative } from "@/components/heroes/HeroCreative";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceGrid } from "@/components/blocks/ServiceGrid";
import { Marquee } from "@/components/blocks/Marquee";
import { SubNav } from "@/components/nav/SubNav";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CONTACT_HREF, PILLARS } from "@/components/layout/nav-data";

export const metadata: Metadata = {
  title: "Grow Up — Marketing y Growth",
  description:
    "Estrategia, contenido y creatividad en movimiento. Marketing BPO, growth marketing y consultoría.",
  alternates: { canonical: "/grow-up" },
};

const SUBNAV = [
  { label: "Overview", href: "/grow-up" },
  ...PILLARS[1].children.map((c) => ({ label: c.label, href: c.href })),
];

/**
 * Landing GROW / Grow Up — universo grafito+cian (D8 recalibrado).
 * Editorial-digital: tipografía XXL, marquee, acento cian sobre #22272E.
 */
export default function GrowUpPage() {
  return (
    <>
      <section data-universe="growup" aria-labelledby="growup-title">
        <div className="pt-6">
          <Marquee
            words={["ESTRATEGIA", "CONTENIDO", "GROWTH", "STORYTELLING", "CREATIVIDAD"]}
            label="Palabras clave del estudio Grow Up: estrategia, contenido, growth, storytelling, creatividad"
          />
        </div>
        <HeroCreative
          kicker="GROW — GROW UP"
          title="Hacemos crecer marcas."
          highlightWord="crecer"
          subtitle="Estrategia, contenido y creatividad en movimiento. El marketing que se nota."
          primaryCta={{ label: "Hablar con Grow Up", href: CONTACT_HREF }}
        />
        <div className="container-pfx pb-8">
          <SubNav items={SUBNAV} ariaLabel="Navegación Grow Up" currentHref="/grow-up" />
        </div>
      </section>

      <section data-universe="growup" className="section-sm" aria-labelledby="growup-cap">
        <div className="container-pfx flex flex-col gap-10">
          <SectionHeader
            kicker="CAPACIDADES"
            title="El marketing que se nota, operado como sistema."
            intro="Cada servicio tiene página propia con propuesta, método y resultados cuando existan."
          />
          <ServiceGrid
            variant="growup"
            items={PILLARS[1].children.map((c, i) => ({
              index: `0${i + 1}`,
              title: c.label,
              description: "Propuesta de valor y método: CONTENT_REQUIRED (Fase 3).",
              href: c.href,
            }))}
          />
        </div>
      </section>

      <section data-universe="core" className="section-sm" aria-label="Contacto Grow Up">
        <Reveal className="container-pfx">
          <div
            className="flex flex-col items-start gap-5 p-8 sm:p-10"
            style={{ borderRadius: "var(--radius-lg)", background: "var(--pfx-blue)" }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-heading)", color: "var(--pfx-white)", maxWidth: "30ch" }}>
              ¿Lista su marca para crecer con estrategia?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "56ch" }}>
              Cuéntenos el momento de su negocio y derivamos la conversación al equipo correcto de Grow Up.
            </p>
            <p>
              <Button href={CONTACT_HREF} variant="primary">Solicitar asesoría</Button>
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
