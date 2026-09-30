import { Reveal } from "@/components/motion/Reveal";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ — acordeón accesible (Doc 05 §3). Usa <details>/<summary> nativos:
 * operable por teclado sin JS. En Fase 3 el render añade schema FAQPage (GEO).
 */
export function FAQBlock({ items, title = "Preguntas frecuentes" }: { items: FaqItem[]; title?: string }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <Reveal>
        <h2 style={{ fontSize: "var(--text-display-lg)", fontFamily: "var(--font-display)", color: "var(--text)" }}>
          {title}
        </h2>
      </Reveal>
      <div className="flex flex-col">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 60}>
            <details className="border-b" style={{ borderColor: "var(--border)" }}>
              <summary
                className="cursor-pointer list-none py-5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  color: "var(--text)",
                  minHeight: 44,
                }}
              >
                {item.question}
              </summary>
              <p className="pb-5" style={{ color: "var(--text-body)" }}>
                {item.answer}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
