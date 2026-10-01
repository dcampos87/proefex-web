import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Educación — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="PROEFEX — SECTORES"
      title="Educación"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Educación' },
      ]}
      requires="descripción del sector y capacidades aplicables"
      backHref="/sectores"
      backLabel="Volver a Sectores"
      universe="core"
    />
  );
}
