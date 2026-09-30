import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SubNav } from "@/components/nav/SubNav";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CONTACT_HREF, PILLARS } from "@/components/layout/nav-data";

export const metadata: Metadata = {
  title: "PROEFEX SOLUTIONS — Productos y soluciones",
  description:
    "Turu CRM, PROEFACT, My Bpass, AtendiGo y Eleventto: software propio del ecosistema PROEFEX.",
  alternates: { canonical: "/solutions" },
};

const SUBNAV = [
  { label: "Overview", href: "/solutions" },
  ...PILLARS[4].children.map((c) => ({ label: c.label, href: c.href })),
];

const PRODUCTS = [
  { label: "Turu CRM", domain: "turucrm.com" },
  { label: "PROEFACT", domain: "proefact.com" },
  { label: "My Bpass", domain: "mybpas.com" },
  { label: "AtendiGo", domain: "atendigo.tech" },
  { label: "Eleventto", domain: "eleventto.com" },
  { label: "Klyra — próximamente", domain: null },
] as const;

/**
 * Landing SOLVE / PROEFEX SOLUTIONS — universo frío azul (D25).
 * Productos digitales listos: un card por producto con página propia.
 * Sin funcionalidades, precios ni métricas no documentadas (§10).
 */
export default function SolutionsPage() {
  return (
    <>
      <section data-universe="solve" className="relative" style={{ paddingTop: "calc(var(--header-h) + clamp(48px, 8vw, 112px))", paddingBottom: "clamp(48px, 7vw, 96px)", background: "linear-gradient(180deg, var(--bg-sunken) 0%, var(--bg) 100%)" }}>
        <div className="container-pfx flex flex-col gap-6">
          <Breadcrumbs items={[{ label: "PROEFEX", href: "/" }, { label: "PROEFEX SOLUTIONS" }]} />
          <Reveal variant="reveal-lines" as="h1" id="solutions-title">
            {["Productos listos para", "convertir necesidades."].map((line, i) => (
              <span key={i} className="line" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-display-lg)", color: "var(--text)" }}>{line}</span>
              </span>
            ))}
          </Reveal>
          <Reveal delay={220}>
            <p className="max-w-[58ch]" style={{ fontSize: "var(--text-body-lg)", color: "var(--text-body)" }}>
              SOLVE reúne el software propio del ecosistema: soluciones
              digitales en operación, integrables entre sí y con los servicios
              PROEFEX.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <p>
              <Button href={CONTACT_HREF} variant="primary">Solicitar demo</Button>
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-4">
              <SubNav items={SUBNAV} ariaLabel="Navegación SOLUTIONS" currentHref="/solutions" />
            </div>
          </Reveal>
        </div>
      </section>

      <section data-universe="solve" className="section-sm" aria-labelledby="solutions-catalog">
        <div className="container-pfx flex flex-col gap-8">
          <SectionHeader kicker="CATÁLOGO" title="Cada producto, con su propia página." />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" role="list">
            {PRODUCTS.map((prod, i) => (
              <Reveal as="li" key={prod.label} delay={i * 60}>
                <Link
                  href={PILLARS[4].children[i].href}
                  className="card flex h-full flex-col gap-3 p-6 no-underline hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-heading)", color: "var(--text)" }}>
                    {prod.label}
                  </h3>
                  <span className="content-required w-fit">CONTENT_REQUIRED — descripción</span>
                  {prod.domain ? (
                    <p style={{ marginTop: "auto", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                      {prod.domain}
                    </p>
                  ) : (
                    <p className="badge w-fit" style={{ marginTop: "auto", fontSize: "0.75rem" }}>
                      Producto reservado
                    </p>
                  )}
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section data-universe="core" className="section-sm" aria-label="Contacto SOLUTIONS">
        <Reveal className="container-pfx">
          <div className="flex flex-col items-start gap-5 p-8 sm:p-10" style={{ borderRadius: "var(--radius-lg)", background: "var(--pfx-blue)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-heading)", color: "var(--pfx-white)", maxWidth: "30ch" }}>
              ¿Una solución lista para su operación?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "56ch" }}>
              Cuéntenos el caso de uso y derivamos la conversación al equipo del producto.
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
