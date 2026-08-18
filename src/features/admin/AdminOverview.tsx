import Link from "next/link";

import { AdminTable } from "@/features/admin/AdminTable";
import { MetricCard } from "@/components/ui/MetricCard";
import { adminCourseRows, adminPostRows, adminUserRows } from "@/data/platform";

export function AdminOverview() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-proefex-azure">
            Centro de control
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-proefex-navy sm:text-5xl">
            Tu plataforma, en movimiento.
          </h1>
          <p className="mt-4 max-w-2xl text-proefex-navy/60">
            Una vista clara para publicar contenido, acompañar estudiantes y entender el impacto de
            la formación.
          </p>
        </div>
        <Link
          href="/admin/cursos"
          className="w-fit rounded-full bg-proefex-orange px-5 py-3 text-sm font-semibold text-proefex-navy"
        >
          Crear contenido
        </Link>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Estudiantes activos" value="2.840" tone="navy" />
        <MetricCard label="Cursos publicados" value="24" tone="azure" />
        <MetricCard label="Completitud media" value="74%" tone="orange" />
        <MetricCard label="Horas aprendidas" value="8.492" tone="navy" />
      </div>
      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <AdminTable
          title="Cursos recientes"
          action="Gestionar cursos"
          rows={adminCourseRows.slice(0, 3)}
        />
        <AdminTable title="Actividad editorial" action="Ver blog" rows={adminPostRows} />
      </div>
      <div className="mt-8">
        <AdminTable title="Últimos usuarios" action="Ver usuarios" rows={adminUserRows} />
      </div>
    </div>
  );
}
