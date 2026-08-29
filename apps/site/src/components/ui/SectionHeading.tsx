interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ label, title, description, align = "left" }: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-proefex-amber">
        {label}
      </span>
      <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-xl text-base leading-relaxed text-white/70">{description}</p>
      ) : null}
    </div>
  );
}
