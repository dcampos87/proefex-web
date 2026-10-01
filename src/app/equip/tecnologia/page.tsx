import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Tecnología — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="EXPERIENCE — PROEFEX EQUIP"
      title="Tecnología"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Tecnología' },
      ]}
      requires="catálogo"
      backHref="/equip"
      backLabel="Volver a PROEFEX EQUIP"
      universe="equip"
      variant="default"
    />
  );
}
