import type { Metadata } from "next";
import { HeroCore } from "@/components/heroes/HeroCore";
import { HeroTech } from "@/components/heroes/HeroTech";
import { HeroCreative } from "@/components/heroes/HeroCreative";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ServiceGrid } from "@/components/blocks/ServiceGrid";
import { StatsSection } from "@/components/blocks/StatsSection";
import { Process } from "@/components/blocks/Process";
import { Timeline } from "@/components/blocks/Timeline";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { Testimonial } from "@/components/blocks/Testimonial";
import { VideoSection } from "@/components/blocks/VideoSection";
import { ImageTextSplit } from "@/components/blocks/ImageTextSplit";
import { LogoWall } from "@/components/blocks/LogoWall";
import { Marquee } from "@/components/blocks/Marquee";

export const metadata: Metadata = {
  title: "Showcase — Design System Fase 2",
  robots: { index: false, follow: false },
};

/**
 * SHOWCASE FASE 2 — catálogo de diseño (no indexable).
 * Componentes, variantes por universo, motion y estados de contenido
 * pendiente (CONTENT_REQUIRED). Consumir solo tokens semánticos.
 */
export default function ShowcasePage() {
  return (
    <>
      <section className="section-sm" style={{ paddingTop: "calc(var(--header-h) + 48px)" }}>
        <div className="container-pfx flex flex-col gap-6">
          <p className="label-mono">SHOWCASE — DESIGN SYSTEM FASE 2</p>
          <h1 style={{ fontSize: "var(--text-display-lg)" }}>
            Catálogo de componentes y universos
          </h1>
          <p className="max-w-[65ch]">
            Vista de verificación visual: primitivas, bloques, motion y temas de
            universo (core / tech / growup). Página de trabajo — no indexable.
          </p>
        </div>
      </section>

      {/* Primitivas */}
      <section className="section-sm" style={{ background: "var(--bg-sunken)" }}>
        <div className="container-pfx flex flex-col gap-8">
          <h2 style={{ fontSize: "var(--text-heading)" }}>Primitivas</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Badge>Badge</Badge>
            <span className="content-required">CONTENT_REQUIRED</span>
            <span className="label-mono">ETIQUETA MONO (D11)</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-6" style={{ color: "var(--text)" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-display-xl)" }}>Poppins 700</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-lg)" }}>Lexend Deca 400</span>
            <span style={{ fontFamily: "var(--font-mono)" }}>Source Code Pro 400 — v2.0</span>
          </div>
        </div>
      </section>

      {/* Universo TECH */}
      <section data-universe="tech" className="section-sm">
        <div className="container-pfx flex flex-col gap-10">
          <h2 style={{ fontSize: "var(--text-heading)", color: "var(--text)" }}>
            Universo TECH — módulos-instrumento (D7-A)
          </h2>
          <ServiceGrid
            variant="tech"
            items={[
              { index: "01 / MÓDULO", title: "Panel técnico", description: "Bordes 1px, marcas de encuadre y hover que enciende el módulo.", meta: "ESTADO: ACTIVO" },
              { index: "02 / MÓDULO", title: "Easing técnico", description: "cubic-bezier(0.4, 0, 0.2, 1) · stagger tight (40ms).", meta: "MOTION: IGNITE" },
              { index: "03 / MÓDULO", title: "Grid de fondo", description: "Retícula al 5% con máscara radial.", meta: "TEXTURA: GRID" },
            ]}
          />
        </div>
      </section>

      {/* Universo GROW UP */}
      <section data-universe="growup" className="section-sm">
        <div className="container-pfx flex flex-col gap-10">
          <h2 style={{ fontSize: "var(--text-heading)" }}>Universo GROW UP — grafismo kinético (D8-B)</h2>
          <Marquee words={["CREATIVIDAD", "MOVIMIENTO", "MARCA"]} label="Demo de marquee" />
          <ServiceGrid
            variant="growup"
            items={[
              { index: "01", title: "Acento coral", description: "El rojo #D64022 lidera; amarillo como segundo acento." },
              { index: "02", title: "Stagger loose", description: "Entradas elásticas moderadas; 110ms entre elementos." },
              { index: "03", title: "Flat gráfico", description: "Formas geométricas sin sombras realistas." },
            ]}
          />
        </div>
      </section>

      {/* Bloques de contenido */}
      <section className="section-sm">
        <div className="container-pfx flex flex-col gap-16">
          <h2 style={{ fontSize: "var(--text-heading)" }}>Bloques</h2>

          <div className="flex flex-col gap-6">
            <h3 style={{ color: "var(--text)" }}>StatsSection — sin datos reales</h3>
            <StatsSection />
          </div>

          <div className="flex flex-col gap-6">
            <h3 style={{ color: "var(--text)" }}>Process</h3>
            <Process
              steps={[
                { index: "01", title: "Diagnóstico", description: "Entendemos la operación." },
                { index: "02", title: "Diseño", description: "Diseñamos la solución como sistema." },
                { index: "03", title: "Implementación", description: "Construimos e integramos." },
              ]}
            />
          </div>

          <div className="flex flex-col gap-6">
            <h3 style={{ color: "var(--text)" }}>Timeline</h3>
            <Timeline
              items={[
                { period: "HITO 1", title: "Primer hito", description: "Descripción del hito (CONTENT_REQUIRED en producción)." },
              ]}
            />
          </div>

          <div className="flex flex-col gap-6">
            <h3 style={{ color: "var(--text)" }}>FAQ</h3>
            <FAQBlock
              items={[
                { question: "¿Cómo se comporta este acordeón sin JavaScript?", answer: "Es HTML nativo (details/summary): funciona sin JS y es accesible por teclado." },
              ]}
            />
          </div>

          <div className="flex flex-col gap-6">
            <h3 style={{ color: "var(--text)" }}>Testimonial (bloqueado sin consentimiento)</h3>
            <Testimonial />
          </div>

          <div className="flex flex-col gap-6">
            <h3 style={{ color: "var(--text)" }}>VideoSection — facade (D5 diferido)</h3>
            <VideoSection />
          </div>

          <ImageTextSplit
            title="ImageTextSplit"
            cta={{ label: "CTA secundario", href: "#" }}
          >
            <p>Split con media en placeholder; en móvil la media va primero.</p>
          </ImageTextSplit>

          <div className="flex flex-col gap-6">
            <h3 style={{ color: "var(--text)" }}>LogoWall — sin alianzas entregadas</h3>
            <LogoWall />
          </div>
        </div>
      </section>

      {/* Heroes aislados */}
      <section className="section-sm" style={{ background: "var(--bg-sunken)" }}>
        <div className="container-pfx flex flex-col gap-6">
          <h2 style={{ fontSize: "var(--text-heading)" }}>Heroes (variantes de universo)</h2>
          <p>Los tres heroes completos viven en la home y en las rutas de universo; aquí se referencian:</p>
          <ul className="flex flex-col gap-2" style={{ color: "var(--text)" }}>
            <li>HeroCore — institucional claro/azul (usado en la home).</li>
            <li>HeroTech — D7-A “Sistema Encendido” (usado en la home, sección TECH).</li>
            <li>HeroCreative — D8-B “Grafismo Kinético” (usado en la home, sección Grow Up).</li>
          </ul>
          <SectionHeader kicker="SECCIÓN HEADER" title="SectionHeader con kicker e intro" intro="Kicker mono + titular display + intro de apoyo." />
        </div>
      </section>
    </>
  );
}
