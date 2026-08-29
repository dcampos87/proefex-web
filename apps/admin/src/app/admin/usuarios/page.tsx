import { AppShell } from "@proefex/shared/layouts/AppShell";
import { AdminTable } from "@/features/admin/AdminTable";
import { adminUserRows } from "@proefex/shared/data/platform";

export default function AdminUsersPage() {
  return (
    <AppShell admin>
      <div className="mx-auto max-w-7xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-proefex-azure">
          Comunidad de aprendizaje
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Usuarios.</h1>
        <p className="mt-4 max-w-2xl text-proefex-navy/60">
          Consulta estudiantes, inscripciones y actividad de aprendizaje.
        </p>
        <div className="mt-10">
          <AdminTable title="Estudiantes recientes" action="Invitar usuario" rows={adminUserRows} />
        </div>
      </div>
    </AppShell>
  );
}
