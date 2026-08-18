import { ButtonLink } from "@/components/ui/Button";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function PageHero({ eyebrow, title, description, ctaLabel, ctaHref }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-40 sm:pb-28 sm:pt-48">
      <div className="hero-glow absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-proefex-amber">
          {eyebrow}
        </span>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-6xl">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70">{description}</p>
        {ctaLabel && ctaHref ? (
          <div className="mt-9">
            <ButtonLink href={ctaHref}>{ctaLabel}</ButtonLink>
          </div>
        ) : null}
      </div>
      <div className="wave-divider bottom-[-9rem]" aria-hidden="true" />
    </section>
  );
}
