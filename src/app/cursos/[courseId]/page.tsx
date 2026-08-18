import { notFound } from "next/navigation";

import { SiteShell } from "@/components/layouts/SiteShell";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { courseDetails } from "@/data/platform";

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>;
}

export function generateStaticParams() {
  return courseDetails.map((course) => ({ courseId: course.id }));
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { courseId } = await params;
  const course = courseDetails.find((item) => item.id === courseId);

  if (!course) {
    notFound();
  }

  return (
    <SiteShell>
      <PageHero eyebrow={course.category} title={course.title} description={course.description} />
      <section className="relative px-6 pb-28 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[2rem] bg-white/5 shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export: local course artwork */}
            <img
              src={course.image}
              alt={`Portada de ${course.title}`}
              className="aspect-[16/9] h-full w-full object-cover"
            />
          </div>
          <aside className="rounded-[2rem] bg-white p-7 text-proefex-navy shadow-[0_24px_70px_rgba(0,34,84,0.14)] sm:p-9">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-proefex-azure">
              Ruta de aprendizaje
            </span>
            <h2 className="mt-4 text-2xl font-bold">
              Aprende a tu ritmo, aplica desde el primer módulo.
            </h2>
            <div className="mt-7 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-proefex-navy/[0.04] p-4">
                <strong className="block text-xl">{course.durationHours} h</strong>
                <span className="text-proefex-navy/55">de contenido</span>
              </div>
              <div className="rounded-2xl bg-proefex-navy/[0.04] p-4">
                <strong className="block text-xl">{course.level}</strong>
                <span className="text-proefex-navy/55">nivel</span>
              </div>
            </div>
            <div className="mt-7 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs text-proefex-navy/55">Inversión</span>
                <strong className="mt-1 block text-3xl">${course.priceUsd}</strong>
              </div>
              <ButtonLink href="/registro">Inscribirme ahora</ButtonLink>
            </div>
          </aside>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-proefex-amber">
              Lo que vas a lograr
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Capacidades que se quedan contigo.
            </h2>
            <ul className="mt-7 flex flex-col gap-4">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-white/75">
                  <span className="text-proefex-orange">✦</span>
                  {outcome}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-white/55">
              Instructor: <strong className="text-white/80">{course.instructor}</strong>
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-proefex-amber">
              Programa
            </span>
            <div className="mt-5 flex flex-col gap-4">
              {course.modules.map((module, index) => (
                <article key={module.id} className="rounded-3xl bg-white/[0.06] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm font-semibold text-proefex-amber">0{index + 1}</span>
                    <span className="text-xs text-white/45">
                      {module.lessons} lecciones · {module.duration}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{module.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{module.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
