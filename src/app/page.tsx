import type { Metadata } from "next";
import Link from "next/link";
import { HeroCore } from "@/components/heroes/HeroCore";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { EditorialRows } from "@/components/ui/EditorialRows";
import { PILLARS, CONTACT_HREF } from "@/components/layout/nav-data";

export const metadata: Metadata = {
  title: "PROEFEX — Un solo ecosistema para construir, crecer y aprender",
  description:
    "Tecnología, marketing, formación, equipamiento y productos: cinco capacidades que funcionan como un sistema.",
  alternates: { canonical: "/" },
};

const METHOD = [
  { n: "01", t: "Entender", d: "Diagnóstico de la operación, el contexto y el objetivo de negocio." },
  { n: "02", t: "Diseñar", d: "La solución como sistema: alcance, enfoque y capacidad correcta de la línea indicada." },
  { n: "03", t: "Integrar", d: "Los pilares necesarios trabajando conectados, no herramientas aisladas." },
  { n: "04", t: "Evolucionar", d: "Medición, mejora continua y acompañamiento del ecosistema." },
];

/**
 * HOME — recalibración visual (§7): experiencia premium multipágina.
 * Lógica: introducir → orientar → demostrar → derivar. NO contiene todo:
 * cada sección deriva tráfico a landings de pilar (benchmark editorial,
 * filas tipográficas en lugar de grids de cards).
 */
