import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ButtonLink } from "@proefex/shared/ui/Button";
import { contactCopy } from "@proefex/shared/data/landing";

export function ContactCta() {
  return (
    <section id="contacto" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36">
      <div className="cta-glow absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-proefex-amber">
            Da el siguiente paso
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {contactCopy.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            {contactCopy.subtitle}
          </p>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="mailto:hola@proefexperu.com" variant="primary">
              {contactCopy.cta}
            </ButtonLink>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
