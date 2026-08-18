import Link from "next/link";

interface BrandMarkProps {
  light?: boolean;
  compact?: boolean;
}

export function BrandMark({ light = true, compact = false }: BrandMarkProps) {
  return (
    <Link
      href="/"
      aria-label="PROEFEX - inicio"
      className={`group inline-flex flex-col ${light ? "text-white" : "text-proefex-navy"}`}
    >
      <span className="text-[1.35rem] font-extrabold leading-none tracking-[-0.06em] sm:text-[1.6rem]">
        PROEF<span className="text-proefex-orange">E</span>X
      </span>
      {!compact && (
        <span className="mt-1 font-mono text-[0.43rem] uppercase tracking-[0.2em] opacity-60">
          Aprende. Aplica. Crece.
        </span>
      )}
    </Link>
  );
}
