"use client";

import { useEffect, useMemo, useState } from "react";

/** -----------------------------
 *  DATI MOCK (sostituibili con CMS/OpenData)
 *  ----------------------------- */
type Income = { id: string; date: string; source: string; amount: number; note?: string };
type Expense = { id: string; date: string; category: string; supplier: string; amount: number; note?: string };
type Donor = { id: string; date: string; name: string; amount: number; note?: string };
type Contract = { id: string; date: string; object: string; counterparty: string; amount: number; procedure: string; link?: string };
type Conflict = { id: string; person: string; role: string; statement: string; date: string };

const INCOMES: Income[] = [
  { id: "i1", date: "2024-01-15", source: "Tesseramenti", amount: 10350 },
  { id: "i2", date: "2024-02-10", source: "Donazioni singole", amount: 18900 },
  { id: "i3", date: "2024-03-22", source: "Fundraising evento", amount: 7200 },
  { id: "i4", date: "2024-04-05", source: "Contributi privati", amount: 34000, note: "sponsor etico" },
  { id: "i5", date: "2024-06-18", source: "Donazioni ricorrenti", amount: 20750 },
  { id: "i6", date: "2024-09-01", source: "5x1000 (erogazione)", amount: 24500 },
];

const EXPENSES: Expense[] = [
  { id: "e1", date: "2024-01-28", category: "Comunicazione", supplier: "Studio Media srl", amount: 8200 },
  { id: "e2", date: "2024-02-11", category: "Eventi & logistica", supplier: "Spazio Civico", amount: 4100 },
  { id: "e3", date: "2024-03-05", category: "Servizi digitali", supplier: "Piattaforma CRM", amount: 2360 },
  { id: "e4", date: "2024-04-12", category: "Grafica & stampa", supplier: "Tipografia Verde", amount: 5400 },
  { id: "e5", date: "2024-06-30", category: "Affitti & utenze", supplier: "Cowork Centro", amount: 6900 },
  { id: "e6", date: "2024-09-20", category: "Formazione", supplier: "Civica Academy", amount: 1990 },
];

const DONORS_OVER_100: Donor[] = [
  { id: "d1", date: "2024-02-02", name: "Mario Rossi", amount: 250 },
  { id: "d2", date: "2024-03-18", name: "Impresa Etica srl", amount: 1200, note: "No appalti con PA locale" },
  { id: "d3", date: "2024-05-07", name: "Sara Bianchi", amount: 180 },
  { id: "d4", date: "2024-09-10", name: "Fondazione Civica", amount: 3500 },
];

const CONTRACTS: Contract[] = [
  { id: "c1", date: "2024-02-01", object: "Servizi comunicazione campagna civica", counterparty: "Studio Media srl", amount: 8000, procedure: "affidamento diretto", link: "#" },
  { id: "c2", date: "2024-04-10", object: "Fornitura materiali informativi", counterparty: "Tipografia Verde", amount: 5200, procedure: "preventivi comparativi", link: "#" },
  { id: "c3", date: "2024-06-20", object: "Piattaforma CRM & newsletter", counterparty: "Piattaforma CRM", amount: 2300, procedure: "licenza annuale", link: "#" },
];

const CONFLICTS: Conflict[] = [
  { id: "cf1", person: "Giulia Ferri", role: "Presidente", statement: "Dichiara incarichi di consulenza 2022–2023 con ONG X (non attiva sul territorio)", date: "2024-01-10" },
  { id: "cf2", person: "Sara Neri", role: "Tesoriere", statement: "Dichiara parentela 2° grado con fornitore non attivo con l’associazione", date: "2024-01-10" },
];

/** -----------------------------
 *  UTILITY (SSR-safe)
 *  ----------------------------- */
const pad2 = (n: number) => String(n).padStart(2, "0");

// EUR deterministico (niente Intl) → evita hydration mismatch
const formatEUR = (n: number) => {
  const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return "€ " + s;
};

