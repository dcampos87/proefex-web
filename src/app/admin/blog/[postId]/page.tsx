import { notFound } from "next/navigation";
import Link from "next/link";

import { AppShell } from "@/components/layouts/AppShell";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { posts } from "@/data/landing";

interface AdminPostEditorPageProps {
  params: Promise<{ postId: string }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({ postId: post.id }));
}

export default async function AdminPostEditorPage({ params }: AdminPostEditorPageProps) {
  const { postId } = await params;
  const post = posts.find((item) => item.id === postId);

  if (!post) {
    notFound();
  }

  return (
    <AppShell admin>
      <div className="mx-auto max-w-3xl">
        <Link href="/admin/blog" className="text-sm font-semibold text-proefex-azure">
          ← Volver al blog
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">Editar artículo.</h1>
        <form
          className="mt-10 rounded-[2rem] bg-white p-8 shadow-[0_16px_45px_rgba(0,34,84,0.08)] sm:p-10"
          action="#"
          method="post"
        >
          <div className="flex flex-col gap-5">
            <Field label="Título" name="title" placeholder={post.title} />
            <Field label="Categoría" name="category" placeholder={post.category} />
            <label className="flex flex-col gap-2 text-sm font-medium">
              Extracto
              <textarea
                name="excerpt"
                defaultValue={post.excerpt}
                rows={4}
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
          <div className="mt-7 flex flex-wrap gap-3">
            <Button type="submit">Guardar artículo</Button>
            <Link
              href="/admin/blog"
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
