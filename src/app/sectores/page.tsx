import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Sectores — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="PROEFEX"
      title="Sectores"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Sectores' },
      ]}
      requires="descripciones por sector (dimensión transversal)"
      backHref="/"
      backLabel="Volver al inicio"
    />
  );
}