export default function Home() {
  return (
    <>
      {/* 01 — HERO */}
      <HeroCore
        kicker="PROEFEX — ECOSISTEMA"
        title={"Un solo ecosistema para\nconstruir, crecer y aprender."}
        subtitle="Tecnología, ingeniería y creatividad, integradas."
        primaryCta={{ label: "Solicitar asesoría", href: CONTACT_HREF }}
        secondaryCta={{ label: "Explorar el ecosistema", href: "#pilares" }}
        ghostIndex="05"
        rail="CREATE / GROW / LEARN / EXPERIENCE / SOLVE"
      />

      {/* 02 — ECOSISTEMA: cinco puertas, una por universo (Fase 2.1 §6) */}
      <section id="pilares" data-universe="core" className="section-sm" aria-labelledby="pilares-title">
        <div className="container-pfx flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4" id="nosotros">
            <p className="kicker-line">EL ECOSISTEMA</p>
            <h2 id="pilares-title" className="display-xl max-w-[22ch]">
              Cinco capacidades. Una sola propuesta.
            </h2>
            <p className="max-w-[56ch]" style={{ color: "var(--text-body)" }}>
              Cada línea tiene su equipo, su método y su experiencia propia.
              Juntas funcionan como un sistema.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <EditorialRows
              variant="door"
              ariaLabel="Los cinco pilares del ecosistema PROEFEX"
              items={PILLARS.map((p, i) => ({
                index: `0${i + 1}`,
                label: p.name,
                desc: p.tagline,
                meta: p.pillar,
                accent: p.accent,
                href: p.href,
              }))}
            />
          </Reveal>
        </div>
      </section>

      {/* 03 — FEATURED CAPABILITY: selección, no catálogo */}
      <section data-universe="core" className="section-sm" style={{ background: "var(--bg-sunken)" }} aria-labelledby="featured-cap">
        <div className="container-pfx grid items-start gap-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="flex flex-col gap-4">
            <p className="kicker-line">CAPACIDAD DESTACADA</p>
            <h2 id="featured-cap" className="display-xl max-w-[18ch]">
              Software dentro de su negocio, no alrededor de él.
            </h2>
            <p className="max-w-[52ch]" style={{ color: "var(--text-body)" }}>
              PROEFEX TECH construye web, apps y sistemas a la medida de la
              operación, integrados a lo que su empresa ya usa.
            </p>
            <p>
              <Button href="/tech/desarrollo-de-software" variant="secondary">Ver la capacidad</Button>
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-4 lg:pt-14">
            <EditorialRows
              ariaLabel="Otras capacidades seleccionadas"
              items={[
                { index: "S1", label: "Turu CRM", desc: "SOLVE · CRM: gestión de clientes y leads.", href: "/solutions/turu-crm" },
                { index: "S2", label: "Growth Marketing", desc: "GROW · Experimentación y mejora del embudo.", href: "/grow-up/growth-marketing" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* 04 — FEATURED EXPERIENCE: sin contenido real todavía */}
      <section data-universe="core" className="section-sm" aria-labelledby="featured-exp">
        <Reveal className="container-pfx">
          <div className="card flex flex-col items-start gap-4 p-8 sm:p-12" style={{ background: "var(--surface)", borderRadius: "var(--radius-lg)" }}>
            <p className="kicker-line">EXPERIENCIA DESTACADA</p>
            <h2 id="featured-exp" className="max-w-[24ch]" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-display-lg)", color: "var(--text)" }}>
              Un proyecto del ecosistema, contado como caso.
            </h2>
            <p className="content-required">CONTENT_REQUIRED — caso/proyecto destacado (Fase 3, con material real de PROEFEX)</p>
            <p>
              <Button href="/casos" variant="ghost">Casos de éxito →</Button>
            </p>
          </div>
        </Reveal>
      </section>

      {/* 05 — CÓMO TRABAJAMOS: metodología propia (no copia de referencia) */}
      <section data-universe="core" className="section-sm" style={{ background: "var(--bg-sunken)" }} aria-labelledby="metodo-title">
        <div className="container-pfx grid items-start gap-10 lg:grid-cols-[0.85fr_1.3fr]">
          <Reveal className="flex flex-col gap-4 lg:sticky lg:top-24">
            <p className="kicker-line">CÓMO TRABAJAMOS</p>
            <h2 id="metodo-title" className="display-xl max-w-[14ch]">
              Primero el sistema. Después la herramienta.
            </h2>
            <p className="max-w-[44ch]" style={{ color: "var(--text-body)" }}>
              Una metodología simple para derivar su proyecto a la capacidad
              correcta del ecosistema.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ol className="ed-rows method-rows" role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {METHOD.map((s) => (
                <li key={s.n} className="ed-row" style={{ cursor: "default" }}>
                  <span className="ed-row-idx">{s.n}</span>
                  <span>
                    <span className="ed-row-title">{s.t}</span>
                    <span className="ed-row-desc">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 06 — INSIGHTS: índice editorial por categorías, no grid de cards */}
      <section data-universe="core" className="section-sm" aria-labelledby="insights-title">
        <div className="container-pfx flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4">
            <p className="kicker-line">INSIGHTS</p>
            <h2 id="insights-title" className="max-w-[24ch]" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-display-lg)", color: "var(--text)" }}>
              Pensamiento del ecosistema.
            </h2>
            <p className="content-required w-fit">
              CONTENT_REQUIRED — artículos reales (Fase 3, D3: sin CMS en esta etapa)
            </p>
          </Reveal>
          <Reveal delay={100}>
            <EditorialRows
              ariaLabel="Categorías de Insights"
              items={[
                { index: "01", label: "Tecnología", desc: "Software, IA, automatización e ingeniería.", href: "/insights/tecnologia" },
                { index: "02", label: "Marketing", desc: "Growth, BPO de marketing y consultoría.", href: "/insights/marketing" },
                { index: "03", label: "Innovación", desc: "Transformación digital y nuevos modelos.", href: "/insights/innovacion" },
                { index: "04", label: "Formación", desc: "Capacitación y certificación de equipos.", href: "/insights/formacion" },
              ]}
            />
          </Reveal>
          <Reveal>
            <p>
              <Button href="/insights" variant="ghost">Explorar Insights →</Button>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 07 — CTA FINAL */}
      <section data-universe="core" className="section-sm" aria-label="Llamado a la acción final">
        <Reveal className="container-pfx">
          <div
            className="flex flex-col items-start gap-5 p-8 text-left sm:p-12"
            style={{ borderRadius: "var(--radius-lg)", background: "var(--pfx-blue)" }}
          >
            <p className="label-mono" style={{ color: "rgba(255,255,255,0.6)" }}>EMPECEMOS</p>
            <h2 className="display-xl max-w-[20ch]" style={{ color: "var(--pfx-white)" }}>
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
