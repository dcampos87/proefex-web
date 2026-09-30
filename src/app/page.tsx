import type { Metadata } from "next";
import Link from "next/link";
import { HeroCore } from "@/components/heroes/HeroCore";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BlogGrid } from "@/components/blocks/BlogGrid";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { PILLARS, CONTACT_HREF } from "@/components/layout/nav-data";

export const metadata: Metadata = {
  title: "PROEFEX — Un solo ecosistema para construir, crecer y aprender",
  description:
    "Tecnología, marketing, formación, equipamiento y productos: cinco capacidades que funcionan como un sistema.",
  alternates: { canonical: "/" },
};

/**
 * HOME — recalibración (§13): ECOSYSTEM ENTRY POINT.
 * Corta y orientadora: presenta el ecosistema, los cinco pilares y deriva
 * tráfico a las landings. NO concentra servicios ni contenido (§2).
 */
export default function Home() {
  return (
    <>
      {/* 1. HERO PROEFEX */}
      <HeroCore
        kicker="PROEFEX — ECOSISTEMA"
        title={"Un solo ecosistema para\nconstruir, crecer y aprender."}
        subtitle="Tecnología, ingeniería y creatividad, integradas."
        primaryCta={{ label: "Solicitar asesoría", href: CONTACT_HREF }}
        secondaryCta={{ label: "Explorar el ecosistema", href: "#pilares" }}
      />

      {/* 2+3. PRESENTACIÓN + CINCO PILARES (Nivel 2, §23) */}
      <section id="pilares" data-universe="core" className="section-sm" aria-labelledby="pilares-title">
        <div className="container-pfx flex flex-col gap-10">
          <SectionHeader
            kicker="EL ECOSISTEMA"
            title="Cinco capacidades, una sola propuesta."
            intro="Cada línea tiene su equipo, su método y su experiencia propia. Juntas funcionan como un sistema: se conocen, se complementan y se integran en tu proyecto."
          />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" role="list" id="nosotros">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.pillar} delay={i * 70}>
                <Link
                  href={p.href}
                  className="card flex h-full flex-col gap-3 p-6 no-underline hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                  aria-label={`${p.pillar} — ${p.name}: ${p.tagline}`}
                >
                  <p className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: p.accent }}
                    />
                    <span className="label-mono" style={{ color: p.accent }}>{p.pillar}</span>
                  </p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-heading)", color: "var(--text)" }}>
                    {p.name}
                  </h3>
                  <p style={{ color: "var(--text-body)" }}>{p.tagline}</p>
                  <p style={{ marginTop: "auto", fontSize: "var(--text-caption)", color: p.accent, fontWeight: 600 }}>
                    Explorar →
                  </p>
                </Link>
              </Reveal>
            ))}
            <Reveal as="li" delay={350} className="card flex h-full flex-col justify-center gap-3 p-6" style={{ background: "var(--pfx-blue)" }}>
              <p className="label-mono" style={{ color: "rgba(255,255,255,0.6)" }}>PROEFEX CORE</p>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-heading)", color: "var(--pfx-white)" }}>
                La capa que conecta los cinco pilares.
              </p>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-caption)" }}>
                Visión, integración y confianza: el lenguaje común del ecosistema.
              </p>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* 5. CÓMO SE CONECTAN — breve, no catálogo */}
      <section data-universe="core" className="section-sm" style={{ background: "var(--bg-sunken)" }} aria-labelledby="conexion-title">
        <div className="container-pfx grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-4">
            <p className="label-mono">INTEGRACIÓN</p>
            <h2 id="conexion-title" style={{ fontSize: "var(--text-display-lg)" }}>
              Lo que su empresa necesita, funcionando como un sistema.
            </h2>
            <p className="max-w-[56ch]">
              No entregamos herramientas aisladas: entendemos la operación,
              diseñamos la solución e integramos tecnología, marketing,
              formación y producto cuando el proyecto lo requiere.
            </p>
            <p>
              <Button href={CONTACT_HREF} variant="secondary">Conversar sobre su caso</Button>
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-3">
            {[
              { n: "01", t: "Entender", d: "Diagnóstico de la operación y el contexto." },
              { n: "02", t: "Diseñar", d: "La solución como sistema, no como piezas sueltas." },
              { n: "03", t: "Integrar", d: "Los pilares necesarios, trabajando conectados." },
            ].map((s) => (
              <div key={s.n} className="card flex items-baseline gap-4 p-5">
                <span className="label-mono" style={{ color: "var(--accent)" }}>{s.n}</span>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--text)" }}>{s.t}</p>
                  <p style={{ fontSize: "var(--text-caption)", color: "var(--text-body)" }}>{s.d}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 6. FEATURED SOLUTIONS — deriva a SOLVE */}
      <section data-universe="solve" className="section-sm" aria-labelledby="featured-title">
        <div className="container-pfx flex flex-col gap-8">
          <SectionHeader
            kicker="SOLVE — PRODUCTOS"
            title="Soluciones listas para operar."
            intro="Software propio del ecosistema, con página propia por producto."
          />
          <ul className="grid gap-5 md:grid-cols-3" role="list">
            {PILLARS[4].children.slice(0, 3).map((prod, i) => (
              <Reveal as="li" key={prod.href} delay={i * 80}>
                <Link href={prod.href} className="card flex h-full flex-col gap-2 p-6 no-underline hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-heading)", color: "var(--text)" }}>
                    {prod.label}
                  </h3>
                  <span className="content-required w-fit">CONTENT_REQUIRED — descripción</span>
                  <p style={{ marginTop: "auto", fontSize: "var(--text-caption)", color: "var(--accent)", fontWeight: 600 }}>
                    Ver producto →
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <p>
              <Button href="/solutions" variant="secondary">Ver todas las soluciones</Button>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 7. INSIGHTS — teaser, deriva a /insights */}
      <section data-universe="core" className="section-sm" style={{ background: "var(--bg-sunken)" }} aria-labelledby="insights-title">
        <div className="container-pfx flex flex-col gap-8">
          <SectionHeader
            kicker="INSIGHTS"
            title="Pensamiento del ecosistema."
          />
          <BlogGrid />
          <Reveal>
            <p>
              <Button href="/insights" variant="secondary">Explorar Insights</Button>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section data-universe="core" className="section-sm" aria-label="Llamado a la acción final">
        <Reveal className="container-pfx">
          <div
            className="flex flex-col items-center gap-5 p-8 text-center sm:p-12"
            style={{ borderRadius: "var(--radius-lg)", background: "var(--pfx-blue)" }}
          >
            <h2 className="max-w-[24ch]" style={{ fontSize: "var(--text-display-lg)", fontFamily: "var(--font-display)", color: "var(--pfx-white)" }}>
              Empecemos por su operación, no por la herramienta.
            </h2>
            <p className="max-w-[52ch]" style={{ color: "rgba(255,255,255,0.8)" }}>
              Cuéntenos su necesidad y derivamos la conversación al equipo correcto del ecosistema.
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
