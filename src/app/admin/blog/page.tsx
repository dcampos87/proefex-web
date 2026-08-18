import Link from "next/link";

import { AppShell } from "@/components/layouts/AppShell";
import { AdminTable } from "@/features/admin/AdminTable";
import { adminPostRows } from "@/data/platform";

export default function AdminBlogPage() {
  return (
    <AppShell admin>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-proefex-azure">
              Gestión editorial
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Blog.</h1>
            <p className="mt-4 max-w-2xl text-proefex-navy/60">
              Publica ideas que ayuden a tu audiencia a moverse con más claridad.
            </p>
          </div>
          <Link
            href="/admin/blog/nuevo"
            className="w-fit rounded-full bg-proefex-orange px-5 py-3 text-sm font-semibold"
          >
            Nuevo artículo
          </Link>
        </div>
        <div className="mt-10">
          <AdminTable title="Artículos recientes" action="Filtrar" rows={adminPostRows} />
        </div>
      </div>
    </AppShell>
  );
}
