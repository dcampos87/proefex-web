import Link from "next/link";

import { SiteShell } from "@/components/layouts/SiteShell";
import { BlogCard } from "@/components/ui/BlogCard";
import { PageHero } from "@/components/ui/PageHero";
import { posts } from "@/data/landing";

export default function BlogPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Ideas que activan el cambio"
        title="El futuro del aprendizaje se conversa."
        description="Perspectivas, herramientas y señales para quienes están construyendo organizaciones más capaces."
      />
      <section className="relative px-6 pb-28 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <BlogCard
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                readingMinutes={post.readingMinutes}
                publishDate={post.publishDate}
              />
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
