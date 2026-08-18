import Link from "next/link";

import { AppShell } from "@/components/layouts/AppShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { ProgressSummary } from "@/features/lms/ProgressSummary";
import { dashboardCourses } from "@/data/platform";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-proefex-azure">
            Tu espacio de aprendizaje
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Hola, María.</h1>
          <p className="mt-4 max-w-2xl text-proefex-navy/60">
            Cada módulo que completas amplía lo que tu equipo puede hacer.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <MetricCard label="Cursos en progreso" value="2" tone="navy" />
          <MetricCard label="Horas de aprendizaje" value="18.4" tone="azure" />
          <MetricCard label="Racha actual" value="12 días" tone="orange" />
        </div>
        <div className="mt-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Continúa aprendiendo</h2>
            <p className="mt-2 text-sm text-proefex-navy/55">
              Retoma tus rutas activas sin perder el ritmo.
            </p>
          </div>
          <Link
            href="/dashboard/cursos"
            className="hidden text-sm font-semibold text-proefex-azure sm:block"
          >
            Ver biblioteca →
          </Link>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {dashboardCourses.slice(0, 2).map((item) => (
            <ProgressSummary item={item} key={item.course.id} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
