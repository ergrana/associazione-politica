// src/app/manifesti/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manifesto | La Repubblica degli Italiani nel Mondo",
  description:
    "Il Manifesto della Repubblica degli Italiani nel Mondo: obiettivi, valori e impegni.",
  openGraph: {
    title: "Manifesto | La Repubblica degli Italiani nel Mondo",
    description:
      "Il Manifesto della Repubblica degli Italiani nel Mondo: obiettivi, valori e impegni.",
    type: "article",
    url: "/manifesti",
  },
};

export default function ManifestiPage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-xs font-medium text-slate-500">
            La Repubblica degli Italiani nel Mondo
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Manifesto
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Visione, obiettivi e valori di riferimento.
          </p>

          <div className="mt-6">
            <Link
              href="/#"
              className="inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-white"
            >
              ← Torna alla pagina “Chi Siamo”
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENUTO */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate lg:prose-lg dark:prose-invert">
          <h2>Manifesto</h2>
          <p>
            La Repubblica degli Italiani nel Mondo vuole contribuire a rafforzare un
            progetto politico che, attraverso riforme condivise e partecipate, sia
            capace di ammodernare il “sistema paese” rilanciando la funzione del lavoro
            e di una nuova giustizia sociale.
          </p>
          <p>
            L’Associazione vuole “rottamare” un vecchio sistema fatto di privilegi che
            ha creato una pericolosa frattura generazionale. Solo coniugando presente e
            futuro, liberando le migliori energie e dando spazio ai talenti, si può
            restituire fiducia e speranza alle nuove generazioni.
          </p>

          <p>
            Nell’ambito dei principi e degli scopi associativi, si ritengono parimenti
            importanti i seguenti obiettivi e valori di riferimento:
          </p>
          <ul>
            <li>
              Semplificare il “sistema paese”, oggi ingessato dal complesso quadro
              legislativo, per migliorare la qualità della vita dei cittadini puntando
              sulla cultura, l’innovazione digitale, la produttività e lo spirito
              d’impresa;
            </li>
            <li>
              Aggiornare il welfare, “vecchio” ormai di mezzo secolo, con un nuovo
              sistema capace di contemperare la difesa dei più deboli con sostegno ai
              ceti produttivi, rimuovendo, al tempo stesso, gli ostacoli che limitano il
              Terzo settore;
            </li>
            <li>
              Accelerare i cambiamenti strutturali allentando l’eccesso di potere dello
              Stato, la pressione fiscale e i vincoli burocratici, per essere all’altezza
              delle sfide dell’economia globale;
            </li>
            <li>
              Contribuire alla costruzione di un’Europa federale, improntata a un
              riformismo dal volto umano, capace di contemperare efficienza economica e
              solidarietà, rispetto delle regole e principi liberali;
            </li>
          </ul>

          <p>
            Per il perseguimento di tali obiettivi e valori, La Repubblica degli Italiani
            nel Mondo svolgerà opera di organizzazione e proselitismo al fine di
            sensibilizzare i cittadini, sia agendo nella concreta realtà del territorio,
            sia attraverso i social network, per la condivisione di temi etici e sociali.
          </p>
        </div>
      </section>
    </main>
  );
}
