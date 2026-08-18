import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/data/landing";

export function Services() {
  return (
    <section id="servicios" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24 sm:py-32">
      <RevealOnScroll>
        <SectionHeading
          label="Lo que ofrecemos"
          title="Tres pilares para transformar el aprendizaje corporativo"
          description="Una plataforma integrada que cubre todo el ciclo: crear, publicar, impartir y medir."
        />
      </RevealOnScroll>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {services.map((service, index) => (
          <RevealOnScroll key={service.id} delay={index * 0.12}>
            <article className="group flex h-full flex-col gap-5 rounded-[2rem] bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white/[0.07] hover:shadow-[0_30px_70px_rgba(0,90,158,0.35)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-proefex-azure/50 to-proefex-navy text-proefex-amber ring-1 ring-white/10 transition-all duration-500 group-hover:from-proefex-orange/70 group-hover:to-proefex-azure/40 group-hover:shadow-[0_10px_30px_rgba(247,147,30,0.35)]">
                <ServiceIcon icon={service.icon} className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="text-sm leading-relaxed text-white/65">{service.description}</p>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
