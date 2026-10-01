import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/nav/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import type { Universe } from "@/components/layout/nav-data";

/**
 * Plantillas internas (Fase 2.3, §19): cada tipo de página tiene ritmo
 * editorial propio — no "la Home con otro título". Las secciones son
 * índices de estructura: marcan exactamente qué contenido requiere el
 * CMS en Fase 3 (CONTENT_REQUIRED), sin inventarlo.
 *
 *  service  → Problema/contexto · Qué hacemos · Cómo lo hacemos
 *             · Capacidades · Casos/prueba
 *  product  → Qué resuelve · Capacidades · Experiencia · Integraciones
 *  industry → Contexto del sector · Capacidades aplicables · Casos
 *  default  → stub de arquitectura simple (índices transversales)
 */
const SKELETONS: Record<string, { kicker: string; sections: { n: string; t: string; d: string }[] }> = {
  service: {
    kicker: "SERVICIO",
    sections: [
      { n: "01", t: "Problema / contexto", d: "Qué situación de la operación atiende este servicio." },
      { n: "02", t: "Qué hacemos", d: "Alcance y propuesta de valor concreta." },
      { n: "03", t: "Cómo lo hacemos", d: "Método, equipo y forma de trabajo." },
      { n: "04", t: "Capacidades", d: "Tecnologías y enfoques aplicados." },
      { n: "05", t: "Casos / prueba", d: "Evidencia real de proyectos (no se inventa)." },
    ],
  },
  product: {
    kicker: "PRODUCTO",
    sections: [
      { n: "01", t: "Qué resuelve", d: "La necesidad del negocio que cubre el producto." },
      { n: "02", t: "Capacidades", d: "Funcionalidades documentadas del producto." },
      { n: "03", t: "Experiencia", d: "Cómo lo usan los equipos cliente." },
      { n: "04", t: "Integraciones", d: "Conexión con otros sistemas del ecosistema." },
    ],
  },
  industry: {
    kicker: "SECTOR",
    sections: [
      { n: "01", t: "Contexto del sector", d: "Retos operativos y de transformación del sector." },
      { n: "02", t: "Capacidades aplicables", d: "Qué líneas del ecosistema aplican y cómo." },
      { n: "03", t: "Casos relacionados", d: "Evidencia real en el sector (no se inventa)." },
    ],
  },
  default: {
    kicker: "ÍNDICE",
    sections: [
      { n: "01", t: "Contenido", d: "Contenido de esta página según inventario aprobado." },
    ],
  },
};

interface RouteStubProps {
  /** Etiqueta mono del pilar: CREATE, GROW… */
  pillar: string;
  title: string;
  crumbs: Crumb[];
  /** Qué contenido hará falta para publicar esta página (Fase 3). */
  requires?: string;
  /** Enlace de retorno a la landing del pilar. */
  backHref: string;
  backLabel: string;
  /** Universo visual del árbol de rutas al que pertenece (D33/D34). */
  universe?: Universe;
  /** Plantilla editorial de la página (Fase 2.3 §19). */
  variant?: "service" | "product" | "industry" | "default";
}

export function RouteStub({
  pillar,
  title,
  crumbs,
  requires,
  backHref,
  backLabel,
  universe = "core",
  variant = "default",
}: RouteStubProps) {
  const skeleton = SKELETONS[variant];
  return (
    <div data-universe={universe}>
      <section
        className="relative"
        style={{
          paddingTop: "calc(var(--header-h) + clamp(48px, 8vw, 96px))",
          paddingBottom: "clamp(48px, 7vw, 96px)",
          background: "linear-gradient(180deg, var(--bg-sunken) 0%, var(--bg) 100%)",
        }}
      >
        <div className="container-pfx flex flex-col gap-5">
          <Breadcrumbs items={crumbs} />
          <Reveal className="flex flex-col gap-4">
            <p className="label-mono">
              {pillar}
              <span aria-hidden="true" style={{ color: "var(--accent)" }}> / {skeleton.kicker}</span>
            </p>
            <h1 style={{ fontSize: "var(--text-display-lg)" }}>{title}</h1>
            <p className="max-w-[60ch]" style={{ fontSize: "var(--text-body-lg)" }}>
              Página definida en la arquitectura multipágina. El contenido se
              publica en Fase 3 con el inventario aprobado.
            </p>
            <p>
              <span className="content-required">
                CONTENT_REQUIRED{requires ? ` — ${requires}` : ""}
              </span>
            </p>
            <p className="mt-2">
              <Link href={backHref} className="btn btn-secondary w-fit">
                ← {backLabel}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Ritmo editorial propio por tipo de página: índice de estructura
          que el CMS llenará en Fase 3. */}
      <section className="section-sm" aria-label="Estructura de la página">
        <div className="container-pfx">
          <ol className="ed-rows" role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {skeleton.sections.map((s) => (
              <li key={s.n} className="ed-row" style={{ cursor: "default" }}>
                <span className="ed-row-idx">{s.n}</span>
                <span>
                  <span className="ed-row-title">{s.t}</span>
                  <span className="ed-row-desc">{s.d}</span>
                </span>
                <span className="ed-row-arrow" aria-hidden="true">
                  <span className="content-required" style={{ fontSize: "0.6rem" }}>CMS</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6" style={{ color: "var(--text-muted)", fontSize: "var(--text-caption)", maxWidth: "70ch" }}>
            Plantilla “{skeleton.kicker.toLowerCase()}” — valida jerarquía de URLs,
            universo visual y ritmo editorial. No representa el diseño final de contenido.
          </p>
        </div>
      </section>
    </div>
  );
}
