"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { CourseCard } from "@/components/ui/CourseCard";
import { courses } from "@proefex/shared/data/landing";

const filters = [
  "Todos",
  "Datos & Analítica",
  "Gestión & Liderazgo",
  "Tecnología",
  "Productividad",
];

export function CourseCatalog() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todos");
  const filteredCourses = useMemo(
    () =>
      courses.filter((course) => {
        const matchesFilter = filter === "Todos" || course.category === filter;
        const matchesQuery = `${course.title} ${course.instructor}`
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
      }),
    [filter, query]
  );

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-3xl bg-white/5 p-4 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Buscar cursos</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busca por curso o instructor"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-proefex-amber focus:outline-none"
          />
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                filter === item
                  ? "bg-proefex-orange text-proefex-navy"
                  : "bg-white/5 text-white/65 hover:bg-white/10"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Link href={`/cursos/${course.id}`} key={course.id}>
            <CourseCard
              title={course.title}
              category={course.category}
              level={course.level}
              instructor={course.instructor}
              durationHours={course.durationHours}
              priceUsd={course.priceUsd}
              image={course.image}
            />
          </Link>
        ))}
      </div>
      {filteredCourses.length === 0 ? (
        <p className="mt-12 rounded-3xl bg-white/5 p-10 text-center text-white/65">
          No encontramos cursos con esos criterios.
        </p>
      ) : null}
    </div>
  );
}
