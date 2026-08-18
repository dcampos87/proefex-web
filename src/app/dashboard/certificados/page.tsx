import { AppShell } from "@/components/layouts/AppShell";
import { CertificateCard } from "@/features/lms/CertificateCard";

export default function CertificatesPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-proefex-azure">
          Logros
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Mis certificados.</h1>
        <p className="mt-4 max-w-2xl text-proefex-navy/60">
          Guarda y comparte las capacidades que ya llevaste a la práctica.
        </p>
        <div className="mt-10 max-w-2xl">
          <CertificateCard
            courseTitle="Gestión ágil de proyectos"
            issuedAt="14 de agosto de 2026"
          />
        </div>
      </div>
    </AppShell>
  );
}
