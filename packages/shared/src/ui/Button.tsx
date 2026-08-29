import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 ease-out";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-proefex-orange text-proefex-navy shadow-[0_8px_30px_rgba(247,147,30,0.35)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(247,147,30,0.5)] hover:brightness-110 active:translate-y-0",
  ghost:
    "border border-white/20 text-proefex-white backdrop-blur-sm hover:-translate-y-0.5 hover:border-proefex-amber/60 hover:bg-white/5 active:translate-y-0",
};

export function ButtonLink({ variant = "primary", children, ...rest }: LinkProps) {
  return (
    <a className={`${baseClasses} ${variantClasses[variant]}`} {...rest}>
      {children}
    </a>
  );
}

export function Button({ variant = "primary", children, ...rest }: ButtonProps) {
  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...rest}>
      {children}
    </button>
  );
}
