// src/app/partecipa/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/** ============================== CONFIG ============================== */
// Inserisci qui il tuo endpoint Formcarry (solo l'ID finale o l'intera URL)
const FORMCARRY_URL = "https://formcarry.com/s/IL_TUO_ENDPOINT";

/* ============================== PAGE ============================== */

export default function PartecipaPage() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Image src="/images/hero.jpg" alt="" fill className="object-cover -z-10" />
        <div className="absolute inset-0 bg-black/55 -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-18 md:py-20 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-white/15 px-3 py-1 rounded-full">
            La Repubblica degli Italiani nel Mondo • Partecipa
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Partecipa, iscriviti, sostieni
          </h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Benefici, modulo di adesione e donazioni.
          </p>
          {/* Bottoni rimossi come richiesto */}
        </div>
      </section>

      {/* DUE RIQUADRI AFFIANCATI (altezza uguale) */}
      <section className="py-4 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* SINISTRA — ISCRIZIONE */}
          <Card id="iscrizione" title="Iscrizione — Modulo di adesione" className="h-full flex flex-col">
            <div className="flex-1">
              <IscrizioneForm />
              <p className="mt-3 text-xs text-slate-500">
                Gli invii arrivano direttamente alla nostra email tramite Formcarry. Per assistenza:{" "}
                <a className="underline" href="mailto:info@cittafutura.it">
                  info@cittafutura.it
                </a>.
              </p>
            </div>

            {/* BLOCCO PRIVACY */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold">Privacy</h4>
              <p className="text-sm text-slate-700">
                Trattiamo i dati esclusivamente per finalità associative (iscrizione e comunicazioni).
              </p>
              <a
                href="/docs/privacy.pdf"
                className="mt-3 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Leggi l’informativa privacy
              </a>
            </div>
          </Card>

          {/* DESTRA — PAGAMENTO */}
          <Card id="pagamento" title="Pagamento — Donazione / Quota annuale" className="h-full flex flex-col">
            <div className="flex-1">
              <h4 className="font-semibold">Dona online (coming soon)</h4>
              <p className="text-sm text-slate-600">Il pulsante sarà collegato a Stripe Checkout nella fase 2.</p>
              <button
                disabled
                className="mt-3 inline-flex rounded-xl bg-slate-300 px-5 py-3 text-sm font-semibold text-white cursor-not-allowed"
                title="In arrivo"
              >
                Dona ora — In arrivo
              </button>
              <p className="mt-2 text-xs text-slate-500">
                Al go-live abiliteremo carta e Apple/Google Pay. Importo libero con minimo suggerito.
              </p>

              <div className="my-6 h-px bg-slate-200" />

              <h4 className="font-semibold">Bonifico bancario</h4>
              <CopyRow label="IBAN" value="IT00 X000 0000 0000 0000 0000 000" />
              <CopyRow label="Causale" value={'Donazione liberale — "Città Futura"'} className="mt-4" />
              <p className="mt-3 text-xs text-slate-500">
                Per ricevuta fiscale scrivi a{" "}
                <a className="underline" href="mailto:tesoreria@cittafutura.it">
                  tesoreria@cittafutura.it
                </a>{" "}
                indicando data e importo.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold">Trasparenza</h4>
              <p className="text-sm text-slate-700">Rendicontiamo periodicamente entrate e spese in formato aperto.</p>
              <Link
                href="/trasparenza"
                className="mt-3 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Vai alla sezione Trasparenza
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA finale */}
      <section className="py-16 bg-slate-50 border-y">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Serve una mano?</h2>
          <p className="mt-2 text-slate-600">Scrivici: rispondiamo entro 48 ore.</p>
          <div className="mt-6">
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

/* ============================== COMPONENTI ============================== */

function Card({
  title,
  children,
  className = "",
  id,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`rounded-2xl bg-white p-6 shadow-sm border ${className}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** Modulo iscrizione — invio diretto via Formcarry (no backend) */
function IscrizioneForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setOk(false);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Validazione minima
    if (!data.nome || !data.cognome || !data.email || !data.comune || !data.consent) {
      alert("Compila i campi obbligatori e accetta la privacy.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(FORMCARRY_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form), // non impostare Content-Type: lo fa il browser
      });

      if (res.ok) {
        setOk(true);
        form.reset();
      } else {
        const j = await res.json().catch(() => null);
        setErr(j?.message || "Invio non riuscito. Riprova più tardi.");
      }
    } catch {
      setErr("Connessione non riuscita. Controlla la rete e riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4" noValidate>
      <Input name="nome" label="Nome *" required />
      <Input name="cognome" label="Cognome *" required />
      <Input name="email" type="email" label="Email *" required />
      <Input name="telefono" type="tel" label="Telefono (opzionale)" />
      <Input name="comune" label="Comune di residenza *" required />
      <Select name="fascia" label="Fascia di età">
        <option value="">Seleziona…</option>
        <option>18–25</option>
        <option>26–35</option>
        <option>36–50</option>
        <option>51+</option>
      </Select>

      {/* Honeypot antispam (nascosto via CSS) */}
      <label className="hidden">
        Non compilare questo campo: <input name="_gotcha" tabIndex={-1} autoComplete="off" />
      </label>

      {/* Opzionale: soggetto personalizzato (se supportato) */}
      <input type="hidden" name="_subject" value="Nuova iscrizione dal sito" />
      {/* Opzionale: pagina di redirect dopo invio (se preferisci) */}
      {/* <input type="hidden" name="_redirect" value="https://tuodominio.it/grazie" /> */}

      <label className="md:col-span-2 text-sm text-slate-600">
        <input type="checkbox" name="consent" className="mr-2" /> Ho letto e accetto l’informativa privacy *
      </label>

      <div className="md:col-span-2 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          aria-busy={loading}
        >
          {loading ? "Invio in corso..." : "Invia adesione"}
        </button>

        <a
          href="mailto:info@cittafutura.it?subject=Richiesta%20iscrizione&body=Ciao%2C%20vorrei%20iscrivermi.%0ANome%3A%20%0ACognome%3A%20%0AEmail%3A%20%0AComune%3A%20%0AGrazie!"
          className="rounded-xl border px-4 py-3 text-sm font-semibold hover:bg-slate-50"
        >
          Oppure scrivici via email
        </a>

        <span className="sr-only" aria-live="polite">
          {ok ? "Invio riuscito" : err ? "Errore di invio" : ""}
        </span>
        {ok && <span className="text-sm text-emerald-600">Ricevuto! Ti contatteremo a breve.</span>}
        {err && <span className="text-sm text-rose-600">{err}</span>}
      </div>
    </form>
  );
}

/** Donazioni: riga con copia rapida */
function CopyRow({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-slate-600 text-sm">{label}</span>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(value).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1100);
            });
          }}
          className="rounded-lg border px-2 py-1 text-xs hover:bg-slate-50"
        >
          {copied ? "Copiato ✓" : "Copia"}
        </button>
      </div>
      <div className="font-mono text-sm mt-1 select-all">{value}</div>
    </div>
  );
}

/** UI basics */
function Input({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="text-sm">
      <span className="block text-slate-700 mb-1">
        {label} {required ? <span className="text-rose-600" aria-hidden>*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border px-4 py-2.5"
        aria-required={required}
      />
    </label>
  );
}

function Select({ name, label, children }: { name: string; label: string; children: React.ReactNode }) {
  return (
    <label className="text-sm">
      <span className="block text-slate-700 mb-1">{label}</span>
      <select name={name} className="w-full rounded-xl border px-4 py-2.5">
        {children}
      </select>
    </label>
  );
}
