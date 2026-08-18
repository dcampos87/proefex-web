"use client";

import { useState } from "react";

import type { CourseDetail } from "@/data/platform";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface CoursePlayerProps {
  course: CourseDetail;
}

export function CoursePlayer({ course }: CoursePlayerProps) {
  const [currentLesson, setCurrentLesson] = useState(0);
  const totalLessons = course.modules.reduce((total, module) => total + module.lessons, 0);
  const progress = Math.round(((currentLesson + 1) / totalLessons) * 100);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="overflow-hidden rounded-[2rem] bg-proefex-navy shadow-[0_24px_70px_rgba(0,34,84,0.18)]">
        <div className="relative aspect-video overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export: video poster is a local image */}
          <img
            src="/images/hero-mountain.webp"
            alt=""
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-proefex-navy via-proefex-navy/20 to-transparent" />
          <button
            type="button"
            onClick={() => setCurrentLesson((lesson) => Math.min(lesson + 1, totalLessons - 1))}
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-proefex-orange text-proefex-navy shadow-[0_10px_35px_rgba(247,147,30,0.45)]"
            aria-label="Reproducir siguiente lección"
          >
            <span className="ml-1 text-2xl" aria-hidden="true">
              ▶
            </span>
          </button>
          <div className="absolute inset-x-6 bottom-5 flex items-end justify-between gap-4 text-white">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-proefex-amber">
                Lección {currentLesson + 1}
              </span>
              <h2 className="mt-2 text-xl font-semibold">
                {
                  course.modules[Math.min(Math.floor(currentLesson / 4), course.modules.length - 1)]
                    .title
                }
              </h2>
            </div>
            <span className="text-sm text-white/70">{progress}%</span>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <ProgressBar value={progress} label="Progreso del curso" dark />
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              Tu progreso se guarda localmente y queda listo para sincronizarse con tu cuenta.
            </p>
            <button
              type="button"
              onClick={() => setCurrentLesson((lesson) => Math.min(lesson + 1, totalLessons - 1))}
              className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Marcar como completada
            </button>
          </div>
        </div>
      </div>
      <aside className="rounded-[2rem] bg-white p-6 shadow-[0_20px_55px_rgba(0,34,84,0.08)]">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-proefex-azure">
          Contenido del curso
        </span>
        <div className="mt-6 flex flex-col gap-3">
          {course.modules.map((module, index) => (
            <button
              type="button"
              key={module.id}
              onClick={() => setCurrentLesson(index * 4)}
              className={`rounded-2xl p-4 text-left transition ${index === Math.floor(currentLesson / 4) ? "bg-proefex-navy text-white" : "bg-proefex-navy/[0.04] text-proefex-navy hover:bg-proefex-orange/10"}`}
            >
              <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                {module.title}
                <span className="text-xs opacity-60">{module.lessons} lecc.</span>
              </span>
              <span className="mt-2 block text-xs opacity-60">{module.duration}</span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
