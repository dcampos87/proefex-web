import { notFound } from "next/navigation";

import { SiteShell } from "@/components/layouts/SiteShell";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { posts } from "@/data/landing";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.id }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts.find((item) => item.id === slug);
  if (!post) notFound();

  return (
    <SiteShell>
      <PageHero
        eyebrow={`${post.category} · ${post.publishDate}`}
        title={post.title}
        description={post.excerpt}
      />
      <article className="relative mx-auto max-w-3xl px-6 pb-28 sm:px-10">
        <div className="rounded-[2rem] bg-white p-8 text-proefex-navy shadow-[0_24px_70px_rgba(0,34,84,0.12)] sm:p-12">
          <p className="text-lg leading-relaxed text-proefex-navy/75">{post.excerpt}</p>
          <div className="my-10 h-px bg-proefex-navy/10" />
          <div className="space-y-6 text-base leading-[1.9] text-proefex-navy/70">
            <p>
              Las organizaciones que aprenden con intención convierten el cambio en una capacidad
              cotidiana. No se trata de acumular cursos, sino de crear el espacio para que las
              personas puedan conectar una idea con una decisión.
            </p>
            <p>
              El primer paso es observar el contexto: qué conversaciones necesitan mejorar, qué
              herramientas faltan y cómo se verá una señal concreta de avance. Desde ahí, una ruta
              clara permite medir, ajustar y sostener el aprendizaje.
            </p>
            <p>
              Cuando el contenido se encuentra con la práctica, la formación deja de ser un evento
              aislado y se convierte en parte del sistema operativo de la organización.
            </p>
          </div>
          <div className="mt-10">
            <ButtonLink href="/contacto" variant="ghost">
              Conversar sobre aprendizaje
            </ButtonLink>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
