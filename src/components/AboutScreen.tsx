// src/components/AboutScreen.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

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
  durata:
    "Durata a tempo indeterminato salvo diversa deliberazione dell’Assemblea.",
  bilancio:
    "Bilancio annuale e rendicontazione pubblica, pubblicati in formato aperto.",
};

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-extrabold">{kpi}</div>
      {/* Su hero scuro resta bianco per contrasto */}
      <div className="mt-1 text-sm text-white">{label}</div>
    </div>
  );
}

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
      {/* Linea colorata a sinistra (gradient) */}
      <span
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b ${colorClass}`}
      />
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
        {text}
      </p>
      {/* Micro-animazione icona → */}
      <span className="absolute right-4 top-4 text-slate-300 dark:text-slate-500 transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </div>
  );
}

function Step({
  year,
  title,
  text,
}: {
  year: string;
  title: string;
  text: string;
}) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-indigo-600" />
      <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
        {year}
      </div>
      <div className="mt-1 font-semibold">{title}</div>
      <p className="mt-1 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}

/** Foto più grandi, senza bio */
function Person({
  name,
  role,
  img,
}: {
  name: string;
  role: string;
  img: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm text-center">
      <div className="mx-auto h-40 w-40 overflow-hidden rounded-2xl">
        <Image
          src={img}
          alt={name}
          width={160}
          height={160}
          className="h-40 w-40 object-cover"
        />
      </div>
      <div className="mt-4">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-slate-600 dark:text-slate-400">{role}</div>
      </div>
    </div>
  );
}

function ResponsiveYouTube({ id }: { id: string }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ paddingTop: "56.25%" }}
    >
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
        title="La nostra missione — Città Futura"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

/* ====== CONTENUTI "PROGRAMMA" spostati qui ====== */

type Pillar = {
  title: string;
  desc: string;
  points: string[];
  icon?: string;
};

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
function RoadmapStep({
  when,
  title,
  text,
}: {
  when: string;
  title: string;
  text: string;
}) {
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

/* ============================================= */

export default function AboutScreen() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Image src="/images/hero.jpg" alt="" fill className="object-cover -z-10" />
        {/* overlay scuro per testo leggibile */}
        <div className="absolute inset-0 bg-black/50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            La Repubblica degli Italiani nel Mondo • Chi Siamo
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            La Repubblica degli Italiani nel Mondo
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Rafforziamo il legame tra l&apos;Italia e gli italiani nel mondo.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/partecipa"
              className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-5 py-3 font-semibold hover:opacity-90"
            >
              Iscriviti ora
            </Link>
            <Link
              href="/partecipa"
              className="inline-flex items-center justify-center rounded-xl ring-2 ring-white/80 text-white px-5 py-3 font-semibold hover:bg-white/10"
            >
              Sostienici con una donazione
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <Stat kpi="1.200+" label="aderenti" />
            <Stat kpi="85" label="volontari attivi" />
            <Stat kpi="27" label="progetti sul territorio" />
            <Stat kpi="€120k" label="fondi rendicontati 2024" />
          </div>
        </div>
      </section>

      {/* MISSIONE + VIDEO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold">La nostra missione</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
              {STATUTE_CONFIG.scopi[0]}
            </p>
            <ul className="mt-4 list-disc pl-5 text-slate-600 dark:text-slate-300 space-y-2">
              {STATUTE_CONFIG.scopi.slice(1).map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="mt-4 text-slate-600 dark:text-slate-300">{STATUTE_CONFIG.soci}</p>
          </div>
          <div>
            <ResponsiveYouTube id="dQw4w9WgXcQ" />
          </div>
        </div>
      </section>

      {/* VALORI */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="sr-only">I nostri valori</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ValueGhost
            title="Legalità e integrità"
            text="Pubblicazione di contratti e dichiarazioni dei conflitti d’interesse."
            colorClass="from-indigo-600 to-indigo-400"
          />
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
        </div>
      </section>

      {/* PRESS */}
      <section className="py-10 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-slate-500 dark:text-slate-400">
            Hanno parlato di noi
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 items-center opacity-80">
          {["stampa1.jpg","stampa2.jpg","stampa3.jpg","stampa4.jpg","stampa5.jpg","stampa6.jpg"].map((f) => (
            <div key={f} className="flex items-center justify-center">
              <Image src={`/images/logos/${f}`} alt={f} width={112} height={32} />
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-10">
          <div>
            <h2 className="text-3xl font-bold">La nostra storia</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Ripercorri le tappe principali del nostro percorso.
            </p>
            <div className="mt-6 rounded-2xl overflow-hidden">
              <Image
                src="/images/about/timeline.jpg"
                alt="Incontro pubblico"
                width={1600}
                height={900}
                className="w-full h-65 object-cover"
              />
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
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Conosci le persone che gestiscono l&apos;associazione.
              </p>
            </div>
            <Link
              href="/contatti"
              className="hidden sm:inline-flex rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium hover:bg-white dark:hover:bg-slate-800"
            >
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
          <p className="mt-3 text-slate-600">
            Quattro priorità tratte dallo statuto. Ogni asse ha obiettivi, azioni e indicatori.
          </p>
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
              <Image
                src="/images/program/roadmap.jpg"
                alt="Roadmap delle attività"
                width={1600}
                height={900}
                className="w-full h-64 object-cover"
              />
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
            <p className="mt-3 text-slate-600">
              Risposte rapide su attività e volontariato.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-6">
            <FaqItem
              q="Come posso partecipare alle attività?"
              a="Iscriviti come socio o volontario e scegli un asse: cultura, diritti/pari opportunità, aiuto reciproco o innovazione d’impresa."
            />
            <FaqItem
              q="Che tipo di iniziative editoriali realizzate?"
              a="Pubblicazioni, podcast e contenuti digitali per raccontare la cultura italiana e la storia del Paese."
            />
            <FaqItem
              q="Come rendicontate i risultati?"
              a="Attraverso report e materiali pubblici (PDF e pagine informative) pubblicati periodicamente sul sito."
            />
            <FaqItem
              q="Collaborate con le comunità italiane all’estero?"
              a="Sì: progetti di scambio, eventi con i circoli locali e reti della diaspora per rafforzare i legami con l’Italia."
            />
          </div>
        </div>
      </section>

      {/*** === QUI FINISCONO I CONTENUTI "PROGRAMMA" === ***/}

      {/* STATUTO + MANIFESTO (PDF nello stesso tab) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-8 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-2xl font-bold">Il nostro Manifesto</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Una visione chiara e un percorso definito.
            </p>
            <a
              href="/docs/manifesto.pdf"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Apri il Manifesto (PDF)
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-8 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-2xl font-bold">Statuto e governance</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Scarica il nostro Statuto.</p>
            <a
              href="/docs/statuto.pdf"
              className="mt-6 inline-flex rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-3 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Apri lo Statuto (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">
            Unisciti alla <span className="whitespace-nowrap">nostra associazione</span>.
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Tutti i soci hanno pari diritto di concorrere alla gestione
            dell&apos;Associazione.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/partecipa"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Partecipa ora
            </Link>
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-3 font-semibold hover:bg-white dark:hover:bg-slate-800"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
