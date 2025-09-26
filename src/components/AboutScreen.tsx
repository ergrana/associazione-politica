// src/components/AboutScreen.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { EVENTS, POSTS } from "@/lib/content";

/** ============================== CONFIG ============================== */
// Inserisci qui il tuo endpoint Formcarry (solo l'ID finale o l'intera URL)
const FORMCARRY_URL = "https://formcarry.com/s/IL_TUO_ENDPOINT";

// Sede e immagini slideshow (sostituisci con le tue)
const ADDRESS = "Viale Giuseppe Mazzini 73, 00195 Roma";
const SLIDES = ["/images/sede/1.jpg", "/images/sede/2.jpg", "/images/sede/3.jpg", "/images/sede/4.jpg"];

/**
 * Config base (soluzione B): niente denominazione/sede qui.
 * Rimane solo ciò che serve per missione/valori.
 */
const STATUTE_CONFIG = {
  scopi: [
    "Promuovere iniziative per rafforzare i legami tra l'Italia e le comunità italiane nel mondo.",
    "Conservare e valorizzare le tradizioni e la cultura italiana.",
    "Organizzare attività culturali, artistiche, ricreative ed editoriali di interesse sociale.",
    "Promuovere e tutelare i diritti umani, civili, sociali e politici.",
    "Sostenere l'uguaglianza e l'aiuto reciproco tra le persone.",
    "Diffondere una cultura d'impresa basata su conoscenza, responsabilità, comunicazione e innovazione.",
  ],
  soci:
    "Tutti i soci hanno pari diritto di concorrere alla gestione dell'Associazione nel rispetto di quanto previsto dal nostro statuto.",
  organi: [
    "Assemblea dei Soci.",
    "Consiglio Direttivo.",
    "Presidente.",
    "Vice-Presidente.",
    "Segretario Generale.",
    "Revisore dei Conti.",
  ],
  durata: "Durata a tempo indeterminato salvo diversa deliberazione dell’Assemblea.",
  bilancio: "Bilancio annuale e rendicontazione pubblica, pubblicati in formato aperto.",
};

/** Variante “ghost” con linea colorata a sinistra (niente riquadro) */
function ValueGhost({
  title,
  text,
  colorClass,
}: {
  title: string;
  text: string;
  colorClass: string; // es: "from-indigo-600 to-indigo-400"
}) {
  return (
    <div className="group relative rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-5 sm:p-6 hover:bg-white dark:hover:bg-slate-800 transition shadow-sm hover:shadow-md">
      <span
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b ${colorClass}`}
      />
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">{text}</p>
      <span className="absolute right-4 top-4 text-slate-300 dark:text-slate-500 transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </div>
  );
}

function Step({ year, title, text }: { year: string; title: string; text: string }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-indigo-600" />
      <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{year}</div>
      <div className="mt-1 font-semibold">{title}</div>
      <p className="mt-1 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}

/** Foto più grandi, senza bio */
function Person({ name, role, img }: { name: string; role: string; img: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm text-center">
      <div className="mx-auto h-40 w-40 overflow-hidden rounded-2xl">
        <Image src={img} alt={name} width={160} height={160} className="h-40 w-40 object-cover" />
      </div>
      <div className="mt-4">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-slate-600 dark:text-slate-400">{role}</div>
      </div>
    </div>
  );
}

/** Embed YouTube responsivo */
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

/* ====== CONTENUTI "PROGRAMMA" spostati qui ====== */
type Pillar = { title: string; desc: string; points: string[]; icon?: string };

const pillars: Pillar[] = [
  {
    title: "Legami Italia–Mondo & Cultura italiana",
    desc:
      "Promuovere iniziative che accrescano e rafforzino i legami tra l’Italia, i cittadini italiani e le comunità italiane nel mondo, valorizzando tradizioni e cultura.",
    points: [
      "Progetti di scambio e cooperazione con le comunità italiane all’estero",
      "Valorizzazione delle tradizioni e della storia italiana",
      "Eventi di promozione della cultura italiana nel mondo",
    ],
    icon: "🌍",
  },
  {
    title: "Attività culturali, artistiche, ricreative ed editoriali",
    desc:
      "Organizzazione e gestione di attività di interesse sociale, incluse iniziative editoriali per diffondere cultura e valori che hanno segnato la storia del Paese.",
    points: [
      "Rassegne culturali e artistiche aperte alla cittadinanza",
      "Laboratori e attività ricreative a impatto sociale",
      "Progetti editoriali e divulgativi su cultura e valori italiani",
    ],
    icon: "🎭",
  },
  {
    title: "Diritti, pari opportunità & aiuto reciproco",
    desc:
      "Promozione e tutela dei diritti umani, civili, sociali e politici; sostegno alle pari opportunità e alle iniziative di mutuo aiuto.",
    points: [
      "Sportelli informativi e campagne per i diritti",
      "Programmi per l’inclusione e le pari opportunità",
      "Reti di solidarietà e iniziative di aiuto reciproco",
    ],
    icon: "⚖️",
  },
  {
    title: "Cultura d’impresa aperta all’innovazione",
    desc:
      "Diffondere una cultura d’impresa basata su conoscenza, formazione, responsabilità dell’imprenditore e comunicazione, aperta all’innovazione e al cambiamento.",
    points: [
      "Percorsi formativi per lavoratori e imprenditori",
      "Buone pratiche di responsabilità sociale d’impresa",
      "Tavoli su innovazione, comunicazione e trasformazione digitale",
    ],
    icon: "💡",
  },
];

/* Componenti rinominati per evitare collisioni */
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
    <details className="rounded-2xl border bg-white p-6 shadow-sm open:shadow-md transition-shadow">
      <summary className="cursor-pointer list-none font-semibold">{q}</summary>
      <p className="mt-3 text-slate-700 leading-relaxed">{a}</p>
    </details>
  );
}

/* ============================== UI BASICS PER PARTECIPA / CONTATTI ============================== */
function Card({
  title,
  children,
  className = "",
  id,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`rounded-2xl bg-white p-6 shadow-sm border ${className}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Input({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
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
      <select name={name} className="w-full rounded-xl border px-4 py-2.5">
        {children}
      </select>
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
          onClick={() => {
            navigator.clipboard?.writeText(value).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1100);
            });
          }}
          className="rounded-lg border px-2 py-1 text-xs hover:bg-slate-50"
        >
          {copied ? "Copiato ✓" : "Copia"}
        </button>
      </div>
      <div className="font-mono text-sm mt-1 select-all">{value}</div>
    </div>
  );
}

