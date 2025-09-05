"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/programma", label: "Programma" },
  { href: "/notizie", label: "Notizie" },
  { href: "/eventi", label: "Eventi" },
  { href: "/partecipa", label: "Partecipa" },
  { href: "/trasparenza", label: "Trasparenza" },
  { href: "/contatti", label: "Contatti" },
];

export default function Header() {
  const pathname = usePathname() || "";
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b">
      <nav className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 font-extrabold">
          <span aria-hidden className="inline-block h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-600 to-amber-500" />
          <span className="text-base sm:text-lg tracking-tight">La Repubblica degli Italiani nel Mondo</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "text-indigo-700 font-semibold" : "hover:text-indigo-600 transition-colors"}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-2">
          <Link href="/partecipa" className="rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-white">
            Iscriviti
          </Link>
          <Link href="/partecipa" className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            Dona ora
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          className="md:hidden rounded-lg border px-3 py-2 text-sm font-semibold"
          aria-label="Apri menu"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </nav>

      {/* Overlay */}
      {open && <div className="fixed inset-0 z-[60] bg-black/30" onClick={() => setOpen(false)} aria-hidden />}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-72 bg-white border-l shadow-2xl transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Menu di navigazione"
      >
        <div className="h-16 px-4 flex items-center justify-between border-b">
          <span className="font-extrabold">Città Futura</span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg border px-2 py-1 text-sm"
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
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm ${
                  active ? "bg-indigo-50 text-indigo-700 font-semibold" : "hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-4 flex gap-2">
            <Link
              href="/partecipa"
              className="flex-1 rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-white"
              onClick={() => setOpen(false)}
            >
              Iscriviti
            </Link>
            <Link
              href="/partecipa"
              className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              onClick={() => setOpen(false)}
            >
              Dona ora
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
