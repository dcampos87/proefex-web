import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ButtonLink } from "@/components/ui/Button";
import { CourseCard } from "@/components/ui/CourseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { courses } from "@/data/landing";

export function FeaturedCourses() {
  return (
    <section id="cursos" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="golden-edge absolute inset-x-0 top-0 h-px opacity-60" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              label="Cursos destacados"
              title="Formación que impulsa resultados medibles"
              description="Programas diseñados por expertos, con progreso rastreado y retoma exacta."
            />
            <ButtonLink href="#cursos" variant="ghost">
              Ver todos los cursos
            </ButtonLink>
          </div>
        </RevealOnScroll>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <RevealOnScroll key={course.id} delay={index * 0.12}>
              <CourseCard
                title={course.title}
                category={course.category}
                level={course.level}
                instructor={course.instructor}
                durationHours={course.durationHours}
                priceUsd={course.priceUsd}
                image={course.image}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
