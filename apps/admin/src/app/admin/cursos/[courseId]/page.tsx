import { notFound } from "next/navigation";
import Link from "next/link";

import { AppShell } from "@proefex/shared/layouts/AppShell";
import { Button } from "@proefex/shared/ui/Button";
import { Field } from "@proefex/shared/ui/Field";
import { ModuleList } from "@proefex/shared/ui/ModuleList";
import { courseDetails } from "@proefex/shared/data/platform";

interface AdminCourseEditorPageProps {
  params: Promise<{ courseId: string }>;
}

export function generateStaticParams() {
  return courseDetails.map((course) => ({ courseId: course.id }));
}

export default async function AdminCourseEditorPage({ params }: AdminCourseEditorPageProps) {
  const { courseId } = await params;
  const course = courseDetails.find((item) => item.id === courseId);

  if (!course) {
    notFound();
  }

  return (
    <AppShell admin>
      <div className="mx-auto max-w-7xl">
        <Link href="/admin/cursos" className="text-sm font-semibold text-proefex-azure">
          ← Volver a cursos
        </Link>
        <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-proefex-azure">
              Editor de curso
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{course.title}</h1>
          </div>
          <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
            Publicado
          </span>
        </div>
        <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_0.8fr]">
          <form
            className="rounded-[2rem] bg-white p-8 shadow-[0_16px_45px_rgba(0,34,84,0.08)] sm:p-10"
            action="#"
            method="post"
          >
            <h2 className="text-xl font-semibold">Información principal</h2>
            <div className="mt-7 flex flex-col gap-5">
              <Field label="Título" name="title" placeholder={course.title} />
              <Field label="Instructor" name="instructor" placeholder={course.instructor} />
              <label className="flex flex-col gap-2 text-sm font-medium">
                Descripción
                <textarea
                  name="description"
                  defaultValue={course.description}
                  rows={5}
                  className="resize-none rounded-2xl border border-proefex-navy/10 px-4 py-3 text-sm outline-none transition focus:border-proefex-orange focus:ring-4 focus:ring-proefex-orange/10"
                />
              </label>
            </div>
            <div className="mt-7">
              <Button type="submit">Guardar cambios</Button>
            </div>
          </form>
          <section className="rounded-[2rem] bg-proefex-navy p-8 text-white sm:p-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-proefex-amber">
              Programa
            </span>
            <h2 className="mt-4 text-2xl font-bold">Módulos del curso</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Edita la estructura que verá cada estudiante.
            </p>
            <div className="mt-7">
              <ModuleList modules={course.modules} dark />
            </div>
            <button
              type="button"
              className="mt-6 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold"
            >
              Añadir módulo
            </button>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
