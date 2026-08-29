import { AppShell } from "@proefex/shared/layouts/AppShell";
import { ProgressSummary } from "@/features/lms/ProgressSummary";
import { dashboardCourses } from "@proefex/shared/data/platform";

export default function DashboardCoursesPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-proefex-azure">
          Biblioteca personal
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Mis cursos.</h1>
        <p className="mt-4 max-w-2xl text-proefex-navy/60">
          Todas tus rutas de aprendizaje, con el siguiente paso siempre a la vista.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {dashboardCourses.map((item) => (
            <ProgressSummary item={item} key={item.course.id} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
