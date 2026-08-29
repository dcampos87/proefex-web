interface ProgressBarProps {
  value: number;
  label?: string;
  dark?: boolean;
}

export function ProgressBar({ value, label, dark = false }: ProgressBarProps) {
  return (
    <div>
      {label ? (
        <div
          className={`mb-2 flex justify-between text-xs ${dark ? "text-white/60" : "text-proefex-navy/60"}`}
        >
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      ) : null}
      <div
        className={`h-2 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-proefex-navy/10"}`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-proefex-orange to-proefex-amber"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
