import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Klyra — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="SOLVE — PROEFEX SOLUTIONS"
      title="Klyra"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Klyra' },
      ]}
      requires="producto reservado/futuro: sin información pública"
      backHref="/solutions"
      backLabel="Volver a PROEFEX SOLUTIONS"
    />
  );
}
