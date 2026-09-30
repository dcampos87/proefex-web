/**
 * SCAFFOLDING FASE 1 — no es la home definitiva (D6 aprobada: la home real
 * será una narrativa continua por universos, construida tras moodboards).
 * Esta página solo verifica que los tokens y los 3 temas de universo cargan.
 */

const universes = [
  {
    id: "core" as const,
    name: "PROEFEX CORE",
    desc: "Marca paraguas: innovación, integración, confianza.",
  },
  {
    id: "tech" as const,
    name: "PROEFEX TECH",
    desc: "Precisión, sistemas vivos, fondo profundo, acento naranja.",
  },
  {
    id: "growup" as const,
    name: "GROW UP",
    desc: "Energía editorial: color secundario protagonista, tipografía grande.",
  },
];

export default function Home() {
  return (
    <main id="contenido" style={{ padding: "var(--space-8)" }}>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--space-8)",
          color: "var(--text)",
          lineHeight: 1.1,
        }}
      >
        PROEFEX — Fase 1: Foundations
      </h1>
      <p style={{ color: "var(--text-body)", maxWidth: "60ch" }}>
        Scaffolding técnico. Verificación de tokens, temas de universo y
        accesibilidad global. La home definitiva se construye tras la elección
        de moodboards (D7/D8) y dentro de la Fase 2.
      </p>
      <div
        style={{
          display: "grid",
          gap: "var(--space-5)",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          marginTop: "var(--space-8)",
        }}
      >
        {universes.map((u) => (
          <section
            key={u.id}
            data-universe={u.id}
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "var(--space-5)",
            }}
          >
            <h2 style={{ color: "var(--text)", fontSize: "1.25rem" }}>{u.name}</h2>
            <p style={{ color: "var(--text-body)" }}>{u.desc}</p>
            <span
              style={{
                display: "inline-block",
                marginTop: "var(--space-3)",
                background: "var(--accent)",
                color: "var(--accent-contrast)",
                padding: "var(--space-2) var(--space-4)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.875rem",
              }}
            >
              data-universe=&quot;{u.id}&quot;
            </span>
          </section>
        ))}
      </div>
    </main>
  );
}
