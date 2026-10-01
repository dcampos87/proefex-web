import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Innovación — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="PROEFEX — INSIGHTS"
      title="Innovación"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Innovación' },
      ]}
      requires="artículos de la categoría"
      backHref="/insights"
      backLabel="Volver a Insights"
      universe="core"
    />
  );
}
