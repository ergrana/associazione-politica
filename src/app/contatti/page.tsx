// src/app/contatti/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/** immagini slideshow dalla cartella /public/images/sede */
const SLIDES = ["/images/sede/1.jpg", "/images/sede/2.jpg", "/images/sede/3.jpg", "/images/sede/4.jpg"];

export default function ContattiPage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Image src="/images/hero.jpg" alt="" fill className="object-cover -z-10" />
        <div className="absolute inset-0 bg-black/50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            La Repubblica degli Italiani nel Mondo • Contatti
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">Siamo qui per ascoltarti</h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Stampa, segnalazioni o partnership: scrivici via email con un click.
          </p>
        </div>
      </section>

      {/* GRID 2×2: sx (Recapiti + Social), dx (Mappa + Sede) */}
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
              <ClickableMap address="Viale Giuseppe Mazzini 73, 00195 Roma" />
              <div className="mt-3 text-slate-700">Viale Giuseppe Mazzini 73, 00195 Roma</div>
              <p className="mt-1 text-xs text-slate-500">Clicca sulla mappa per aprire Google Maps.</p>
            </Card>

            <Card title="La nostra sede">
              <Slideshow images={SLIDES} />
            </Card>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Preferisci parlarne di persona?</h2>
          <p className="mt-2 text-slate-600">
            Vieni alla prossima assemblea aperta o scrivici per fissare un incontro.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/eventi"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Vedi Eventi
            </Link>
            <a
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

/* ------------------- COMPONENTI ------------------- */

function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-white p-6 shadow-sm ${className}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/** Timeline stile roadmap per i recapiti */
function RecapitiTimeline() {
  const items = [
    {
      k: "Email generale",
      desc: "Informazioni, richieste e segnalazioni.",
      action: { label: "info@cittafutura.it", href: "mailto:info@cittafutura.it" },
    },
    {
      k: "PEC",
      desc: "Comunicazioni formali e protocollate.",
      action: { label: "cittafutura@pec.it", href: "mailto:cittafutura@pec.it" },
    },
    {
      k: "Stampa",
      desc: "Ufficio comunicazione e media partner.",
      action: { label: "press@cittafutura.it", href: "mailto:press@cittafutura.it" },
    },
    {
      k: "Telefono",
      desc: "Segreteria organizzativa (lun–ven 10–13).",
      action: { label: "+39 06 0000 0000", href: "tel:+39060000000" },
    },
  ] as const;

  return (
    <ol className="relative">
      <span className="absolute left-3 top-0 bottom-0 w-px bg-slate-200" />
      {items.map((it, i) => (
        <li key={i} className="relative pl-10 py-5">
          <span className="absolute left-0 top-6 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 rounded-full">
            <span className="w-3 h-3 rounded-full bg-violet-600" />
          </span>
          <p className="font-bold leading-6">{it.k}</p>
          <p className="text-slate-600 text-sm mt-1">{it.desc}</p>
          <div className="mt-2">
            <a
              href={it.action.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:underline"
            >
              {it.action.label} <span aria-hidden>↗</span>
            </a>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ClickableMap({ address }: { address: string }) {
  const q = encodeURIComponent(address);
  const mapsUrl = `https://www.google.com/maps?q=${q}`;
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black/5">
      <a href={mapsUrl} target="_blank" rel="noopener" className="absolute inset-0 z-10" aria-label="Apri Google Maps" />
      <div className="relative h-72 sm:h-80">
        <iframe
          title={`Mappa - ${address}`}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${q}&output=embed`}
        />
      </div>
    </div>
  );
}

function Slideshow({ images }: { images: string[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length, paused]);

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-black/5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Slideshow sede"
    >
      <div className="relative h-72 sm:h-80">
        <Image src={images[i]} alt={`Sede — immagine ${i + 1}`} fill className="object-cover" priority={false} />
      </div>
      <button
        onClick={() => setI((p) => (p - 1 + images.length) % images.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold shadow hover:bg-white"
      >
        ←
      </button>
      <button
        onClick={() => setI((p) => (p + 1) % images.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold shadow hover:bg-white"
      >
        →
      </button>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === idx ? "bg-white ring-2 ring-black/30" : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function SocialBtn({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-semibold hover:bg-slate-50"
      target="_blank"
      rel="noopener"
    >
      <span className="h-5 w-5">{icon}</span>
      {label}
    </a>
  );
}

/* ------------------- ICONS (SVG) ------------------- */

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zM18 6.3a1 1 0 110 2 1 1 0 010-2z" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M13.5 9H16l.5-3h-3V4.5c0-.9.3-1.5 1.6-1.5H16V0h-2.3C11.2 0 10 1.5 10 4.3V6H8v3h2v9h3.5V9z" />
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19 3.5 12 3.5 12 3.5s-7 0-9.4.6A3 3 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3 3 0 002.1 2.1C4.9 20.5 12 20.5 12 20.5s7 0 9.4-.6a3 3 0 002.1-2.1A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.8 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}
function IconTelegram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M9.8 15.6l-.4 4.2c.6 0 .9-.3 1.2-.6l2.9-2.8 6 4.3c1.1.6 1.9.3 2.2-1l4.1-19.2c.4-1.7-.6-2.4-1.7-2L1.4 9.3C-.3 10 0 10.9 1.4 11.3l6.2 1.9 14.3-9.1-12.1 11.5z" />
    </svg>
  );
}
