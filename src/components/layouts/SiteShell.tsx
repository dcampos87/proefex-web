import type { ReactNode } from "react";

import { WaveBackground } from "@/components/animations/WaveBackground";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-proefex-navy text-white">
      <WaveBackground />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
