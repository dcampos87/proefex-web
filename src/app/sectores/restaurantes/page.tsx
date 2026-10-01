import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Restaurantes — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="PROEFEX — SECTORES"
      title="Restaurantes"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Restaurantes' },
      ]}
      requires="descripción del sector y capacidades aplicables"
      backHref="/sectores"
      backLabel="Volver a Sectores"
    />
  );
}
