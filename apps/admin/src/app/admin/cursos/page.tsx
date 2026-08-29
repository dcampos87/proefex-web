import Link from "next/link";

import { AppShell } from "@proefex/shared/layouts/AppShell";
import { AdminTable } from "@/features/admin/AdminTable";
import { adminCourseRows } from "@proefex/shared/data/platform";

export default function AdminCoursesPage() {
  return (
    <AppShell admin>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-proefex-azure">
              Gestión de aprendizaje
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Cursos.</h1>
            <p className="mt-4 max-w-2xl text-proefex-navy/60">
              Organiza el catálogo, los módulos y el estado editorial de cada ruta.
            </p>
          </div>
          <Link
            href="/admin/cursos/nuevo"
            className="w-fit rounded-full bg-proefex-orange px-5 py-3 text-sm font-semibold"
          >
            Nuevo curso
          </Link>
        </div>
        <div className="mt-10">
          <AdminTable title="Todos los cursos" action="Filtrar" rows={adminCourseRows} />
        </div>
      </div>
    </AppShell>
  );
}
