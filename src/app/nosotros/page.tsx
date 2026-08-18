import { SiteShell } from "@/components/layouts/SiteShell";
import { PageHero } from "@/components/ui/PageHero";

const values = [
  ["Claridad", "Diseñamos experiencias que hacen visible el siguiente paso."],
  ["Curiosidad", "Exploramos tecnología sin perder de vista a las personas."],
  ["Impacto", "Medimos el aprendizaje por lo que transforma, no por lo que acumula."],
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Quiénes somos"
        title="Construimos capacidad para lo que viene."
        description="PROEFEX nace para unir estrategia, diseño y tecnología en experiencias de aprendizaje que se sienten naturales y producen movimiento."
      />
      <section className="relative px-6 pb-28 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="rounded-[2rem] bg-gradient-to-br from-proefex-orange to-proefex-amber p-10 text-proefex-navy sm:p-14">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
              Nuestra mirada
            </span>
            <p className="mt-8 text-3xl font-bold leading-tight sm:text-4xl">
              El aprendizaje no es un lugar al que llegas. Es la forma en que avanzas.
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-proefex-amber">
              Principios
            </span>
            <div className="mt-7 flex flex-col gap-5">
              {values.map(([title, description]) => (
                <article key={title} className="rounded-3xl bg-white/[0.06] p-6">
                  <h2 className="text-xl font-semibold text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
