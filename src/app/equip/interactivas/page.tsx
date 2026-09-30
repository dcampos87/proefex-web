import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Interactivas — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="EXPERIENCE — PROEFEX EQUIP"
      title="Interactivas"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Interactivas' },
      ]}
      requires="catálogo y especificaciones"
      backHref="/equip"
      backLabel="Volver a PROEFEX EQUIP"
    />
  );
}
