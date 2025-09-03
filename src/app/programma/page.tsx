// src/app/programma/page.tsx

export const metadata = {
  title: "Programma — Città Futura",
  description:
    "Il programma di Città Futura: assi strategici, misure concrete e impatto misurabile per una città più giusta, trasparente e sostenibile.",
};

type Pillar = {
  title: string;
  desc: string;
  points: string[];
  icon?: string; // emoji semplice per impatto visivo
};
type Measure = {
  title: string;
  impact: string;
  kpi: string;
  budget?: string;
  tags: string[];
  details: string;
};

const pillars: Pillar[] = [
  {
    title: "Città dei 15 minuti",
    desc:
      "Servizi essenziali raggiungibili a piedi o in bici in 15 minuti: scuole, sanità di prossimità, sport, cultura.",
    points: [
      "Piani di quartiere con sportelli decentrati",
      "Rete ciclabile continua e sicura",
      "Orari coordinati con TPL",
    ],
    icon: "🚶‍♂️",
  },
  {
    title: "Trasparenza e anticorruzione",
    desc:
      "Dati aperti, rendicontazione semplice e controllo diffuso di spese e appalti.",
    points: [
      "Bilanci in formato aperto",
      "Registro lobbisti e incontri pubblici",
      "Whistleblowing protetto",
    ],
    icon: "🔍",
  },
  {
    title: "Lavoro & Giovani",
    desc:
      "Formazione, coworking diffusi, incentivi per startup e imprese ad impatto sociale.",
    points: [
      "Voucher formazione digitale",
      "Spazi comunali a canone calmierato",
      "Fondo microcredito",
    ],
    icon: "💼",
  },
  {
    title: "Ambiente e salute",
    desc:
      "Energia pulita, aria migliore, verde di prossimità e prevenzione sanitaria.",
    points: [
      "Comunità energetiche rinnovabili",
      "Piano alberature & ombreggiamento",
      "Monitoraggio qualità aria in tempo reale",
    ],
    icon: "🌿",
  },
];

const measures: Measure[] = [
  {
    title: "Bilancio Partecipativo cittadino",
    impact:
      "Coinvolge almeno 10.000 residenti/anno nelle decisioni di spesa locale.",
    kpi: "10k partecipanti/anno • 30 progetti finanziati",
    budget: "€ 3M/anno",
    tags: ["partecipazione", "trasparenza", "quartieri"],
    details:
      "Fase proposte (45 gg), co-progettazione (30 gg), voto online e in presenza. Inclusione: sportelli di facilitazione, materiali accessibili, lingua semplice.",
  },
  {
    title: "Trasporti notturni & sicuri",
    impact:
      "Riduce l’uso dell’auto privata e gli incidenti nelle fasce 22–5.",
    kpi: "Copertura 90% aree urbane • +25% TPL notturno",
    budget: "€ 1.2M/anno",
    tags: ["mobilità", "sicurezza", "giovani"],
    details:
      "Linee circolari ogni 20’ nei weekend, app con tracking in tempo reale, fermate illuminate, partnership con taxi/social ride.",
  },
  {
    title: "Comunità Energetiche Rinnovabili (CER)",
    impact:
      "Taglio bollette per famiglie fragili e riduzione CO₂ strutturale.",
    kpi: "6 CER • 5MW installati • -2.800 tCO₂/anno",
    budget: "€ 5M (fondi PNRR + privati)",
    tags: ["energia", "ambiente", "povertà energetica"],
    details:
      "Impianti su scuole/edifici pubblici, priorità a nuclei a basso reddito. Piattaforma digitale per monitoraggio e redistribuzione benefici.",
  },
  {
    title: "Sportelli Diritti & Antiviolenza",
    impact:
      "Accesso rapido a tutele legali e psicologiche, emersione del sommerso.",
    kpi: "4 sportelli multidisciplinari • 2.000 casi/anno",
    budget: "€ 650k/anno",
    tags: ["diritti", "coesione", "parità"],
    details:
      "Equipe legale-psicologica, rete con centri antiviolenza e terzo settore, formazione nelle scuole.",
  },
  {
    title: "Piano Scuole Aperte",
    impact:
      "Spazi scolastici come centri civici pomeridiani: sport, cultura, doposcuola.",
    kpi: "20 plessi • 3.000 ragazzi coinvolti",
    budget: "€ 800k/anno",
    tags: ["educazione", "sociale", "quartieri"],
    details:
      "Accordi con dirigenti, associazioni e famiglie; uso palestre e cortili; tutor pagati con fondi comunali e sponsor etici.",
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
      {children}
    </span>
  );
}

