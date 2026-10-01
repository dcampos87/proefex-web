import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Alquiler — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="EXPERIENCE — PROEFEX EQUIP"
      title="Alquiler"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Alquiler' },
      ]}
      requires="catálogo y condiciones"
      backHref="/equip"
      backLabel="Volver a PROEFEX EQUIP"
      universe="equip"
      variant="default"
    />
  );
}
