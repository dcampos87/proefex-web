import { Reveal } from "@/components/motion/Reveal";

export interface SaaSItem {
  name: string;
  /** Dominio propio confirmado por el negocio (Doc 19 §D15) o null. */
  domain?: string;
  /** "available" | "announced" — solo con confirmación real (Doc 05 §2.4). */
  status?: "available" | "announced" | "reserved";
}

interface SaaSShowcaseProps {
  products: SaaSItem[];
}

/**
 * SaaSShowcase — vitrina de productos propios (Doc 05 §3, universo Core).
 * Regla de no invención: sin funcionalidades, precios ni métricas no
 * documentadas. Descripciones pendientes → CONTENT_REQUIRED (D15).
 */
export function SaaSShowcase({ products }: SaaSShowcaseProps) {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" role="list">
      {products.map((p, i) => (
        <Reveal as="li" key={p.name} delay={i * 80} className="card flex flex-col gap-3 p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
          <div className="flex items-center justify-between gap-3">
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "var(--text-heading)",
                color: "var(--text)",
              }}
            >
              {p.name}
            </h3>
            {p.status === "reserved" ? (
              <span className="badge" style={{ fontSize: "0.75rem" }}>
                Próximamente
              </span>
            ) : null}
          </div>
          <p>
            <span className="content-required">CONTENT_REQUIRED — descripción</span>
          </p>
          {p.domain ? (
            <p
              className="mt-auto"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
              }}
            >
              {p.domain}
            </p>
          ) : null}
        </Reveal>
      ))}
    </ul>
  );
}
