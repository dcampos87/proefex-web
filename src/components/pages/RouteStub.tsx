import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/nav/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import type { Universe } from "@/components/layout/nav-data";

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
}

/**
 * RouteStub — stub de arquitectura (recalibración §26/§32).
 * Página de navegación real pero sin contenido: marca explícitamente
 * CONTENT_REQUIRED. "Arquitectura primero, contenido después."
 * Hereda el universo visual de su árbol (header/footer/coherencia cromática).
 */
export function RouteStub({ pillar, title, crumbs, requires, backHref, backLabel, universe = "core" }: RouteStubProps) {
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
            <p className="label-mono">{pillar}</p>
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
      <section className="section-sm" style={{ background: "var(--bg-sunken)" }} aria-label="Estado de la página">
        <div className="container-pfx">
          <p style={{ color: "var(--text-muted)", fontSize: "var(--text-caption)", maxWidth: "70ch" }}>
            Stub de navegación — valida la jerarquía de URLs, el megamenú y la
            navegación contextual. No representa el diseño final de esta página.
          </p>
        </div>
      </section>
    </div>
  );
}
