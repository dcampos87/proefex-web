import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

/** CTA — llamada a la acción configurable (Doc 05 §3, schema CTA ya en blocks-schema). */
export function CTASection({ title, description, primaryCta, secondaryCta }: CTASectionProps) {
  return (
    <Reveal
      className="container-pfx"
    >
      <div
        className="flex flex-col items-center gap-6 p-8 text-center sm:p-12"
        style={{
          borderRadius: "var(--radius-lg)",
          background: "var(--pfx-blue)",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        <h2
          className="max-w-[22ch]"
          style={{ fontSize: "var(--text-display-lg)", fontFamily: "var(--font-display)", color: "var(--pfx-white)" }}
        >
          {title}
        </h2>
        {description ? <p className="max-w-[60ch]">{description}</p> : null}
        <div className="flex flex-wrap justify-center gap-4">
          {primaryCta ? (
            <Button href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </Button>
          ) : null}
          {secondaryCta ? (
            <Button href={secondaryCta.href} variant="secondary" className="on-dark">
              {secondaryCta.label}
            </Button>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
