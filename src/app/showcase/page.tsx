import type { Metadata } from "next";
import Link from "next/link";
import { HeroCore } from "@/components/heroes/HeroCore";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ServiceGrid } from "@/components/blocks/ServiceGrid";
import { SubNav } from "@/components/nav/SubNav";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { PILLARS } from "@/components/layout/nav-data";

export const metadata: Metadata = {
  title: "Showcase — Design System recalibrado",
  robots: { index: false, follow: false },
};

/**
 * SHOWCASE — recalibración (§25): herramienta de evaluación del sistema
 * multipágina: 6 universos, navegación (megamenú en header real, subnav,
 * breadcrumbs), heroes, primitivas, bloques y estados CONTENT_REQUIRED.
 * noindex.
 */
export default function ShowcasePage() {
  return (
    <>
      <section className="section-sm" style={{ paddingTop: "calc(var(--header-h) + 48px)" }}>
        <div className="container-pfx flex flex-col gap-6">
          <p className="label-mono">SHOWCASE — SISTEMA MULTIPÁGINA (RECALIBRACIÓN)</p>
          <h1 style={{ fontSize: "var(--text-display-lg)" }}>
            Catálogo de universos y navegación
          </h1>
          <p className="max-w-[65ch]">
            El megamenú vive en el header real de esta página (&quot;Ecosistema&quot;,
            lg+; drawer en &lt;lg). Este catálogo revisa tokens por universo,
            navegación contextual y componentes.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/", label: "Home" },
              { href: "/tech", label: "Tech" },
              { href: "/grow-up", label: "Grow Up" },
              { href: "/learns", label: "Learns" },
              { href: "/equip", label: "Equip" },
              { href: "/solutions", label: "Solutions" },
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

      {/* ===== Navegación contextual ===== */}
      <section className="section-sm" style={{ background: "var(--bg-sunken)" }}>
        <div className="container-pfx flex flex-col gap-10">
          <h2 style={{ fontSize: "var(--text-heading)" }}>Navegación contextual</h2>
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
