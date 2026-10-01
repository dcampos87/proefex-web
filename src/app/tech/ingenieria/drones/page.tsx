import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Drones — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="CREATE — PROEFEX TECH / INGENIERÍA"
      title="Drones"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Drones' },
      ]}
      requires="propuesta y evidencia"
      backHref="/tech/ingenieria"
      backLabel="Volver a Ingeniería"
      universe="tech"
      variant="service"
    />
  );
}
