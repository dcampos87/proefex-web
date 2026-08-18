import { SiteShell } from "@proefex/shared/layouts/SiteShell";
import { ButtonLink } from "@proefex/shared/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

const plans = [
  {
    name: "Esencial",
    description: "Para equipos que quieren empezar a aprender con foco.",
    features: ["Catálogo de cursos", "Seguimiento de progreso", "Reportes básicos"],
    action: "Explorar cursos",
  },
  {
    name: "Evolución",
    description: "Para organizaciones que quieren convertir aprendizaje en sistema.",
    features: [
      "Todo lo esencial",
      "Rutas personalizadas",
      "Analítica de impacto",
      "Soporte de implementación",
    ],
    action: "Solicitar cotización",
  },
  {
    name: "A medida",
    description: "Para retos complejos que necesitan una experiencia propia.",
    features: [
      "Diseño de contenidos",
      "Integraciones",
      "Gobierno editorial",
      "Acompañamiento estratégico",
    ],
    action: "Hablar con un asesor",
  },
];

export default function PricingPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Planes que se adaptan"
        title="Empieza con lo que necesitas. Crece con lo que descubras."
        description="Una plataforma flexible para acompañar la madurez de aprendizaje de tu organización, sin capas innecesarias."
      />
      <section className="relative px-6 pb-28 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`flex flex-col rounded-[2rem] p-8 ${index === 1 ? "bg-proefex-orange text-proefex-navy" : "bg-white/[0.06] text-white"}`}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.18em] ${index === 1 ? "text-proefex-navy/60" : "text-proefex-amber"}`}
              >
                Plan 0{index + 1}
              </span>
              <h2 className="mt-6 text-3xl font-bold">{plan.name}</h2>
              <p
                className={`mt-4 min-h-14 text-sm leading-relaxed ${index === 1 ? "text-proefex-navy/70" : "text-white/60"}`}
              >
                {plan.description}
              </p>
              <ul className="mt-8 flex flex-1 flex-col gap-4 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className={index === 1 ? "text-proefex-navy" : "text-proefex-orange"}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <ButtonLink
                  href={index === 0 ? "/cursos" : "/contacto"}
                  variant={index === 1 ? "ghost" : "primary"}
                >
                  {plan.action}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
