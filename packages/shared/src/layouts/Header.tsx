"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { navLinks } from "../data/landing";
import { appLinks } from "../config/appLinks";
import { BrandMark } from "./BrandMark";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-proefex-navy/70 shadow-[0_10px_40px_rgba(0,34,84,0.4)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6"
        aria-label="Navegación principal"
      >
        <BrandMark />

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-white/75 transition-colors duration-300 hover:text-proefex-amber"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/contacto"
            className="inline-flex items-center rounded-full bg-proefex-orange px-5 py-2.5 text-sm font-semibold text-proefex-navy shadow-[0_8px_25px_rgba(247,147,30,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            Solicitar demo
          </Link>
          <Link
            href={appLinks.learn("/login")}
            className="ml-3 inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-proefex-amber hover:text-proefex-amber"
          >
            Iniciar sesión
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-white md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            {open ? (
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden bg-proefex-navy/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-proefex-amber"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="/contacto"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-proefex-orange px-5 py-3 text-center text-sm font-semibold text-proefex-navy"
                >
                  Solicitar demo
                </Link>
                <Link
                  href={appLinks.learn("/login")}
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white/85"
                >
                  Iniciar sesión
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
