"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@proefex/shared/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function RevealOnScroll({ children, className, delay = 0, y = 36 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => context.revert();
  }, [reducedMotion, delay, y]);

  return (
    <div ref={ref} className={className} style={reducedMotion ? undefined : { opacity: 0 }}>
      {children}
    </div>
  );
}
