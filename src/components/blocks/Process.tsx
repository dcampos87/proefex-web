import { Reveal } from "@/components/motion/Reveal";

export interface ProcessStep {
  index: string;
  title: string;
  description?: string;
}

/**
 * Process — metodología paso a paso (Doc 05 §3).
 * La numeración comunica causa-efecto (función de motion: "explicar").
 */
export function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-6 md:grid-cols-3" role="list">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.index} delay={i * 100} className="relative flex flex-col gap-2 border-t-2 pt-5" style={{ borderColor: "var(--accent)" }}>
          <span className="label-mono" style={{ color: "var(--accent)" }}>
            {step.index}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--text-heading)",
              color: "var(--text)",
            }}
          >
            {step.title}
          </h3>
          {step.description ? (
            <p style={{ color: "var(--text-body)" }}>{step.description}</p>
          ) : null}
        </Reveal>
      ))}
    </ol>
  );
}
