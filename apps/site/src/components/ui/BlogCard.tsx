interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  publishDate: string;
}

export function BlogCard({ title, excerpt, category, readingMinutes, publishDate }: BlogCardProps) {
  return (
    <article className="group flex cursor-pointer flex-col gap-4 rounded-3xl bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:bg-white/[0.07] hover:shadow-[0_24px_60px_rgba(0,90,158,0.35)]">
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="rounded-full bg-proefex-azure/30 px-3 py-1 text-proefex-amber">
          {category}
        </span>
        <span className="text-white/50">
          {publishDate} · {readingMinutes} min
        </span>
      </div>
      <h3 className="text-xl font-semibold leading-snug text-white transition-colors group-hover:text-proefex-amber">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-white/65">{excerpt}</p>
      <span className="mt-auto text-sm font-medium text-proefex-orange/90 transition-colors group-hover:text-proefex-orange">
        Leer artículo →
      </span>
    </article>
  );
}
