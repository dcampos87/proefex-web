import { Reveal } from "@/components/motion/Reveal";

export interface StatItem {
  value: string;
  label: string;
}

/**
 * StatsSection — cifras animadas (Doc 12 §3.2: contador solo con datos reales).
 * Fase 2: estructura lista; sin cifras de negocio inventadas — el bloque se
 * renderiza con CONTENT_REQUIRED hasta recibir datos aprobados (D13).
 * El contador animado (preset "counter") se activa en Fase 3 con datos reales.
 */
export function StatsSection({ stats, pending = true }: { stats?: StatItem[]; pending?: boolean }) {
  if (pending || !stats?.length) {
    return (
      <div className="card grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 border-b pb-4 last:border-0 sm:border-b-0 sm:border-r sm:last:border-0 sm:pr-4">
            <span className="content-required w-fit">CONTENT_REQUIRED</span>
            <span className="label-mono">CIFRA {i + 1}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
      {stats.map((s, i) => (
        <Reveal as="li" key={s.label} delay={i * 80} className="flex flex-col gap-1">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "var(--text-display-lg)",
              color: "var(--text)",
            }}
          >
            {s.value}
          </span>
          <span className="label-mono">{s.label}</span>
        </Reveal>
      ))}
    </ul>
  );
}
