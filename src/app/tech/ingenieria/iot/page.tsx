import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'IoT — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="CREATE — PROEFEX TECH / INGENIERÍA"
      title="IoT"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'IoT' },
      ]}
      requires="propuesta y evidencia"
      backHref="/tech/ingenieria"
      backLabel="Volver a Ingeniería"
      universe="tech"
      variant="service"
    />
  );
}
