interface MetricCardProps {
  label: string;
  value: string;
  tone?: "orange" | "azure" | "navy";
}

export function MetricCard({ label, value, tone = "azure" }: MetricCardProps) {
  const tones = {
    orange: "text-proefex-orange",
    azure: "text-proefex-azure",
    navy: "text-proefex-navy",
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_16px_45px_rgba(0,34,84,0.08)]">
      <strong className={`block text-3xl font-bold ${tones[tone]}`}>{value}</strong>
      <span className="mt-2 block text-sm text-proefex-navy/60">{label}</span>
    </div>
  );
}
