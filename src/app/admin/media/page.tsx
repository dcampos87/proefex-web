import { AppShell } from "@/components/layouts/AppShell";

const media = [
  ["hero-mountain.webp", "Imagen de portada · 760 KB", "Imagen"],
  ["curso-data-analytics.png", "Portada de curso · 936 KB", "Imagen"],
  ["curso-gestion-agil.webp", "Portada de curso · 728 KB", "Imagen"],
];

export default function AdminMediaPage() {
  return (
    <AppShell admin>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-proefex-azure">
              Recursos del proyecto
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Media.</h1>
            <p className="mt-4 max-w-2xl text-proefex-navy/60">
              Una biblioteca preparada para organizar las piezas visuales de tu experiencia.
            </p>
          </div>
          <button
            type="button"
            className="w-fit rounded-full bg-proefex-orange px-5 py-3 text-sm font-semibold"
          >
            Subir recurso
          </button>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {media.map(([name, meta, type]) => (
            <article
              key={name}
              className="overflow-hidden rounded-[2rem] bg-white shadow-[0_16px_45px_rgba(0,34,84,0.08)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- static export: local media library preview */}
              <img
                src={`/images/${name.includes("curso") ? `courses/${name}` : name}`}
                alt=""
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-5">
                <h2 className="truncate font-semibold">{name}</h2>
                <p className="mt-2 text-xs text-proefex-navy/50">
                  {type} · {meta}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
