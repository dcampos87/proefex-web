import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Marketing BPO — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="GROW — GROW UP"
      title="Marketing BPO"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Marketing BPO' },
      ]}
      requires="propuesta y método"
      backHref="/grow-up"
      backLabel="Volver a Grow Up"
    />
  );
}
