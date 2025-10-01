// src/app/chi-siamo/page.tsx
import Image from "next/image";
import Link from "next/link";

/* ========================= METADATA ========================= */
export const metadata = {
  title: "Chi siamo — La Repubblica degli Italiani nel Mondo",
  description:
    "Missione, risultati, valori, assi strategici, tappe, volti dell’associazione e risposte rapide.",
};

/* ========================= COMPONENTI PRESI DALLA HOME ========================= */
// Missione: video responsive YouTube
function ResponsiveYouTube({ id }: { id: string }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ paddingTop: "56.25%" }}
    >
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

// Dove siamo arrivati: blocco con mappe
function WorldReachSection() {
  const commonHeight =
    "h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem]";

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="mb-6">
        <h2 className="text-3xl font-bold">Dove siamo arrivati</h2>
        <h3 className="mt-3 text-xl font-semibold">Una rete in espansione</h3>
        <p className="mt-2 text-slate-700 leading-relaxed max-w-3xl">
          Collegare persone e comunità è la nostra priorità: eventi, mentorship,
          gruppi tematici e opportunità di collaborazione tra Italia e diaspora.
          Se vuoi avviare un nucleo nel tuo Paese,
          <Link
            href="/contatti"
            className="underline decoration-2 underline-offset-2 ml-1"
          >
            contattaci
          </Link>
          .
        </p>
        <ul className="mt-3 space-y-2 text-slate-700">
          <li>• Incontri culturali e imprenditoriali</li>
          <li>• Progetti con associazioni italiane all’estero</li>
          <li>• Reti professionali e supporto alla mobilità</li>
        </ul>
      </header>

      <div className="grid grid-cols-12 gap-6 items-stretch">
        <div className={`relative col-span-12 lg:col-span-7 ${commonHeight}`}>
          <Image
            src="/images/maps/world.jpg"
            alt="Mappa del mondo — presenza internazionale"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority
          />
        </div>

        <div className={`relative col-span-12 lg:col-span-5 ${commonHeight}`}>
          <Image
            src="/images/maps/italy.jpg"
            alt="Mappa dell’Italia — reti e iniziative sul territorio"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 42vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}

// Valori: 4 card “Partecipazione attiva, Cultura imprenditoriale, …”
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

// FAQ item
function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-2xl border bg-white p-5 sm:p-6 shadow-sm open:shadow-md transition-shadow">
      <summary className="cursor-pointer list-none font-semibold">{q}</summary>
      <p className="mt-3 text-slate-700 leading-relaxed">{a}</p>
    </details>
  );
}

/* ========================= VOLTI DELL’ASSOCIAZIONE ========================= */
type Member = {
  id: string; // key stabile e univoca
  name: string;
  role: string;
  img: string;
  bio: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  linkedin?: string;
};

const TEAM: Member[] = [
  {
    id: "pres",
    name: "Nome Cognome",
    role: "Presidente",
    img: "/images/about/Presidente.jpg",
    bio: "Guida la strategia e le relazioni istituzionali dell’associazione.",
    email: "presidente@cittafutura.it",
    phone: "+39 06 0000 0000",
    whatsapp: "+39 333 0000000",
    facebook: "https://facebook.com/username",
    linkedin: "https://www.linkedin.com/in/username/",
  },
  {
    id: "vice",
    name: "Nome Cognome",
    role: "Vice-Presidente",
    img: "/images/about/Vice-Presidente.jpg",
    bio: "Coordina progetti, gruppi territoriali e programmi per i giovani.",
    email: "vicepresidenza@cittafutura.it",
    phone: "+39 06 0000 0001",
    whatsapp: "+39 333 0000001",
    facebook: "https://facebook.com/username",
    linkedin: "https://www.linkedin.com/in/username/",
  },
  {
    id: "segr",
    name: "Nome Cognome",
    role: "Segretario Generale",
    img: "/images/about/Segretario Generale.jpg",
    bio: "Gestisce adesioni, calendario e comunicazioni interne ai soci.",
    email: "segreteria@cittafutura.it",
    phone: "+39 06 0000 0002",
    whatsapp: "+39 333 0000002",
    facebook: "https://facebook.com/username",
    linkedin: "https://www.linkedin.com/in/username/",
  },
  {
    id: "rev",
    name: "Nome Cognome",
    role: "Revisore dei Conti",
    img: "/images/about/Revisore dei Conti.jpg",
    bio: "Supervisiona bilanci, donazioni e rendicontazione trasparente.",
    email: "revisore@cittafutura.it",
    phone: "+39 06 0000 0003",
    whatsapp: "+39 333 0000003",
    facebook: "https://facebook.com/username",
    linkedin: "https://www.linkedin.com/in/username/",
  },
];

