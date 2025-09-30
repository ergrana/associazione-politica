// src/app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { EVENTS, POSTS } from "@/lib/content";

/* ========================= HERO: Bandiera che sventola (video + logo overlay) ========================= */
function WavingFlagHero() {
  return (
    <section className="relative min-h-[20vh] flex flex-col items-center justify-center overflow-hidden pb-10">
      {/* Video background */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover brightness-160 contrast-110"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/video/bandiera.mp4" type="video/mp4" />
        Il tuo browser non supporta il video HTML5.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/20" aria-hidden />
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* Logo */}
      <Image
        src="/images/logo-rotondo.png"
        alt="La Repubblica degli Italiani nel Mondo"
        width={130}
        height={130}
        priority
        className="w-[min(60vw,300px)] h-auto drop-shadow-2xl"
      />

      {/* CTA */}
      <div className="mt-1 text-center text-white px-4">
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
            href="/chi-siamo"
            className="inline-flex items-center justify-center rounded-xl ring-2 ring-white/85 text-white px-5 py-3 font-semibold hover:bg-white/10"
          >
            Scopri la nostra missione
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ========================= HELPERS ========================= */
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

/* ========================= NOTIZIE IN EVIDENZA ========================= */
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
                  />
                  <div className="p-5">
                    <div className="text-xs text-slate-500">
                      {fmtShortDate(p.date)} • {p.read}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold line-clamp-2">{p.title}</h3>
                    <p className="mt-2 text-slate-600 line-clamp-3">{p.excerpt}</p>
                    <div className="mt-3 text-sm font-semibold text-indigo-700">
                      Leggi di più →
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

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

/* ========================= PROSSIMO EVENTO ========================= */
function NextEventTeaser() {
  const nextEvent = useMemo(() => {
    const now = startOfDay(new Date());
    const upcoming = EVENTS
      .filter((e) => new Date(e.date) >= now)
      .sort((a, b) => +new Date(a.date) - +new Date(b.date));
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
        <Link
          href="/eventi"
          className="hidden sm:inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Vai agli Eventi
        </Link>
      </div>

      <article className="rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <Link href={`/eventi/${nextEvent.id}`} className="block relative">
          <Image
            src={nextEvent.cover}
            alt={nextEvent.title}
            width={1200}
            height={630}
            className="w-full h-64 object-cover"
            priority
          />
          <div className="absolute top-3 left-3 rounded-xl bg-white/95 text-slate-900 px-3 py-1 text-xs font-semibold shadow">
            {fmtBadgeDate(nextEvent.date, nextEvent.end)}
          </div>
          <div className="absolute top-3 right-3 rounded-full bg-black/40 text-white px-3 py-1 text-xs font-semibold">
            {nextEvent.category}
          </div>
        </Link>
        <div className="p-6">
          <div className="text-xs text-slate-500">
            {nextEvent.city} • {fmtShortDate(nextEvent.date)}
          </div>
          <h3 className="mt-1 text-xl font-semibold">{nextEvent.title}</h3>
          <p className="mt-2 text-slate-600 line-clamp-3">{nextEvent.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/eventi/${nextEvent.id}`}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Partecipa
            </Link>
            <Link
              href={`/eventi/${nextEvent.id}`}
              className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Dettagli
            </Link>
          </div>
        </div>
      </article>

      <div className="mt-6 sm:hidden text-center">
        <Link
          href="/eventi"
          className="inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
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
            <p className="mt-2 text-slate-600">
              Ufficio per 1–2 postazioni o Sala riunioni fino a 10 persone. Importo libero (con minimo orario).
            </p>
          </div>
          <Link
            href="/prenotazioni"
            className="hidden sm:inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Vai alle Prenotazioni
          </Link>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          {[
            {
              title: "Ufficio (1–2 postazioni)",
              img: "/images/sede/ufficio-thumb.jpg",
              chips: ["Capienza 2", "Min 15 €/h", "Wi-Fi", "Scrivania", "Prese"],
            },
            {
              title: "Sala riunioni (fino a 10 persone)",
              img: "/images/sede/sala-thumb.jpg",
              chips: ["Capienza 10", "Min 30 €/h", "Wi-Fi", "Schermo/TV", "Lavagna"],
            },
          ].map((o) => (
            <div key={o.title} className="rounded-2xl border bg-white overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image src={o.img} alt={o.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{o.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {o.chips.map((c) => (
                    <span key={c} className="text-xs rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
                      {c}
                    </span>
                  ))}
                </div>
                <Link
                  href="/prenotazioni"
                  className="mt-4 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                >
                  Prenota questo spazio →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/prenotazioni"
            className="inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Vai alle Prenotazioni
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ========================= Come funziona — NUOVI BOTTONI ========================= */

/** Icone semplici */
const IconArrow = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M13.5 5.5L20 12l-6.5 6.5M20 12H4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconUser = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm7 8a7 7 0 0 0-14 0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconCalendar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M7 3v4M17 3v4M4 9h16M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconBuilding = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M3 21h18M6 21V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14M9 10h6M9 14h6M9 18h6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconHeart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M20.8 11.1 12 20 3.2 11.1A5.3 5.3 0 1 1 12 4.3a5.3 5.3 0 1 1 8.8 6.8Z"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Tile con bordo sfumato e interazione */
function ActionTile({
  href,
  title,
  desc,
  icon,
}: {
  href: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative block rounded-2xl p-[1px] overflow-hidden"
    >
      {/* bordo sfumato “soft” */}
      <div
        className="absolute inset-0 rounded-2xl opacity-80 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(30,144,255,0.35), rgba(30,144,255,0.08) 35%, rgba(30,144,255,0.0) 60%)",
        }}
        aria-hidden
      />
      {/* contenuto */}
      <div className="relative h-full rounded-2xl bg-white ring-1 ring-sky-200/70 p-5 shadow-sm transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-0.5">
        <div className="flex items-start gap-4 min-h-[88px]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 ring-1 ring-sky-200 text-sky-700">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-sky-800">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">{desc}</p>
          </div>
          <IconArrow className="ml-auto mt-1 h-5 w-5 text-sky-500 opacity-0 translate-x-[-4px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
        </div>

        {/* focus ring accessibile */}
        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-sky-400/0 group-focus-visible:ring-2 group-focus-visible:ring-sky-400/70" />
      </div>
    </Link>
  );
}

function HowItWorks() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="mb-8 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold">Come funziona l’associazione</h2>
        <p className="mt-2 text-slate-700">
          Siamo una realtà no-profit che unisce italiani in Italia e nel mondo. Partecipi tramite{" "}
          <strong>iscrizioni</strong> ed <strong>eventi</strong>, puoi <strong>prenotare spazi</strong> nella nostra sede
          e sostenere le attività con una <strong>donazione</strong>.
        </p>

        {/* Bottoni: Statuto / Manifesto / Chi siamo */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/statuto"
            className="inline-flex rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
          >
            Apri lo Statuto
          </Link>
          <Link
            href="/manifesti"
            className="inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Apri il Manifesto
          </Link>
          <Link
            href="/chi-siamo"
            className="inline-flex rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
          >
            Scopri chi siamo
          </Link>
        </div>
      </header>

      {/* 4 azioni — estetica migliorata */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ActionTile
          href="/partecipa"
          title="Iscrizione"
          desc="Entra in rete e ricevi aggiornamenti."
          icon={<IconUser className="h-5 w-5" />}
        />
        <ActionTile
          href="/eventi"
          title="Eventi"
          desc="Incontri, rassegne, formazione."
          icon={<IconCalendar className="h-5 w-5" />}
        />
        <ActionTile
          href="/prenotazioni"
          title="Spazi"
          desc="Ufficio o sala riunioni prenotabili."
          icon={<IconBuilding className="h-5 w-5" />}
        />
        <ActionTile
          href="/partecipa#pagamento"
          title="Donazioni"
          desc="Sostieni i progetti dell’associazione."
          icon={<IconHeart className="h-5 w-5" />}
        />
      </div>
    </section>
  );
}

/* ========================= PAGE ========================= */
export default function HomePage() {
  const topPosts = useMemo(
    () => [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 10),
    []
  );

  return (
    <main className="min-h-screen">
      <WavingFlagHero />
      <NewsCarouselSection posts={topPosts} />
      <NextEventTeaser />
      <BookingCTA />
      <HowItWorks />

      {/* CTA finale */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Entra nella comunità</h2>
          <p className="mt-2 text-slate-600">
            Iscriviti, partecipa ai prossimi eventi o prenota uno spazio in sede per incontrare la rete.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/partecipa"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Iscriviti
            </Link>
            <Link
              href="/eventi"
              className="rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Vedi Eventi
            </Link>
            <Link
              href="/prenotazioni"
              className="rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Prenota la sede
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
