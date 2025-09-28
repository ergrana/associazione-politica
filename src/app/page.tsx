// src/app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { EVENTS, POSTS } from "@/lib/content";

/** ========================= CONFIG =========================
 * Salva i file mappa in:
 *  - public/world/world.svg
 *  - public/world/italy-regions.svg
 */
const FORMCARRY_URL = "https://formcarry.com/s/IL_TUO_ENDPOINT";

/* ========================= HERO: Bandiera che sventola (video + logo overlay) ========================= */
function WavingFlagHero() {
  return (
    <section className="relative min-h-[20vh] flex flex-col items-center justify-center overflow-hidden pb-10">
      {/* Video background (ancora più scuro) */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover brightness-50 contrast-110"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        // poster="/images/flag-poster.jpg" // facoltativo: frame statico iniziale
      >
        <source src="/video/bandiera.mp4" type="video/mp4" />
        Il tuo browser non supporta il video HTML5.
      </video>

      {/* Overlay uniforme più forte per aumentare il contrasto */}
      <div className="absolute inset-0 -z-10 bg-black/55" aria-hidden />

      {/* Vignettatura radiale per scurire soprattutto al centro (logo + CTA) */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* LOGO overlay */}
      <Image
        src="/images/logo-rotondo.png"
        alt="La Repubblica degli Italiani nel Mondo"
        width={420}
        height={420}
        priority
        className="w-[min(80vw,540px)] h-auto drop-shadow-2xl"
      />

      {/* CTA */}
      <div className="mt-0.25 text-center text-slate-900 px-4">
        <p className="max-w-2xl mx-auto text-lg">
          Rafforziamo il legame tra l&apos;Italia e gli italiani nel mondo.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/partecipa"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-5 py-3 font-semibold hover:opacity-90"
          >
            Iscriviti ora
          </Link>
          <Link
            href="/partecipa#pagamento"
            className="inline-flex items-center justify-center rounded-xl ring-2 ring-slate-900/85 text-slate-900 px-5 py-3 font-semibold hover:bg-black/5"
          >
            Sostienici con una donazione
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ========================= Utility / Mini componenti ========================= */
function ValueGhost({
  title,
  text,
  colorClass,
}: {
  title: string;
  text: string;
  colorClass: string;
}) {
  return (
    <div className="group relative rounded-2xl bg-white/70 backdrop-blur-sm p-5 sm:p-6 hover:bg-white transition shadow-sm hover:shadow-md">
      <span
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b ${colorClass}`}
      />
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-slate-600 leading-relaxed">{text}</p>
      <span className="absolute right-4 top-4 text-slate-300 transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </div>
  );
}

function RoadmapStep({ when, title, text }: { when: string; title: string; text: string }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-indigo-600" />
      <div className="text-sm font-semibold text-indigo-600">{when}</div>
      <div className="mt-1 font-semibold">{title}</div>
      <p className="mt-1 text-slate-600">{text}</p>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-2xl border bg-white p-5 sm:p-6 shadow-sm open:shadow-md transition-shadow">
      <summary className="cursor-pointer list-none font-semibold">{q}</summary>
      <p className="mt-3 text-slate-700 leading-relaxed">{a}</p>
    </details>
  );
}

function ResponsiveYouTube({ id }: { id: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingTop: "56.25%" }}>
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
        title="Video — La Repubblica degli Italiani nel Mondo"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

/* ========================= MAPPE: niente zoom + "nuke & repaint" ========================= */
const ACTIVE_ISO = ["USA", "CAN", "ARG", "BRA", "FRA", "CHE", "AUS", "GBR", "ITA"] as const;
const ACTIVE_REGIONS = ["LOM", "LAZ", "VEN", "EMR", "PIE", "TOS", "CAM", "SIC"] as const;

function WorldReachAdvanced() {
  const [worldMarkup, setWorldMarkup] = useState<string | null>(null);
  const [italyMarkup, setItalyMarkup] = useState<string | null>(null);
  const [view] = useState<"world" | "italy">("world"); // vista fissa su world

  const worldRef = useRef<HTMLDivElement>(null);
  const italyRef = useRef<HTMLDivElement>(null);

  // Carica gli SVG con cache-buster
  useEffect(() => {
    fetch("/world/world.svg?v=4").then(r => r.text()).then(setWorldMarkup).catch(() => setWorldMarkup(null));
    fetch("/world/italy-regions.svg?v=4").then(r => r.text()).then(setItalyMarkup).catch(() => setItalyMarkup(null));
  }, []);

  // Stili + interazioni planisfero — rimuove fill/stroke inline e applica i nostri
  useEffect(() => {
    if (!worldMarkup) return;
    const host = worldRef.current;
    if (!host) return;
    const svg = host.querySelector("svg");
    if (!svg) return;

    // fallback per mappe che usano currentColor
    svg.setAttribute("color", "#e5e7eb");

    // elimina qualsiasi <style> interno che imposti fill/stroke
    svg.querySelectorAll("style").forEach(s => s.remove());

    // ripulisci TUTTI i nodi da fill/stroke inline (attributi e inline-style)
    svg.querySelectorAll<SVGElement>("*").forEach((el) => {
      el.removeAttribute("fill");
      el.removeAttribute("stroke");
      el.removeAttribute("stroke-width");

      const st = el.getAttribute("style");
      if (st) {
        const cleaned = st
          .replace(/(^|;)\s*fill\s*:[^;!]+!?[^;]*;?/gi, "$1")
          .replace(/(^|;)\s*stroke\s*:[^;!]+!?[^;]*;?/gi, "$1")
          .replace(/(^|;)\s*stroke-width\s*:[^;!]+!?[^;]*;?/gi, "$1")
          .replace(/;;+/g, ";")
          .replace(/^\s*;|;\s*$/g, "");
        if (cleaned.trim()) el.setAttribute("style", cleaned);
        else el.removeAttribute("style");
      }
    });

    // applica i colori base
    svg.querySelectorAll<SVGElement>("path, polygon, rect, use").forEach((el) => {
      el.setAttribute("fill", "#e5e7eb");
      el.setAttribute("stroke", "#94a3b8");
      el.setAttribute("stroke-width", "0.6");
      el.setAttribute("vector-effect", "non-scaling-stroke");
      el.setAttribute("paint-order", "stroke fill");
      (el as SVGElement).style.transition = "fill .2s ease";
    });

    // evidenzia i Paesi attivi
    ACTIVE_ISO.forEach((id) => {
      const el = svg.querySelector<SVGElement>(`#${CSS.escape(id)}`);
      if (el) {
        el.setAttribute("fill", "#22c55e");
        (el as SVGGraphicsElement).style.filter = "drop-shadow(0 0 6px rgba(16,185,129,.35))";
        if (!el.querySelector("title")) {
          const t = document.createElementNS("http://www.w3.org/2000/svg", "title");
          t.textContent = id;
          el.appendChild(t);
        }
      }
    });

    // hover soft per non-attivi
    const over = (e: Event) => {
      const el = (e.target as Element).closest("path,polygon,rect,use") as SVGElement | null;
      if (el && !ACTIVE_ISO.includes(el.id as any)) el.setAttribute("fill", "#c7e3d4");
    };
    const out = (e: Event) => {
      const el = (e.target as Element).closest("path,polygon,rect,use") as SVGElement | null;
      if (el && !ACTIVE_ISO.includes(el.id as any)) el.setAttribute("fill", "#e5e7eb");
    };

    svg.addEventListener("mouseover", over);
    svg.addEventListener("mouseout", out);
    return () => {
      svg.removeEventListener("mouseover", over);
      svg.removeEventListener("mouseout", out);
    };
  }, [worldMarkup]);

  // Stili vista Italia (preparata ma non visibile)
  useEffect(() => {
    if (!italyMarkup) return;
    const host = italyRef.current;
    if (!host) return;
    const svg = host.querySelector("svg");
    if (!svg) return;

    svg.querySelectorAll<SVGPathElement>("path").forEach((p) => {
      p.setAttribute("fill", "#e5e7eb");
      p.setAttribute("stroke", "#94a3b8");
      p.setAttribute("stroke-width", "0.6");
      p.setAttribute("vector-effect", "non-scaling-stroke");
      p.style.transition = "fill .2s ease";
    });

    ACTIVE_REGIONS.forEach((id) => {
      const el = svg.querySelector<SVGPathElement>(`#${CSS.escape(id)}`);
      if (el) {
        el.setAttribute("fill", "#2563eb");
        el.style.filter = "drop-shadow(0 0 6px rgba(37,99,235,.35))";
        if (!el.querySelector("title")) {
          const t = document.createElementNS("http://www.w3.org/2000/svg", "title");
          t.textContent = id;
          el.appendChild(t);
        }
      }
    });
  }, [italyMarkup]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="mb-6">
        <h2 className="text-3xl font-bold">Dove siamo arrivati</h2>
        <p className="mt-2 text-slate-600 max-w-3xl">
          Panoramica dei Paesi in cui siamo presenti (evidenziati in verde).
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2">
          <div
            className="relative rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200 bg-white"
            style={{ aspectRatio: "2 / 1" }}
          >
            {/* WORLD layer */}
            <div
              ref={worldRef}
              className={`absolute inset-0 select-none transition duration-300 ease-out ${
                view === "world" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`}
              dangerouslySetInnerHTML={worldMarkup ? { __html: worldMarkup } : undefined}
            />
            {!worldMarkup && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                Caricamento planisfero…
              </div>
            )}

            {/* ITALY layer (non usato) */}
            <div
              ref={italyRef}
              className={`absolute inset-0 select-none transition duration-300 ease-out ${
                view === "italy" ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
              style={{ padding: "2% 10%" }}
              dangerouslySetInnerHTML={italyMarkup ? { __html: italyMarkup } : undefined}
            />
          </div>

          <p className="mt-2 text-sm text-slate-500">Mappa mondiale — aree attive in evidenza.</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Una rete in espansione</h3>
          <p className="mt-2 text-slate-700 leading-relaxed">
            Collegare persone e comunità è la nostra priorità: eventi, mentorship, gruppi tematici e opportunità
            di collaborazione tra Italia e diaspora. Se vuoi avviare un nucleo nel tuo Paese,
            <Link href="/contatti" className="underline decoration-2 underline-offset-2 ml-1">contattaci</Link>.
          </p>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>• Incontri culturali e imprenditoriali</li>
            <li>• Progetti con associazioni italiane all’estero</li>
            <li>• Reti professionali e supporto alla mobilità</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ========================= HELPERS ========================= */
function startOfDay(d: Date) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
function fmtShortDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("it-IT", { year: "numeric", month: "short", day: "2-digit" });
}
function fmtBadgeDate(iso: string, end?: string) {
  const s = new Date(iso);
  const e = end ? new Date(end) : undefined;
  const day = s.toLocaleDateString("it-IT", { day: "2-digit" });
  const mon = s.toLocaleDateString("it-IT", { month: "short" });
  if (!e) return `${day} ${mon}`;
  const same = s.toDateString() === e.toDateString();
  const day2 = e.toLocaleDateString("it-IT", { day: "2-digit" });
  const mon2 = e.toLocaleDateString("it-IT", { month: "short" });
  return same ? `${day} ${mon}` : `${day} ${mon} → ${day2} ${mon2}`;
}

/* ========================= NEWS CAROUSEL ========================= */
function NewsCarouselSection({ posts }: { posts: (typeof POSTS)[number][] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  function scrollBy(dir: "prev" | "next") {
    const el = scrollerRef.current; if (!el) return;
    const delta = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "next" ? delta : -delta, behavior: "smooth" });
  }
  return (
    <section className="py-16 bg-slate-50 border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Notizie in evidenza</h2>
            <p className="mt-2 text-slate-600">Aggiornamenti dal territorio, iniziative e comunicati.</p>
          </div>
          <Link href="/notizie" className="hidden sm:inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
            Vai alle Notizie
          </Link>
        </div>

        <div className="mt-6 relative">
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-10">
            <button onClick={() => scrollBy("prev")} aria-label="Notizie precedenti" className="rounded-full border bg-white/90 px-3 py-2 shadow hover:bg-white">←</button>
          </div>
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10">
            <button onClick={() => scrollBy("next")} aria-label="Notizie successive" className="rounded-full border bg-white/90 px-3 py-2 shadow hover:bg-white">→</button>
          </div>

          <div ref={scrollerRef} className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
            {posts.map((p) => (
              <article key={p.id} className="min-w-[280px] sm:min-w-[340px] lg:min-w-[380px] snap-start rounded-2xl border bg-white overflow-hidden hover:shadow-md transition-shadow">
                <Link href={`/notizie/${p.slug}`} className="block">
                  <Image src={p.image} alt={p.title} width={800} height={450} className="w-full h-44 object-cover" />
                  <div className="p-5">
                    <div className="text-xs text-slate-500">{fmtShortDate(p.date)} • {p.read}</div>
                    <h3 className="mt-1 text-lg font-semibold line-clamp-2">{p.title}</h3>
                    <p className="mt-2 text-slate-600 line-clamp-3">{p.excerpt}</p>
                    <div className="mt-3 text-sm font-semibold text-indigo-700">Leggi di più →</div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-6 sm:hidden text-center">
            <Link href="/notizie" className="inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
              Tutte le Notizie
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================= NEXT EVENT TEASER ========================= */
function NextEventTeaser() {
  const nextEvent = useMemo(() => {
    const now = startOfDay(new Date());
    const upcoming = EVENTS.filter((e) => new Date(e.date) >= now).sort((a, b) => +new Date(a.date) - +new Date(b.date));
    return upcoming[0] ?? null;
  }, []);
  if (!nextEvent) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold">Vieni al prossimo evento</h2>
          <p className="mt-2 text-slate-600">Unisciti a noi e vivi la comunità.</p>
        </div>
        <Link href="/eventi" className="hidden sm:inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
          Vai agli Eventi
        </Link>
      </div>

      <article className="rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <Link href={`/eventi/${nextEvent.id}`} className="block relative">
          <Image src={nextEvent.cover} alt={nextEvent.title} width={1200} height={630} className="w-full h-64 object-cover" priority />
          <div className="absolute top-3 left-3 rounded-xl bg-white/95 text-slate-900 px-3 py-1 text-xs font-semibold shadow">
            {fmtBadgeDate(nextEvent.date, nextEvent.end)}
          </div>
          <div className="absolute top-3 right-3 rounded-full bg-black/40 text-white px-3 py-1 text-xs font-semibold">
            {nextEvent.category}
          </div>
        </Link>
        <div className="p-6">
          <div className="text-xs text-slate-500">{nextEvent.city} • {fmtShortDate(nextEvent.date)}</div>
          <h3 className="mt-1 text-xl font-semibold">{nextEvent.title}</h3>
          <p className="mt-2 text-slate-600 line-clamp-3">{nextEvent.description}</p>
          <div className="mt-3 text-slate-700">📍 {nextEvent.place} — {nextEvent.address}, {nextEvent.city}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={`/eventi/${nextEvent.id}`} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Partecipa</Link>
            <Link href={`/eventi/${nextEvent.id}`} className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50">Dettagli</Link>
          </div>
        </div>
      </article>

      <div className="mt-6 sm:hidden text-center">
        <Link href="/eventi" className="inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
          Vai agli Eventi
        </Link>
      </div>
    </section>
  );
}

/* ========================= PRENOTA SPAZIO CTA ========================= */
function BookingCTA() {
  return (
    <section className="py-16 bg-slate-50 border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Prenota uno spazio della nostra sede</h2>
            <p className="mt-2 text-slate-600">Ufficio per 1–2 postazioni o Sala riunioni fino a 10 persone. Importo libero (con minimo orario).</p>
          </div>
          <Link href="/prenotazioni" className="hidden sm:inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
            Vai alle Prenotazioni
          </Link>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          {[
            { title: "Ufficio (1–2 postazioni)", img: "/images/sede/ufficio-thumb.jpg", chips: ["Capienza 2", "Min 15 €/h", "Wi-Fi", "Scrivania", "Prese"] },
            { title: "Sala riunioni (fino a 10 persone)", img: "/images/sede/sala-thumb.jpg", chips: ["Capienza 10", "Min 30 €/h", "Wi-Fi", "Schermo/TV", "Lavagna"] },
          ].map((o) => (
            <div key={o.title} className="rounded-2xl border bg-white overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image src={o.img} alt={o.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{o.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {o.chips.map((c) => (
                    <span key={c} className="text-xs rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">{c}</span>
                  ))}
                </div>
                <Link href="/prenotazioni" className="mt-4 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50">
                  Prenota questo spazio →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link href="/prenotazioni" className="inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
            Vai alle Prenotazioni
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ========================= CARD + FORM ========================= */
function Card({ title, children, className = "", id }: { title: string; children: React.ReactNode; className?: string; id?: string; }) {
  return (
    <section id={id} className={`rounded-2xl bg-white p-6 shadow-sm border ${className}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}
function Input({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean; }) {
  return (
    <label className="text-sm">
      <span className="block text-slate-700 mb-1">
        {label} {required ? <span className="text-rose-600" aria-hidden>*</span> : null}
      </span>
      <input name={name} type={type} required={required} className="w-full rounded-xl border px-4 py-2.5" aria-required={required} />
    </label>
  );
}
function Select({ name, label, children }: { name: string; label: string; children: React.ReactNode }) {
  return (
    <label className="text-sm">
      <span className="block text-slate-700 mb-1">{label}</span>
      <select name={name} className="w-full rounded-xl border px-4 py-2.5">{children}</select>
    </label>
  );
}
function CopyRow({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-slate-600 text-sm">{label}</span>
        <button
          onClick={() => { navigator.clipboard?.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1100); }); }}
          className="rounded-lg border px-2 py-1 text-xs hover:bg-slate-50"
        >
          {copied ? "Copiato ✓" : "Copia"}
        </button>
      </div>
      <div className="font-mono text-sm mt-1 select-all">{value}</div>
    </div>
  );
}
function IscrizioneForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null); setOk(false);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (!data.nome || !data.cognome || !data.email || !data.comune || !data.consent) { alert("Compila i campi obbligatori e accetta la privacy."); return; }
    setLoading(true);
    try {
      const res = await fetch(FORMCARRY_URL, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
      if (res.ok) { setOk(true); form.reset(); } else { const j = await res.json().catch(() => null); setErr(j?.message || "Invio non riuscito. Riprova più tardi."); }
    } catch { setErr("Connessione non riuscita. Controlla la rete e riprova."); }
    finally { setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4" noValidate>
      <Input name="nome" label="Nome *" required />
      <Input name="cognome" label="Cognome *" required />
      <Input name="email" type="email" label="Email *" required />
      <Input name="telefono" type="tel" label="Telefono (opzionale)" />
      <Input name="comune" label="Comune di residenza *" required />
      <Select name="fascia" label="Fascia di età">
        <option value="">Seleziona…</option><option>18–25</option><option>26–35</option><option>36–50</option><option>51+</option>
      </Select>
      <label className="hidden">Non compilare questo campo: <input name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
      <input type="hidden" name="_subject" value="Nuova iscrizione dal sito" />
      <label className="md:col-span-2 text-sm text-slate-600"><input type="checkbox" name="consent" className="mr-2" /> Ho letto e accetto l’informativa privacy *</label>
      <div className="md:col-span-2 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={loading} className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60" aria-busy={loading}>
          {loading ? "Invio in corso..." : "Invia adesione"}
        </button>
        <a href="mailto:info@cittafutura.it?subject=Richiesta%20iscrizione&body=Ciao%2C%20vorrei%20iscrivermi.%0ANome%3A%20%0ACognome%3A%20%0AEmail%3A%20%0AComune%3A%20%0AGrazie!" className="rounded-xl border px-4 py-3 text-sm font-semibold hover:bg-slate-50">
          Oppure scrivici via email
        </a>
        <span className="sr-only" aria-live="polite">{ok ? "Invio riuscito" : err ? "Errore di invio" : ""}</span>
        {ok && <span className="text-sm text-emerald-600">Ricevuto! Ti contatteremo a breve.</span>}
        {err && <span className="text-sm text-rose-600">{err}</span>}
      </div>
    </form>
  );
}

