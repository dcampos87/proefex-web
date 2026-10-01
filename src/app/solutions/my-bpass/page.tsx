import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'My Bpass — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="SOLVE — PROEFEX SOLUTIONS"
      title="My Bpass"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'My Bpass' },
      ]}
      requires="detalle del producto (D15)"
      backHref="/solutions"
      backLabel="Volver a PROEFEX SOLUTIONS"
      universe="solve"
    />
  );
}
