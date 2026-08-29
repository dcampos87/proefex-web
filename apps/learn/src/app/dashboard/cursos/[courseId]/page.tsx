import { notFound } from "next/navigation";
import Link from "next/link";

import { AppShell } from "@proefex/shared/layouts/AppShell";
import { CoursePlayer } from "@/features/lms/CoursePlayer";
import { courseDetails } from "@proefex/shared/data/platform";

interface DashboardCoursePageProps {
  params: Promise<{ courseId: string }>;
}

export function generateStaticParams() {
  return courseDetails.map((course) => ({ courseId: course.id }));
}

export default async function DashboardCoursePage({ params }: DashboardCoursePageProps) {
  const { courseId } = await params;
  const course = courseDetails.find((item) => item.id === courseId);

  if (!course) {
    notFound();
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        <Link href="/dashboard/cursos" className="text-sm font-semibold text-proefex-azure">
          ← Volver a mis cursos
        </Link>
        <div className="mt-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-proefex-azure">
            Reproductor de curso
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{course.title}</h1>
          <p className="mt-3 text-proefex-navy/60">
            {course.instructor} · {course.durationHours} horas de contenido
          </p>
        </div>
        <div className="mt-10">
          <CoursePlayer course={course} />
        </div>
      </div>
    </AppShell>
  );
}
