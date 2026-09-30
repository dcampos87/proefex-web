import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Consultoría de marketing — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="GROW — GROW UP"
      title="Consultoría de marketing"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Consultoría de marketing' },
      ]}
      requires="propuesta y método"
      backHref="/grow-up"
      backLabel="Volver a Grow Up"
    />
  );
}