const telHref = (pretty?: string) =>
  pretty ? "tel:" + pretty.replace(/[^\d+]/g, "") : undefined;

const waHref = (pretty?: string) =>
  pretty
    ? `https://wa.me/${pretty.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
        "Ciao! Ti scrivo dal sito dell'associazione."
      )}`
    : undefined;

const IconMail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm8 8 9-6V7l-9 6L3 7v.9l9 6z"
    />
  </svg>
);
const IconPhone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M6.6 2.7c.3-.7 1-1.1 1.8-.9l2.4.6c.8.2 1.3 1 1.2 1.8l-.4 2.5c-.1.6-.5 1.1-1 1.3l-1.3.6c1.2 2.3 3.1 4.2 5.4 5.4l.6-1.3c.2-.5.7-.9 1.3-1l2.5-.4c.8-.1 1.6.4 1.8 1.2l.6 2.4c.2.8-.2 1.6-.9 1.9-1.1.5-2.4.8-3.8.8C10.9 18.7 5.3 13.1 5.3 6.9c0-1.3.3-2.6.8-3.7z"
    />
  </svg>
);
const IconWhatsApp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M20 3.9A10 10 0 0 0 3.9 20L3 23l3-1a10 10 0 0 0 14-8.6 10 10 0 0 0 0-9.4zM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-2.4.8.8-2.4-.2-.3A8 8 0 1 1 12 20zm4.4-5.6c-.2-.1-1.3-.7-1.4-.8-.2-.1-.3-.2-.5 0s-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.6l.4-.5c.1-.2.2-.3 0-.5l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.2-.8.5-.3.3-1 1-1 2.4 0 1.4 1 2.7 1.1 2.9a7.7 7.7 0 0 0 3 2.8c.4.2 1.2.4 1.6.5.7.2 1.3.2 1.8.1.6-.1 1.3-.6 1.5-1.2.2-.6.2-1 .1-1.1 0-.1-.2-.1-.3-.1z"
    />
  </svg>
);
const IconFacebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M13 22v-8h3l1-4h-4V8c0-1.2.4-2 2-2h2V2h-3c-3 0-5 2-5 5v3H6v4h3v8h4z"
    />
  </svg>
);
const IconLinkedIn = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM14.5 9c-2.2 0-3.5 1.2-3.5 2.8V21h-4V9h4v1.7C11.6 9.8 13 9 14.9 9 18 9 19 10.8 19 14v7h-4v-6c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.8 1.3V21h-4V9h4v1.4C11.9 9.6 13 9 14.5 9z"
    />
  </svg>
);

