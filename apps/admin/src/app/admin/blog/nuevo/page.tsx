import Link from "next/link";

import { AppShell } from "@proefex/shared/layouts/AppShell";
import { Button } from "@proefex/shared/ui/Button";
import { Field } from "@proefex/shared/ui/Field";

export default function NewPostPage() {
  return (
    <AppShell admin>
      <div className="mx-auto max-w-3xl">
        <Link href="/admin/blog" className="text-sm font-semibold text-proefex-azure">
          ← Volver al blog
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">Nuevo artículo.</h1>
        <form
          className="mt-10 rounded-[2rem] bg-white p-8 shadow-[0_16px_45px_rgba(0,34,84,0.08)] sm:p-10"
          action="#"
          method="post"
        >
          <div className="flex flex-col gap-5">
            <Field label="Título" name="title" placeholder="Un título que abra una conversación" />
            <Field label="Categoría" name="category" placeholder="Ej. Tendencias" />
            <label className="flex flex-col gap-2 text-sm font-medium">
              Extracto
              <textarea
                name="excerpt"
                rows={4}
                placeholder="Resume la idea principal..."
                className="resize-none rounded-2xl border border-proefex-navy/10 px-4 py-3 text-sm outline-none transition focus:border-proefex-orange focus:ring-4 focus:ring-proefex-orange/10"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Contenido
              <textarea
                name="content"
                rows={10}
                placeholder="Escribe el contenido del artículo..."
                className="resize-none rounded-2xl border border-proefex-navy/10 px-4 py-3 text-sm outline-none transition focus:border-proefex-orange focus:ring-4 focus:ring-proefex-orange/10"
              />
            </label>
          </div>
          <div className="mt-7">
            <Button type="submit">Guardar borrador</Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
