import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

interface SectionHeaderProps {
  /** Kicker — en TECH se numera estilo especificación: "01 — DESARROLLO". */
  kicker?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
}

/** Encabezado de sección (Doc 14 §6). Un H1 por página; secciones usan h2. */
export function SectionHeader({
  kicker,
  title,
  intro,
  align = "left",
  as = "h2",
  id,
}: SectionHeaderProps) {
  const Heading = as;
  return (
    <Reveal
      className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : "items-start"}`}
    >
      {kicker ? <p className="label-mono">{kicker}</p> : null}
      <Heading id={id} style={{ fontSize: "var(--text-display-lg)" } as CSSProperties}>
        {title}
      </Heading>
      {intro ? (
        <p className="max-w-[65ch]" style={{ fontSize: "var(--text-body-lg)" }}>
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
