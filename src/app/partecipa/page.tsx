// src/app/partecipa/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PartecipaPage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Image src="/images/hero.jpg" alt="" fill className="object-cover -z-10" />
        {/* overlay scuro per testo leggibile */}
        <div className="absolute inset-0 bg-black/50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            La Repubblica degli Italiani nel Mondo • Partecipa
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Iscriviti e sostieni il progetto
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Tesseramento e donazioni in un’unica pagina. Processi semplici,
            chiari, veloci.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#iscrizione"
              className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-5 py-3 font-semibold hover:opacity-90"
            >
              📝 Vai a Iscrizione
            </a>
            <a
              href="#donazioni"
              className="inline-flex items-center justify-center rounded-xl ring-2 ring-white/80 text-white px-5 py-3 font-semibold hover:bg-white/10"
            >
              💳 Vai a Donazioni
            </a>
          </div>
        </div>
      </section>

      {/* ISCRIZIONE */}
      <section id="iscrizione" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">Iscrizione</h2>
        <p className="mt-2 text-slate-600">
          Compila il modulo: ti ricontattiamo entro 48 ore con i prossimi passi.
        </p>

        <div className="mt-8 grid lg:grid-cols-5 gap-8">
          <IscrizioneForm />

          <div className="lg:col-span-2 rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Cosa include</h3>
            <ul className="mt-3 space-y-2 text-slate-700 text-sm">
              <li>• Diritto di voto in assemblea</li>
              <li>• Accesso ai gruppi e agli incontri</li>
              <li>• Newsletter con iniziative e inviti</li>
              <li>• Copertura assicurativa durante attività riconosciute</li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold">Quota annuale</h3>
            <p className="text-slate-700 text-sm">
              Suggerita: <b>€10</b> (ridotta studenti/disoccupati: €5)
            </p>
            <a
              href="#donazioni"
              className="mt-4 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Vai alle Donazioni
            </a>
          </div>
        </div>
      </section>

      {/* DONAZIONI */}
      <section id="donazioni" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">Donazioni</h2>
        <p className="mt-2 text-slate-600">
          Le donazioni finanziano attività sul territorio, comunicazione e
          formazione. Rendicontiamo tutto in{" "}
          <Link className="underline" href="/trasparenza">
            Trasparenza
          </Link>
          .
        </p>

        <DonazioniBlock />
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Domande frequenti</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <Faq
              q="Quanto costa la tessera?"
              a="La quota è simbolica (es. €10/anno) e serve a sostenere attività e assicurazione."
            />
            <Faq
              q="Ricevo una conferma?"
              a="Sì, riceverai una mail di benvenuto con i prossimi passi e i contatti del tuo gruppo locale."
            />
            <Faq
              q="Le donazioni sono tracciate?"
              a="Sì: pubblichiamo rendiconti periodici in Trasparenza e rilasciamo ricevuta su richiesta."
            />
            <Faq
              q="Come trattate i miei dati?"
              a="Solo per finalità associative (iscrizione, comunicazioni). Vedi l’informativa privacy in Trasparenza."
            />
          </div>
        </div>
      </section>

      {/* CTA FINALE — stile uniforme alle altre pagine */}
      <section className="py-16 bg-slate-50 border-y">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Hai domande su iscrizione o donazioni?</h2>
          <p className="mt-2 text-slate-600">
            Scrivici: ti rispondiamo entro 48 ore. Il nostro team è a disposizione.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <Link
              href="/contatti"
              className="inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =================== COMPONENTI =================== */

function IscrizioneForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    if (!data.nome || !data.cognome || !data.email || !data.comune || !data.consent) {
      alert("Compila i campi obbligatori e accetta la privacy.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setOk(true);
    form.reset();
  }

  return (
    <div className="lg:col-span-3">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Modulo di adesione</h3>

        <form onSubmit={onSubmit} className="mt-6 grid md:grid-cols-2 gap-4">
          <Input name="nome" label="Nome *" />
          <Input name="cognome" label="Cognome *" />
          <Input name="email" type="email" label="Email *" />
          <Input name="telefono" type="tel" label="Telefono (opzionale)" />
          <Input name="comune" label="Comune di residenza *" />
          <Select name="fascia" label="Fascia di età">
            <option>18–25</option>
            <option>26–35</option>
            <option>36–50</option>
            <option>51+</option>
          </Select>

        <label className="md:col-span-2 text-sm text-slate-600">
            <input type="checkbox" name="consent" className="mr-2" /> Ho letto e
            accetto l’informativa privacy *
          </label>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Invio in corso..." : "Invia adesione"}
            </button>
            {ok && (
              <span className="text-sm text-emerald-600">
                Grazie! Ti abbiamo registrato, ti scriveremo a breve.
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

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
    <div className="mt-8 grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="grid sm:grid-cols-2 gap-6">
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
              Per ricevuta fiscale scrivi a{" "}
              <a className="underline" href="mailto:tesoreria@cittafutura.it">
                tesoreria@cittafutura.it
              </a>{" "}
              indicando data e importo del bonifico.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Trasparenza</h3>
        <p className="mt-2 text-slate-600 text-sm">
          Pubblicheremo periodicamente entrate, spese e contratti in formato aperto.
        </p>
        <Link
          href="/trasparenza"
          className="mt-4 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          Vai alla sezione Trasparenza
        </Link>
      </div>
    </div>
  );
}

/* =================== UI BASICS =================== */

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
      <input name={name} type={type} className="w-full rounded-xl border px-4 py-2.5" />
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
