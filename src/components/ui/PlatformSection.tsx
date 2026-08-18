import type { ReactNode } from "react";

interface PlatformSectionProps {
  children: ReactNode;
  className?: string;
}

export function PlatformSection({ children, className = "" }: PlatformSectionProps) {
  return (
    <section className={`relative mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}
