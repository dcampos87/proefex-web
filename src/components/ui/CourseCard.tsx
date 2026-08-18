interface CourseCardProps {
  title: string;
  category: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  instructor: string;
  durationHours: number;
  priceUsd: number;
  image: string;
}

export function CourseCard({
  title,
  category,
  level,
  instructor,
  durationHours,
  priceUsd,
  image,
}: CourseCardProps) {
  return (
    <article className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl bg-white/[0.04] shadow-[0_20px_60px_rgba(0,34,84,0.45)] backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white/[0.07] hover:shadow-[0_30px_80px_rgba(247,147,30,0.25)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export: next/image no optimiza sin servidor */}
        <img
          src={image}
          alt={`Portada del curso ${title}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-proefex-navy/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-proefex-navy/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-proefex-amber backdrop-blur-sm">
          {level}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-proefex-azure">
          {category}
        </span>
        <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-proefex-amber">
          {title}
        </h3>
        <p className="text-sm text-white/60">
          {instructor} · {durationHours} h
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-proefex-orange">${priceUsd}</span>
          <span className="text-sm font-medium text-white/80 transition-colors group-hover:text-proefex-orange">
            Ver curso →
          </span>
        </div>
      </div>
    </article>
  );
}
