import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Tótems — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="EXPERIENCE — PROEFEX EQUIP"
      title="Tótems"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Tótems' },
      ]}
      requires="catálogo y especificaciones"
      backHref="/equip"
      backLabel="Volver a PROEFEX EQUIP"
      universe="equip"
      variant="default"
    />
  );
}
