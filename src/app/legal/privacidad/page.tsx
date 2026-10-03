import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Política de privacidad — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="LEGAL"
      title="Política de privacidad"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Privacidad' },
      ]}
      requires="texto legal aprobado por PROEFEX"
      backHref="/"
      backLabel="Volver al inicio"
      universe="core"
      variant="default"
    />
  );
}
