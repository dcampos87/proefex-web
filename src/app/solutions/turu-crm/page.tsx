import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CONTACT_HREF } from "@/components/layout/nav-data";

export const metadata: Metadata = {
  title: "Turu CRM — PROEFEX SOLUTIONS",
  description: "Producto del ecosistema PROEFEX. Detalle funcional: CONTENT_REQUIRED.",
  alternates: { canonical: "/solutions/turu-crm" },
};

/**
 * PLANTILLA DE PÁGINA DE PRODUCTO (§15, nivel 3) — SOLUTIONS/Turu CRM.
 * Referencia para las páginas de producto de Fase 3. Sin funcionalidades,
 * precios ni métricas no documentadas (§10/D15).
 */
export default function TuruCrmPage() {
  return (
    <>
      <section data-universe="solve" className="relative" style={{ paddingTop: "calc(var(--header-h) + clamp(40px, 6vw, 80px))", paddingBottom: "clamp(40px, 6vw, 72px)", background: "linear-gradient(180deg, var(--bg-sunken) 0%, var(--bg) 100%)" }}>
        <div className="container-pfx flex flex-col gap-5">
          <Breadcrumbs
            items={[
              { label: "PROEFEX", href: "/" },
              { label: "PROEFEX SOLUTIONS", href: "/solutions" },
              { label: "Turu CRM" },
            ]}
          />
          <Reveal className="flex flex-col gap-4">
            <p className="label-mono">SOLVE — PRODUCTO</p>
            <h1 style={{ fontSize: "var(--text-display-lg)" }}>Turu CRM</h1>
            <p className="max-w-[58ch]" style={{ fontSize: "var(--text-body-lg)" }}>
              Producto del ecosistema PROEFEX.
            </p>
            <p>
              <span className="content-required">
                CONTENT_REQUIRED — propuesta de valor, funcionalidades, capturas y FAQ (D15)
              </span>
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              turucrm.com
            </p>
            <p className="mt-2">
              <Button href={CONTACT_HREF} variant="primary">Solicitar demo</Button>
            </p>
          </Reveal>
        </div>
      </section>

      <section data-universe="solve" className="section-sm" aria-labelledby="tc-detalle">
        <div className="container-pfx">
          <SectionHeader
            kicker="EL PRODUCTO"
            title="Qué resuelve, cómo funciona."
            intro="Esta sección se publica con el material del producto aprobado por el negocio."
          />
        </div>
      </section>
    </>
  );
}
