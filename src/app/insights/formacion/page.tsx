import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Formación — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="PROEFEX — INSIGHTS"
      title="Formación"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Formación' },
      ]}
      requires="artículos de la categoría"
      backHref="/insights"
      backLabel="Volver a Insights"
      universe="core"
    />
  );
}
