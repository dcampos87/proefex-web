import Link from "next/link";

import { AppShell } from "@/components/layouts/AppShell";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";

export default function NewCoursePage() {
  return (
    <AppShell admin>
      <div className="mx-auto max-w-3xl">
        <Link href="/admin/cursos" className="text-sm font-semibold text-proefex-azure">
          ← Volver a cursos
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">Crear curso.</h1>
        <form
          className="mt-10 rounded-[2rem] bg-white p-8 shadow-[0_16px_45px_rgba(0,34,84,0.08)] sm:p-10"
          action="#"
          method="post"
        >
          <div className="flex flex-col gap-5">
            <Field
              label="Título del curso"
              name="title"
              placeholder="Ej. Pensamiento estratégico"
            />
            <Field label="Categoría" name="category" placeholder="Ej. Gestión & Liderazgo" />
            <Field label="Instructor" name="instructor" placeholder="Nombre del instructor" />
            <label className="flex flex-col gap-2 text-sm font-medium">
              Descripción
              <textarea
                name="description"
                rows={5}
                placeholder="Describe la transformación que propone el curso..."
                className="resize-none rounded-2xl border border-proefex-navy/10 px-4 py-3 text-sm outline-none transition focus:border-proefex-orange focus:ring-4 focus:ring-proefex-orange/10"
              />
            </label>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button type="submit">Guardar borrador</Button>
            <Link
              href="/admin/cursos"
              className="rounded-full border border-proefex-navy/15 px-6 py-3 text-sm font-semibold"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
