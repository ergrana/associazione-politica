// src/app/programma/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Programma — La Repubblica degli Italiani nel Mondo",
  description:
    "Finalità, aree di attività e impegni: legami con le comunità italiane nel mondo, cultura italiana, diritti e pari opportunità, cultura d’impresa aperta all’innovazione.",
};

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

/* --- Step per la timeline --- */
function Step({
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

/* --- piccoli componenti --- */
function KPI({ k, l }: { k: string; l: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-extrabold">{k}</div>
      <div className="mt-1 text-xs text-white/90">{l}</div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-2xl border bg-white p-6 shadow-sm open:shadow-md transition-shadow">
      <summary className="cursor-pointer list-none font-semibold">{q}</summary>
      <p className="mt-3 text-slate-700 leading-relaxed">{a}</p>
    </details>
  );
}

export default function ProgrammaPage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Image
  src="/images/hero.jpg"
  alt=""
  fill
  className="object-cover -z-10"
/>
<div className="absolute inset-0 bg-black/50 -z-10" /> {/* overlay scuro per testo leggibile */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            La Repubblica degli Italiani nel Mondo • Programma
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Il nostro programma
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Finalità e aree di attività definite dallo statuto: cultura
            italiana, diritti e pari opportunità, aiuto reciproco, cultura
            d’impresa e innovazione.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#assi"
              className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-5 py-3 font-semibold hover:opacity-90"
            >
              Scopri gli assi
            </a>
            <a
              href="#download"
              className="inline-flex items-center justify-center rounded-xl border border-white/80 text-white px-5 py-3 font-semibold hover:bg-white/10"
            >
              Apri il Manifesto
            </a>
          </div>
          {/* KPI */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <KPI k="100+" l="eventi culturali/anno" />
            <KPI k="50k" l="connessioni diaspora" />
            <KPI k="200" l="iniziative solidali" />
            <KPI k="∞" l="formazione & innovazione" />
          </div>
        </div>
      </section>

      {/* ASSI STRATEGICI */}
      <section
        id="assi"
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <header className="mb-10">
          <h2 className="text-3xl font-bold">Gli assi strategici</h2>
          <p className="mt-3 text-slate-600">
            Quattro priorità tratte dallo statuto. Ogni asse ha obiettivi, azioni e indicatori.
          </p>
        </header>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
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
      <section
        id="roadmap"
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid lg:grid-cols-3 gap-10">
          <div>
            <h2 className="text-3xl font-bold">Roadmap per il futuro</h2>
            <p className="mt-3 text-slate-600">
              Le prossime tappe per rafforzare i legami con la diaspora,
              promuovere cultura e diritti e diffondere una cultura d’impresa
              aperta all’innovazione.
            </p>
            <div className="mt-6 rounded-2xl overflow-hidden">
              <Image
                src="/images/program/roadmap.jpg"
                alt="Roadmap delle attività"
                width={1600}
                height={900}
                className="w-full h-64 object-cover"
                priority={false}
              />
            </div>
          </div>

          <div className="lg:col-span-2 relative">
            <div className="absolute left-1.5 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-8">
              <Step
                when="Q1"
                title="Reti & progettazione"
                text="Rafforzo delle reti con le comunità italiane all’estero, co-progettazione di eventi culturali ed avvio sportelli informativi sui diritti."
              />
              <Step
                when="Q2"
                title="Cultura & pari opportunità"
                text="Rassegne artistiche, progetti editoriali e programmi per l’inclusione e le pari opportunità."
              />
              <Step
                when="Q3"
                title="Mutuo aiuto & formazione"
                text="Iniziative di aiuto reciproco e percorsi formativi su innovazione e responsabilità d’impresa."
              />
              <Step
                when="Q4"
                title="Valutazione & programmazione"
                text="Rendicontazione pubblica dei risultati, audit e definizione delle priorità per l’anno successivo."
              />
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
              Risposte rapide su attività, volontariato e trasparenza.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-6">
            <Faq
              q="Come posso partecipare alle attività?"
              a="Iscriviti come socio o volontario e scegli un asse: cultura, diritti/pari opportunità, aiuto reciproco o innovazione d’impresa."
            />
            <Faq
              q="Che tipo di iniziative editoriali realizzate?"
              a="Pubblicazioni, podcast e contenuti digitali per raccontare la cultura italiana e la storia del Paese."
            />
            <Faq
              q="Chi partecipa all'associazione?"
              a="Imprenditori, intellettuali e giovani interessati a crescere personalmente e professionalmente."
            />
            <Faq
              q="Collaborate con le comunità italiane all’estero?"
              a="Sì: progetti di scambio, eventi con i circoli locali e reti della diaspora per rafforzare i legami con l’Italia."
            />
          </div>
        </div>
      </section>

      {/* DOWNLOAD & CTA */}
      <section
        id="download"
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-2xl border p-8 bg-white shadow-sm">
            <h3 className="text-2xl font-bold">Manifesto completo</h3>
            <p className="mt-2 text-slate-600">
              Apri il PDF con il programma dettagliato.
            </p>
            <a
              href="/docs/manifesto.pdf"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Apri il Manifesto (PDF)
            </a>
          </div>
          <div className="rounded-2xl border p-8 bg-white shadow-sm">
            <h3 className="text-2xl font-bold">Statuto dell&apos;associazione</h3>
            <p className="mt-2 text-slate-600">
              Consulta lo statuto aggiornato dell&apos;associazione.
            </p>
            <a
              href="/docs/statuto.pdf"
              className="mt-6 inline-flex rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Apri lo Statuto (PDF)
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-3xl font-bold">Pronto a dare una mano?</h3>
          <p className="mt-3 text-slate-600">
            Entra nella Repubblica degli Italiani nel Mondo. Ogni contributo conta.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/partecipa"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Unisciti a noi
            </Link>
            <Link
              href="/trasparenza"
              className="inline-flex items-center justify-center rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Vedi Trasparenza
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
