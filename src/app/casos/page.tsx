import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Casos de éxito — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="PROEFEX"
      title="Casos de éxito"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Casos de éxito' },
      ]}
      requires="casos reales autorizados (no se inventan)"
      backHref="/"
      backLabel="Volver al inicio"
    />
  );
}
