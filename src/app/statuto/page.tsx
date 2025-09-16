// src/app/statuto/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Statuto | La Repubblica degli Italiani nel Mondo",
  description:
    "Lo Statuto dell'associazione: principi, organi sociali e norme di funzionamento.",
  openGraph: {
    title: "Statuto | La Repubblica degli Italiani nel Mondo",
    description:
      "Lo Statuto dell'associazione: principi, organi sociali e norme di funzionamento.",
    type: "article",
    url: "/statuto",
  },
};

export default function StatutoPage() {
  return (
    <main className="min-h-screen">
      {/* HERO/INTRO */}
      <section className="bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-xs font-medium text-slate-500">
            La Repubblica degli Italiani nel Mondo
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Statuto dell’Associazione
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Principi, organi sociali e norme di funzionamento.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/#"
              className="inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-white"
            >
              ← Torna alla pagina “Chi Siamo”
            </Link>
            {/* opzionale: se mantieni anche il PDF */}
            <a
              href="/docs/statuto.pdf"
              className="inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-white"
            >
              Scarica lo Statuto (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* CONTENUTO */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate lg:prose-lg dark:prose-invert">
          {/* ⬇️ Sostituisci i placeholder con il testo ufficiale dello statuto */}
          <h2>Premessa</h2>
          <p>
            Lo Statuto disciplina finalità, attività, struttura e funzionamento
            dell’Associazione “La Repubblica degli Italiani nel Mondo”.
          </p>

          <h2>Finalità</h2>
          <p>
            L’Associazione persegue finalità civiche, solidaristiche e di utilità
            sociale, promuovendo cultura, diritti, partecipazione e legami tra
            l’Italia e le comunità italiane nel mondo.
          </p>

          <h2>Organi sociali</h2>
          <ul>
            <li>Assemblea dei Soci</li>
            <li>Consiglio Direttivo</li>
            <li>Presidente e Vice-Presidente</li>
            <li>Segretario Generale</li>
            <li>Revisore dei Conti</li>
          </ul>

          <h2>Norme di partecipazione</h2>
          <p>
            Tutti i soci hanno pari diritti e doveri e concorrono alla vita
            associativa secondo le modalità stabilite dallo Statuto e dai
            regolamenti interni.
          </p>

          <h2>Trasparenza e bilancio</h2>
          <p>
            L’Associazione redige bilancio annuale e rendiconta pubblicamente
            entrate e spese in formato aperto.
          </p>

          <h2>Disposizioni finali</h2>
          <p>
            Per quanto non espressamente previsto si rinvia alle normative
            vigenti in materia di enti del Terzo settore e alle deliberazioni
            dell’Assemblea dei Soci.
          </p>
          {/* ⬆️ Fine placeholder */}
        </div>
      </section>
    </main>
  );
}