// Data deterministica in UTC (DD/MM/YYYY) → evita differenze fuso
const fmt = (iso: string) => {
  const d = new Date(iso);
  const dd = pad2(d.getUTCDate());
  const mm = pad2(d.getUTCMonth() + 1);
  const yyyy = d.getUTCFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

function toCsv<T extends Record<string, any>>(rows: T[]) {
  if (!rows.length) return "";
  const cols = Object.keys(rows[0]);
  const esc = (v: any) => {
    const s = String(v ?? "");
    return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [cols.join(","), ...rows.map(r => cols.map(c => esc(r[c])).join(","))];
  return lines.join("\n");
}
function dataUrl(content: string, mime = "text/csv") {
  return "data:" + mime + ";charset=utf-8," + encodeURIComponent(content);
}

/** -----------------------------
 *  PAGE
 *  ----------------------------- */
export default function TrasparenzaPage() {
  const [year, setYear] = useState("2024");

  // “Ultimo aggiornamento” solo dopo il mount (evita mismatch)
  const [lastUpdated, setLastUpdated] = useState("");
  useEffect(() => {
    const d = new Date();
    setLastUpdated(`${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`);
  }, []);

  // ▼▼ filtri tabellari
  const [qDon, setQDon] = useState("");
  const donorsFiltered = useMemo(
    () =>
      DONORS_OVER_100.filter(byYear(year)).filter((r) =>
        (r.name + (r.note ?? "")).toLowerCase().includes(qDon.toLowerCase())
      ),
    [year, qDon]
  );

  const [qContr, setQContr] = useState("");
  const contractsFiltered = useMemo(
    () =>
      CONTRACTS.filter(byYear(year)).filter((r) =>
        (r.object + r.counterparty + r.procedure).toLowerCase().includes(qContr.toLowerCase())
      ),
    [year, qContr]
  );
  // ▲▲ filtri tabellari

  // KPI
  const totalInc = useMemo(() => sum(INCOMES.filter(byYear(year)), "amount"), [year]);
  const totalExp = useMemo(() => sum(EXPENSES.filter(byYear(year)), "amount"), [year]);
  const balance = totalInc - totalExp;

  // ENTRATE (bar chart mensile)
  const incomesByMonth = useMemo(() => groupByMonthSum(INCOMES.filter(byYear(year))), [year]);

  // SPESE (bar chart per categoria con legenda filtrabile)
  const allExpenseCats = useMemo(
    () => Array.from(new Set(EXPENSES.filter(byYear(year)).map(e => e.category))),
    [year]
  );
  const [activeCats, setActiveCats] = useState<string[]>([]);
  const active = activeCats.length ? activeCats : allExpenseCats;
  const expensesByCat = useMemo(() => {
    const rows = EXPENSES.filter(byYear(year)).filter(e => active.includes(e.category));
    const map = new Map<string, number>();
    rows.forEach(e => map.set(e.category, (map.get(e.category) ?? 0) + e.amount));
    return Array.from(map.entries()).map(([label, value]) => ({ label, value }));
  }, [year, active]);

  function toggleCat(cat: string) {
    setActiveCats((prev) =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-indigo-500 to-amber-500 opacity-90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            Trasparenza • Città Futura
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Bilanci e rendicontazione
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Entrate, spese, donazioni &gt;100€, contratti. Dati chiari e visualizzati con grafici e tabelle.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={dataUrl(toCsv(INCOMES))} download={`entrate-${year}.csv`} className="rounded-xl bg-white text-slate-900 px-4 py-2 text-sm font-semibold hover:opacity-90">Entrate CSV</a>
            <a href={dataUrl(toCsv(EXPENSES))} download={`spese-${year}.csv`} className="rounded-xl ring-2 ring-white/80 text-white px-4 py-2 text-sm font-semibold hover:bg-white/10">Spese CSV</a>
            <a href={dataUrl(toCsv(DONORS_OVER_100))} download={`donatori-over100-${year}.csv`} className="rounded-xl border border-white/70 text-white px-4 py-2 text-sm font-semibold hover:bg-white/10">Donatori CSV</a>
          </div>
        </div>
      </section>

      {/* OVERVIEW KPI */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-4">
          <label className="text-sm">Anno
            <select value={year} onChange={(e) => setYear(e.target.value)} className="ml-2 rounded-xl border px-3 py-2 text-sm">
              <option>2024</option>
            </select>
          </label>
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-6">
          <KPI k={formatEUR(totalInc)} l="Entrate 2024" />
          <KPI k={formatEUR(totalExp)} l="Spese 2024" />
          <KPI k={formatEUR(balance)} l="Saldo 2024" />
        </div>
      </section>

      {/* ENTRATE — bar chart mensile */}
      <section className="py-10 bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-4">
            <h2 className="text-2xl font-bold">Entrate per mese</h2>
            <p className="text-slate-600">Somma mensile (tesseramenti, donazioni, contributi, fundraising).</p>
          </header>
          <BarChart
            title="Entrate"
            data={toBarSeries(incomesByMonth)}
            height={260}
            valueFormatter={formatEUR}
          />
        </div>
      </section>

      {/* SPESE — bar chart per categoria con legenda filtrabile */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-4">
            <h2 className="text-2xl font-bold">Spese per categoria</h2>
            <p className="text-slate-600">Clicca sulla legenda per mostrare/nascondere le categorie.</p>
          </header>

          <Legend items={allExpenseCats} active={active} onToggle={toggleCat} />

          <div className="mt-4">
            <BarChart
              title="Spese per categoria"
              data={expensesByCat}
              height={280}
              horizontal
              valueFormatter={formatEUR}
            />
          </div>
        </div>
      </section>

      {/* DONAZIONI >100 — TABELLARE */}
      <section className="py-10 bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold">Donazioni &gt; 100€ (previo consenso)</h2>
              <p className="text-slate-600">Elenco nominativi pubblicati con data e importo.</p>
            </div>
            <input
              value={qDon}
              onChange={(e) => setQDon(e.target.value)}
              placeholder="Cerca nome / note…"
              className="rounded-xl border px-4 py-2 text-sm w-full md:w-72"
            />
          </header>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-600 border-b">
                  <th className="py-2 pr-3">Data</th>
                  <th className="py-2 pr-3">Donatore</th>
                  <th className="py-2 pr-3">Importo</th>
                  <th className="py-2">Note</th>
                </tr>
              </thead>
              <tbody>
                {donorsFiltered.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-white">
                    <td className="py-2 pr-3">{fmt(r.date)}</td>
                    <td className="py-2 pr-3">{r.name}</td>
                    <td className="py-2 pr-3 font-semibold">{formatEUR(r.amount)}</td>
                    <td className="py-2">{r.note ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold">
                  <td className="py-2 pr-3" colSpan={2}>Totale</td>
                  <td className="py-2 pr-3">
                    {formatEUR(donorsFiltered.reduce((s, r) => s + r.amount, 0))}
                  </td>
                  <td className="py-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Nota: pubblichiamo solo donazioni &gt; €100, previo consenso. Per revoca o rettifica, scrivere a{" "}
            <a className="underline" href="mailto:privacy@cittafutura.it">privacy@cittafutura.it</a>.
          </p>
        </div>
      </section>

      {/* CONTRATTI — TABELLARE */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold">Contratti e forniture</h2>
              <p className="text-slate-600">Oggetto, controparte, importi e procedura di selezione.</p>
            </div>
            <input
              value={qContr}
              onChange={(e) => setQContr(e.target.value)}
              placeholder="Cerca oggetto / controparte / procedura…"
              className="rounded-xl border px-4 py-2 text-sm w-full md:w-80"
            />
          </header>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-600 border-b">
                  <th className="py-2 pr-3">Data</th>
                  <th className="py-2 pr-3">Oggetto</th>
                  <th className="py-2 pr-3">Controparte</th>
                  <th className="py-2 pr-3">Procedura</th>
                  <th className="py-2 pr-3">Importo</th>
                  <th className="py-2">Documenti</th>
                </tr>
              </thead>
              <tbody>
                {contractsFiltered.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-slate-50">
                    <td className="py-2 pr-3">{fmt(r.date)}</td>
                    <td className="py-2 pr-3">{r.object}</td>
                    <td className="py-2 pr-3">{r.counterparty}</td>
                    <td className="py-2 pr-3">{r.procedure}</td>
                    <td className="py-2 pr-3 font-semibold">{formatEUR(r.amount)}</td>
                    <td className="py-2">
                      <a className="underline" href={r.link ?? "#"}>Contratto</a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold">
                  <td className="py-2 pr-3" colSpan={4}>Totale</td>
                  <td className="py-2 pr-3">
                    {formatEUR(contractsFiltered.reduce((s, r) => s + r.amount, 0))}
                  </td>
                  <td className="py-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={dataUrl(toCsv(contractsFiltered))}
              download={`contratti-${year}.csv`}
              className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Scarica contratti filtrati (CSV)
            </a>
          </div>
        </div>
      </section>

      {/* CONFLITTI D’INTERESSE */}
      <section className="py-10 bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Dichiarazioni di conflitto d’interesse</h2>
          <p className="text-slate-600">Dichiarazioni annuali degli organi e dirigenti.</p>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {CONFLICTS.map(c => (
              <details key={c.id} className="rounded-2xl border bg-white p-5 shadow-sm open:shadow-md transition-shadow">
                <summary className="cursor-pointer list-none">
                  <span className="font-semibold">{c.person}</span>{" "}
                  <span className="text-slate-600">— {c.role}</span>
                  <span className="text-slate-500 text-sm"> • {fmt(c.date)}</span>
                </summary>
                <p className="mt-2 text-slate-700">{c.statement}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTI & POLICY */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          <DocCard
            title="Bilancio d’esercizio 2024"
            desc="Rendiconto economico-finanziario completo in formato PDF e CSV."
            primary={{ href: "#", label: "Scarica PDF" }}
            secondary={{ href: dataUrl(toCsv([...INCOMES, ...EXPENSES] as any)), label: "Scarica CSV" }}
          />
          <DocCard
            title="Registro incontri con portatori d’interesse"
            desc="Calendario incontri istituzionali e con soggetti portatori di interessi."
            primary={{ href: "#", label: "Vedi registro" }}
            secondary={{ href: dataUrl(toCsv(CONTRACTS)), label: "Scarica CSV" }}
          />
          <DocCard
            title="Privacy & Cookie policy"
            desc="Informativa GDPR aggiornata, diritti dell’interessato e contatti DPO."
            primary={{ href: "#", label: "Apri informativa" }}
            secondary={{ href: "#", label: "Scarica PDF" }}
          />
        </div>
        {/* Ultimo aggiornamento calcolato solo client-side */}
        <p className="mt-6 text-xs text-slate-500">
          Ultimo aggiornamento: {lastUpdated || "—"}.
          {" "}Per segnalazioni scrivi a{" "}
          <a className="underline" href="mailto:trasparenza@cittafutura.it">trasparenza@cittafutura.it</a>.
        </p>
      </section>
    </main>
  );
}

/* --------- COMPONENTI UI PICCOLI --------- */

function KPI({ k, l }: { k: string; l: string }) {
  return (
    <div className="rounded-2xl border p-6 text-center bg-white shadow-sm">
      <div className="text-2xl sm:text-3xl font-extrabold">{k}</div>
      <div className="mt-1 text-xs text-slate-600">{l}</div>
    </div>
  );
}

function DocCard({
  title,
  desc,
  primary,
  secondary,
}: {
  title: string;
  desc: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-slate-600">{desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a href={primary.href} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
          {primary.label}
        </a>
        {secondary && (
          <a href={secondary.href} className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50">
            {secondary.label}
          </a>
        )}
      </div>
    </div>
  );
}

/* --------- GRAFICI (SVG puri, responsive) --------- */

type BarDatum = { label: string; value: number };

function Legend({
  items,
  active,
  onToggle,
}: {
  items: string[];
  active: string[];
  onToggle: (label: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((label, i) => {
        const on = active.includes(label);
        return (
          <button
            key={label}
            onClick={() => onToggle(label)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border transition
              ${on ? "bg-indigo-600 text-white border-indigo-600" : "bg-white hover:bg-slate-50"}`}
            title={on ? "Nascondi categoria" : "Mostra categoria"}
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded"
              style={{ backgroundColor: colorAt(i) }}
            />
            {label}
          </button>
        );
      })}
    </div>
  );
}

function BarChart({
  title,
  data,
  width = 900,
  height = 240,
  horizontal = false,
  valueFormatter = (n: number) => String(n),
}: {
  title?: string;
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
  horizontal?: boolean;
  valueFormatter?: (n: number) => string;
}) {
  // padding maggiorato per grafico orizzontale (etichette a sx, valori a dx)
  const PAD_T = 16;
  const PAD_B = 28;
  const PAD_L = horizontal ? 140 : 28;  // spazio etichette sinistra
  const PAD_R = horizontal ? 80 : 28;   // spazio valori destra

  const w = width;
  const h = height;
  const max = Math.max(1, ...data.map(d => d.value));

  const band = (idx: number) => {
    const n = Math.max(1, data.length);
    const inner = horizontal ? h - PAD_T - PAD_B : w - PAD_L - PAD_R;
    const step = inner / n;
    return { pos: (horizontal ? PAD_T : PAD_L) + idx * step, size: Math.max(12, step * 0.7) };
  };
  const scale = (v: number) => {
    const inner = horizontal ? w - PAD_L - PAD_R : h - PAD_T - PAD_B;
    return (v / max) * inner;
  };

  return (
    <div className="rounded-2xl border bg-white p-4">
      {title && <h3 className="mb-2 font-semibold">{title}</h3>}
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" aria-label={title} role="img">
          {/* assi */}
          <line x1={PAD_L} y1={h - PAD_B} x2={w - PAD_R} y2={h - PAD_B} stroke="#e5e7eb" />
          <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={h - PAD_B} stroke="#e5e7eb" />

          {data.map((d, i) => {
            const { pos, size } = band(i);
            const val = scale(d.value);
            const color = colorAt(i);

            if (horizontal) {
              const x = PAD_L;
              const y = pos + (band(0).size - size) / 2;

              // Evita che il valore di testo esca dal viewBox
              const valueX = Math.min(x + val + 8, w - PAD_R + 2);

              return (
                <g key={i}>
                  <rect x={x} y={y} width={val} height={size} fill={color} opacity={0.9} />
                  {/* etichetta a sinistra */}
                  <text
                    x={PAD_L - 8}
                    y={y + size / 2 + 4}
                    textAnchor="end"
                    fontSize="12"
                    fill="#334155"
                  >
                    {truncate(d.label, 28)}
                  </text>
                  {/* valore a destra */}
                  <text
                    x={valueX}
                    y={y + size / 2 + 4}
                    fontSize="12"
                    fill="#334155"
                  >
                    {valueFormatter(d.value)}
                  </text>
                </g>
              );
            } else {
              // verticale (come prima, solo con nuovi pad)
              const x = pos + (band(0).size - size) / 2;
              const y = h - PAD_B - val;
              return (
                <g key={i}>
                  <rect x={x} y={y} width={size} height={val} fill={color} opacity={0.9} />
                  <text x={x + size / 2} y={h - PAD_B + 14} fontSize="12" textAnchor="middle" fill="#334155">
                    {d.label}
                  </text>
                  <text x={x + size / 2} y={y - 6} fontSize="12" textAnchor="middle" fill="#334155">
                    {valueFormatter(d.value)}
                  </text>
                </g>
              );
            }
          })}
        </svg>
      </div>
    </div>
  );
}

/* --------- HELPERS DATI --------- */

function sum<T extends Record<string, any>>(rows: T[], field: keyof T) {
  return rows.reduce((s, r) => s + Number(r[field] ?? 0), 0);
}

function byYear(year: string) {
  return (row: { date: string }) => row.date.startsWith(year);
}

function monthIdx(iso: string) {
  return new Date(iso).getUTCMonth(); // 0-11 (UTC per stabilità)
}

const ITA_MONTHS = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];

function groupByMonthSum<T extends { date: string; amount: number }>(rows: T[]) {
  const arr = new Array(12).fill(0);
  rows.forEach(r => { arr[monthIdx(r.date)] += r.amount; });
  return arr.map((value, i) => ({ label: ITA_MONTHS[i], value }));
}

function toBarSeries(rows: { label: string; value: number }[]) {
  return rows;
}

function colorAt(i: number) {
  const palette = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#06b6d4", "#a855f7", "#84cc16", "#f97316"];
  return palette[i % palette.length];
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
