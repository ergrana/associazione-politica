"use client";

import { useState } from "react";

export default function PartecipaPage() {
  const [tab, setTab] = useState<"Iscrizione" | "Volontariato" | "Donazioni">("Iscrizione");

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-indigo-500 to-amber-500 opacity-90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            Città Futura • Partecipa
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Iscriviti. Fai volontariato. Sostienici.
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Entra nella comunità di Città Futura: tesseramento, gruppi di lavoro,
            campagne e supporto economico. Ogni contributo conta.
          </p>

          {/* TAB SWITCH */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Tab active={tab === "Iscrizione"} onClick={() => setTab("Iscrizione")}>Iscrizione</Tab>
            <Tab active={tab === "Volontariato"} onClick={() => setTab("Volontariato")}>Volontariato</Tab>
            <Tab active={tab === "Donazioni"} onClick={() => setTab("Donazioni")}>Donazioni</Tab>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {tab === "Iscrizione" && <IscrizioneForm />}
        {tab === "Volontariato" && <VolontariatoForm />}
        {tab === "Donazioni" && <DonazioniBlock />}
      </section>

      {/* FAQ & PRIVACY */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Domande frequenti</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <Faq q="Quanto costa la tessera?" a="La quota è simbolica (es. €10/anno) e serve a sostenere attività e assicurazione volontari." />
            <Faq q="Ricevo una conferma?" a="Sì, riceverai una mail di benvenuto con i prossimi passi e i contatti del tuo gruppo locale." />
            <Faq q="Le donazioni sono tracciate?" a="Sì: pubblichiamo rendiconti periodici in Trasparenza e rilasciamo ricevuta su richiesta." />
            <Faq q="Come trattate i miei dati?" a="Solo per finalità associative (iscrizione, comunicazioni). Vedi l’informativa privacy nella sezione Trasparenza." />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ----------------------- COMPONENTI ----------------------- */

function Tab({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm font-semibold border ${
        active ? "bg-white text-slate-900" : "bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------- ISCRIZIONE ---------- */

function IscrizioneForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (!data.nome || !data.email || !data.comune || !data.consent) {
      alert("Compila i campi obbligatori e accetta la privacy.");
      return;
    }
    setLoading(true);
    // Qui collegheremo un backend / service (es. API route / email)
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setOk(true);
    form.reset();
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Iscriviti a Città Futura</h2>
        <p className="mt-2 text-slate-600">
          Compila il modulo di adesione. Ti ricontattiamo entro 48 ore con i prossimi passi.
        </p>

        <form onSubmit={onSubmit} className="mt-6 grid md:grid-cols-2 gap-4">
          <Input name="nome" label="Nome e cognome *" />
          <Input name="email" type="email" label="Email *" />
          <Input name="telefono" type="tel" label="Telefono" />
          <Input name="comune" label="Comune di residenza *" />
          <Select name="fascia" label="Fascia di età">
            <option>18–25</option>
            <option>26–35</option>
            <option>36–50</option>
            <option>51+</option>
          </Select>
          <Select name="come" label="Come vuoi partecipare">
            <option>Solo tesseramento</option>
            <option>Gruppi di lavoro</option>
            <option>Campagne e banchetti</option>
            <option>Supporto digitale</option>
          </Select>
          <Textarea name="note" label="Raccontaci perché vuoi partecipare" className="md:col-span-2" />

          <label className="md:col-span-2 text-sm text-slate-600">
            <input type="checkbox" name="consent" className="mr-2" /> Ho letto e accetto l'informativa privacy *
          </label>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Invio in corso..." : "Invia adesione"}
            </button>
            {ok && <span className="text-sm text-emerald-600">Grazie! Ti abbiamo registrato, ti scriveremo a breve.</span>}
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Cosa include</h3>
        <ul className="mt-3 space-y-2 text-slate-700 text-sm">
          <li>• Voto in assemblea e partecipazione ai gruppi</li>
          <li>• Newsletter con aggiornamenti e inviti</li>
          <li>• Assicurazione per attività di volontariato</li>
        </ul>
        <h3 className="mt-6 text-xl font-semibold">Quota annuale</h3>
        <p className="text-slate-700 text-sm">Suggerita: <b>€10</b> (ridotta studenti/disoccupati: €5)</p>
        <a href="#donazioni" className="mt-4 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50">
          Vai alle Donazioni
        </a>
      </div>
    </div>
  );
}

/* ---------- VOLONTARIATO ---------- */

function VolontariatoForm() {
  const [areas, setAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  const toggle = (v: string) =>
    setAreas((arr) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (!data.nome || !data.email || !data.comune || !data.consent) {
      alert("Compila i campi obbligatori e accetta la privacy.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setOk(true);
    form.reset();
    setAreas([]);
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Diventa volontario</h2>
        <p className="mt-2 text-slate-600">
          Scegli in che modo vuoi dare una mano. Ti inseriamo nel gruppo locale più vicino.
        </p>

        <form onSubmit={onSubmit} className="mt-6 grid md:grid-cols-2 gap-4">
          <Input name="nome" label="Nome e cognome *" />
          <Input name="email" type="email" label="Email *" />
          <Input name="telefono" type="tel" label="Telefono" />
          <Input name="comune" label="Comune *" />

          <fieldset className="md:col-span-2">
            <legend className="text-sm font-semibold">Aree di interesse</legend>
            <div className="mt-2 grid sm:grid-cols-2 gap-2 text-sm">
              {[
                "Banchetti & raccolta firme",
                "Eventi e logistica",
                "Comunicazione & social",
                "Grafica & video",
                "Dati & analisi",
                "Fundraising",
              ].map((v) => (
                <label key={v} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={areas.includes(v)}
                    onChange={() => toggle(v)}
                  />
                  {v}
                </label>
              ))}
            </div>
          </fieldset>

          <Textarea name="note" label="Competenze / disponibilità" className="md:col-span-2" />

          <label className="md:col-span-2 text-sm text-slate-600">
            <input type="checkbox" name="consent" className="mr-2" /> Ho letto e accetto l'informativa privacy *
          </label>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Invio in corso..." : "Invia disponibilità"}
            </button>
            {ok && <span className="text-sm text-emerald-600">Ricevuto! Ti contattiamo a breve.</span>}
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Come funzionano i gruppi</h3>
        <ul className="mt-3 space-y-2 text-slate-700 text-sm">
          <li>• Coordinamento per quartiere/tema</li>
          <li>• Formazione base e materiali</li>
          <li>• Copertura assicurativa durante le attività</li>
        </ul>
      </div>
    </div>
  );
}

/* ---------- DONAZIONI ---------- */

function DonazioniBlock() {
  const iban = "IT00 X000 0000 0000 0000 0000 000";
  const causale = 'Donazione liberale — "Città Futura"';
  const [copied, setCopied] = useState<"iban" | "causale" | null>(null);

  function copy(text: string, what: "iban" | "causale") {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(what);
      setTimeout(() => setCopied(null), 1200);
    });
  }

  return (
    <div id="donazioni" className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Sostieni Città Futura</h2>
        <p className="mt-2 text-slate-600">
          Le donazioni finanziano attività sul territorio, materiali informativi e formazione.
          Pubblicheremo la rendicontazione in <a href="/trasparenza" className="underline">Trasparenza</a>.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 gap-6">
          <div className="rounded-xl border p-5">
            <h3 className="font-semibold">Carta / PayPal</h3>
            <p className="mt-1 text-sm text-slate-600">Pagamento online sicuro.</p>
            <a
              href="#"
              className="mt-4 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Dona ora
            </a>
            <p className="mt-3 text-xs text-slate-500">
              (Collegheremo Stripe/PayPal: potrai scegliere importo e ricevere ricevuta).
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <h3 className="font-semibold">Bonifico bancario</h3>
            <div className="mt-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-600">IBAN</span>
                <button
                  onClick={() => copy(iban, "iban")}
                  className="rounded-lg border px-2 py-1 text-xs hover:bg-slate-50"
                >
                  {copied === "iban" ? "Copiato ✓" : "Copia"}
                </button>
              </div>
              <div className="font-mono text-sm mt-1 select-all">{iban}</div>

              <div className="flex items-center justify-between gap-3 mt-4">
                <span className="text-slate-600">Causale</span>
                <button
                  onClick={() => copy(causale, "causale")}
                  className="rounded-lg border px-2 py-1 text-xs hover:bg-slate-50"
                >
                  {copied === "causale" ? "Copiata ✓" : "Copia"}
                </button>
              </div>
              <div className="font-mono text-sm mt-1 select-all">{causale}</div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Per ricevuta fiscale scrivi a <a className="underline" href="mailto:tesoreria@cittafutura.it">tesoreria@cittafutura.it</a>
              {" "}indicando data e importo del bonifico.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Trasparenza</h3>
        <p className="mt-2 text-slate-600 text-sm">
          Pubblicheremo periodicamente entrate, spese e contratti in formato aperto.
        </p>
        <a href="/trasparenza" className="mt-4 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50">
          Vai alla sezione Trasparenza
        </a>
      </div>
    </div>
  );
}

/* ----------------------- UI BASICS ----------------------- */

function Input({
  name,
  label,
  type = "text",
}: {
  name: string;
  label: string;
  type?: string;
}) {
  return (
    <label className="text-sm">
      <span className="block text-slate-700 mb-1">{label}</span>
      <input
        name={name}
        type={type}
        className="w-full rounded-xl border px-4 py-2.5"
      />
    </label>
  );
}

function Textarea({
  name,
  label,
  className = "",
}: {
  name: string;
  label: string;
  className?: string;
}) {
  return (
    <label className={`text-sm ${className}`}>
      <span className="block text-slate-700 mb-1">{label}</span>
      <textarea
        name={name}
        rows={4}
        className="w-full rounded-xl border px-4 py-2.5"
      />
    </label>
  );
}

function Select({
  name,
  label,
  children,
}: {
  name: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="text-sm">
      <span className="block text-slate-700 mb-1">{label}</span>
      <select name={name} className="w-full rounded-xl border px-4 py-2.5">
        {children}
      </select>
    </label>
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
