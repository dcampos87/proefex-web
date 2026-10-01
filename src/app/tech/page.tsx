import type { Metadata } from "next";
import { HeroTech } from "@/components/heroes/HeroTech";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EditorialRows } from "@/components/ui/EditorialRows";
import { SubNav } from "@/components/nav/SubNav";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CONTACT_HREF, PILLARS } from "@/components/layout/nav-data";

export const metadata: Metadata = {
  title: "PROEFEX TECH — Desarrollo y Digitalización",
  description:
    "Software a medida, automatización, IA empresarial, transformación digital e ingeniería con drones e IoT.",
  alternates: { canonical: "/tech" },
};

const SUBNAV = [
  { label: "Overview", href: "/tech" },
  ...PILLARS[0].children.map((c) => ({ label: c.label, href: c.href })),
];

/**
 * Landing CREATE / PROEFEX TECH — universo "Sistema Encendido" (D7-A).
 * Universo navegable con subnav y páginas hijas (§14/§19).
 */
export default function TechPage() {
  return (
    <>
      <section data-universe="tech" aria-labelledby="tech-title">
        <HeroTech
          kicker="CREATE — PROEFEX TECH"
          title={"Sistemas que se integran.\nNo herramientas que se acumulan."}
          subtitle="Software, IA, automatización e ingeniería trabajando dentro de su negocio, no alrededor de él."
          primaryCta={{ label: "Hablar con TECH", href: CONTACT_HREF }}
        />
        <div className="container-pfx pb-8">
          <SubNav items={SUBNAV} ariaLabel="Navegación TECH" currentHref="/tech" />
        </div>
      </section>

      <section data-universe="tech" className="section-sm" aria-labelledby="tech-cap">
        <div className="container-pfx flex flex-col gap-10">
          <SectionHeader
            kicker="CAPACIDADES"
            title="Desarrollo y digitalización, con criterio de ingeniería."
            intro="Cada capacidad tiene página propia con su propuesta, método y casos cuando existan."
          />
          <EditorialRows
            ariaLabel="Capacidades TECH"
            items={PILLARS[0].children.map((c, i) => ({
              index: `0${i + 1}`,
              label: c.label,
              desc: c.desc ?? "Propuesta de valor y método: CONTENT_REQUIRED (Fase 3).",
              href: c.href,
              badge: c.built ? undefined : "F3",
            }))}
          />
        </div>
      </section>

      {/* Cierre core: la banda de contacto vuelve al lenguaje de marca */}
      <section data-universe="core" className="section-sm" aria-label="Contacto TECH">
        <Reveal className="container-pfx">
          <div
            className="flex flex-col items-start gap-5 p-8 sm:p-10"
            style={{ borderRadius: "var(--radius-lg)", background: "var(--pfx-blue)" }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-heading)", color: "var(--pfx-white)", maxWidth: "30ch" }}>
              ¿Su operación necesita un sistema, no otra herramienta?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "56ch" }}>
              Cuéntenos el contexto y derivamos la conversación al equipo correcto de TECH.
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
