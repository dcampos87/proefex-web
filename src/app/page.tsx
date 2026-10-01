import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { EditorialRows } from "@/components/ui/EditorialRows";
import { MediaFrame } from "@/components/media/MediaFrame";
import { PILLARS, CONTACT_HREF } from "@/components/layout/nav-data";

export const metadata: Metadata = {
  title: "PROEFEX — Un solo ecosistema para construir, crecer y aprender",
  description:
    "Más de 12 años construyendo tecnología. Cinco capacidades — CREATE, GROW, LEARN, EXPERIENCE, SOLVE — que funcionan como un sistema.",
  alternates: { canonical: "/" },
};

const METHOD = [
  { n: "01", t: "Entender", d: "Diagnóstico de la operación, el contexto y el objetivo de negocio." },
  { n: "02", t: "Diseñar", d: "La solución como sistema: alcance, enfoque y capacidad correcta." },
  { n: "03", t: "Integrar", d: "Los pilares necesarios trabajando conectados, no herramientas aisladas." },
  { n: "04", t: "Evolucionar", d: "Medición, mejora continua y acompañamiento del ecosistema." },
];

const SECTORES = [
  { label: "Industria", href: "/sectores/industria" },
  { label: "Salud", href: "/sectores/salud" },
  { label: "Retail", href: "/sectores/retail" },
  { label: "Educación", href: "/sectores/educacion" },
  { label: "Servicios", href: "/sectores/servicios" },
  { label: "Minería", href: "/sectores/mineria" },
  { label: "Restaurantes", href: "/sectores/restaurantes" },
  { label: "Banca y seguros", href: "/sectores/banca-seguros" },
];

const PRODUCTOS = [
  { label: "Turu CRM", desc: "CRM: gestión de clientes y leads.", href: "/solutions/turu-crm" },
  { label: "PROEFACT", desc: "Producto del ecosistema SOLVE.", href: "/solutions/proefact" },
  { label: "My Bpass", desc: "Producto del ecosistema SOLVE.", href: "/solutions/my-bpass" },
  { label: "AtendiGo", desc: "Producto del ecosistema SOLVE.", href: "/solutions/atendigo" },
  { label: "Eleventto", desc: "Producto del ecosistema SOLVE.", href: "/solutions/eleventto" },
  { label: "Klyra", desc: "Próximamente.", href: "/solutions/klyra" },
];

/**
 * HOME — Fase 2.3 (D43): recorrido editorial en 9 actos, media-first.
 * Hero audiovisual → 12+ años → puertas de universo → capacidades + media
 * → industrias → proyectos (CONTENT_REQUIRED) → productos → insights → CTA.
 * La Home presenta, orienta y deriva: no es un catálogo.
 * Nota: las imágenes son placeholders generados (visual provisional);
 * el sistema MediaFrame está preparado para media real de CMS (§22).
 */
