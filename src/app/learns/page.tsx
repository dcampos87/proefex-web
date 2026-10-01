import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EditorialRows } from "@/components/ui/EditorialRows";
import { SubNav } from "@/components/nav/SubNav";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CONTACT_HREF, PILLARS } from "@/components/layout/nav-data";

export const metadata: Metadata = {
  title: "PROEFEX LEARNS — Formación y Certificación",
  description:
    "Formación dentro del ecosistema PROEFEX. Certmind es Partner Oficial.",
  alternates: { canonical: "/learns" },
};

const SUBNAV = [
  { label: "Overview", href: "/learns" },
  { label: "Cursos", href: "/learns/cursos" },
  { label: "Certificación", href: "/learns/certificacion" },
  { label: "Partner Certmind", href: "/learns/#certmind" },
];

/**
 * Landing LEARN / PROEFEX LEARNS — universo claro menta/verde (D25).
 * Conocimiento y progreso: ritmo ordenado, acento verde, badge partner.
 */
export default function LearnsPage() {
  return (
    <>
      <section data-universe="learns" className="relative" style={{ paddingTop: "calc(var(--header-h) + clamp(48px, 8vw, 112px))", paddingBottom: "clamp(48px, 7vw, 96px)", background: "linear-gradient(180deg, var(--bg-sunken) 0%, var(--bg) 100%)" }}>
        <div className="container-pfx flex flex-col gap-6">
          <Breadcrumbs items={[{ label: "PROEFEX", href: "/" }, { label: "PROEFEX LEARNS" }]} />
          <Reveal variant="reveal-lines" as="h1" id="learns-title">
            {["Formación que", "profesionaliza equipos."].map((line, i) => (
              <span key={i} className="line" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-display-lg)", color: "var(--text)" }}>{line}</span>
              </span>
            ))}
          </Reveal>
          <Reveal delay={220}>
            <p className="max-w-[58ch]" style={{ fontSize: "var(--text-body-lg)", color: "var(--text-body)" }}>
              LEARN desarrolla el conocimiento de su equipo dentro del
              ecosistema PROEFEX, con certificación de nuestro partner oficial.
            </p>
          </Reveal>
          <Reveal delay={340} className="flex flex-wrap items-center gap-4">
            <Button href={CONTACT_HREF} variant="primary">Solicitar formación</Button>
            <Badge>Certmind — Partner Oficial</Badge>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-4">
              <SubNav items={SUBNAV} ariaLabel="Navegación LEARNS" currentHref="/learns" />
            </div>
          </Reveal>
        </div>
      </section>

      <section data-universe="learns" className="section-sm" aria-labelledby="learns-cap">
        <div className="container-pfx flex flex-col gap-10">
          <SectionHeader
            kicker="RUTAS DE APRENDIZAJE"
            title="Cursos y certificación, con página propia."
          />
          <EditorialRows
            ariaLabel="Rutas de aprendizaje"
            items={[
              {
                index: "01",
                label: "Cursos",
                desc: "Catálogo definido por el negocio: CONTENT_REQUIRED (Fase 3). No se inventan cursos, precios ni modalidades (D16).",
                href: "/learns/cursos",
                badge: "F3",
              },
              {
                index: "02",
                label: "Certificación",
                desc: "Rutas de certificación con Certmind: detalle CONTENT_REQUIRED (Fase 3).",
                href: "/learns/certificacion",
                badge: "F3",
              },
            ]}
          />
        </div>
      </section>

      <section data-universe="core" className="section-sm" aria-label="Contacto LEARNS">
        <Reveal className="container-pfx">
          <div className="flex flex-col items-start gap-5 p-8 sm:p-10" style={{ borderRadius: "var(--radius-lg)", background: "var(--pfx-blue)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-heading)", color: "var(--pfx-white)", maxWidth: "30ch" }}>
              ¿Su equipo necesita capacidades nuevas?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "56ch" }}>
              Cuéntenos el perfil y derivamos la conversación al equipo correcto de LEARNS.
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
