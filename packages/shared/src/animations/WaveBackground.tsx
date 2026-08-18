/**
 * Fondo fluido de la Variante Lumínica: capas de degradados radiales
 * con deriva lenta y luminosa. Decorativo, aria-hidden.
 */
export function WaveBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-proefex-navy" />
      <div className="animate-drift-a absolute -left-1/4 top-[-20%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,90,158,0.5)_0%,rgba(0,34,84,0)_70%)] blur-3xl" />
      <div className="animate-drift-b absolute -right-1/4 top-[30%] h-[80vh] w-[75vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,90,158,0.38)_0%,rgba(12,35,64,0)_70%)] blur-3xl" />
      <div className="animate-drift-c absolute bottom-[-25%] left-[10%] h-[65vh] w-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(247,147,30,0.16)_0%,rgba(239,183,41,0.08)_45%,rgba(0,34,84,0)_72%)] blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-proefex-navy" />
    </div>
  );
}