export default function Home() {
  return (
    <>
      {/* ACTO 01 — IMPACTO: hero audiovisual (video slot listo, poster ahora) */}
      <section data-universe="core" aria-labelledby="hero-title" style={{ background: "var(--bg)" }}>
        <div className="container-pfx grid items-center gap-10 py-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14" style={{ paddingTop: "clamp(48px, 6vw, 88px)", paddingBottom: "clamp(48px, 6vw, 88px)" }}>
          <Reveal className="flex flex-col items-start gap-5">
            <p className="label-mono" style={{ color: "var(--accent)" }}>PROEFEX — ECOSISTEMA</p>
            <h1 id="hero-title" className="display-xl max-w-[16ch]">
              Un solo ecosistema para construir, crecer y aprender.
            </h1>
            <p className="max-w-[48ch]" style={{ color: "var(--text-body)", fontSize: "var(--text-body-lg)" }}>
              Más de 12 años integrando tecnología, ingeniería y creatividad
              para la transformación de las organizaciones.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href={CONTACT_HREF} variant="primary">Solicitar asesoría</Button>
              <Button href="#pilares" variant="secondary">Explorar el ecosistema</Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <MediaFrame
              src="/media/hero-ecosistema.webp"
              alt="Visual abstracto del ecosistema tecnológico PROEFEX: arquitectura modular en azul profundo con señales naranjas (visual provisional)"
              variant="media-editorial"
              aspect="4 / 3"
              focal="50% 45%"
              overlay="soft"
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              tag="VISUAL PROVISIONAL"
              caption="Ecosistema PROEFEX — video del hero pendiente de material real."
              credit="VIDEO / CMS · PENDIENTE"
            />
          </Reveal>
        </div>
      </section>

      {/* ACTO 02 — EXPERIENCIA: 12+ años como narrativa central (D42) */}
      <section data-universe="core" className="section-sm" style={{ background: "var(--bg-sunken)" }} aria-labelledby="years-title">
        <div className="container-pfx grid items-end gap-8 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Reveal>
            <p className="years-figure" aria-hidden="true">
              12<sup>+</sup>
            </p>
            <p className="years-caption mt-2">AÑOS</p>
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-5 pb-2">
            <h2 id="years-title" className="max-w-[24ch]" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-display-lg)", color: "var(--text)" }}>
              Construyendo tecnología, desarrollando soluciones y acompañando la transformación de las organizaciones.
            </h2>
            <p className="max-w-[56ch]" style={{ color: "var(--text-body)" }}>
              Una trayectoria que hoy se organiza en cinco capacidades que
              trabajan como un solo sistema.
            </p>
            <div className="timeline" role="img" aria-label="Trayectoria de más de 12 años, de 2012 a 2026">
              <span className="timeline-node">2012</span>
              <span className="timeline-node" style={{ left: "50%", position: "absolute", transform: "translateX(-50%)", background: "transparent", padding: 0 }}>12+ AÑOS</span>
              <span className="timeline-node timeline-end">2026</span>
            </div>
            <p className="content-required w-fit">
              CONTENT_REQUIRED — hitos de la trayectoria (sin inventar: validar con dirección comercial)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ACTO 03 — ECOSISTEMA: cinco puertas, una por universo (Fase 2.1 §6) */}
      <section id="pilares" data-universe="core" className="section-sm" aria-labelledby="pilares-title">
        <div className="container-pfx flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4">
            <p className="kicker-line">EL ECOSISTEMA</p>
            <h2 id="pilares-title" className="display-xl max-w-[22ch]">
              Cinco puertas. Cinco universos.
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

      {/* ACTO 04 — CAPACIDADES: composición editorial + media; método propio (D29) */}
      <section data-universe="core" className="section-sm" style={{ background: "var(--bg-sunken)" }} aria-labelledby="featured-cap">
        <div className="container-pfx grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
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
          <Reveal delay={120}>
            <MediaFrame
              src="/media/capacidades-ingenieria.webp"
              alt="Visual abstracto de sistemas de ingeniería: módulos y líneas precisas en atmósfera azul industrial (visual provisional)"
              variant="media-wide"
              aspect="16 / 10"
              focal="50% 50%"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Reveal>
        </div>
        <div className="container-pfx mt-12 grid items-start gap-10 lg:grid-cols-[0.85fr_1.3fr]">
          <Reveal className="flex flex-col gap-3 lg:sticky lg:top-24">
            <p className="kicker-line">CÓMO TRABAJAMOS</p>
            <h3 className="max-w-[16ch]" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-heading)", color: "var(--text)" }}>
              Primero el sistema. Después la herramienta.
            </h3>
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

      {/* ACTO 05 — INDUSTRIAS: industry storytelling transversal */}
      <section data-universe="core" className="section-sm" aria-labelledby="industrias-title">
        <div className="container-pfx flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4">
            <p className="kicker-line">INDUSTRIAS</p>
            <h2 id="industrias-title" className="display-xl max-w-[20ch]">
              La misma ingeniería, contextos distintos.
            </h2>
            <p className="max-w-[56ch]" style={{ color: "var(--text-body)" }}>
              Las capacidades del ecosistema se adaptan a la operación de cada
              sector. Descripción por sector: CONTENT_REQUIRED.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <EditorialRows
              ariaLabel="Sectores donde PROEFEX trabaja"
              items={SECTORES.map((s, i) => ({
                index: `0${i + 1}`,
                label: s.label,
                desc: "Capacidades aplicables al sector.",
                href: s.href,
              }))}
            />
          </Reveal>
        </div>
      </section>

      {/* ACTO 06 — PROYECTOS: estructura lista para casos reales (§20) */}
      <section data-universe="core" className="section-sm" style={{ background: "var(--bg-sunken)" }} aria-labelledby="proyectos-title">
        <div className="container-pfx flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4">
            <p className="kicker-line">PROYECTOS</p>
            <h2 id="proyectos-title" className="display-xl max-w-[22ch]">
              El trabajo, contado como evidencia.
            </h2>
            <p className="content-required w-fit">
              CONTENT_REQUIRED — casos reales de PROEFEX (no se inventan; estructura lista para CMS)
            </p>
          </Reveal>
          <Reveal delay={100}>
            <MediaFrame
              src="/media/productos-solutions.webp"
              alt="Estructura visual para caso de estudio: composición modular en espacio azul profundo (visual provisional)"
              variant="media-case"
              aspect="21 / 9"
              overlay="strong"
              sizes="100vw"
              tag="CASO REAL — PENDIENTE"
              caption="Formato preparado: hero audiovisual, problema, solución, proceso, resultado y galería."
              credit="ESTRUCTURA / CMS"
            />
          </Reveal>
          <Reveal>
            <p>
              <Button href="/casos" variant="ghost">Casos de éxito →</Button>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ACTO 07 — PRODUCTOS: PROEFEX Solutions como productos reales */}
      <section data-universe="core" className="section-sm" aria-labelledby="productos-title">
        <div className="container-pfx grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="flex flex-col gap-5 lg:sticky lg:top-24">
            <p className="kicker-line">PRODUCTOS</p>
            <h2 id="productos-title" className="display-xl max-w-[16ch]">
              Soluciones listas, no proyectos desde cero.
            </h2>
            <p className="max-w-[48ch]" style={{ color: "var(--text-body)" }}>
              Productos digitales del ecosistema PROEFEX, con implementación y
              acompañamiento del propio equipo.
            </p>
            <p>
              <Button href="/solutions" variant="secondary">Ver PROEFEX Solutions →</Button>
            </p>
          </Reveal>
          <Reveal delay={100}>
            <EditorialRows
              ariaLabel="Productos del ecosistema PROEFEX"
              items={PRODUCTOS.map((p, i) => ({
                index: `0${i + 1}`,
                label: p.label,
                desc: p.desc,
                href: p.href,
              }))}
            />
          </Reveal>
        </div>
      </section>

      {/* ACTO 08 — INSIGHTS: índice editorial por categorías */}
      <section data-universe="core" className="section-sm" style={{ background: "var(--bg-sunken)" }} aria-labelledby="insights-title">
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

      {/* ACTO 09 — CTA FINAL */}
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
