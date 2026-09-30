import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Eleventto — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="SOLVE — PROEFEX SOLUTIONS"
      title="Eleventto"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Eleventto' },
      ]}
      requires="detalle del producto (D15)"
      backHref="/solutions"
      backLabel="Volver a PROEFEX SOLUTIONS"
    />
  );
}
