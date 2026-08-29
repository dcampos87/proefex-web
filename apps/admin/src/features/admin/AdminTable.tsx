interface AdminRow {
  name: string;
  meta: string;
  status: string;
  tone: "green" | "orange" | "blue";
}

interface AdminTableProps {
  title: string;
  action: string;
  rows: AdminRow[];
}

export function AdminTable({ title, action, rows }: AdminTableProps) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700",
    orange: "bg-orange-50 text-orange-700",
    blue: "bg-blue-50 text-blue-700",
  };

  return (
    <section className="rounded-3xl bg-white p-6 shadow-[0_16px_45px_rgba(0,34,84,0.06)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-proefex-navy">{title}</h2>
        <button
          type="button"
          className="rounded-full bg-proefex-navy px-4 py-2 text-xs font-semibold text-white"
        >
          {action}
        </button>
      </div>
      <div className="mt-6 divide-y divide-proefex-navy/10">
        {rows.map((row) => (
          <div
            key={row.name}
            className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <strong className="block text-sm font-semibold text-proefex-navy">{row.name}</strong>
              <span className="text-xs text-proefex-navy/50">{row.meta}</span>
            </div>
            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${tones[row.tone]}`}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
