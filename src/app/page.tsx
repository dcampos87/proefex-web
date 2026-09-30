import { HeroCore } from "@/components/heroes/HeroCore";
import { HeroTech } from "@/components/heroes/HeroTech";
import { HeroCreative } from "@/components/heroes/HeroCreative";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceGrid } from "@/components/blocks/ServiceGrid";
import { SaaSShowcase } from "@/components/blocks/SaaSShowcase";
import { SectorGrid } from "@/components/blocks/SectorGrid";
import { BlogGrid } from "@/components/blocks/BlogGrid";
import { CaseStudyCard } from "@/components/blocks/CaseStudyCard";
import { Marquee } from "@/components/blocks/Marquee";
import { ContactSection } from "@/components/forms/ContactSection";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/**
 * HOME — Fase 2 (D6: narrativa continua por universos).
 * Recorrido: Hero Core → Ecosistema → TECH → Grow Up → Learning →
 * SaaS/Productos → Sectores/Casos → Insights → Contacto.
 *
 * Copy: titulares conceptuales aprobados en D12 (no copy comercial final).
 * Sin cifras, clientes, casos ni testimonios inventados (Regla 29):
 * los bloques de evidencia se muestran con CONTENT_REQUIRED.
 */

export default function Home() {
  return (
    <>
      {/* 1. HERO CORE — apertura del ecosistema */}
      <HeroCore
        kicker="PROEFEX — ECOSISTEMA"
        title={"Un solo ecosistema para\nconstruir, crecer y aprender."}
        subtitle="Tecnología, ingeniería y creatividad, integradas."
        primaryCta={{ label: "Iniciar conversación", href: "#contacto" }}
        secondaryCta={{ label: "Explorar capacidades", href: "#tech" }}
      />

      {/* 2. PROEFEX CORE — el sistema que conecta */}
      <section id="nosotros" data-universe="core" className="section" aria-labelledby="core-title">
        <div className="container-pfx flex flex-col gap-12">
          <SectionHeader
            kicker="PROEFEX CORE"
            title="Tecnología, ingeniería y creatividad, integradas."
            intro="Lo que su empresa necesita, funcionando como un sistema: cada área del ecosistema resuelve una parte, y todas trabajan conectadas."
          />
          <ServiceGrid
            items={[
              {
                index: "A",
                title: "PROEFEX TECH",
                description: "Software, IA, automatización e ingeniería aplicada a su operación.",
                href: "#tech",
                meta: "CONSTRUIR",
              },
              {
                index: "B",
                title: "GROW UP",
                description: "Estrategia, contenido y creatividad para hacer crecer marcas.",
                href: "#grow-up",
                meta: "CRECER",
              },
              {
                index: "C",
                title: "LEARNING",
                description: "Capacitación y certificación para equipos. Certmind es Partner Oficial.",
                href: "#learning",
                meta: "APRENDER",
              },
              {
                index: "D",
                title: "PRODUCTOS Y SaaS",
                description: "Equipamiento y software propio que materializa el ecosistema.",
                href: "#saas",
                meta: "ENTREGAR",
              },
            ]}
          />
        </div>
      </section>

      {/* 3. PROEFEX TECH — inmersión en el universo oscuro (D7-A "Sistema Encendido") */}
      <section id="tech" aria-labelledby="tech-title">
        <HeroTech
          kicker="01 — PROEFEX TECH"
          title={"Sistemas que se integran.\nNo herramientas que se acumulan."}
          subtitle="Software, IA, automatización e ingeniería trabajando dentro de su negocio, no alrededor de él."
          primaryCta={{ label: "Hablar con TECH", href: "#contacto" }}
        />
        <div data-universe="tech" className="pb-[clamp(72px,10vw,144px)]">
          <div className="container-pfx">
            <ServiceGrid
              variant="tech"
              items={[
                {
                  index: "01 / DESARROLLO",
                  title: "Software hecho a la medida de su operación.",
                  description: "Web, apps y software especializado construidos sobre su proceso real.",
                },
                {
                  index: "02 / IA",
                  title: "IA y automatización, dentro de su negocio.",
                  description: "Modelos y flujos automatizados integrados a sus sistemas actuales.",
                },
                {
                  index: "03 / INGENIERÍA",
                  title: "Ingeniería con drones: el territorio, en datos.",
                  description: "Geodesia, topografía e IoT con precisión de campo.",
                },
                {
                  index: "04 / TRANSFORMACIÓN",
                  title: "Transformación digital con criterio.",
                  description: "Gestión empresarial y nube, sin acumular herramientas.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 4. GROW UP — cambio radical de universo (D8-B "Grafismo Kinético") */}
      <section id="grow-up" data-universe="growup" aria-labelledby="growup-title">
        <div className="pt-[clamp(48px,7vw,96px)]">
          <Marquee
            words={["ESTRATEGIA", "CONTENIDO", "GROWTH", "STORYTELLING", "CREATIVIDAD"]}
            label="Palabras clave del estudio Grow Up: estrategia, contenido, growth, storytelling, creatividad"
          />
        </div>
        <HeroCreative
          kicker="02 — GROW UP"
          title="Hacemos crecer marcas."
          highlightWord="crecer"
          subtitle="Estrategia, contenido y creatividad en movimiento. El marketing que se nota."
          primaryCta={{ label: "Hablar con Grow Up", href: "#contacto" }}
        />
        <div className="pb-[clamp(72px,10vw,144px)]">
          <div className="container-pfx">
            <ServiceGrid
              variant="growup"
              items={[
                {
                  index: "01",
                  title: "Marketing BPO",
                  description: "Operamos el marketing de su empresa como un equipo propio, en sistema.",
                },
                {
                  index: "02",
                  title: "Growth Marketing",
                  description: "Experimentación y canales, con el crecimiento como objetivo medible.",
                },
                {
                  index: "03",
                  title: "Consultoría de marketing",
                  description: "Método y dirección para que su marca crezca con estrategia.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 5. LEARNING — banda breve (D16: Certmind Partner Oficial) */}
      <section id="learning" data-universe="core" className="section-sm" aria-labelledby="learning-title">
        <div className="container-pfx">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal className="flex flex-col gap-4">
              <p className="label-mono">03 — LEARNING</p>
              <h2 id="learning-title" style={{ fontSize: "var(--text-display-lg)" }}>
                Capacitamos a los equipos que operan el cambio
              </h2>
              <p className="max-w-[56ch]">
                Formación dentro del ecosistema PROEFEX, con la certificación de
                nuestro partner oficial.
              </p>
              <p>
                <Badge>Certmind — Partner Oficial</Badge>
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "var(--text-caption)" }}>
                Catálogo de cursos: <span className="content-required">CONTENT_REQUIRED</span>
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div
                className="flex aspect-[16/9] items-center justify-center border"
                style={{
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-sunken)",
                  borderStyle: "dashed",
                  borderColor: "var(--border-strong)",
                }}
                role="img"
                aria-label="Espacio reservado para imagen de Learning"
              >
                <span className="content-required">MEDIA — CONTENT_REQUIRED</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. SAAS + PRODUCTOS — lo tangible del ecosistema */}
      <section id="saas" data-universe="core" className="section-sm" style={{ background: "var(--bg-sunken)" }} aria-labelledby="saas-title">
        <div className="container-pfx flex flex-col gap-12">
          <SectionHeader
            kicker="04 — SAAS Y PRODUCTOS"
            title="Software propio y equipamiento, parte del mismo sistema."
          />
          <SaaSShowcase
            products={[
              { name: "Turu CRM", domain: "turucrm.com", status: "announced" },
              { name: "PROEFACT", domain: "proefact.com", status: "announced" },
              { name: "My Bpass", domain: "mybpas.com", status: "announced" },
              { name: "AtendiGo", domain: "atendigo.tech", status: "announced" },
              { name: "Eleventto", domain: "eleventto.com", status: "announced" },
              { name: "Klyra", status: "reserved" },
            ]}
          />
          <ServiceGrid
            columns={2}
            items={[
              { title: "Pantallas comerciales" },
              { title: "Pizarras interactivas" },
              { title: "Tótems" },
              { title: "Alquiler de equipos" },
            ]}
          />
        </div>
      </section>

      {/* 7. SECTORES × CASOS — evidencia aplicada (casos solo con contenido real) */}
      <section id="sectores" data-universe="core" className="section-sm" aria-labelledby="sectores-title">
        <div className="container-pfx flex flex-col gap-12">
          <SectionHeader
            kicker="05 — SECTORES Y CASOS"
            title="Experiencia aplicada al sector de su empresa."
          />
          <SectorGrid
            items={[
              { name: "Industria" },
              { name: "Salud" },
              { name: "Retail" },
              { name: "Educación" },
              { name: "Servicios" },
              { name: "Minería" },
              { name: "Restaurantes" },
              { name: "Banca y seguros" },
            ]}
          />
          <CaseStudyCard />
        </div>
      </section>

      {/* 8. INSIGHTS — perspectiva (estructura lista, sin contenido inventado) */}
      <section id="insights" data-universe="core" className="section-sm" style={{ background: "var(--bg-sunken)" }} aria-labelledby="insights-title">
        <div className="container-pfx flex flex-col gap-12">
          <SectionHeader
            kicker="06 — INSIGHTS"
            title="Pensamiento del ecosistema."
            intro="Artículos y notas sobre tecnología, marketing y gestión."
          />
          <BlogGrid />
        </div>
      </section>

      {/* 9. CONTACTO — cierre (D17: formulario diseñado, integración posterior) */}
      <section id="contacto" className="section">
        <ContactSection />
      </section>
    </>
  );
}
