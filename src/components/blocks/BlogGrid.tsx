import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";

export interface BlogCardItem {
  title: string;
  category?: string;
  href?: string;
}

/**
 * BlogGrid — últimos posts (Doc 05 §3). Fase 2: estructura visual.
 * Sin posts reales → tarjetas marcadas CONTENT_REQUIRED (no se inventa
 * contenido editorial, Doc 29).
 */
export function BlogGrid({ posts, pending = true }: { posts?: BlogCardItem[]; pending?: boolean }) {
  if (pending || !posts?.length) {
    return (
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" role="list">
        {Array.from({ length: 3 }).map((_, i) => (
          <Reveal as="li" key={i} delay={i * 80} className="card flex flex-col gap-3 p-6">
            <span className="content-required w-fit">CONTENT_REQUIRED</span>
            <div
              className="mt-2"
              style={{
                height: 96,
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-sunken)",
                border: "1px dashed var(--border-strong)",
              }}
              aria-hidden="true"
            />
            <span className="label-mono mt-2">ARTÍCULO {i + 1}</span>
          </Reveal>
        ))}
      </ul>
    );
  }
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" role="list">
      {posts.map((post, i) => (
        <Reveal as="li" key={i} delay={i * 80} className="card flex flex-col gap-3 p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
          {post.category ? <Badge>{post.category}</Badge> : null}
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--text-heading)",
              color: "var(--text)",
            }}
          >
            {post.href ? (
              <a href={post.href} className="underline-anim" style={{ color: "inherit" }}>
                {post.title}
              </a>
            ) : (
              post.title
            )}
          </h3>
        </Reveal>
      ))}
    </ul>
  );
}
