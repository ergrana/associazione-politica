// src/components/AboutScreen.tsx

export const metadata = {
  title: "Chi siamo — Città Futura",
  description:
    "Città Futura: partecipazione, trasparenza, futuro. La nostra storia, i valori e le persone dell’associazione politica.",
};

// --- Subcomponents ---
function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-extrabold">{kpi}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}

function ValueCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-slate-600 leading-relaxed">{text}</p>
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
      <div className="text-sm font-semibold text-indigo-600">{year}</div>
      <div className="mt-1 font-semibold">{title}</div>
      <p className="mt-1 text-slate-600">{text}</p>
    </div>
  );
}

function Person({
  name,
  role,
  img,
  bio,
}: {
  name: string;
  role: string;
  img: string;
  bio: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <img
        src={img}
        alt={name}
        className="h-32 w-32 rounded-2xl object-cover"
      />
      <div className="mt-4">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-slate-600">{role}</div>
      </div>
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{bio}</p>
    </div>
  );
}

// --- YouTube embed responsive ---
function ResponsiveYouTube({ id }: { id: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingTop: "56.25%" }}>
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

// --- Screen ---
export default function AboutScreen() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-indigo-500 to-amber-500 opacity-90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            Città Futura • Partecipazione, trasparenza, futuro.
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Chi siamo: persone, valori e risultati. <br className="hidden sm:block" />
            Per una democrazia che funziona.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            <strong>Città Futura</strong> è un’associazione politica indipendente che promuove diritti,
            legalità e amministrazione efficiente. Diamo voce ai cittadini e trasformiamo
            idee in politiche pubbliche concrete.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/partecipa"
              className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-5 py-3 font-semibold hover:opacity-90"
            >
              Iscriviti ora
            </a>
            <a
              href="/partecipa"
              className="inline-flex items-center justify-center rounded-xl ring-2 ring-white/80 text-white px-5 py-3 font-semibold hover:bg-white/10"
            >
              Sostienici con una donazione
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <Stat kpi="1.200+" label="aderenti" />
            <Stat kpi="85" label="volontari attivi" />
            <Stat kpi="27" label="progetti sul territorio" />
            <Stat kpi="€120k" label="fondi rendicontati 2024" />
          </div>
        </div>
      </section>

      {/* MISSIONE + VIDEO YOUTUBE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold">La nostra missione</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Costruiamo partecipazione reale e istituzioni trasparenti.
              Promuoviamo politiche pubbliche fondate su dati, ascolto e
              responsabilità, mettendo al centro lavoro, servizi e ambiente.
            </p>
            <ul className="mt-4 list-disc pl-5 text-slate-600 space-y-2">
              <li>Bilancio partecipativo e consultazioni pubbliche</li>
              <li>Sportelli diritti e supporto alle fragilità</li>
              <li>Mobilità sostenibile e spazi pubblici vivibili</li>
              <li>Trasparenza su fondi, spese e risultati</li>
            </ul>
          </div>
          <div>
            {/* Sostituisci l'ID con il tuo video quando ce l'hai */}
            <ResponsiveYouTube id="dQw4w9WgXcQ" />
          </div>
        </div>
      </section>

      {/* VALORI */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ValueCard
            title="Legalità e trasparenza"
            text="Bilanci pubblici, conflitti d’interesse dichiarati, rendicontazione periodica e accesso civico facilitato."
          />
          <ValueCard
            title="Partecipazione"
            text="Assemblee aperte, consultazioni online, bilancio partecipativo e co-progettazione con le realtà sociali."
          />
          <ValueCard
            title="Equità e diritti"
            text="Contrasto alle diseguaglianze, tutela dei diritti sociali, servizi inclusivi e accessibili."
          />
          <ValueCard
            title="Sostenibilità"
            text="Scelte responsabili per ambiente, mobilità, energia e spazi pubblici: città vivibili oggi e domani."
          />
        </div>
      </section>

      {/* PRESS */}
      <section className="py-10 bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-slate-500">Hanno parlato di noi</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 items-center opacity-80">
            {["CivicaNews", "Il Quotidiano", "Terra&Diritti", "Metropoli", "Publica", "Il Giorno"].map(
              (brand, i) => (
                <div key={i} className="text-center text-slate-400 text-sm">
                  <div className="mx-auto h-8 w-28 rounded bg-slate-200" />
                  <div className="mt-2">{brand}</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-10">
          <div>
            <h2 className="text-3xl font-bold">La nostra storia</h2>
            <p className="mt-3 text-slate-600">
              Dalla nascita all’impatto sul territorio: tappe e risultati che raccontano un percorso concreto.
            </p>
            <div className="mt-6 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1600&auto=format&fit=crop"
                alt="Incontro pubblico"
                className="w-full h-56 object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-2 relative">
            <div className="absolute left-1.5 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-8">
              <Step year="2019" title="Nasce Città Futura" text="Un gruppo di cittadini e professionisti si organizza per promuovere trasparenza e partecipazione." />
              <Step year="2021" title="Primi progetti finanziati" text="Avvio di sportelli civici e percorsi di educazione alla cittadinanza attiva." />
              <Step year="2023" title="Bilancio partecipativo" text="Pilota in 3 quartieri: oltre 2.500 cittadini coinvolti e 12 proposte finanziate." />
              <Step year="2024" title="Trasparenza totale" text="Rendicontazione pubblica in formato aperto: donazioni, spese e contratti." />
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Leadership e volti</h2>
              <p className="mt-2 text-slate-600">Persone competenti, radicate sul territorio, al servizio della comunità.</p>
            </div>
            <a href="/contatti" className="hidden sm:inline-flex rounded-xl border px-4 py-2 text-sm font-medium hover:bg-white">
              Contatta l’ufficio stampa
            </a>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Person name="Giulia Ferri" role="Presidente" img="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=600&auto=format&fit=crop" bio="Esperta di politiche pubbliche e innovazione civica. Coordina attività e relazioni istituzionali." />
            <Person name="Marco Leone" role="Portavoce" img="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" bio="Giornalista e attivista per i diritti. Cura comunicazione e campagne." />
            <Person name="Sara Neri" role="Tesoriere" img="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=600&auto=format&fit=crop" bio="Dottore commercialista. Supervisiona bilanci e rendicontazione pubblica." />
            <Person name="Luca Moretti" role="Coordinatore territoriale" img="https://images.unsplash.com/photo-1523958203904-cdcb402031fd?q=80&w=600&auto=format&fit=crop" bio="Organizza i gruppi locali e i progetti con associazioni e scuole." />
          </div>
        </div>
      </section>

      {/* MANIFESTO / STATUTO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-2xl border p-8 bg-white shadow-sm">
            <h3 className="text-2xl font-bold">Il nostro Manifesto</h3>
            <p className="mt-2 text-slate-600">
              Una visione chiara per città più giuste, verdi e inclusive. Principi e impegni che guidano ogni nostra scelta.
            </p>
            <a href="#" className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
              Scarica il Manifesto (PDF)
            </a>
          </div>
          <div className="rounded-2xl border p-8 bg-white shadow-sm">
            <h3 className="text-2xl font-bold">Statuto e governance</h3>
            <p className="mt-2 text-slate-600">
              Regole trasparenti, assemblea dei soci, organi eletti e controllo diffuso: come funzioniamo e come si partecipa.
            </p>
            <a href="#" className="mt-6 inline-flex rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50">
              Leggi lo Statuto (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Entra in <span className="whitespace-nowrap">Città Futura</span>. Costruiamo insieme.</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Tesseramento aperto: riceverai aggiornamenti, potrai votare nelle assemblee e partecipare ai gruppi di lavoro. Ti aspettiamo.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="/partecipa" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
              Partecipa ora
            </a>
            <a href="/contatti" className="inline-flex items-center justify-center rounded-xl border px-5 py-3 font-semibold hover:bg-white">
              Contattaci
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
