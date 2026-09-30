import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export interface HeroTechProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

/**
 * HeroTech — D7 dirección A "Sistema Encendido" (Doc 10).
 * Fondo profundo + grid tecnológico + panel de sistema animado.
 * Sin canvas ni partículas JS (D9: no 3D por defecto; presupuesto Doc 16):
 * la sensación de "sistema vivo" se logra con SVG estático + CSS.
 * La sección define data-universe="tech" para que sus hijos hereden el tema.
 */
const PANEL_ROWS = [
  { label: "MOD 01", name: "SOFTWARE", state: "ACTIVO" },
  { label: "MOD 02", name: "AUTOMATIZACIÓN", state: "ACTIVO" },
  { label: "MOD 03", name: "IA EMPRESARIAL", state: "STANDBY" },
  { label: "MOD 04", name: "INGENIERÍA / IoT", state: "ACTIVO" },
] as const;

export function HeroTech({
  kicker = "PROEFEX TECH",
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroTechProps) {
  return (
    <section data-universe="tech" aria-labelledby="hero-tech-title">
      <div className="relative overflow-hidden">
        {/* Grid tecnológico de fondo (3–6% opacidad, Doc 10 §2.3) */}
        <div className="tech-grid-bg absolute inset-0" aria-hidden="true" />

        <div
          className="container-pfx relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
          style={{
            paddingTop: "clamp(72px, 10vw, 144px)",
            paddingBottom: "clamp(72px, 10vw, 144px)",
          }}
        >
          <div>
            {kicker ? (
              <Reveal delay={0}>
                <p className="label-mono" style={{ color: "var(--accent)" }}>
                  {kicker}
                </p>
              </Reveal>
            ) : null}

            <Reveal variant="reveal-lines" as="h2" id="hero-tech-title" className="mt-4">
              {title.split("\n").map((line, i) => (
                <span key={i} className="line" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: "var(--text-display-lg)",
                      color: "var(--text)",
                    }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </Reveal>

            {subtitle ? (
              <Reveal delay={280}>
                <p className="mt-5 max-w-[56ch]" style={{ fontSize: "var(--text-body-lg)", color: "var(--text-body)" }}>
                  {subtitle}
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={420}>
              <div className="mt-8 flex flex-wrap gap-4">
                {primaryCta ? (
                  <Button href={primaryCta.href} variant="primary">
                    {primaryCta.label}
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button href={secondaryCta.href} variant="secondary">
                    {secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            </Reveal>
          </div>

          {/* Panel de sistema — módulos que encienden en secuencia (firma TECH) */}
          <Reveal
            variant="ignite"
            className="tech-panel p-6 sm:p-8"
            aria-hidden="true"
          >
            <p className="label-mono" style={{ color: "var(--text-muted)" }}>
              SISTEMA / ESTADO
            </p>
            <ul className="mt-5 flex flex-col gap-3" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }}>
              {PANEL_ROWS.map((row, i) => (
                <li
                  key={row.label}
                  className="ignite flex items-center justify-between gap-4 border px-4 py-3"
                  style={{ borderColor: "var(--border)", ["--reveal-delay" as string]: `${300 + i * 120}ms` }}
                >
                  <span style={{ color: "var(--text-muted)" }}>{row.label}</span>
                  <span style={{ color: "var(--text)", letterSpacing: "0.08em" }}>{row.name}</span>
                  <span
                    className="flex items-center gap-2"
                    style={{ color: row.state === "ACTIVO" ? "var(--accent)" : "var(--text-muted)" }}
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: "currentColor" }}
                    />
                    {row.state}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
