"use client";

import { useState } from "react";

export default function ContattiPage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-indigo-500 to-amber-500 opacity-90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            Città Futura • Contatti
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Siamo qui per ascoltarti
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Stampa, volontariato, segnalazioni o partnership: usa il modulo oppure i recapiti diretti.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid lg:grid-cols-5 gap-8">
        {/* FORM */}
        <div className="lg:col-span-3 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Scrivici</h2>
          <p className="mt-2 text-slate-600">
            Ti rispondiamo entro 48 ore (giorni lavorativi).
          </p>
          <ContactForm />
          <p className="mt-4 text-xs text-slate-500">
            Inviando il modulo acconsenti al trattamento dei dati per gestire la richiesta. Maggiori info in{" "}
            <a href="/trasparenza" className="underline">Trasparenza</a>.
          </p>
        </div>

        {/* INFO RAPIDE */}
        <aside className="lg:col-span-2 space-y-6">
          <Card title="Ufficio stampa">
            <InfoRow label="Email">
              <a className="underline" href="mailto:press@cittafutura.it">press@cittafutura.it</a>
            </InfoRow>
            <InfoRow label="Telefono">+39 02 0000 0000</InfoRow>
            <InfoRow label="Note">Interviste, dichiarazioni, materiali media</InfoRow>
          </Card>

          <Card title="Sede & recapiti">
            <InfoRow label="Sede">
              Via dell’Esempio 1, 00000 Città (IT)
            </InfoRow>
            <InfoRow label="Email">
              <a className="underline" href="mailto:info@cittafutura.it">info@cittafutura.it</a>
            </InfoRow>
            <InfoRow label="PEC">
              <a className="underline" href="mailto:cittafutura@pec.it">cittafutura@pec.it</a>
            </InfoRow>
            <InfoRow label="Telefono">+39 02 0000 0001</InfoRow>
            <InfoRow label="Orari">
              Lun–Ven 9:30–13:00 / 14:30–18:00
            </InfoRow>
            <div className="mt-3">
              <Map small address="Via dell’Esempio 1, 00000 Città IT" />
            </div>
          </Card>

          <Card title="Social">
            <div className="flex flex-wrap gap-2">
              <a href="#" className="rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-slate-50">Instagram</a>
              <a href="#" className="rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-slate-50">Facebook</a>
              <a href="#" className="rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-slate-50">YouTube</a>
              <a href="#" className="rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-slate-50">Telegram</a>
            </div>
          </Card>
        </aside>
      </section>

      {/* CTA FINALE */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Preferisci parlarne di persona?</h2>
          <p className="mt-2 text-slate-600">
            Vieni alla prossima assemblea aperta o prenota un incontro presso la nostra sede.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="/eventi" className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
              Vedi Eventi
            </a>
            <a href="mailto:info@cittafutura.it" className="rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50">
              Scrivici ora
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ------------------- COMPONENTI ------------------- */

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [topic, setTopic] = useState("Informazioni generali");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (!data.nome || !data.email || !data.messaggio || !data.consent) {
      alert("Compila Nome, Email, Messaggio e accetta la privacy.");
      return;
    }
    setLoading(true);
    // TODO: collegare a /api/contact per invio mail o CRM
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setOk(true);
    form.reset();
    setTopic("Informazioni generali");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid md:grid-cols-2 gap-4">
      <Input name="nome" label="Nome e cognome *" />
      <Input name="email" type="email" label="Email *" />
      <Input name="telefono" type="tel" label="Telefono" />
      <Select name="tema" label="Tema" value={topic} onChange={setTopic}>
        <option>Informazioni generali</option>
        <option>Stampa / Media</option>
        <option>Volontariato</option>
        <option>Donazioni</option>
        <option>Segnalazioni dal territorio</option>
        <option>Altro</option>
      </Select>
      <Textarea name="messaggio" label="Messaggio *" className="md:col-span-2" rows={6} />
      <label className="md:col-span-2 text-sm text-slate-600">
        <input type="checkbox" name="consent" className="mr-2" /> Ho letto e accetto l’informativa privacy *
      </label>
      <div className="md:col-span-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Invio in corso..." : "Invia messaggio"}
        </button>
        {ok && <span className="text-sm text-emerald-600">Grazie! Messaggio inviato, ti risponderemo a breve.</span>}
      </div>
    </form>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="text-sm">
      <span className="text-slate-500">{label}:</span>{" "}
      <span className="text-slate-800">{children}</span>
    </div>
  );
}

function Map({ address, small }: { address: string; small?: boolean }) {
  const q = encodeURIComponent(address);
  return (
    <iframe
      title={`Mappa - ${address}`}
      className={`${small ? "h-40" : "h-64"} w-full rounded-xl border`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps?q=${q}&output=embed`}
    />
  );
}

/* --- UI Basics --- */
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

function Textarea({
  name,
  label,
  rows = 4,
  className = "",
}: {
  name: string;
  label: string;
  rows?: number;
  className?: string;
}) {
  return (
    <label className={`text-sm ${className}`}>
      <span className="block text-slate-700 mb-1">{label}</span>
      <textarea name={name} rows={rows} className="w-full rounded-xl border px-4 py-2.5" />
    </label>
  );
}

function Select({
  name,
  label,
  value,
  onChange,
  children,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="text-sm">
      <span className="block text-slate-700 mb-1">{label}</span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border px-4 py-2.5"
      >
        {children}
      </select>
    </label>
  );
}
