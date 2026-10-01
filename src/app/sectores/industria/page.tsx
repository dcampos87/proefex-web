import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Industria — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="PROEFEX — SECTORES"
      title="Industria"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Industria' },
      ]}
      requires="descripción del sector y capacidades aplicables"
      backHref="/sectores"
      backLabel="Volver a Sectores"
    />
  );
}
