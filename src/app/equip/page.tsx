import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceGrid } from "@/components/blocks/ServiceGrid";
import { SubNav } from "@/components/nav/SubNav";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CONTACT_HREF, PILLARS } from "@/components/layout/nav-data";

export const metadata: Metadata = {
  title: "PROEFEX EQUIP — Tecnología y equipamiento",
  description:
    "Pantallas, tótems, equipamiento y alquiler: tecnología física dentro del ecosistema PROEFEX.",
  alternates: { canonical: "/equip" },
};

const SUBNAV = [
  { label: "Overview", href: "/equip" },
  ...PILLARS[3].children.map((c) => ({ label: c.label, href: c.href })),
];

/**
 * Landing EXPERIENCE / PROEFEX EQUIP — universo cálido rojo (D25).
 * Tecnología tangible: el catálogo es CONTENT_REQUIRED (no inventar
 * productos ni especificaciones, §9).
 */
export default function EquipPage() {
  return (
    <>
      <section data-universe="equip" className="relative" style={{ paddingTop: "calc(var(--header-h) + clamp(48px, 8vw, 112px))", paddingBottom: "clamp(48px, 7vw, 96px)", background: "linear-gradient(180deg, var(--bg-sunken) 0%, var(--bg) 100%)" }}>
        <div className="container-pfx flex flex-col gap-6">
          <Breadcrumbs items={[{ label: "PROEFEX", href: "/" }, { label: "PROEFEX EQUIP" }]} />
          <Reveal variant="reveal-lines" as="h1" id="equip-title">
            {["Tecnología que se", "toca y se experiencia."].map((line, i) => (
              <span key={i} className="line" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-display-lg)", color: "var(--text)" }}>{line}</span>
              </span>
            ))}
          </Reveal>
          <Reveal delay={220}>
            <p className="max-w-[58ch]" style={{ fontSize: "var(--text-body-lg)", color: "var(--text-body)" }}>
              EXPERIENCE lleva el ecosistema al mundo físico: pantallas,
              interactividad, tótems y equipamiento para espacios comerciales y
              operativos.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <p>
              <Button href={CONTACT_HREF} variant="primary">Consultar equipamiento</Button>
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-4">
              <SubNav items={SUBNAV} ariaLabel="Navegación EQUIP" currentHref="/equip" />
            </div>
          </Reveal>
        </div>
      </section>

      <section data-universe="equip" className="section-sm" aria-labelledby="equip-cap">
        <div className="container-pfx flex flex-col gap-10">
          <SectionHeader
            kicker="CATEGORÍAS"
            title="Equipamiento, con página propia por categoría."
            intro="Categorías según arquitectura aprobada; catálogo y especificaciones llegan con el inventario de contenido."
          />
          <ServiceGrid
            items={PILLARS[3].children.map((c, i) => ({
              index: `0${i + 1} / ${c.label.toUpperCase()}`,
              title: c.label,
              description: "Catálogo y especificaciones: CONTENT_REQUIRED (Fase 3).",
              href: c.href,
            }))}
          />
        </div>
      </section>

      <section data-universe="core" className="section-sm" aria-label="Contacto EQUIP">
        <Reveal className="container-pfx">
          <div className="flex flex-col items-start gap-5 p-8 sm:p-10" style={{ borderRadius: "var(--radius-lg)", background: "var(--pfx-blue)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-heading)", color: "var(--pfx-white)", maxWidth: "30ch" }}>
              ¿Su espacio necesita tecnología física?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "56ch" }}>
              Cuéntenos el entorno y derivamos la conversación al equipo correcto de EQUIP.
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
