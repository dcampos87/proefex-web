import type { ReactNode } from "react";

/** Badge/Chip primitivo (Doc 14 §5). */
export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`badge ${className}`.trim()}>{children}</span>;
}
