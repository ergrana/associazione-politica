// src/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const nav = [
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/programma", label: "Programma" },
  { href: "/notizie", label: "Notizie" },
  { href: "/eventi", label: "Eventi" },
  { href: "/partecipa", label: "Partecipa" },
  // rimosso: { href: "/trasparenza", label: "Trasparenza" },
  { href: "/contatti", label: "Contatti" },
];

export default function Header() {
  const pathname = usePathname() || "";
  const [open, setOpen] = useState(false);

  // Chiude il drawer su cambio rotta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ESC per chiudere + blocco scroll body quando aperto
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        document.removeEventListener("keydown", onKey);
      };
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <nav className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand con logo */}
        <Link href="/" className="flex items-center gap-3 font-extrabold">
          <Image
            src="/images/logo.jpg"
            alt="Logo La Repubblica degli Italiani nel Mondo"
            width={40}
            height={40}
            className="rounded-md"
            priority
          />
          <span className="text-base sm:text-lg tracking-tight text-slate-900 dark:text-slate-100">
            La Repubblica degli Italiani nel Mondo
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "text-indigo-700 dark:text-indigo-400 font-semibold"
                    : "text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-2">
          <Link
            href="/partecipa"
            className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-800"
          >
            Iscriviti
          </Link>
          <Link
            href="/partecipa"
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Dona ora
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          className="md:hidden rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100"
          aria-label="Apri menu"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </nav>

      {/* Overlay (solido, niente trasparenze problematiche) */}
      {open && (
        <button
          aria-label="Chiudi menu"
          className="fixed inset-0 z-[60] bg-black/40 dark:bg-black/60"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer mobile */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-72 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 shadow-2xl transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Menu di navigazione"
        aria-modal="true"
      >
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.jpg"
              alt="Logo mobile"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Menu
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg border border-slate-200 dark:border-slate-700 px-2 py-1 text-sm text-slate-900 dark:text-slate-100"
            aria-label="Chiudi menu"
          >
            ✕
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-sm ${
                  active
                    ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold"
                    : "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="mt-4 flex gap-2">
            <Link
              href="/partecipa"
              className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-800"
            >
              Iscriviti
            </Link>
            <Link
              href="/partecipa"
              className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Dona ora
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
