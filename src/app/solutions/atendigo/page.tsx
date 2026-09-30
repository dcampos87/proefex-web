import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'AtendiGo — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="SOLVE — PROEFEX SOLUTIONS"
      title="AtendiGo"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'AtendiGo' },
      ]}
      requires="detalle del producto (D15)"
      backHref="/solutions"
      backLabel="Volver a PROEFEX SOLUTIONS"
    />
  );
}
