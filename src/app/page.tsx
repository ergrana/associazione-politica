// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

/* ========================= HERO: Bandiera che sventola ========================= */

function WavingFlagHero() {
  return (
    <section className="relative min-h-[78vh] flex flex-col items-center justify-center overflow-hidden pb-10">
      {/* Sfondo bandiera animata (SVG + filter displacement) */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          {/* Turbolenza + spostamento per l'effetto "sventola" */}
          <filter id="flagWave">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.02"
              numOctaves="2"
              seed="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="8s"
                values="0.008 0.02; 0.012 0.03; 0.008 0.02"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <linearGradient id="whiteShade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#f4f4f4" />
          </linearGradient>
        </defs>

        <g filter="url(#flagWave)">
          <rect x="0" y="0" width="400" height="600" fill="#009246" />
          <rect x="400" y="0" width="400" height="600" fill="url(#whiteShade)" />
          <rect x="800" y="0" width="400" height="600" fill="#ce2b37" />
        </g>

        {/* luce morbida in diagonale per profondità */}
        <linearGradient id="light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0.2" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="0.8" stopColor="rgba(0,0,0,0.08)" />
        </linearGradient>
        <rect x="0" y="0" width="1200" height="600" fill="url(#light)" />
      </svg>

      {/* Logo centrale */}
      <Image
        src="/images/logo-rotondo.png"
        alt="La Repubblica degli Italiani nel Mondo"
        width={720}
        height={720}
        priority
        className="w-[min(80vw,540px)] h-auto drop-shadow-2xl"
      />

      {/* Testo + CTA */}
      <div className="mt-6 text-center text-slate-900 px-4">
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

/* ========================= Sezioni riutilizzabili (stile come screenshot) ========================= */

function ValueGhost({
  title,
  text,
  colorClass,
}: {
  title: string;
  text: string;
  colorClass: string; // es: "from-emerald-600 to-emerald-400"
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

/* ========================= MISSIONE + VIDEO ========================= */

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

/* ========================= DOVE SIAMO ARRIVATI =========================
   Soluzione leggera: immagine del mondo + "punti luminosi" (glow) sui Paesi.
   Per una vera mappa con i poligoni delle nazioni colorabili, si può passare
   in futuro a un SVG topojson (più pesante da gestire). */

type ReachPoint = { label: string; x: number; y: number }; // percentuali (0–100)

const REACH_POINTS: ReachPoint[] = [
  { label: "Italia", x: 56, y: 43 },
  { label: "Francia", x: 51, y: 42 },
  { label: "Germania", x: 54, y: 38 },
  { label: "Regno Unito", x: 49, y: 36 },
  { label: "USA", x: 23, y: 42 },
  { label: "Canada", x: 20, y: 32 },
  { label: "Argentina", x: 27, y: 70 },
  { label: "Australia", x: 86, y: 78 },
];

function WorldReach() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="mb-6">
        <h2 className="text-3xl font-bold">Dove siamo arrivati</h2>
        <p className="mt-2 text-slate-600 max-w-3xl">
          La nostra rete cresce nel mondo. Le aree evidenziate indicano Paesi dove sono nati gruppi locali,
          partner o iniziative culturali e imprenditoriali.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 items-center">
        {/* Mappa */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200 bg-white">
          <div className="relative w-full" style={{ paddingTop: "50%" }}>
            <Image
              src="/images/world-map.jpg"
              alt="Mappa del mondo"
              fill
              className="object-cover"
              priority={false}
            />
            {/* Punti luminosi */}
            {REACH_POINTS.map((p) => (
              <div
                key={p.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                title={p.label}
              >
                <span className="relative block h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.25)]">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testo descrittivo */}
        <div>
          <h3 className="text-xl font-semibold">Una rete in espansione</h3>
          <p className="mt-2 text-slate-700 leading-relaxed">
            Collegare persone e comunità è la nostra priorità: eventi, mentorship, gruppi tematici e
            opportunità di collaborazione tra Italia e diaspora. Se vuoi avviare un nucleo nel tuo Paese,
            <Link href="/contatti" className="underline decoration-2 underline-offset-2 ml-1">
              contattaci
            </Link>
            .
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

/* ========================= PAGE ========================= */

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* HERO dinamica */}
      <WavingFlagHero />

      {/* MISSIONE + VIDEO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold">La nostra missione</h2>
            <div className="mt-3 space-y-4 text-slate-600 leading-relaxed">
              <p>
                La Repubblica degli Italiani nel Mondo nasce per unire tutti coloro che, fino ad oggi
                spettatori di una crescente crisi internazionale, comprendono sia giunto il momento di
                partecipare alla sfida del cambiamento.
              </p>
              <p>
                L’obiettivo è riunire le teste pensanti del nostro Paese – in Italia e all’estero – per
                costruire un percorso capace di coniugare presente e futuro e restituire fiducia alle nuove
                generazioni.
              </p>
              <p>
                Vogliamo essere uno strumento aggregativo e partecipativo: un luogo di sintesi delle idee e
                delle iniziative che ognuno di voi vorrà proporre.
              </p>
            </div>
          </div>

          <div>
            <ResponsiveYouTube id="7qmZoXRg_QY" />
          </div>
        </div>
      </section>

      {/* DOVE SIAMO ARRIVATI */}
      <WorldReach />

      {/* VALORI (4 card ghost, come screenshot) */}
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
            text="Promozione di diritti, pari opportunità e inclusione sociale."
            colorClass="from-amber-600 to-amber-400"
          />
          <ValueGhost
            title="Cultura Imprenditoriale"
            text="Conoscenza, responsabilità, comunicazione e apertura al cambiamento."
            colorClass="from-sky-600 to-sky-400"
          />
          <ValueGhost
            title="Giovani e Innovazione"
            text="Collaborazione e sperimentazione per nuove generazioni protagoniste."
            colorClass="from-indigo-600 to-indigo-400"
          />
        </div>
      </section>

      {/* ASSI STRATEGICI */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">Gli assi strategici</h2>
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            {
              icon: "🌍",
              title: "Legami Italia–Mondo & Cultura italiana",
              points: [
                "Progetti di scambio con comunità italiane all’estero",
                "Valorizzazione delle tradizioni e della storia",
                "Eventi di promozione della cultura italiana",
              ],
              desc:
                "Iniziative per accrescere e rafforzare i legami tra l’Italia e le comunità italiane nel mondo.",
            },
            {
              icon: "🎭",
              title: "Attività culturali, artistiche, ricreative ed editoriali",
              points: [
                "Rassegne culturali e artistiche aperte a tutti",
                "Laboratori e attività a impatto sociale",
                "Progetti editoriali e divulgativi",
              ],
              desc:
                "Organizzazione di attività di interesse sociale, incluse iniziative editoriali.",
            },
            {
              icon: "⚖️",
              title: "Diritti, pari opportunità & aiuto reciproco",
              points: [
                "Sportelli informativi e campagne",
                "Programmi per l’inclusione",
                "Reti di solidarietà e mutuo aiuto",
              ],
              desc:
                "Promozione e tutela dei diritti umani, civili e sociali; sostegno alle pari opportunità.",
            },
            {
              icon: "💡",
              title: "Cultura d’impresa aperta all’innovazione",
              points: [
                "Percorsi formativi",
                "Responsabilità sociale d’impresa",
                "Tavoli su innovazione e comunicazione",
              ],
              desc:
                "Diffondere una cultura d’impresa basata su conoscenza e responsabilità.",
            },
          ].map((p) => (
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-10">
          <div>
            <h2 className="text-3xl font-bold">Roadmap per il futuro</h2>
            <p className="mt-3 text-slate-600">
              Le prossime tappe per rafforzare i legami con la diaspora, promuovere cultura e diritti e diffondere una cultura d’impresa aperta all’innovazione.
            </p>
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
            <Link href="/manifesto" className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
              Apri il Manifesto
            </Link>
          </div>

          <div className="rounded-2xl border p-8 bg-white shadow-sm">
            <h3 className="text-2xl font-bold">Statuto e governance</h3>
            <p className="mt-2 text-slate-600">Consulta lo Statuto completo online.</p>
            <Link href="/statuto" className="mt-6 inline-flex rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50">
              Apri lo Statuto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
