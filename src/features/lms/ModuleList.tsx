import type { CourseModule } from "@/data/platform";

interface ModuleListProps {
  modules: CourseModule[];
  dark?: boolean;
}

export function ModuleList({ modules, dark = false }: ModuleListProps) {
  return (
    <div className="flex flex-col gap-3">
      {modules.map((module, index) => (
        <div
          key={module.id}
          className={`flex items-center justify-between gap-4 rounded-2xl p-4 ${
            dark ? "bg-white/[0.06] text-white" : "bg-proefex-navy/[0.04] text-proefex-navy"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                dark
                  ? "bg-proefex-azure/40 text-proefex-amber"
                  : "bg-proefex-orange/15 text-proefex-azure"
              }`}
            >
              {index + 1}
            </span>
            <span className="text-sm font-semibold">{module.title}</span>
          </div>
          <span className={`shrink-0 text-xs ${dark ? "text-white/45" : "text-proefex-navy/45"}`}>
            {module.lessons} lecciones
          </span>
        </div>
      ))}
    </div>
  );
}
