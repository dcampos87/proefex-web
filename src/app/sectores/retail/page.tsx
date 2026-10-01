import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Retail — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="PROEFEX — SECTORES"
      title="Retail"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Retail' },
      ]}
      requires="descripción del sector y capacidades aplicables"
      backHref="/sectores"
      backLabel="Volver a Sectores"
      universe="core"
      variant="industry"
    />
  );
}
