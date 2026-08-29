import { ProgressBar } from "@proefex/shared/ui/ProgressBar";
import type { DashboardCourse } from "@proefex/shared/data/platform";
import Link from "next/link";

interface ProgressSummaryProps {
  item: DashboardCourse;
}

export function ProgressSummary({ item }: ProgressSummaryProps) {
  return (
    <article className="rounded-[2rem] bg-white p-6 shadow-[0_16px_45px_rgba(0,34,84,0.08)]">
      <div className="flex gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export: local course artwork */}
        <img
          src={item.course.image}
          alt=""
          className="h-24 w-28 shrink-0 rounded-2xl object-cover sm:h-28 sm:w-40"
        />
        <div className="min-w-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-proefex-azure">
            {item.course.category}
          </span>
          <h2 className="mt-2 line-clamp-2 text-lg font-semibold text-proefex-navy">
            {item.course.title}
          </h2>
          <p className="mt-2 text-xs text-proefex-navy/50">
            {item.completedLessons} lecciones completadas
          </p>
        </div>
      </div>
      <div className="mt-6">
        <ProgressBar value={item.progress} label="Progreso" />
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-proefex-navy/55">{item.nextLesson}</span>
        <Link
          href={`/dashboard/cursos/${item.course.id}`}
          className="text-sm font-semibold text-proefex-azure"
        >
          {item.progress === 100 ? "Repasar curso →" : "Continuar →"}
        </Link>
      </div>
    </article>
  );
}