/** Modulo iscrizione — invio diretto via Formcarry (no backend) */
function IscrizioneForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setOk(false);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (!data.nome || !data.cognome || !data.email || !data.comune || !data.consent) {
      alert("Compila i campi obbligatori e accetta la privacy.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(FORMCARRY_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (res.ok) {
        setOk(true);
        form.reset();
      } else {
        const j = await res.json().catch(() => null);
        setErr(j?.message || "Invio non riuscito. Riprova più tardi.");
      }
    } catch {
      setErr("Connessione non riuscita. Controlla la rete e riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4" noValidate>
      <Input name="nome" label="Nome *" required />
      <Input name="cognome" label="Cognome *" required />
      <Input name="email" type="email" label="Email *" required />
      <Input name="telefono" type="tel" label="Telefono (opzionale)" />
      <Input name="comune" label="Comune di residenza *" required />
      <Select name="fascia" label="Fascia di età">
        <option value="">Seleziona…</option>
        <option>18–25</option>
        <option>26–35</option>
        <option>36–50</option>
        <option>51+</option>
      </Select>

      {/* Honeypot antispam */}
      <label className="hidden">
        Non compilare questo campo: <input name="_gotcha" tabIndex={-1} autoComplete="off" />
      </label>

      <input type="hidden" name="_subject" value="Nuova iscrizione dal sito" />

      <label className="md:col-span-2 text-sm text-slate-600">
        <input type="checkbox" name="consent" className="mr-2" /> Ho letto e accetto l’informativa privacy *
      </label>

      <div className="md:col-span-2 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          aria-busy={loading}
        >
          {loading ? "Invio in corso..." : "Invia adesione"}
        </button>

        <a
          href="mailto:info@cittafutura.it?subject=Richiesta%20iscrizione&body=Ciao%2C%20vorrei%20iscrivermi.%0ANome%3A%20%0ACognome%3A%20%0AEmail%3A%20%0AComune%3A%20%0AGrazie!"
          className="rounded-xl border px-4 py-3 text-sm font-semibold hover:bg-slate-50"
        >
          Oppure scrivici via email
        </a>

        <span className="sr-only" aria-live="polite">
          {ok ? "Invio riuscito" : err ? "Errore di invio" : ""}
        </span>
        {ok && <span className="text-sm text-emerald-600">Ricevuto! Ti contatteremo a breve.</span>}
        {err && <span className="text-sm text-rose-600">{err}</span>}
      </div>
    </form>
  );
}

/* ============================== SOCIAL / RECAPITI / MAPPA / SLIDESHOW ============================== */
function RecapitiTimeline() {
  return (
    <ol className="relative">
      <span className="absolute left-3 top-0 bottom-0 w-px bg-slate-200" />
      {[
        { label: "Email", value: "info@cittafutura.it", href: "mailto:info@cittafutura.it" },
        { label: "Tesoreria", value: "tesoreria@cittafutura.it", href: "mailto:tesoreria@cittafutura.it" },
        { label: "Telefono", value: "+39 06 0000 0000", href: "tel:+390600000000" },
      ].map((r) => (
        <li key={r.value} className="relative pl-10 py-5">
          <span className="absolute left-0 top-6 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 rounded-full">
            <span className="w-3 h-3 rounded-full bg-violet-600" />
          </span>
          <p className="font-bold leading-6">{r.label}</p>
          <p className="text-slate-600 text-sm mt-1">
            <a className="underline" href={r.href}>
              {r.value}
            </a>
          </p>
        </li>
      ))}
    </ol>
  );
}

function SocialBtn({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold hover:bg-slate-50"
      aria-label={`Apri ${label}`}
    >
      <span className="h-4 w-4">{icon}</span>
      {label}
    </a>
  );
}

