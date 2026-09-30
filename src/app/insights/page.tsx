import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Insights — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="PROEFEX"
      title="Insights"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Insights' },
      ]}
      requires="artículos (D3: sin CMS en esta etapa)"
      backHref="/"
      backLabel="Volver al inicio"
    />
  );
}
