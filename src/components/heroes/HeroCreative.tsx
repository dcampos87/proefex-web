import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export interface HeroCreativeProps {
  kicker?: string;
  /** Titular tipo cartel. `highlightWord` se pinta con acento y rotación leve. */
  title: string;
  highlightWord?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

/**
 * HeroCreative — D8 dirección B "Grafismo Kinético" (Doc 11, revisada D33).
 * Tipografía XXL como grafismo, rotaciones leves, formas geométricas flat
 * (derivadas de la paleta Grow Up: cian #00FFE6 + derivados), texto
 * cinético por líneas con offsets.
 * En móvil la cinética se reduce: rotaciones ≤ 2deg, sin cursor-reactive.
 * La sección define data-universe="growup".
 */
function Shape({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <span aria-hidden="true" className={`absolute ${className ?? ""}`} style={style} />;
}

export function HeroCreative({
  kicker = "GROW UP",
  title,
  highlightWord,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroCreativeProps) {
  const parts = highlightWord ? title.split(highlightWord) : [title];

  return (
    <section data-universe="growup" aria-labelledby="hero-growup-title">
      <div className="relative overflow-hidden">
        {/* Formas flat del grafismo kinético */}
        <Shape
          className="left-[-6%] top-[12%] h-40 w-40 rounded-full md:h-64 md:w-64"
          style={{ background: "var(--accent-2)", opacity: 0.9 }}
        />
        <Shape
          className="right-[-4%] top-[8%] h-24 w-48 rotate-12 md:h-32 md:w-72"
          style={{ background: "var(--accent)", borderRadius: "999px 999px 999px 0" }}
        />
        <Shape
          className="bottom-[10%] right-[8%] hidden h-28 w-28 md:block"
          style={{
            border: "3px solid var(--accent-3)",
            borderRadius: "50% 50% 0 50%",
          }}
        />

        <div
          className="container-pfx relative"
          style={{
            paddingTop: "clamp(72px, 10vw, 144px)",
            paddingBottom: "clamp(72px, 10vw, 144px)",
          }}
        >
          {kicker ? (
            <Reveal delay={0}>
              <p
                className="label-mono"
                style={{ color: "var(--accent)", transform: "rotate(-1.5deg)" }}
              >
                {kicker}
              </p>
            </Reveal>
          ) : null}

          <Reveal variant="reveal-lines" as="h1" id="hero-growup-title" className="mt-4" style={{ maxWidth: "100%" }}>
            <span className="line" style={{ ["--reveal-delay" as string]: "0ms" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--text-display-2xl)",
                  lineHeight: 1.02,
                  color: "var(--text)",
                  display: "inline-block",
                  transform: "rotate(-1deg)",
                }}
              >
                {highlightWord && parts.length === 2 ? (
                  <>
                    {parts[0]}
                    <span
                      style={{
                        color: "var(--accent)",
                        display: "inline-block",
                        transform: "rotate(2deg)",
                        textDecoration: "underline",
                        textDecorationThickness: "0.06em",
                        textUnderlineOffset: "0.08em",
                      }}
                    >
                      {highlightWord}
                    </span>
                    {parts[1]}
                  </>
                ) : (
                  title
                )}
              </span>
            </span>
          </Reveal>

          {subtitle ? (
            <Reveal delay={300}>
              <p className="mt-6 max-w-[52ch]" style={{ fontSize: "var(--text-body-lg)", color: "var(--text-body)" }}>
                {subtitle}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={440}>
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
      </div>
    </section>
  );
}
