import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export interface HeroCoreProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

/**
 * HeroCore — hero institucional claro/azul (Doc 05, universo Core).
 * Entrada: titular por líneas → subtítulo → CTAs (Doc 12 §3.1).
 * CTAs nunca retrasados más de 600ms.
 */
export function HeroCore({
  kicker,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroCoreProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "calc(var(--header-h) + clamp(48px, 8vw, 112px))",
        paddingBottom: "clamp(64px, 9vw, 128px)",
        background:
          "linear-gradient(180deg, var(--bg-sunken) 0%, var(--bg) 100%)",
      }}
      aria-labelledby="hero-core-title"
    >
      <div className="container-pfx relative">
        {kicker ? (
          <Reveal delay={0}>
            <Badge className="mb-6">{kicker}</Badge>
          </Reveal>
        ) : null}

        <Reveal variant="reveal-lines" as="h1" id="hero-core-title">
          {title.split("\n").map((line, i) => (
            <span key={i} className="line" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--text-display-xl)",
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
            <p
              className="mt-6 max-w-[62ch]"
              style={{ fontSize: "var(--text-body-lg)", color: "var(--text-body)" }}
            >
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
    </section>
  );
}