// Icone minime (SVG inline)
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 0-5-5V7a5 5 0 0 0 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M13 22v-9h3l1-4h-4V7a1 1 0 0 1 1-1h3V2h-3a5 5 0 0 0-5 5v2H6v4h3v9h4z" />
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M23 7.5a4 4 0 0 0-2.8-2.9C18.4 4 12 4 12 4s-6.4 0-8.2.6A4 4 0 0 0 1 7.5 41 41 0 0 0 1 12a41 41 0 0 0 0 4.5 4 4 0 0 0 2.8 2.9C5.6 20 12 20 12 20s6.4 0 8.2-.6A4 4 0 0 0 23 16.5 41 41 0 0 0 23 12a41 41 0 0 0 0-4.5zM10 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}
function IconTelegram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M9.9 15.6 9.7 20a.9.9 0 0 0 1.3.8l3-1.8 3.5 2.6a1 1 0 0 0 1.6-.6l3-14a1 1 0 0 0-1.4-1.1L2.5 10.2a1 1 0 0 0 .1 1.9l5.1 1.5 11.8-7.3-9.6 9.3z" />
    </svg>
  );
}

function ClickableMap({ address }: { address: string }) {
  const q = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps?q=${q}&z=16&output=embed`;
  const clickUrl = `https://www.google.com/maps/search/?api=1&query=${q}`;
  return (
    <a href={clickUrl} target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden border">
      <iframe
        src={mapUrl}
        title={`Mappa - ${address}`}
        className="w-full h-64"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </a>
  );
}

function Slideshow({ images }: { images: string[] }) {
  const [i, setI] = useState(0);
  const prev = () => setI((p) => (p === 0 ? images.length - 1 : p - 1));
  const next = () => setI((p) => (p === images.length - 1 ? 0 : p + 1));
  return (
    <div className="relative rounded-xl overflow-hidden">
      <Image src={images[i]} alt={`Foto sede ${i + 1}`} width={1200} height={700} className="w-full h-64 object-cover" priority={i === 0} />
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-1 text-sm font-semibold hover:bg-white"
        aria-label="Foto precedente"
      >
        ←
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-1 text-sm font-semibold hover:bg-white"
        aria-label="Foto successiva"
      >
        →
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, idx) => (
          <span key={idx} className={`h-1.5 w-4 rounded-full ${i === idx ? "bg-white" : "bg-white/50"}`} aria-hidden />
        ))}
      </div>
    </div>
  );
}

/* ===== Helpers (date/format) ===== */
function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
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
function fmtTimeHHMM(date: Date) {
  return date.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", hour12: false });
}
function addHours(date: Date, h: number) {
  const d = new Date(date);
  d.setHours(d.getHours() + h);
  return d;
}
const EURO = (n: number) => new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

