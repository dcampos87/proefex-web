interface StatCardProps {
  label: string;
  value: string;
  detail?: string;
}

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_16px_45px_rgba(0,34,84,0.08)]">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-proefex-navy/45">
        {label}
      </span>
      <strong className="mt-4 block text-3xl font-bold text-proefex-navy">{value}</strong>
      {detail ? <span className="mt-2 block text-xs text-proefex-azure">{detail}</span> : null}
    </div>
  );
}
