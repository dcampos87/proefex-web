"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@proefex/shared/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface FloatParallaxProps {
  children: ReactNode;
  className?: string;
  /** Velocidad relativa del parallax con el scroll. Positivo = se mueve más lento. */
  speed?: number;
  /** Intensidad de la flotación ida y vuelta en px. */
  float?: number;
}

export function FloatParallax({
  children,
  className,
  speed = 0.2,
  float = 14,
}: FloatParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    const context = gsap.context(() => {
      gsap.to(ref.current, {
        y: `+=${float}`,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(ref.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: speed,
        },
      });
    }, ref);

    return () => context.revert();
  }, [reducedMotion, speed, float]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
