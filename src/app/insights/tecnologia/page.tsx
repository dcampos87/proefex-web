import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Tecnología — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="PROEFEX — INSIGHTS"
      title="Tecnología"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Tecnología' },
      ]}
      requires="artículos de la categoría"
      backHref="/insights"
      backLabel="Volver a Insights"
    />
  );
}
