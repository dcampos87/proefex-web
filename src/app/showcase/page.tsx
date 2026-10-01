import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ServiceGrid } from "@/components/blocks/ServiceGrid";
import { SubNav } from "@/components/nav/SubNav";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { EditorialRows } from "@/components/ui/EditorialRows";
import { PILLARS } from "@/components/layout/nav-data";

export const metadata: Metadata = {
  title: "Showcase — Design System recalibrado",
  robots: { index: false, follow: false },
};

/**
 * SHOWCASE — recalibración visual (§28): herramienta de evaluación del
 * sistema premium editorial: referencia weevolveit (qué tomamos / qué
 * hacemos diferente), 6 universos, navegación, filas editoriales, heroes,
 * primitivas y estados CONTENT_REQUIRED. noindex.
 */
export default function ShowcasePage() {
  return (
    <>
      <section className="section-sm" style={{ paddingTop: "calc(var(--header-h) + 48px)" }}>
        <div className="container-pfx flex flex-col gap-6">
          <p className="label-mono">SHOWCASE — EXPERIENCIA PREMIUM EDITORIAL (RECALIBRACIÓN VISUAL)</p>
          <h1 style={{ fontSize: "var(--text-display-lg)" }}>
            Catálogo de universos, navegación y lenguaje editorial
          </h1>
          <p className="max-w-[65ch]">
            El megamenú vive en el header real de esta página (&quot;Ecosistema&quot;,
            lg+; drawer en &lt;lg). El reveal de página se aprecia al navegar
            entre rutas; el drawer móvil en &lt;lg.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/", label: "Home" },
              { href: "/tech", label: "Tech" },
              { href: "/grow-up", label: "Grow Up" },
              { href: "/learns", label: "Learns" },
              { href: "/equip", label: "Equip" },
              { href: "/solutions", label: "Solutions" },
              { href: "/casos", label: "Casos" },
              { href: "/insights", label: "Insights" },
              { href: "/sectores", label: "Sectores" },
              { href: "/contacto", label: "Contacto" },
              { href: "/tech/desarrollo-de-software", label: "Página de servicio" },
              { href: "/solutions/turu-crm", label: "Página de producto" },
              { href: "/tech/ingenieria/drones", label: "Página stub" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="badge no-underline">
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Referencia: qué tomamos / qué hacemos diferente ===== */}
      <section className="section-sm" style={{ background: "var(--bg-sunken)" }}>
        <div className="container-pfx grid gap-10 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4">
            <h2 style={{ fontSize: "var(--text-heading)" }}>Referencia weevolveit.com — qué tomamos</h2>
            <ul className="flex flex-col gap-2" role="list" style={{ fontSize: "var(--text-caption)", color: "var(--text-body)" }}>
              <li>· Nivel de sofisticación: dark premium y composición editorial.</li>
              <li>· Tipografía protagonista: titulares grandes, labels mono, metadata.</li>
              <li>· Megamenú amplio y jerárquico con descripciones cortas por servicio.</li>
              <li>· Multipage: la Home orienta y deriva; las páginas internas narran.</li>
              <li>· Método/proceso como sección narrativa propia.</li>
              <li>· Navegación contextual, casos como prueba, footer amplio.</li>
            </ul>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <h2 style={{ fontSize: "var(--text-heading)" }}>Qué hacemos diferente en PROEFEX</h2>
            <ul className="flex flex-col gap-2 break-words" role="list" style={{ fontSize: "var(--text-caption)", color: "var(--text-body)" }}>
              <li>· Identidad propia: cinco pilares (CREATE/GROW/LEARN/EXPERIENCE/SOLVE) con universo visual cada uno; la referencia es una sola marca.</li>
              <li>· Sin copiar textos, layout, código ni recursos: estructura y lenguaje recalibrados a PROEFEX.</li>
              <li>· Sin WebGL/Three.js/GSAP: motion nativo CSS + IntersectionObserver (D19), mismo lenguaje con menos peso.</li>
              <li>· Metodología propia (Entender → Diseñar → Integrar → Evolucionar), no el método de la referencia.</li>
              <li>· Contenido honesto: CONTENT_REQUIRED en lugar de cifras o clientes.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Navegación contextual + filas editoriales ===== */}
      <section className="section-sm">
        <div className="container-pfx flex flex-col gap-10">
          <h2 style={{ fontSize: "var(--text-heading)" }}>Navegación contextual y lenguaje editorial</h2>
          <div className="flex flex-col gap-4">
            <p className="label-mono">SUBNAV (pillars reales en cada landing)</p>
            <SubNav
              items={[
                { label: "Overview", href: "#" },
                ...PILLARS[0].children.map((c) => ({ label: c.label, href: c.href })),
              ]}
              ariaLabel="Demo subnav"
              currentHref="#"
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="label-mono">BREADCRUMBS (con JSON-LD)</p>
            <Breadcrumbs
              items={[
                { label: "PROEFEX", href: "/" },
                { label: "PROEFEX TECH", href: "/tech" },
                { label: "Ingeniería", href: "/tech/ingenieria" },
                { label: "Drones" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="label-mono">FILAS EDITORIALES (jerarquía tipográfica, no cards)</p>
            <EditorialRows
              ariaLabel="Demo filas editoriales"
              items={[
                { index: "01", label: "Desarrollo de software", desc: "Web, apps y software a la medida de su operación.", href: "/tech/desarrollo-de-software" },
                { index: "02", label: "Turu CRM", desc: "CRM: gestión de clientes y leads.", href: "/solutions/turu-crm" },
                { index: "03", label: "Capacidad sin contenido", desc: "Estado CONTENT_REQUIRED visible.", href: "#", badge: "F3" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ===== Universos ===== */}
      <section className="section-sm">
        <div className="container-pfx flex flex-col gap-10">
          <h2 style={{ fontSize: "var(--text-heading)" }}>
            Los seis universos (Core + cinco pilares)
          </h2>
          <p className="max-w-[65ch]">
            Cada universo demuestra su paleta, tipografía y firma de motion con
            el mismo bloque de capacidades. Detail completo en{" "}
            <code style={{ fontFamily: "var(--font-mono)" }}>docs/fase-2/visual-system.md</code>.
          </p>
        </div>
      </section>

      {/* TECH */}
      <section data-universe="tech" className="section-sm">
        <div className="container-pfx flex flex-col gap-10">
          <p className="label-mono" style={{ color: "var(--accent)" }}>CREATE — TECH · Sistema Encendido (D7-A)</p>
          <ServiceGrid
            variant="tech"
            items={[
              { index: "01 / MÓDULO", title: "Panel técnico", description: "Bordes 1px, marcas de encuadre, hover que enciende.", meta: "ESTADO: ACTIVO" },
              { index: "02 / MÓDULO", title: "Acento naranja como señal", description: "Nunca superficie grande.", meta: "COLOR: #F7931E" },
              { index: "03 / MÓDULO", title: "Grid de fondo", description: "Retícula 5% con máscara radial.", meta: "TEXTURA: GRID" },
            ]}
          />
        </div>
      </section>

      {/* GROW UP — nueva paleta */}
      <section data-universe="growup" className="section-sm">
        <div className="container-pfx flex flex-col gap-10">
          <p className="label-mono" style={{ color: "var(--accent)" }}>GROW — GROW UP · Editorial digital (D8 recalibrado: #22272E + #00FFE6)</p>
          <ServiceGrid
            variant="growup"
            items={[
              { index: "01", title: "Cian sobre grafito", description: "Acento #00FFE6 sobre fondo #22272E; contraste 11.8:1 (AA)." },
              { index: "02", title: "Editorial, no gamer", description: "Tipografía como grafismo; sin neón decorativo sin función." },
              { index: "03", title: "Stagger loose", description: "Entradas expresivas moderadas; 110ms entre elementos." },
            ]}
          />
        </div>
      </section>

      {/* LEARNS */}
      <section data-universe="learns" className="section-sm" style={{ background: "var(--bg-sunken)" }}>
        <div className="container-pfx flex flex-col gap-10">
          <p className="label-mono" style={{ color: "var(--accent)" }}>LEARN — PROEFEX LEARNS · Conocimiento y progreso (D25)</p>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Certmind — Partner Oficial</Badge>
          </div>
          <ServiceGrid
            items={[
              { index: "01 / CURSOS", title: "Cursos", description: "Superficies menta; acento verde de certificación.", href: "#" },
              { index: "02 / CERTIFICACIÓN", title: "Certificación", description: "Ritmo ordenado y confiable; nada escolar.", href: "#" },
            ]}
          />
        </div>
      </section>

      {/* EQUIP */}
      <section data-universe="equip" className="section-sm">
        <div className="container-pfx flex flex-col gap-10">
          <p className="label-mono" style={{ color: "var(--accent)" }}>EXPERIENCE — PROEFEX EQUIP · Tecnología tangible (D25)</p>
          <ServiceGrid
            items={[
              { index: "01 / DISPLAYS", title: "Pantallas", description: "Superficies cálidas; acento rojo de marca para interacción.", href: "#" },
              { index: "02 / TÓTEMS", title: "Tótems", description: "Físico, robusto, comercial.", href: "#" },
            ]}
          />
        </div>
      </section>

      {/* SOLVE */}
      <section data-universe="solve" className="section-sm" style={{ background: "var(--bg-sunken)" }}>
        <div className="container-pfx flex flex-col gap-10">
          <p className="label-mono" style={{ color: "var(--accent)" }}>SOLVE — PROEFEX SOLUTIONS · Productos y soluciones (D25)</p>
          <ServiceGrid
            items={[
              { index: "01 / PRODUCTO", title: "Turu CRM", description: "Superficies frías azuladas; acento azul claro.", href: "/solutions/turu-crm" },
              { index: "02 / PRODUCTO", title: "Klyra", description: "Reservado: badge 'Próximamente', sin datos.", href: "/solutions/klyra" },
            ]}
          />
        </div>
      </section>

      {/* Primitivas + referencia de heroes */}
      <section className="section-sm">
        <div className="container-pfx flex flex-col gap-8">
          <h2 style={{ fontSize: "var(--text-heading)" }}>Primitivas (tema core)</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
          <p className="max-w-[65ch]" style={{ color: "var(--text-body)", fontSize: "var(--text-caption)" }}>
            Heroes: HeroCore (home), HeroTech (/tech), HeroCreative (/grow-up);
            LEARNS/EQUIP/SOLUTIONS usan hero inline con reveal-lines y subnav
            (ver cada landing).
          </p>
        </div>
      </section>
    </>
  );
}
