import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'IA empresarial — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="CREATE — PROEFEX TECH"
      title="IA empresarial"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'IA empresarial' },
      ]}
      requires="propuesta y alcance"
      backHref="/tech"
      backLabel="Volver a PROEFEX TECH"
      universe="tech"
      variant="service"
    />
  );
}
