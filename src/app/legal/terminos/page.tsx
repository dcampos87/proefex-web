import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Términos y condiciones — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="LEGAL"
      title="Términos y condiciones"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Términos' },
      ]}
      requires="texto legal aprobado por PROEFEX"
      backHref="/"
      backLabel="Volver al inicio"
      universe="core"
      variant="default"
    />
  );
}