/* ========================= PAGE ========================= */
export default function HomePage() {
  const topPosts = useMemo(() => [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 10), []);

  return (
    <main className="min-h-screen">
      <WavingFlagHero />

      {/* MISSIONE + VIDEO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold">La nostra missione</h2>
            <div className="mt-3 space-y-4 text-slate-600 leading-relaxed">
              <p>La Repubblica degli Italiani nel Mondo nasce per unire tutti coloro che, fino ad oggi spettatori di una crescente crisi internazionale, comprendono sia giunto il momento di partecipare alla sfida del cambiamento.</p>
              <p>L’obiettivo è riunire le teste pensanti del nostro Paese – in Italia e all’estero – per costruire un percorso capace di coniugare presente e futuro e restituire fiducia alle nuove generazioni.</p>
              <p>Vogliamo essere uno strumento aggregativo e partecipativo: un luogo di sintesi delle idee e delle iniziative che ognuno di voi vorrà proporre.</p>
            </div>
          </div>
          <div><ResponsiveYouTube id="7qmZoXRg_QY" /></div>
        </div>
      </section>

      {/* DOVE SIAMO ARRIVATI — nuke & repaint + niente zoom */}
      <WorldReachAdvanced />

      {/* VALORI */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="sr-only">I nostri valori</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ValueGhost title="Partecipazione Attiva" text="Assemblee aperte, consultazioni e bilancio partecipativo per decidere insieme." colorClass="from-emerald-600 to-emerald-400" />
          <ValueGhost title="Valorizzazione Cultura Italiana" text="Promozione di diritti, pari opportunità e inclusione sociale." colorClass="from-amber-600 to-amber-400" />
          <ValueGhost title="Cultura Imprenditoriale" text="Conoscenza, responsabilità, comunicazione e apertura al cambiamento." colorClass="from-sky-600 to-sky-400" />
          <ValueGhost title="Giovani e Innovazione" text="Collaborazione e sperimentazione per nuove generazioni protagoniste." colorClass="from-indigo-600 to-indigo-400" />
        </div>
      </section>

      {/* ASSI STRATEGICI */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">Gli assi strategici</h2>
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            { icon: "🌍", title: "Legami Italia–Mondo & Cultura italiana", points: ["Progetti di scambio con comunità italiane all’estero", "Valorizzazione delle tradizioni e della storia", "Eventi di promozione della cultura italiana"], desc: "Iniziative per accrescere e rafforzare i legami tra l’Italia e le comunità italiane nel mondo." },
            { icon: "🎭", title: "Attività culturali, artistiche, ricreative ed editoriali", points: ["Rassegne culturali e artistiche aperte a tutti", "Laboratori e attività a impatto sociale", "Progetti editoriali e divulgativi"], desc: "Organizzazione di attività di interesse sociale, incluse iniziative editoriali." },
            { icon: "⚖️", title: "Diritti, pari opportunità & aiuto reciproco", points: ["Sportelli informativi e campagne", "Programmi per l’inclusione", "Reti di solidarietà e mutuo aiuto"], desc: "Promozione e tutela dei diritti umani, civili e sociali; sostegno alle pari opportunità." },
            { icon: "💡", title: "Cultura d’impresa aperta all’innovazione", points: ["Percorsi formativi", "Responsabilità sociale d’impresa", "Tavoli su innovazione e comunicazione"], desc: "Diffondere una cultura d’impresa basata su conoscenza e responsabilità." },
          ].map((p) => (
            <div key={p.title} className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl">{p.icon}</div>
              <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-slate-600">{p.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2"><span aria-hidden>•</span><span>{pt}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-10">
          <div>
            <h2 className="text-3xl font-bold">Roadmap per il futuro</h2>
            <p className="mt-3 text-slate-600">Le prossime tappe per rafforzare i legami con la diaspora, promuovere cultura e diritti e diffondere una cultura d’impresa aperta all’innovazione.</p>
            <div className="mt-6 rounded-2xl overflow-hidden">
              <Image src="/images/program/roadmap.jpg" alt="Roadmap" width={1600} height={900} className="w-full h-64 object-cover" />
            </div>
          </div>
          <div className="lg:col-span-2 relative">
            <div className="absolute left-1.5 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-8">
              <RoadmapStep when="Q1" title="Reti & progettazione" text="Co-progettazione con le comunità italiane all’estero ed avvio sportelli informativi." />
              <RoadmapStep when="Q2" title="Cultura & pari opportunità" text="Rassegne artistiche, progetti editoriali e programmi per l’inclusione." />
              <RoadmapStep when="Q3" title="Mutuo aiuto & formazione" text="Iniziative di aiuto reciproco e percorsi formativi su innovazione e responsabilità." />
              <RoadmapStep when="Q4" title="Valutazione & programmazione" text="Sintesi dei risultati e definizione delle priorità per l’anno successivo." />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <h2 className="text-3xl font-bold">Domande frequenti</h2>
            <p className="mt-3 text-slate-600">Risposte rapide su attività e volontariato.</p>
          </header>
          <div className="grid md:grid-cols-2 gap-6">
            <FaqItem q="Come posso partecipare alle attività?" a="Iscriviti come socio o volontario e scegli un asse: cultura, diritti/pari opportunità, aiuto reciproco o innovazione d’impresa." />
            <FaqItem q="Che tipo di iniziative editoriali realizzate?" a="Pubblicazioni, podcast e contenuti digitali per raccontare la cultura italiana e la storia del Paese." />
            <FaqItem q="Chi partecipa all'associazione?" a="Imprenditori, professionisti, studenti e giovani interessati a crescere insieme." />
            <FaqItem q="Collaborate con le comunità italiane all’estero?" a="Sì: progetti di scambio, eventi con i circoli locali e reti della diaspora." />
          </div>
        </div>
      </section>

      {/* Manifesto / Statuto */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-2xl border p-8 bg-white shadow-sm">
            <h3 className="text-2xl font-bold">Il nostro Manifesto</h3>
            <p className="mt-2 text-slate-600">Una visione chiara e un percorso definito.</p>
            <Link href="/manifesto" className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">Apri il Manifesto</Link>
          </div>
          <div className="rounded-2xl border p-8 bg-white shadow-sm">
            <h3 className="text-2xl font-bold">Statuto e governance</h3>
            <p className="mt-2 text-slate-600">Consulta lo Statuto completo online.</p>
            <Link href="/statuto" className="mt-6 inline-flex rounded-2xl border px-5 py-3 font-semibold hover:bg-slate-50">Apri lo Statuto</Link>
          </div>
        </div>
      </section>

      {/* Come funziona + moduli */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold">Come funziona l’associazione</h2>
          <p className="mt-2 text-slate-700 max-w-3xl">
            Siamo una realtà no-profit che unisce italiani in Italia e nel mondo. Partecipi tramite <strong>iscrizioni</strong> ed <strong>eventi</strong>, puoi <strong>prenotare spazi</strong> nella nostra sede e, se vuoi, sostenere le attività con una <strong>donazione</strong>.
          </p>
          <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-slate-700">
            <li className="rounded-xl border bg-white p-3">• Iscrizione: entri in rete e ricevi aggiornamenti</li>
            <li className="rounded-xl border bg-white p-3">• Eventi: incontri, rassegne, formazione</li>
            <li className="rounded-xl border bg-white p-3">• Spazi prenotabili: ufficio o sala riunioni</li>
            <li className="rounded-xl border bg-white p-3">• Donazioni: importo libero per progetti e attività</li>
          </ul>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <Card id="iscrizione" title="Iscrizione — Modulo di adesione" className="h-full flex flex-col">
            <div className="flex-1">
              <IscrizioneForm />
              <p className="mt-3 text-xs text-slate-500">
                Gli invii arrivano alla nostra email tramite Formcarry. Per assistenza: <a className="underline" href="mailto:info@cittafutura.it">info@cittafutura.it</a>.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold">Privacy</h4>
              <p className="text-sm text-slate-700">Trattiamo i dati esclusivamente per finalità associative.</p>
              <Link href="/privacy" className="mt-3 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50">
                Leggi l’informativa privacy
              </Link>
            </div>
          </Card>

          <Card id="pagamento" title="Pagamento — Donazione / Quota annuale" className="h-full flex flex-col">
            <div className="flex-1">
              <h4 className="font-semibold">Dona online (coming soon)</h4>
              <p className="text-sm text-slate-600">Il pulsante sarà collegato a Stripe Checkout nella fase 2.</p>
              <button disabled className="mt-3 inline-flex rounded-xl bg-slate-300 px-5 py-3 text-sm font-semibold text-white cursor-not-allowed" title="In arrivo">
                Dona ora — In arrivo
              </button>
              <p className="mt-2 text-xs text-slate-500">Al go-live: carta e Apple/Google Pay. Importo libero con minimo suggerito.</p>
              <div className="my-6 h-px bg-slate-200" />
              <h4 className="font-semibold">Bonifico bancario</h4>
              <CopyRow label="IBAN" value="IT00 X000 0000 0000 0000 0000 000" />
              <CopyRow label="Causale" value={'Donazione liberale — "Città Futura"'} className="mt-4" />
              <p className="mt-3 text-xs text-slate-500">
                Per ricevuta fiscale scrivi a <a className="underline" href="mailto:tesoreria@cittafutura.it">tesoreria@cittafutura.it</a> indicando data e importo.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Notizie, Eventi, CTA finale */}
      <NewsCarouselSection posts={topPosts} />
      <NextEventTeaser />
      <BookingCTA />

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Entra nella comunità</h2>
          <p className="mt-2 text-slate-600">Iscriviti, partecipa ai prossimi eventi o prenota uno spazio in sede per incontrare la rete.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/partecipa" className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">Iscriviti</Link>
            <Link href="/eventi" className="rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50">Vedi Eventi</Link>
            <Link href="/prenotazioni" className="rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50">Prenota la sede</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
