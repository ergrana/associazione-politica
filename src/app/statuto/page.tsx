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
      {/* HERO/INTRO – stile come "Chi siamo" */}
      <section className="relative overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            La Repubblica degli Italiani nel Mondo
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Statuto dell’Associazione
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Principi, organi sociali e norme di funzionamento.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex rounded-xl border px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              ← Torna alla Home
            </Link>
            {/* opzionale: link al PDF se presente in /public/docs */}
            <a
              href="/docs/statuto.pdf"
              className="inline-flex rounded-xl border px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Scarica lo Statuto (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* CONTENUTO */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate lg:prose-lg">
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
