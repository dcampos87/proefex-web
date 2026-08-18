import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { BlogCard } from "@/components/ui/BlogCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { posts } from "@proefex/shared/data/landing";

export function BlogPreview() {
  return (
    <section id="blog" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24 sm:py-32">
      <RevealOnScroll>
        <SectionHeading
          label="Insights y recursos"
          title="Aprende de quienes ya están transformando su talento"
        />
      </RevealOnScroll>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {posts.map((post, index) => (
          <RevealOnScroll key={post.id} delay={index * 0.12}>
            <BlogCard
              title={post.title}
              excerpt={post.excerpt}
              category={post.category}
              readingMinutes={post.readingMinutes}
              publishDate={post.publishDate}
            />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
