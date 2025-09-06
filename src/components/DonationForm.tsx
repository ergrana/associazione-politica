// src/components/DonationForm.tsx
"use client";

import * as React from "react";

type Props = {
  eventId: string;
  title: string;
  min: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function DonationForm({
  eventId,
  title,
  min,
  currency,
  successUrl,
  cancelUrl,
}: Props) {
  const [amount, setAmount] = React.useState<number>(min);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (amount < min) {
      setError(
        `L'importo minimo è ${new Intl.NumberFormat("it-IT", {
          style: "currency",
          currency,
        }).format(min)}.`
      );
      return;
    }
    setLoading(true);
    try {
      // TODO: implementa /app/api/checkout/route.ts (Stripe/PayPal/Satispay)
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          eventTitle: title,
          amount,
          currency,
          successUrl,
          cancelUrl,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Errore durante la creazione del pagamento.");
      }
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Risposta inattesa dal provider di pagamento.");
      }
    } catch (err: any) {
      setError(err.message || "Si è verificato un errore imprevisto.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block text-sm font-medium">Importo della donazione</label>
      <div className="flex items-stretch rounded-xl ring-1 ring-slate-200 overflow-hidden">
        <span className="px-3 py-2 text-sm text-slate-600 bg-slate-50">{currency}</span>
        <input
          type="number"
          step="1"
          min={min}
          inputMode="numeric"
          value={Number.isFinite(amount) ? amount : ""}
          onChange={(e) => setAmount(parseInt(e.target.value || "0", 10))}
          className="w-full px-3 py-2 text-sm outline-none"
          placeholder={String(min)}
          required
        />
      </div>
      <p className="text-xs text-slate-500">
        Minimo:{" "}
        <strong>
          {new Intl.NumberFormat("it-IT", { style: "currency", currency }).format(min)}
        </strong>
      </p>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "w-full rounded-xl bg-indigo-600 text-white px-4 py-2 text-sm font-semibold shadow hover:bg-indigo-500",
          loading && "opacity-70 cursor-not-allowed"
        )}
      >
        {loading ? "Reindirizzamento in corso..." : "Paga e Iscriviti"}
      </button>
    </form>
  );
}
