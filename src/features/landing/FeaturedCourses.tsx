"use client";

import { useState } from "react";

import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ButtonLink } from "@/components/ui/Button";
import { CourseCard } from "@/components/ui/CourseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { courses } from "@/data/landing";

export function FeaturedCourses() {
  const [offset, setOffset] = useState(0);
  const visibleCourses = courses.slice(offset, offset + 3);

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
            <div className="flex items-center gap-3">
              <ButtonLink href="/cursos" variant="ghost">
                Ver todos los cursos
              </ButtonLink>
              <button
                type="button"
                aria-label="Siguiente curso"
                onClick={() => setOffset((current) => (current + 1) % courses.length)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-proefex-azure text-white shadow-[0_8px_20px_rgba(0,90,158,0.35)] transition-all hover:-translate-y-0.5 hover:bg-proefex-orange hover:text-proefex-navy"
              >
                →
              </button>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCourses.map((course, index) => (
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
        <div className="mt-8 flex justify-center gap-2" aria-label="Paginación de cursos">
          {courses.map((course, index) => (
            <button
              type="button"
              key={course.id}
              aria-label={`Mostrar curso ${index + 1}`}
              onClick={() => setOffset(index)}
              className={`h-1.5 rounded-full transition-all ${index === offset ? "w-8 bg-proefex-orange" : "w-1.5 bg-proefex-azure"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
