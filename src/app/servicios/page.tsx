import { SiteShell } from "@/components/layouts/SiteShell";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/data/landing";

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Servicios PROEFEX"
        title="La tecnología al servicio de las personas."
        description="Diseñamos ecosistemas de aprendizaje que conectan contenido, operación y crecimiento con una experiencia que tu equipo sí quiere usar."
        ctaLabel="Diseñar una solución"
        ctaHref="/contacto"
      />
      <section className="relative px-6 pb-28 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.id}
              className={`rounded-[2rem] p-8 ${index === 1 ? "bg-proefex-orange text-proefex-navy" : "bg-white/[0.06] text-white"}`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${index === 1 ? "bg-proefex-navy text-proefex-orange" : "bg-proefex-azure/30 text-proefex-amber"}`}
              >
                <ServiceIcon icon={service.icon} />
              </div>
              <h2 className="mt-10 text-2xl font-bold">{service.title}</h2>
              <p
                className={`mt-5 leading-relaxed ${index === 1 ? "text-proefex-navy/70" : "text-white/65"}`}
              >
                {service.description}
              </p>
              <a
                href="/contacto"
                className={`mt-10 inline-block text-sm font-semibold ${index === 1 ? "text-proefex-navy" : "text-proefex-orange"}`}
              >
                Conocer el servicio →
              </a>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-20 max-w-7xl rounded-[2rem] bg-gradient-to-br from-proefex-azure/40 to-white/[0.04] p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-proefex-amber">
                Formación a medida
              </span>
              <h2 className="mt-4 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
                Tu contexto merece una experiencia propia.
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-white/65">
                Alineamos objetivos, contenidos y métricas para que cada ruta de aprendizaje
                responda a las conversaciones reales de tu negocio.
              </p>
            </div>
            <ButtonLink href="/contacto">Hablemos de tu reto</ButtonLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