/* ============================================= */
export default function AboutScreen() {
  /** Prossimo evento utile (>= oggi) */
  const nextEvent = useMemo(() => {
    const now = startOfDay(new Date());
    const upcoming = EVENTS.filter((e) => new Date(e.date) >= now).sort((a, b) => +new Date(a.date) - +new Date(b.date));
    return upcoming[0] ?? null;
  }, []);

  /** Top news (ultimi 10 post) */
  const topPosts = useMemo(() => {
    return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 10);
  }, []);

  return (
    <main className="min-h-screen">
      {/* HERO — bandiera CSS + logo centrato, testo vicino al logo */}
      <section
        className="relative min-h-[68vh] flex flex-col items-center justify-center overflow-hidden
  bg-[linear-gradient(to_right,#009246_0_33.333%,#ffffff_33.333%_66.666%,#ce2b37_66.666%_100%)] pb-8"
      >
        {/* Logo leggermente più in alto */}
        <Image
          src="/images/logo-rotondo.png"
          alt="La Repubblica degli Italiani nel Mondo"
          width={720}
          height={720}
          priority
          className="w-[min(80vw,560px)] h-auto drop-shadow-xl -translate-y-8 sm:-translate-y-12"
        />

        {/* Wrapper testo/CTA */}
        <div className="-translate-y-3 sm:-translate-y-5 text-center text-slate-900 px-4">
          <p className="mt-0 max-w-2xl mx-auto text-lg">
            Rafforziamo il legame tra l&apos;Italia e gli italiani nel mondo.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="#partecipa"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-5 py-3 font-semibold hover:opacity-90"
            >
              Iscriviti ora
            </Link>
            <Link
              href="#pagamento"
              className="inline-flex items-center justify-center rounded-xl ring-2 ring-slate-900/80 text-slate-900 px-5 py-3 font-semibold hover:bg-black/5"
            >
              Sostienici con una donazione
            </Link>
          </div>
        </div>
      </section>

      {/* MISSIONE + VIDEO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold">La nostra missione</h2>

            {/* Testo missione */}
            <div className="mt-3 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                La Repubblica degli Italiani nel Mondo nasce per unire tutti coloro che, fino ad oggi
                spettatori di una crescente crisi internazionale, comprendono sia giunto il momento di
                partecipare alla sfida del cambiamento.
              </p>
              <p>
                L’obiettivo fondamentale dell’Associazione è quello di riunire le teste pensanti del nostro
                Paese, in Italia e all’Estero, fino ad oggi distanti da una diretta partecipazione alla vita
                pubblica, per costruire un percorso capace di coniugare presente e futuro per restituire fiducia
                e speranza alle nuove generazioni.
              </p>
              <p>
                La Repubblica degli Italiani nel Mondo vuole essere uno strumento aggregativo, partecipativo,
                un luogo di sintesi delle idee e delle iniziative che ognuno di voi vorrà proporre.
              </p>
            </div>
          </div>

          <div>
            <ResponsiveYouTube id="7qmZoXRg_QY" />
          </div>
        </div>
      </section>

      {/* VALORI */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="sr-only">I nostri valori</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ValueGhost
            title="Partecipazione Attiva"
            text="Assemblee aperte, consultazioni e bilancio partecipativo per decidere insieme."
            colorClass="from-emerald-600 to-emerald-400"
          />
          <ValueGhost
            title="Valorizzazione Cultura Italiana"
            text="Promozione dei diritti umani e delle pari opportunità, inclusione sociale e valorizzazione delle culture."
            colorClass="from-amber-600 to-amber-400"
          />
          <ValueGhost
            title="Incentivazione Cultura Imprenditoriale"
            text="Diffusione della cultura imprenditoriale basata su conoscenza, responsabilità, comunicazione e apertura al cambiamento."
            colorClass="from-sky-600 to-sky-400"
          />
          <ValueGhost
            title="Valorizzazione delle attività giovanili"
            text="Promuovere tra i giovani una cultura imprenditoriale fondata su conoscenza, responsabilità, collaborazione e apertura all’innovazione."
            colorClass="from-sky-600 to-sky-400"
          />
        </div>
      </section>

      {/* PRESS */}
      <section className="py-10 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-slate-500 dark:text-slate-400">Hanno parlato di noi</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 items-center opacity-80">
          {["stampa1.jpg", "stampa2.jpg", "stampa3.jpg", "stampa4.jpg", "stampa5.jpg", "stampa6.jpg"].map((f) => (
            <div key={f} className="flex items-center justify-center">
              <Image src={`/images/logos/${f}`} alt={f} width={90} height={20} />
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-10">
          <div>
            <h2 className="text-3xl font-bold">La nostra storia</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Ripercorri le tappe principali del nostro percorso.</p>
            <div className="mt-6 rounded-2xl overflow-hidden">
              <Image src="/images/about/timeline.jpg" alt="Incontro pubblico" width={1600} height={900} className="w-full h-64 object-cover" />
            </div>
          </div>
          <div className="lg:col-span-2 relative">
            <div className="absolute left-1.5 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-8">
              <Step year="2019" title="Nasce la Repubblica degli Italiani nel Mondo" text="Gruppo civico che si organizza in associazione politica." />
              <Step year="2021" title="Primo evento" text="Assemblea, conferenza e primo evento conoscitivo." />
              <Step year="2023" title="Prima donazione" text="Associazione inizia a strutturarsi." />
              <Step year="2024" title="Superati i 1000 associati" text="Associazione inizia ad allargarsi." />
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Leadership e volti</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Conosci le persone che gestiscono l&apos;associazione.</p>
            </div>
            <Link href="/contatti" className="hidden sm:inline-flex rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium hover:bg-white dark:hover:bg-slate-800">
              Contattaci
            </Link>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Person name="Nome Cognome" role="Presidente" img="/images/about/Presidente.jpg" />
            <Person name="Nome Cognome" role="Vice-Presidente" img="/images/about/Vice-Presidente.jpg" />
            <Person name="Nome Cognome" role="Segretario Generale" img="/images/about/Segretario Generale.jpg" />
            <Person name="Nome Cognome" role="Revisore Finanziario" img="/images/about/Revisore dei Conti.jpg" />
          </div>
        </div>
      </section>

      {/*** === QUI INIZIANO I CONTENUTI "PROGRAMMA" === ***/}
      {/* ASSI STRATEGICI */}
      <section id="assi" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-bold">Gli assi strategici</h2>
        </header>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl">{p.icon}</div>
              <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-slate-600">{p.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span aria-hidden>•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-10">
          <div>
            <h2 className="text-3xl font-bold">Roadmap per il futuro</h2>
            <p className="mt-3 text-slate-600">
              Le prossime tappe per rafforzare i legami con la diaspora, promuovere cultura e diritti e diffondere una cultura d’impresa aperta all’innovazione.
            </p>
            <div className="mt-6 rounded-2xl overflow-hidden">
              <Image src="/images/program/roadmap.jpg" alt="Roadmap delle attività" width={1600} height={900} className="w-full h-64 object-cover" />
            </div>
          </div>

          <div className="lg:col-span-2 relative">
            <div className="absolute left-1.5 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-8">
              <RoadmapStep when="Q1" title="Reti & progettazione" text="Rafforzo delle reti con le comunità italiane all’estero, co-progettazione di eventi culturali ed avvio sportelli informativi sui diritti." />
              <RoadmapStep when="Q2" title="Cultura & pari opportunità" text="Rassegne artistiche, progetti editoriali e programmi per l’inclusione e le pari opportunità." />
              <RoadmapStep when="Q3" title="Mutuo aiuto & formazione" text="Iniziative di aiuto reciproco e percorsi formativi su innovazione e responsabilità d’impresa." />
              <RoadmapStep when="Q4" title="Valutazione & programmazione" text="Rendicontazione dei risultati, audit e definizione delle priorità per l’anno successivo." />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <h2 className="text-3xl font-bold">Domande frequenti</h2>
            <p className="mt-3 text-slate-600">Risposte rapide su attività e volontariato.</p>
          </header>

          <div className="grid md:grid-cols-2 gap-6">
            <FaqItem q="Come posso partecipare alle attività?" a="Iscriviti come socio o volontario e scegli un asse: cultura, diritti/pari opportunità, aiuto reciproco o innovazione d’impresa." />
            <FaqItem q="Che tipo di iniziative editoriali realizzate?" a="Pubblicazioni, podcast e contenuti digitali per raccontare la cultura italiana e la storia del Paese." />
            <FaqItem q="Chi partecipa all'associazione?" a="Imprenditori, intellettuali e giovani interessati a crescere personalmente e professionalmente." />
            <FaqItem q="Collaborate con le comunità italiane all’estero?" a="Sì: progetti di scambio, eventi con i circoli locali e reti della diaspora per rafforzare i legami con l’Italia." />
          </div>
        </div>
      </section>

      {/* NOTIZIE — Carosello */}
      <NewsCarouselSection posts={topPosts} />

      {/* STATUTO + MANIFESTO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-8 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-2xl font-bold">Il nostro Manifesto</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Una visione chiara e un percorso definito.</p>
            <Link href="/manifesto" className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
              Apri il Manifesto
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-8 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-2xl font-bold">Statuto e governance</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Consulta lo Statuto completo online.</p>
            <Link
              href="/statuto"
              className="mt-6 inline-flex rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-3 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Apri lo Statuto
            </Link>
          </div>
        </div>
      </section>

      {/* PROSSIMI EVENTI (tra Statuto/Manifesto e Iscriviti) */}
      <NextEventSection event={nextEvent} />

      {/* PARTECIPA */}
      <section id="partecipa" className="scroll-mt-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">Iscriviti e Sostienici</h2>
      </section>

      <section className="py-4 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* SINISTRA — ISCRIZIONE */}
          <Card id="iscrizione" title="Iscrizione — Modulo di adesione" className="scroll-mt-24 h-full flex flex-col">
            <div className="flex-1">
              <IscrizioneForm />
              <p className="mt-3 text-xs text-slate-500">
                Gli invii arrivano direttamente alla nostra email tramite Formcarry. Per assistenza:{" "}
                <a className="underline" href="mailto:info@cittafutura.it">
                  info@cittafutura.it
                </a>
                .
              </p>
            </div>

            {/* BLOCCO PRIVACY */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold">Privacy</h4>
              <p className="text-sm text-slate-700">Trattiamo i dati esclusivamente per finalità associative (iscrizione e comunicazioni).</p>
              <a href="/docs/privacy.pdf" className="mt-3 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50">
                Leggi l’informativa privacy
              </a>
            </div>
          </Card>

          {/* DESTRA — PAGAMENTO */}
          <Card id="pagamento" title="Pagamento — Donazione / Quota annuale" className="scroll-mt-24 h-full flex flex-col">
            <div className="flex-1">
              <h4 className="font-semibold">Dona online (coming soon)</h4>
              <p className="text-sm text-slate-600">Il pulsante sarà collegato a Stripe Checkout nella fase 2.</p>
              <button
                disabled
                className="mt-3 inline-flex rounded-xl bg-slate-300 px-5 py-3 text-sm font-semibold text-white cursor-not-allowed"
                title="In arrivo"
              >
                Dona ora — In arrivo
              </button>
              <p className="mt-2 text-xs text-slate-500">Al go-live abiliteremo carta e Apple/Google Pay. Importo libero con minimo suggerito.</p>

              <div className="my-6 h-px bg-slate-200" />

              <h4 className="font-semibold">Bonifico bancario</h4>
              <CopyRow label="IBAN" value="IT00 X000 0000 0000 0000 0000 000" />
              <CopyRow label="Causale" value={'Donazione liberale — "Città Futura"'} className="mt-4" />
              <p className="mt-3 text-xs text-slate-500">
                Per ricevuta fiscale scrivi a{" "}
                <a className="underline" href="mailto:tesoreria@cittafutura.it">
                  tesoreria@cittafutura.it
                </a>{" "}
                indicando data e importo.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* ===== BLOCCO PRENOTA + FOTO + MAPPA (titolo sopra) ===== */}
      <section id="prenota" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold">Prenota gli spazi della sede</h2>
          <p className="mt-2 text-slate-600">
            Prima scegli dove vuoi stare (ufficio o sala riunioni) e poi seleziona data e orario. La prenotazione avviene con
            <strong> donazione libera</strong> (con un <strong>minimo</strong> in base alla durata).
          </p>
        </header>

        {/* Foto sede + Mappa (subito sotto il titolo) */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch mb-10">
          <Card title="La nostra sede">
            <Slideshow images={SLIDES} />
            <div className="mt-4 text-slate-700">{ADDRESS}</div>
            <p className="mt-1 text-xs text-slate-500">Spazi attrezzati per lavoro e riunioni.</p>
          </Card>
          <Card title="Dove siamo">
            <ClickableMap address={ADDRESS} />
            <div className="mt-3 text-slate-700">{ADDRESS}</div>
            <p className="mt-1 text-xs text-slate-500">Clicca sulla mappa per aprire Google Maps.</p>
          </Card>
        </div>

        {/* UI prenotazione (senza titolo, già sopra) */}
        <BookingSection showTitle={false} />
      </section>

      {/* CONTATTI */}
      <section id="contatti" className="scroll-mt-24 pt-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">Siamo qui per ascoltarti</h2>
      </section>

      {/* GRID 2×2 (senza “La nostra sede”) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* COLONNA SINISTRA */}
          <div className="flex flex-col gap-8">
            <Card title="Recapiti diretti">
              <RecapitiTimeline />
              <p className="mt-3 text-xs text-slate-500">Clicca sul canale per avviare il contatto.</p>
            </Card>

            <Card title="Seguici sui social">
              <p className="text-slate-600">Resta aggiornato su iniziative, eventi e campagne.</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SocialBtn href="#" icon={<IconInstagram />} label="Instagram" />
                <SocialBtn href="#" icon={<IconFacebook />} label="Facebook" />
                <SocialBtn href="#" icon={<IconYouTube />} label="YouTube" />
                <SocialBtn href="#" icon={<IconTelegram />} label="Telegram" />
              </div>
            </Card>
          </div>

          {/* COLONNA DESTRA */}
          <div className="flex flex-col gap-8">
            <Card title="Dove siamo">
              <ClickableMap address={ADDRESS} />
              <div className="mt-3 text-slate-700">{ADDRESS}</div>
              <p className="mt-1 text-xs text-slate-500">Clicca sulla mappa per aprire Google Maps.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Preferisci parlarne di persona?</h2>
          <p className="mt-2 text-slate-600">Vieni alla prossima assemblea aperta o scrivici per fissare un incontro.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/eventi" aria-label="Vai alla pagina Eventi" className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
              Vedi Eventi
            </Link>
            <a
              aria-label="Invia una email a info@cittafutura.it per fissare un incontro"
              href="mailto:info@cittafutura.it?subject=Richiesta%20incontro&body=Ciao%2C%20vorrei%20fissare%20un%20appuntamento%20in%20sede.%0A%0ANome%3A%20%0ATelefono%3A%20%0ADisponibilit%C3%A0%3A%20%0A%0AGrazie!"
              className="rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Scrivici ora
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ====== Prossimo evento: componente sezione (con lista successivi) ====== */
function NextEventSection({ event }: { event: (typeof EVENTS)[number] | null }) {
  // Ordina tutti gli eventi futuri (da oggi in poi)
  const { featured, nextThree } = useMemo(() => {
    const now = startOfDay(new Date());
    const upcoming = [...EVENTS]
      .filter((e) => new Date(e.date) >= now)
      .sort((a, b) => +new Date(a.date) - +new Date(b.date));

    const featured = event ?? upcoming[0] ?? null;
    const nextThree = featured
      ? upcoming.filter((e) => e.id !== featured.id).slice(0, 3)
      : upcoming.slice(0, 3);

    return { featured, nextThree };
  }, [event]);

  if (!featured) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl border bg-white p-6 sm:p-8 shadow-sm text-center">
          <h2 className="text-3xl font-bold">Partecipa ai nostri eventi</h2>
          <p className="mt-2 text-slate-600">Non ci sono eventi imminenti. Scopri il calendario completo.</p>
          <div className="mt-5">
            <Link href="/eventi" className="inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
              Vai alla pagina Eventi
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="events-title" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 id="events-title" className="text-3xl font-bold">Partecipa ai nostri eventi</h2>
      <p className="mt-2 text-slate-600">
        In evidenza trovi il <strong>prossimo appuntamento</strong>; a destra gli <strong>eventi futuri in programmazione</strong>.
      </p>

      {/* Su desktop: 1 col info (spazio) • 2 col evento in evidenza • 1 col lista successivi */}
      <div className="mt-6 grid lg:grid-cols-4 gap-8 items-stretch">
        {/* Spazio info/CTA */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">Partecipa, conosci persone e vivi la comunità.</p>
            <Link href="/eventi" className="mt-3 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50">
              Tutti gli eventi
            </Link>
          </div>
        </div>

        {/* Card evento in evidenza */}
        <article role="region" aria-labelledby="featured-title" className="lg:col-span-2 rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="px-5 pt-4">
            <h3 id="featured-title" className="mb-2 text-sm font-semibold text-slate-500 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">Prossimo evento</span>
            </h3>
          </div>
          <Link href={`/eventi/${featured.id}`} className="block relative">
            <Image
              src={featured.cover}
              alt={featured.title}
              width={1200}
              height={630}
              className="w-full h-64 object-cover"
              priority
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="rounded-full bg-white/95 text-slate-900 px-3 py-1 text-xs font-semibold shadow">Prossimo evento</span>
              <span className="rounded-full bg-white/95 text-slate-900 px-3 py-1 text-xs font-semibold shadow">
                {fmtBadgeDate(featured.date, featured.end)}
              </span>
            </div>
            <div className="absolute top-3 right-3 rounded-full bg-black/40 text-white px-3 py-1 text-xs font-semibold">
              {featured.category}
            </div>
          </Link>
          <div className="p-6">
            <div className="text-xs text-slate-500">
              {featured.city} • {fmtShortDate(featured.date)}
            </div>
            <h3 className="mt-1 text-xl font-semibold">{featured.title}</h3>
            <p className="mt-2 text-slate-600 line-clamp-3">{featured.description}</p>
            <div className="mt-3 text-sm text-slate-700">
              📍 {featured.place} — {featured.address}, {featured.city}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={`/eventi/${featured.id}`} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700" aria-label={`Partecipa a ${featured.title}`}>
                Partecipa
              </Link>
              <Link href={`/eventi/${featured.id}`} className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50" aria-label={`Dettagli su ${featured.title}`}>
                Dettagli
              </Link>
            </div>
          </div>
        </article>

        {/* Lista dei 3 successivi (a fianco su desktop) */}
        <aside role="region" aria-labelledby="upcoming-title" className="lg:col-span-1 hidden lg:flex flex-col gap-4">
          <h3 id="upcoming-title" className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">In programma</span>
            <span className="text-slate-400 text-xs">(eventi futuri)</span>
          </h3>

          {nextThree.length === 0 ? (
            <div className="rounded-2xl border bg-white p-4 text-sm text-slate-600">
              Nessun altro evento programmato al momento.
            </div>
          ) : (
            nextThree.map((e) => (
              <Link
                key={e.id}
                href={`/eventi/${e.id}`}
                className="group rounded-2xl border bg-white p-3 hover:shadow-sm transition-shadow"
              >
                <div className="flex gap-3">
                  <Image
                    src={e.cover}
                    alt={e.title}
                    width={160}
                    height={100}
                    className="h-20 w-28 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full border px-2 py-0.5">
                        {fmtBadgeDate(e.date)}
                      </span>
                      <span>• {e.city}</span>
                    </div>
                    <div className="mt-0.5 font-semibold text-sm line-clamp-2 group-hover:underline">
                      {e.title}
                    </div>
                    <div className="mt-1 text-[12px] text-slate-600 line-clamp-1">📍 {e.place}</div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </aside>
      </div>

      {/* Sotto il featured su mobile */}
      {nextThree.length > 0 && (
        <div className="mt-6 lg:hidden">
          <h3 className="mb-2 text-sm font-semibold text-slate-500">In programma</h3>
          <div className="grid gap-4">
            {nextThree.map((e) => (
              <Link
                key={e.id}
                href={`/eventi/${e.id}`}
                className="group rounded-2xl border bg-white p-3 hover:shadow-sm transition-shadow"
              >
                <div className="flex gap-3">
                  <Image
                    src={e.cover}
                    alt={e.title}
                    width={160}
                    height={100}
                    className="h-20 w-28 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full border px-2 py-0.5">
                        {fmtBadgeDate(e.date)}
                      </span>
                      <span>• {e.city}</span>
                    </div>
                    <div className="mt-0.5 font-semibold text-sm line-clamp-2 group-hover:underline">
                      {e.title}
                    </div>
                    <div className="mt-1 text-[12px] text-slate-600 line-clamp-1">📍 {e.place}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* ====== Carosello Notizie ====== */
function NewsCarouselSection({ posts }: { posts: (typeof POSTS)[number][] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: "prev" | "next") {
    const el = scrollerRef.current;
    if (!el) return;
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
          <Link
            href="/notizie"
            className="hidden sm:inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Vai alle Notizie
          </Link>
        </div>

        {/* Carosello */}
        <div className="mt-6 relative">
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => scrollBy("prev")}
              aria-label="Notizie precedenti"
              className="rounded-full border bg-white/90 px-3 py-2 shadow hover:bg-white"
            >
              ←
            </button>
          </div>
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => scrollBy("next")}
              aria-label="Notizie successive"
              className="rounded-full border bg-white/90 px-3 py-2 shadow hover:bg-white"
            >
              →
            </button>
          </div>

          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
          >
            {posts.map((p) => (
              <article
                key={p.id}
                className="min-w-[280px] sm:min-w-[340px] lg:min-w-[380px] snap-start rounded-2xl border bg-white overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/notizie/${p.slug}`} className="block">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={800}
                    height={450}
                    className="w-full h-44 object-cover"
                    priority={false}
                  />
                  <div className="p-5">
                    <div className="text-xs text-slate-500">
                      {fmtShortDate(p.date)} • {p.read}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold line-clamp-2">{p.title}</h3>
                    <p className="mt-2 text-slate-600 line-clamp-3">{p.excerpt}</p>
                    <div className="mt-3 text-sm font-semibold text-indigo-700">Leggi di più →</div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* CTA mobile */}
          <div className="mt-6 sm:hidden text-center">
            <Link
              href="/notizie"
              className="inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Tutte le Notizie
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== Prenotazione Spazi (MVP UI) ====== */
type Room = {
  id: "office" | "meeting";
  name: string;
  capacity: number;
  minPerHour: number; // EUR
  amenities: string[];
  photo: string;
};
const ROOMS: Room[] = [
  {
    id: "office",
    name: "Ufficio (1–2 postazioni)",
    capacity: 2,
    minPerHour: 15,
    amenities: ["Wi-Fi", "Scrivania", "Prese elettriche"],
    photo: SLIDES[0] || "/images/sede/1.jpg",
  },
  {
    id: "meeting",
    name: "Sala riunioni (fino a 10 persone)",
    capacity: 10,
    minPerHour: 30,
    amenities: ["Wi-Fi", "Schermo/TV", "HDMI", "Lavagna"],
    photo: SLIDES[1] || "/images/sede/2.jpg",
  },
];

function BookingSection({ showTitle = true }: { showTitle?: boolean }) {
  // Stato
  const [roomId, setRoomId] = useState<Room["id"]>("office");
  const [date, setDate] = useState<string>("");
  const [start, setStart] = useState<string>(""); // "HH:MM"
  const [duration, setDuration] = useState<number>(1); // ore
  const room = ROOMS.find((r) => r.id === roomId)!;
  const minTotal = room.minPerHour * Math.max(1, duration);
  const [amount, setAmount] = useState<number>(minTotal);

  // Mantieni l'importo >= minimo quando cambia stanza/durata
  useEffect(() => {
    setAmount((curr) => Math.max(minTotal, curr));
  }, [roomId, duration]); // eslint-disable-line

  // Genera slot 09:00–19:00, passo 60'
  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    const open = 9;
    const close = 19;
    for (let h = open; h < close; h++) {
      const hh = String(h).padStart(2, "0");
      slots.push(`${hh}:00`);
    }
    return slots;
  }, []);

  // Riepilogo orario fine
  const endTime = useMemo(() => {
    if (!start) return "";
    const [h, m] = start.split(":").map((x) => parseInt(x, 10));
    const d = new Date();
    d.setHours(h, m, 0, 0);
    const e = addHours(d, duration);
    return fmtTimeHHMM(e);
  }, [start, duration]);

  function handlePay() {
    // Placeholder: integrare con Stripe Payment Element/Checkout
    alert(
      `Prenotazione bozza:\n- Spazio: ${room.name}\n- Data: ${date || "—"}\n- Orario: ${start || "—"} → ${endTime || "—"}\n- Durata: ${duration}h\n- Donazione: ${EURO(amount)} (min ${EURO(minTotal)})\n\nIntegrazione pagamento in arrivo.`
    );
  }

  return (
    <section className="py-0 px-0">
      {showTitle && (
        <header className="mb-8">
          <h2 className="text-3xl font-bold">Prenota gli spazi della sede</h2>
          <p className="mt-2 text-slate-600">
            Scegli uno spazio, seleziona data e orario e contribuisci con una <strong>donazione libera</strong> (con un
            <strong> minimo</strong> in base alla durata).
          </p>
        </header>
      )}

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Colonna sinistra: scelta spazio */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-semibold text-slate-500">1) Scegli lo spazio</h3>
          {ROOMS.map((r) => (
            <button
              key={r.id}
              onClick={() => setRoomId(r.id)}
              className={`w-full text-left rounded-2xl border p-4 hover:shadow-sm transition ${
                roomId === r.id ? "ring-2 ring-indigo-600" : ""
              }`}
            >
              <div className="flex gap-3">
                <Image src={r.photo} alt={r.name} width={160} height={100} className="h-20 w-28 object-cover rounded-xl" />
                <div className="min-w-0">
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-slate-600">
                    Capienza {r.capacity} • Min {EURO(r.minPerHour)}/h
                  </div>
                  <div className="mt-1 text-[12px] text-slate-500 line-clamp-1">{r.amenities.join(" • ")}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Colonna centrale: calendario + orario + durata */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-semibold text-slate-500">2) Data e orario</h3>
          <div className="rounded-2xl border p-4">
            <label className="block text-sm">
              <span className="block text-slate-700 mb-1">Data</span>
              <input
                type="date"
                className="w-full rounded-xl border px-4 py-2.5"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <div className="mt-4">
              <span className="block text-sm text-slate-700 mb-2">Orario di inizio</span>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setStart(t)}
                    className={`rounded-xl border px-3 py-2 text-sm hover:bg-slate-50 ${
                      start === t ? "bg-indigo-600 text-white border-indigo-600" : ""
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <span className="block text-sm text-slate-700 mb-1">Durata</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((h) => (
                  <button
                    key={h}
                    onClick={() => setDuration(h)}
                    className={`rounded-xl border px-3 py-2 text-sm hover:bg-slate-50 ${
                      duration === h ? "bg-slate-900 text-white border-slate-900" : ""
                    }`}
                  >
                    {h}h
                  </button>
                ))}
              </div>
              {start && (
                <p className="mt-2 text-xs text-slate-500">
                  Fine prevista: <strong>{endTime}</strong> (apertura 09:00 — chiusura 19:00)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Colonna destra: Donazione + Riepilogo */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-semibold text-slate-500">3) Donazione e conferma</h3>
          <div className="rounded-2xl border p-4">
            <label className="block text-sm">
              <span className="block text-slate-700 mb-1">Donazione (totale)</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={minTotal}
                  step={1}
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value || "0", 10))}
                  onBlur={() => setAmount((v) => (isNaN(v) || v < minTotal ? minTotal : v))}
                  className="w-full rounded-xl border px-4 py-2.5"
                />
                <span className="text-sm text-slate-500">EUR</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Minimo per {duration}h: <strong>{EURO(minTotal)}</strong>. Puoi aumentare per sostenere l’associazione.
              </p>
            </label>

            <div className="my-4 h-px bg-slate-200" />

            <div className="text-sm">
              <div className="font-semibold">Riepilogo</div>
              <ul className="mt-2 space-y-1 text-slate-600">
                <li>Spazio: <strong>{room.name}</strong></li>
                <li>Data: <strong>{date || "—"}</strong></li>
                <li>Orario: <strong>{start ? `${start} → ${endTime}` : "—"}</strong></li>
                <li>Durata: <strong>{duration}h</strong></li>
                <li>Donazione: <strong>{EURO(amount)}</strong></li>
              </ul>
            </div>

            <button
              onClick={handlePay}
              disabled={!roomId || !date || !start || amount < minTotal}
              className="mt-4 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
              title={!date || !start ? "Seleziona data e orario" : amount < minTotal ? "Importo sotto il minimo" : "Conferma e paga"}
            >
              Conferma e paga (demo)
            </button>

            <p className="mt-2 text-[12px] text-slate-500">
              Al pagamento riuscito riceverai email di conferma e un file .ics per il calendario.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
