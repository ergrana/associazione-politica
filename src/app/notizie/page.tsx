"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { POSTS } from "@/lib/content";

const CATEGORIES = [
  "Tutte",
  "Comunicati",
  "Territorio",
  "Iniziative",
  "Trasparenza",
  "Eventi",
  "Partecipazione",
] as const;

export default function NotiziePage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Tutte");

  const list = useMemo(() => {
    return POSTS.filter((p) => {
      const okCat = cat === "Tutte" ? true : p.category === cat;
      const okQ =
        !q ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(q.toLowerCase());
      return okCat && okQ;
    }).sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [q, cat]);

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-indigo-500 to-amber-500 opacity-90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            Città Futura • Notizie
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Notizie e comunicati
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Aggiornamenti dal territorio, iniziative, comunicati ufficiali.
          </p>

          {/* Filtri */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                  cat === c
                    ? "bg-white text-slate-900"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cerca titolo o parole chiave…"
              className="rounded-xl bg-white/95 text-slate-900 px-4 py-2 text-sm w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* LISTA */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {list.length === 0 ? (
          <p className="text-slate-600">Nessun risultato.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((p) => (
              <article key={p.id} className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition-shadow">
                <Link href={`/notizie/${p.slug}`} className="block">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={800}
                    height={450}
                    className="w-full h-48 object-cover"
                    priority={false}
                  />
                  <div className="p-5">
                    <div className="text-xs text-slate-500">
                      {fmtDate(p.date)} • {p.read}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-slate-600 line-clamp-3">{p.excerpt}</p>
                    <div className="mt-3 text-sm font-semibold text-indigo-700">Leggi di più →</div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("it-IT", { year: "numeric", month: "short", day: "2-digit" });
}
