import { ButtonLink } from "@/components/ui/Button";

interface CertificateCardProps {
  courseTitle: string;
  issuedAt: string;
}

export function CertificateCard({ courseTitle, issuedAt }: CertificateCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-proefex-orange to-proefex-amber p-8 text-proefex-navy shadow-[0_20px_55px_rgba(247,147,30,0.22)]">
      <div
        className="absolute -right-10 -top-10 h-36 w-36 rounded-full border-[18px] border-proefex-navy/10"
        aria-hidden="true"
      />
      <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
        Certificación PROEFEX
      </span>
      <h2 className="mt-7 max-w-md text-2xl font-bold">{courseTitle}</h2>
      <p className="mt-3 text-sm text-proefex-navy/65">Completado el {issuedAt}</p>
      <div className="mt-8">
        <ButtonLink href="#" variant="ghost">
          Descargar certificado
        </ButtonLink>
      </div>
    </article>
  );
}