function IconButton({
  href,
  label,
  bgClass,
  children,
  external = false,
}: {
  href?: string;
  label: string;
  bgClass: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      title={label}
      aria-label={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${bgClass} text-white shadow-sm ring-1 ring-black/5 hover:scale-105 transition`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <span className="sr-only">{label}</span>
    </a>
  );
}

/* ====== CARD VERTICALE (rettangolare alta): foto sopra, contenuti sotto ====== */
function PersonCard({ m }: { m: Member }) {
  return (
    <article className="flex flex-col h-full rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Foto in alto */}
      <div className="relative w-full h-64 sm:h-72">
        <Image
          src={m.img}
          alt={`${m.name} — ${m.role}`}
          fill
          sizes="(max-width: 1024px) 100vw, 25vw"
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Testo sotto la foto */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-lg font-bold">{m.name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {m.role}
          </p>
        </div>

        <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
          {m.bio}
        </p>

        {/* Azioni in fondo alla card */}
        <div className="mt-auto pt-2 flex flex-wrap gap-2">
          <IconButton
            href={m.email ? `mailto:${m.email}` : undefined}
            label={`Scrivi a ${m.name}`}
            bgClass="bg-rose-600"
          >
            <IconMail className="h-5 w-5" />
          </IconButton>

          <IconButton
            href={telHref(m.phone)}
            label={`Chiama ${m.name}`}
            bgClass="bg-emerald-600"
          >
            <IconPhone className="h-5 w-5" />
          </IconButton>

          <IconButton
            href={waHref(m.whatsapp)}
            label={`WhatsApp ${m.name}`}
            bgClass="bg-green-600"
            external
          >
            <IconWhatsApp className="h-5 w-5" />
          </IconButton>

          <IconButton
            href={m.facebook}
            label={`Facebook di ${m.name}`}
            bgClass="bg-blue-600"
            external
          >
            <IconFacebook className="h-5 w-5" />
          </IconButton>

          <IconButton
            href={m.linkedin}
            label={`LinkedIn di ${m.name}`}
            bgClass="bg-sky-600"
            external
          >
            <IconLinkedIn className="h-5 w-5" />
          </IconButton>
        </div>
      </div>
    </article>
  );
}

/* ========================= PAGINA ========================= */
export default function ChiSiamoPage() {
  return (
    <main className="min-h-screen">
      {/* HERO — identica all’attuale Chi siamo */}
      <section className="relative overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55 -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-white/15 px-3 py-1 rounded-full">
            La Repubblica degli Italiani nel Mondo • Chi siamo
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Chi siamo
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Missione, risultati, valori e volti della nostra comunità globale.
          </p>
        </div>
      </section>

      {/* LA NOSTRA MISSIONE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold">La nostra missione</h2>
            <div className="mt-3 space-y-4 text-slate-600 leading-relaxed">
              <p>
                La Repubblica degli Italiani nel Mondo nasce per unire tutti
                coloro che, fino ad oggi spettatori di una crescente crisi
                internazionale, comprendono sia giunto il momento di
                partecipare alla sfida del cambiamento.
              </p>
              <p>
                L’obiettivo è riunire le teste pensanti del nostro Paese – in
                Italia e all’estero – per costruire un percorso capace di
                coniugare presente e futuro e restituire fiducia alle nuove
                generazioni.
              </p>
              <p>
                Vogliamo essere uno strumento aggregativo e partecipativo: un
                luogo di sintesi delle idee e delle iniziative che ognuno di voi
                vorrà proporre.
              </p>
            </div>
          </div>
          <div>
            <ResponsiveYouTube id="7qmZoXRg_QY" />
          </div>
        </div>
      </section>

      {/* DOVE SIAMO ARRIVATI */}
      <WorldReachSection />

      {/* VALORI (Partecipazione attiva, Cultura imprenditoriale, …) */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="sr-only">I nostri valori</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ValueGhost
            title="Partecipazione Attiva"
            text="Iscriversi è il primo passo: partecipa alle assemblee, proponi iniziative e contribuisci alla crescita della comunità."
            colorClass="from-emerald-600 to-emerald-400"
          />
          <ValueGhost
            title="Valorizzazione Cultura Italiana"
            text="Promuoviamo e tramandiamo il patrimonio culturale italiano, in Italia e all’estero."
            colorClass="from-amber-600 to-amber-400"
          />
          <ValueGhost
            title="Cultura Imprenditoriale"
            text="Sosteniamo lo sviluppo dell’imprenditoria e la diffusione di nuove idee, soprattutto tra i giovani."
            colorClass="from-sky-600 to-sky-400"
          />
          <ValueGhost
            title="Giovani e Innovazione"
            text="Valorizziamo i giovani come motore dell’innovazione: ricerca, creatività e tecnologie al servizio del Paese."
            colorClass="from-sky-600 to-sky-400"
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
              desc: "Iniziative per accrescere e rafforzare i legami tra l’Italia e le comunità italiane nel mondo.",
            },
            {
              icon: "🎭",
              title:
                "Attività culturali, artistiche, ricreative ed editoriali",
              points: [
                "Rassegne culturali e artistiche aperte a tutti",
                "Laboratori e attività a impatto sociale",
                "Progetti editoriali e divulgativi",
              ],
              desc: "Organizzazione di attività di interesse sociale, incluse iniziative editoriali.",
            },
            {
              icon: "⚖️",
              title: "Diritti, pari opportunità & aiuto reciproco",
              points: [
                "Sportelli informativi e campagne",
                "Programmi per l’inclusione",
                "Reti di solidarietà e mutuo aiuto",
              ],
              desc: "Promozione e tutela dei diritti umani, civili e sociali; sostegno alle pari opportunità.",
            },
            {
              icon: "💡",
              title: "Cultura d’impresa aperta all’innovazione",
              points: [
                "Percorsi formativi",
                "Responsabilità sociale d’impresa",
                "Tavoli su innovazione e comunicazione",
              ],
              desc: "Diffondere una cultura d’impresa basata su conoscenza e responsabilità.",
            },
          ].map((p) => (
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

      {/* IL NOSTRO CAMMINO — nuova versione responsive, stessa altezza su md+ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold">Il nostro cammino</h2>
          <p className="mt-2 text-slate-600 max-w-3xl">
            Le tappe principali del progetto, tra crescita organizzativa,
            collaborazioni e attivazione dei soci.
          </p>
        </header>

        {/* Griglia: su md+ due colonne con riquadri della stessa altezza */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Immagine (riquadro sx) */}
          <div className="rounded-2xl overflow-hidden border bg-white md:h-[520px]">
            <div className="relative w-full h-[240px] md:h-full">
              <Image
                src="/images/program/roadmap.png"
                alt="Roadmap dell’associazione"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 48vw"
                priority
              />
            </div>
          </div>

          {/* Elenco puntato (riquadro dx) */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm md:h-[520px] flex">
            <ul className="space-y-5 text-slate-800 overflow-y-auto pr-1 w-full">
              {[
                { date: "30 ottobre 2024", text: "Nasce la Repubblica degli Italiani nel Mondo." },
                { date: "6 novembre 2024", text: "Inaugurata la prima sede dell’associazione." },
                { date: "5 febbraio 2025", text: "Incontro con CEPI — Confederazione Europea delle Piccole Imprese." },
                { date: "28 marzo 2025", text: "Incontro con la Fondazione Università degli Studi della dieta mediterranea e della longevità." },
                { date: "12 maggio 2025", text: "Trasferimento nel nuovo ufficio di via Cicerone 49." },
                { date: "23 settembre 2025", text: "Via libera al primo tesseramento associativo." },
              ].map((it) => (
                <li key={it.date} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-emerald-700">
                      {it.date}
                    </div>
                    <div className="font-medium">{it.text}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Spazio extra solo su mobile */}
        <div className="mt-6 md:hidden" />
      </section>

      {/* VOLTI DELL’ASSOCIAZIONE — 4 card sulla stessa riga (desktop) */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-6">
          <h2 className="text-3xl font-bold">I volti dell’associazione</h2>
          <p className="mt-2 text-slate-600">
            Contatta direttamente i referenti: email, telefono o WhatsApp.
          </p>
        </header>

        {/* Su mobile 1 colonna, tablet 2, desktop 4 (tutte sulla stessa riga) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((m) => (
            <PersonCard key={m.id} m={m} />
          ))}
        </div>
      </section>

      {/* DOMANDE FREQUENTI */}
      <section className="py-16 bg-slate-50 border-y">
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
              q="Chi partecipa all'associazione?"
              a="Imprenditori, professionisti, studenti e giovani interessati a crescere insieme."
            />
            <FaqItem
              q="Collaborate con le comunità italiane all’estero?"
              a="Sì: progetti di scambio, eventi con i circoli locali e reti della diaspora."
            />
          </div>
        </div>
      </section>

      {/* CTA FINALE — come nell’attuale Chi siamo */}
      <section className="py-16 bg-slate-50 border-y">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Vuoi entrare nella rete?</h2>
          <p className="mt-2 text-slate-600">
            Collabora con i nostri referenti territoriali o proponi un progetto.
            Siamo sempre felici di conoscere nuove energie.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/partecipa"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Partecipa
            </Link>
            <Link
              href="/contatti"
              className="rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Scrivici
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
