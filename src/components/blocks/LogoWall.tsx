import { Reveal } from "@/components/motion/Reveal";

/**
 * LogoWall — aliados/marcas (Doc 05 §3). Solo logotipos reales autorizados.
 * Sin material entregado → estado vacío honesto (no se inventan clientes).
 */
export function LogoWall({ names }: { names?: string[] }) {
  if (!names?.length) {
    return (
      <Reveal className="card flex flex-col items-center gap-3 p-8 text-center">
        <span className="content-required">CONTENT_REQUIRED — logos de aliados</span>
        <p className="max-w-[48ch]" style={{ color: "var(--text-body)", fontSize: "var(--text-caption)" }}>
          Este espacio se publica únicamente con alianzas reales aprobadas por PROEFEX.
        </p>
      </Reveal>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" role="list">
      {names.map((name, i) => (
        <Reveal as="li" key={name} delay={i * 50} className="card flex items-center justify-center p-4">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--text)" }}>{name}</span>
        </Reveal>
      ))}
    </ul>
  );
}
