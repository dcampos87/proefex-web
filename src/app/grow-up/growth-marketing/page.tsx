import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Growth Marketing — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="GROW — GROW UP"
      title="Growth Marketing"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Growth Marketing' },
      ]}
      requires="propuesta y método"
      backHref="/grow-up"
      backLabel="Volver a Grow Up"
    />
  );
}
