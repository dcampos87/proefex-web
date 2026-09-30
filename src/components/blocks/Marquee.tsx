interface MarqueeProps {
  words: string[];
  /** Etiqueta accesible; la pista duplicada es aria-hidden. */
  label?: string;
}

/**
 * Marquee — separador de sección Grow Up (Doc 11 §2.5).
 * Velocidad legible (~28s por ciclo), pausa en hover/focus-within.
 * Sin JS; desactivado por reduced-motion (globals.css).
 */
export function Marquee({ words, label }: MarqueeProps) {
  const track = (hidden: boolean) => (
    <div
      className="marquee-track shrink-0 items-center"
      aria-hidden={hidden || undefined}
      style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-display-lg)" }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="flex shrink-0 items-center gap-8"
          style={{ color: i % 2 ? "var(--text)" : "var(--accent)" }}
        >
          {word}
          <span
            aria-hidden="true"
            className="inline-block h-3 w-3 rounded-full"
            style={{ background: "var(--accent-2)" }}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="marquee border-y py-5"
      style={{ borderColor: "var(--border)" }}
      role="marquee"
      aria-label={label}
    >
      <div className="flex w-max">
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
