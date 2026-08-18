"use client";

import { motion } from "framer-motion";

import { FloatParallax } from "@/components/animations/FloatParallax";
import { ButtonLink } from "@/components/ui/Button";
import { heroCopy } from "@/data/landing";

function PlayerMockup() {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-proefex-navy-deep/80 shadow-[0_40px_100px_rgba(0,34,84,0.7)] ring-1 ring-white/10 backdrop-blur-xl">
      <div className="flex items-center gap-2 px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-proefex-red/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-proefex-amber/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-proefex-orange/80" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Reproductor PROEFEX
        </span>
      </div>

      <div className="relative mx-5 aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-proefex-azure/70 via-proefex-navy to-proefex-navy-deep">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_30%,rgba(247,147,30,0.35)_0%,transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-proefex-navy to-transparent" />
        <div className="absolute inset-x-0 bottom-3 mx-3">
          <div className="h-1.5 rounded-full bg-white/20">
            <div className="h-1.5 w-2/5 rounded-full bg-proefex-orange" />
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-white/60">
            <span>12:34</span>
            <span>32:10</span>
          </div>
        </div>
        <button
          type="button"
          aria-label="Reproducir video"
          className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-proefex-orange text-proefex-navy shadow-[0_10px_40px_rgba(247,147,30,0.6)]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-white">
            Data Analytics para decisiones de negocio
          </p>
          <p className="text-xs text-white/50">Módulo 3 · Sesión 12</p>
        </div>
        <span className="rounded-full bg-proefex-amber/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-proefex-amber">
          62% completado
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-20"
    >
      <div className="hero-glow absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col items-start gap-7">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="rounded-full border border-proefex-amber/30 bg-proefex-amber/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-proefex-amber"
          >
            {heroCopy.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]"
          >
            {heroCopy.title[0]}{" "}
            <span className="bg-gradient-to-r from-proefex-amber via-proefex-orange to-proefex-amber bg-clip-text text-transparent">
              {heroCopy.title[1]}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="max-w-xl text-lg leading-relaxed text-white/70"
          >
            {heroCopy.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="#cursos">{heroCopy.primaryCta}</ButtonLink>
            <ButtonLink href="#contacto" variant="ghost">
              {heroCopy.secondaryCta}
            </ButtonLink>
          </motion.div>
        </div>

        <FloatParallax className="hidden justify-end lg:flex" speed={0.25} float={18}>
          <PlayerMockup />
        </FloatParallax>

        <div className="lg:hidden">
          <PlayerMockup />
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-white/40"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M12 4v16m0 0 6-6m-6 6-6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
