"use client";

import { useMemo, useState } from "react";

type Props = {
  eventId: string;
  title: string;
  pricePerPerson: number;      // usato solo per il calcolo del totale
  currency?: string;           // default: "EUR"
  successUrl?: string;
  cancelUrl?: string;
  checkoutApi?: string;        // default: "/api/checkout"
};

export default function EventTicketForm({
  eventId,
  title,
  pricePerPerson,
  currency = "EUR",
  successUrl,
  cancelUrl,
  checkoutApi = "/api/checkout",
}: Props) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const total = useMemo(() => Math.max(1, qty) * pricePerPerson, [qty, pricePerPerson]);
  const fmt = (n: number) =>
    new Intl.NumberFormat("it-IT", { style: "currency", currency }).format(n);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!first || !last || !email || qty < 1) {
      setErr("Compila tutti i campi obbligatori.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(checkoutApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          title,
          quantity: qty,
          pricePerPerson,
          currency,
          successUrl,
          cancelUrl,
          customer: { first, last, email },
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || "Errore nella creazione del pagamento.");
      }

      const data = await res.json();
      const url = data.url || data.sessionUrl;
      if (!url) throw new Error("Risposta non valida dal server.");
      window.location.href = url;
    } catch (e: any) {
      setErr(e?.message || "Errore durante la creazione del pagamento.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Anagrafica */}
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-sm">
          <span className="block mb-1 text-slate-700">Nome *</span>
          <input
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            className="w-full rounded-xl border px-3 py-2"
            required
          />
        </label>

        <label className="text-sm">
          <span className="block mb-1 text-slate-700">Cognome *</span>
          <input
            value={last}
            onChange={(e) => setLast(e.target.value)}
            className="w-full rounded-xl border px-3 py-2"
            required
          />
        </label>
      </div>

      <label className="text-sm">
        <span className="block mb-1 text-slate-700">Email *</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border px-3 py-2"
          required
        />
      </label>

      <label className="text-sm">
        <span className="block mb-1 text-slate-700">Numero persone *</span>
        <input
          type="number"
          min={1}
          max={20}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
          className="w-full rounded-xl border px-3 py-2"
          required
        />
      </label>

      {/* Riepilogo (solo Persone + Totale) con più spazio sopra */}
      <div className="mt-5 rounded-2xl border bg-gradient-to-br from-slate-50 to-white p-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-white ring-1 ring-slate-200 p-3 text-center">
            <div className="text-slate-500">Persone</div>
            <div className="mt-0.5 font-semibold">{qty}</div>
          </div>
          <div className="rounded-xl bg-indigo-600/5 ring-1 ring-indigo-200 p-3 text-center">
            <div className="text-indigo-700 font-medium">Totale</div>
            <div className="mt-0.5 text-xl font-extrabold text-indigo-700" aria-live="polite">
              {fmt(total)}
            </div>
          </div>
        </div>
      </div>

      {/* Errori */}
      {err && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 text-rose-700 px-3 py-2 text-sm">
          {err}
        </div>
      )}

      {/* CTA */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        aria-busy={loading}
      >
        {loading ? "Attendere…" : "Paga"}
      </button>

      {/* Nota trust */}
      <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
        Pagamento gestito da Stripe. I dati della tua carta non sono gestiti dai nostri server; il totale si aggiorna in base
        al numero di partecipanti. Dopo il pagamento riceverai via email il
        <strong> biglietto con QR code</strong> che funge da ricevuta.
      </div>
    </form>
  );
}