function MeasureCard({ m }: { m: Measure }) {
  return (
    <details className="group rounded-2xl border bg-white p-6 shadow-sm open:shadow-md transition-shadow">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{m.title}</h3>
          <p className="mt-1 text-slate-600">{m.impact}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {m.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-sm font-semibold text-slate-700">{m.kpi}</div>
          {m.budget && (
            <div className="text-xs text-slate-500 mt-1">Budget: {m.budget}</div>
          )}
          <div className="mt-2 text-xs text-slate-400 group-open:hidden">
            clicca per i dettagli ▾
          </div>
          <div className="mt-2 text-xs text-slate-400 hidden group-open:block">
            nascondi dettagli ▴
          </div>
        </div>
      </summary>
      <div className="mt-4 text-slate-700 leading-relaxed">{m.details}</div>
    </details>
  );
}

export default function ProgrammaPage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-indigo-500 to-amber-500 opacity-90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            Programma 2025 • Città Futura
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Un piano concreto per una città più giusta, trasparente e vivibile.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Assi strategici, misure operative e indicatori chiari. Qui trovi
            cosa faremo — e come misureremo i risultati.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#assi"
              className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-5 py-3 font-semibold hover:opacity-90"
            >
              Scopri gli assi
            </a>
            <a
              href="#misure"
              className="inline-flex items-center justify-center rounded-xl ring-2 ring-white/80 text-white px-5 py-3 font-semibold hover:bg-white/10"
            >
              Vai alle misure
            </a>
            <a
              href="#download"
              className="inline-flex items-center justify-center rounded-xl border border-white/80 text-white px-5 py-3 font-semibold hover:bg-white/10"
            >
              Scarica il Manifesto
            </a>
          </div>
          {/* KPI strip */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <KPI k="−2.800 tCO₂" l="emissioni/anno" />
            <KPI k="+25%" l="TPL notturno" />
            <KPI k="10k+" l="cittadini coinvolti" />
            <KPI k="€5M" l="investimenti green" />
          </div>
        </div>
      </section>

      {/* TOC semplice */}
      <nav className="sticky top-16 z-40 border-b bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm">
          <ul className="flex flex-wrap gap-4 text-slate-700">
            <li><a className="hover:text-indigo-600" href="#assi">Assi strategici</a></li>
            <li><a className="hover:text-indigo-600" href="#misure">Misure chiave</a></li>
            <li><a className="hover:text-indigo-600" href="#monitoraggio">Monitoraggio</a></li>
            <li><a className="hover:text-indigo-600" href="#faq">FAQ</a></li>
            <li><a className="hover:text-indigo-600" href="#download">Download</a></li>
          </ul>
        </div>
      </nav>

      {/* ASSI STRATEGICI */}
      <section id="assi" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-bold">Gli assi strategici</h2>
          <p className="mt-3 text-slate-600">
            Quattro priorità integrate. Ogni asse ha obiettivi, azioni e indicatori.
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

      {/* MISURE CHIAVE */}
      <section id="misure" className="py-16 bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <h2 className="text-3xl font-bold">Misure chiave</h2>
            <p className="mt-3 text-slate-600">
              Azioni concrete, tempi e impatto atteso. Clicca su ciascuna misura per i dettagli operativi.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-6">
            {measures.map((m) => (
              <MeasureCard key={m.title} m={m} />
            ))}
          </div>
        </div>
      </section>

      {/* MONITORAGGIO & TRASPARENZA */}
      <section id="monitoraggio" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold">Monitoraggio pubblico</h2>
            <p className="mt-3 text-slate-600">
              Dashboard trimestrale con avanzamento, spesa, impatto e scostamenti.
              Dati in formato aperto per garantire controllo diffuso.
            </p>
            <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-2">
              <li>Dashboard open data (CSV/JSON)</li>
              <li>Verbali e incontri pubblici con i quartieri</li>
              <li>Audit indipendente annuale</li>
            </ul>
            <a
              href="/trasparenza"
              className="mt-6 inline-flex rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Vai alla Trasparenza
            </a>
          </div>
          <div className="rounded-2xl border p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold">Roadmap 2025</h3>
            <ol className="mt-4 space-y-4 text-slate-700">
              <li>
                <span className="font-semibold">Q1:</span> progettazione dettagli esecutivi, tavoli con stakeholder,
                bandi per forniture e servizi.
              </li>
              <li>
                <span className="font-semibold">Q2:</span> avvio cantieri leggeri (piste, alberature), pilota TPL
                notturno, istituzione CER.
              </li>
              <li>
                <span className="font-semibold">Q3:</span> estensione servizi quartiere, sportelli diritti attivi,
                prima dashboard pubblica.
              </li>
              <li>
                <span className="font-semibold">Q4:</span> revisione obiettivi, audit, programmazione 2026 basata su evidenze.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <h2 className="text-3xl font-bold">Domande frequenti</h2>
            <p className="mt-3 text-slate-600">
              Risposte rapide su coperture, tempi e partecipazione.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-6">
            <Faq
              q="Da dove arrivano le risorse?"
              a="Mix di fondi comunali, PNRR e partenariati pubblico-privati con clausole sociali. Tutti i contratti saranno pubblici e tracciabili."
            />
            <Faq
              q="Come posso proporre un progetto?"
              a="Attraverso il Bilancio Partecipativo: fase proposte, co-progettazione assistita, voto. È previsto supporto per associazioni e cittadini."
            />
            <Faq
              q="Quali sono i tempi?"
              a="Prime azioni entro 100 giorni (TPL notturno pilota, sportelli diritti), interventi strutturali su base trimestrale secondo la roadmap."
            />
            <Faq
              q="Come misurate l'impatto?"
              a="Indicatori pubblici per ogni misura (KPI ambientali, sociali ed economici), audit indipendente e report trimestrali."
            />
          </div>
        </div>
      </section>

      {/* DOWNLOAD & CTA */}
      <section id="download" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-2xl border p-8 bg-white shadow-sm">
            <h3 className="text-2xl font-bold">Manifesto completo</h3>
            <p className="mt-2 text-slate-600">
              Scarica il PDF con il programma dettagliato, dati e coperture.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Scarica il Manifesto (PDF)
            </a>
          </div>
          <div className="rounded-2xl border p-8 bg-white shadow-sm">
            <h3 className="text-2xl font-bold">Partecipa alla scrittura</h3>
            <p className="mt-2 text-slate-600">
              Commenta, proponi emendamenti, aiuta a priorizzare. Il programma è vivo.
            </p>
            <a
              href="/partecipa"
              className="mt-6 inline-flex rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Partecipa
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-3xl font-bold">Pronto a dare una mano?</h3>
          <p className="mt-3 text-slate-600">
            Entra in Città Futura: volontariato, tesseramento, donazioni. Ogni contributo conta.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="/partecipa"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Unisciti a noi
            </a>
            <a
              href="/trasparenza"
              className="inline-flex items-center justify-center rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Vedi Trasparenza
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ------- piccoli componenti riutilizzabili ------- */

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
