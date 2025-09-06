// src/app/trasparenza/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

/** -----------------------------
 *  Tipi
 *  ----------------------------- */
type Income = { id: string; date: string; source: string; amount: number; note?: string };
type Expense = { id: string; date: string; category: string; supplier: string; amount: number; note?: string };
type Conflict = { id: string; person: string; role: string; statement: string; date: string };

/** -----------------------------
 *  Anni disponibili (aggiungi qui 2026, 2027, …)
 *  ----------------------------- */
const YEARS = ["2024", "2025"];

/** -----------------------------
 *  MOCK 2024 (usati come fallback se mancano i CSV)
 *  ----------------------------- */
const MOCK_INCOMES_2024: Income[] = [
  { id: "i1", date: "2024-01-15", source: "Tesseramenti", amount: 10350 },
  { id: "i2", date: "2024-02-10", source: "Donazioni singole", amount: 18900 },
  { id: "i3", date: "2024-03-22", source: "Fundraising evento", amount: 7200 },
  { id: "i4", date: "2024-04-05", source: "Contributi privati", amount: 34000, note: "sponsor etico" },
  { id: "i5", date: "2024-06-18", source: "Donazioni ricorrenti", amount: 20750 },
  { id: "i6", date: "2024-09-01", source: "5x1000 (erogazione)", amount: 24500 },
];
const MOCK_EXPENSES_2024: Expense[] = [
  { id: "e1", date: "2024-01-28", category: "Comunicazione", supplier: "Studio Media srl", amount: 8200 },
  { id: "e2", date: "2024-02-11", category: "Eventi & logistica", supplier: "Spazio Civico", amount: 4100 },
  { id: "e3", date: "2024-03-05", category: "Servizi digitali", supplier: "Piattaforma CRM", amount: 2360 },
  { id: "e4", date: "2024-04-12", category: "Grafica & stampa", supplier: "Tipografia Verde", amount: 5400 },
  { id: "e5", date: "2024-06-30", category: "Affitti & utenze", supplier: "Cowork Centro", amount: 6900 },
  { id: "e6", date: "2024-09-20", category: "Formazione", supplier: "Civica Academy", amount: 1990 },
];
const MOCK_CONFLICTS_2024: Conflict[] = [
  { id: "cf1", person: "Giulia Ferri", role: "Presidente", statement: "Dichiara incarichi di consulenza 2022–2023 con ONG X (non attiva sul territorio)", date: "2024-01-10" },
  { id: "cf2", person: "Sara Neri", role: "Tesoriere", statement: "Dichiara parentela 2° grado con fornitore non attivo con l’associazione", date: "2024-01-10" },
];

/** -----------------------------
 *  Utils (SSR-safe)
 *  ----------------------------- */
const pad2 = (n: number) => String(n).padStart(2, "0");
const formatEUR = (n: number) => "€ " + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const fmt = (iso: string) => {
  const d = new Date(iso);
  return `${pad2(d.getUTCDate())}/${pad2(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`;
};
const ITA_MONTHS = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
const monthIdx = (iso: string) => new Date(iso).getUTCMonth();

/** CSV parser minimale: supporta virgole tra virgolette e doppi apici escape ("") */
function parseCSV(text: string): Array<Record<string, string>> {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").filter(l => l.length > 0);
  if (!lines.length) return [];
  const headers = splitCsvLine(lines[0]).map(h => h.trim());
  return lines.slice(1).map(line => {
    const cells = splitCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => (row[h] = (cells[i] ?? "").trim()));
    return row;
  });
}
function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') {
        cur += '"'; i++;
      } else {
        inQ = !inQ;
      }
    } else if (ch === "," && !inQ) {
      out.push(cur); cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}
const safeNumber = (s: string) => Number(String(s || "0").replace(/\./g, "").replace(",", "."));

/** Map CSV → tipi forti (colonne attese) */
function mapIncome(rows: Record<string, string>[]): Income[] {
  return rows.map(r => ({
    id: r.id || cryptoId(),
    date: r.date,
    source: r.source,
    amount: safeNumber(r.amount),
    note: r.note || undefined,
  }));
}
function mapExpense(rows: Record<string, string>[]): Expense[] {
  return rows.map(r => ({
    id: r.id || cryptoId(),
    date: r.date,
    category: r.category,
    supplier: r.supplier,
    amount: safeNumber(r.amount),
    note: r.note || undefined,
  }));
}
function mapConflict(rows: Record<string, string>[]): Conflict[] {
  return rows.map(r => ({
    id: r.id || cryptoId(),
    person: r.person,
    role: r.role,
    statement: r.statement,
    date: r.date,
  }));
}
const cryptoId = () => Math.random().toString(36).slice(2, 10);

/** Helpers dati */
function sum<T extends Record<string, unknown>>(rows: T[], field: keyof T) {
  return rows.reduce((s, r) => s + Number(r[field] ?? 0), 0);
}
function byYear(year: string) {
  return (row: { date: string }) => row.date?.startsWith(year);
}
function groupByMonthSum<T extends { date: string; amount: number }>(rows: T[]) {
  const arr = new Array(12).fill(0);
  rows.forEach(r => { arr[monthIdx(r.date)] += r.amount; });
  return arr.map((value, i) => ({ label: ITA_MONTHS[i], value }));
}
function colorAt(i: number) {
  const palette = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#06b6d4", "#a855f7", "#84cc16", "#f97316"];
  return palette[i % palette.length];
}
function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

/** -----------------------------
 *  Pagina
 *  ----------------------------- */
export default function TrasparenzaPage() {
  const [year, setYear] = useState(YEARS[0]);
  const [incomes, setIncomes] = useState<Income[]>(MOCK_INCOMES_2024);
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES_2024);
  const [conflicts, setConflicts] = useState<Conflict[]>(MOCK_CONFLICTS_2024);
  const [lastUpdated, setLastUpdated] = useState("");

  // Carica CSV dall'anno selezionato (se non esistono → fallback ai mock 2024)
  useEffect(() => {
    setLastUpdated(() => {
      const d = new Date();
      return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
    });

    let aborted = false;
    async function loadAll() {
      const base = `/data`;
      const incUrl = `${base}/incomes-${year}.csv`;
      const expUrl = `${base}/expenses-${year}.csv`;
      const cflUrl = `${base}/conflicts-${year}.csv`;

      try {
        const [incRes, expRes, cflRes] = await Promise.allSettled([fetch(incUrl), fetch(expUrl), fetch(cflUrl)]);
        // Entrate
        if (incRes.status === "fulfilled" && incRes.value.ok) {
          const t = await incRes.value.text();
          if (!aborted) setIncomes(mapIncome(parseCSV(t)));
        } else if (year === "2024") {
          if (!aborted) setIncomes(MOCK_INCOMES_2024);
        } else {
          if (!aborted) setIncomes([]);
        }
        // Spese
        if (expRes.status === "fulfilled" && expRes.value.ok) {
          const t = await expRes.value.text();
          if (!aborted) setExpenses(mapExpense(parseCSV(t)));
        } else if (year === "2024") {
          if (!aborted) setExpenses(MOCK_EXPENSES_2024);
        } else {
          if (!aborted) setExpenses([]);
        }
        // Conflitti (opzionale)
        if (cflRes.status === "fulfilled" && cflRes.value.ok) {
          const t = await cflRes.value.text();
          if (!aborted) setConflicts(mapConflict(parseCSV(t)));
        } else if (year === "2024") {
          if (!aborted) setConflicts(MOCK_CONFLICTS_2024);
        } else {
          if (!aborted) setConflicts([]);
        }
      } catch {
        if (!aborted) {
          setIncomes(year === "2024" ? MOCK_INCOMES_2024 : []);
          setExpenses(year === "2024" ? MOCK_EXPENSES_2024 : []);
          setConflicts(year === "2024" ? MOCK_CONFLICTS_2024 : []);
        }
      }
    }
    loadAll();
    return () => { aborted = true; };
  }, [year]);

  // KPI
  const totalInc = useMemo(() => sum(incomes.filter(byYear(year)), "amount"), [incomes, year]);
  const totalExp = useMemo(() => sum(expenses.filter(byYear(year)), "amount"), [expenses, year]);
  const balance = totalInc - totalExp;

  // Serie grafiche
  const incomesByMonth = useMemo(() => groupByMonthSum(incomes.filter(byYear(year))), [incomes, year]);
  const expensesByMonth = useMemo(() => groupByMonthSum(expenses.filter(byYear(year))), [expenses, year]);
  const balanceByMonth = useMemo(
    () => incomesByMonth.map((r, i) => ({ label: r.label, value: r.value - (expensesByMonth[i]?.value ?? 0) })),
    [incomesByMonth, expensesByMonth]
  );

  // Filtro grafico
  type Metric = "entrate" | "spese" | "saldo";
  const [metric, setMetric] = useState<Metric>("entrate");

  const chartTitle =
    metric === "entrate" ? `Entrate per mese (${year})` :
    metric === "spese"  ? `Spese per mese (${year})` :
                          `Saldo per mese (${year})`;

  const chartData =
    metric === "entrate" ? incomesByMonth :
    metric === "spese"  ? expensesByMonth :
                          balanceByMonth;

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Image src="/images/hero.jpg" alt="" fill className="object-cover -z-10" />
        {/* overlay scuro per testo leggibile */}
        <div className="absolute inset-0 bg-black/50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            La Repubblica degli Italiani nel Mondo • Trasparenza
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Bilanci e rendicontazione
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Entrate, spese e documenti ufficiali. Dati chiari, scaricabili e aggiornati.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={`/data/incomes-${year}.csv`}
              className="rounded-xl bg-white text-slate-900 px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              Entrate {year} (CSV)
            </a>
            <a
              href={`/data/expenses-${year}.csv`}
              className="rounded-xl ring-2 ring-white/80 text-white px-4 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Spese {year} (CSV)
            </a>
          </div>
        </div>
      </section>

      {/* OVERVIEW KPI */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-4">
          <label className="text-sm">
            Anno
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="ml-2 rounded-xl border px-3 py-2 text-sm text-slate-900"
            >
              {YEARS.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-6">
          <KPI k={formatEUR(totalInc)} l={`Entrate ${year}`} />
          <KPI k={formatEUR(totalExp)} l={`Spese ${year}`} />
          <KPI k={formatEUR(balance)} l={`Saldo ${year}`} />
        </div>
      </section>

      {/* GRAFICO */}
      <section className="py-10 bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">{chartTitle}</h2>
              <p className="text-slate-600">Somma mensile. Usa il selettore per cambiare metrica.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMetric("entrate")}
                className={`rounded-xl px-3 py-1.5 text-sm font-semibold border ${metric === "entrate" ? "bg-indigo-600 text-white border-indigo-600" : "hover:bg-white"}`}
                aria-pressed={metric === "entrate"}
              >
                Entrate
              </button>
              <button
                onClick={() => setMetric("spese")}
                className={`rounded-xl px-3 py-1.5 text-sm font-semibold border ${metric === "spese" ? "bg-indigo-600 text-white border-indigo-600" : "hover:bg-white"}`}
                aria-pressed={metric === "spese"}
              >
                Spese
              </button>
              <button
                onClick={() => setMetric("saldo")}
                className={`rounded-xl px-3 py-1.5 text-sm font-semibold border ${metric === "saldo" ? "bg-indigo-600 text-white border-indigo-600" : "hover:bg-white"}`}
                aria-pressed={metric === "saldo"}
              >
                Saldo
              </button>
            </div>
          </header>

          <BarChart title={chartTitle} data={chartData} height={260} valueFormatter={formatEUR} />
        </div>
      </section>

      {/* CONFLITTI */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Dichiarazioni di conflitto d’interesse</h2>
          <p className="text-slate-600">Dichiarazioni annuali degli organi e dirigenti.</p>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {conflicts.length === 0 ? (
              <p className="text-slate-600">Nessuna dichiarazione pubblicata per {year}.</p>
            ) : (
              conflicts.map((c) => (
                <details key={c.id} className="rounded-2xl border bg-white p-5 shadow-sm open:shadow-md transition-shadow">
                  <summary className="cursor-pointer list-none">
                    <span className="font-semibold">{c.person}</span>{" "}
                    <span className="text-slate-600">— {c.role}</span>
                    <span className="text-slate-500 text-sm"> • {fmt(c.date)}</span>
                  </summary>
                  <p className="mt-2 text-slate-700">{c.statement}</p>
                </details>
              ))
            )}
          </div>
        </div>
      </section>

      {/* DOCUMENTI */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          <DocCard title="Manifesto politico" desc="Principi e obiettivi dell’associazione." primary={{ href: "/docs/manifesto.pdf", label: "Apri Manifesto (PDF)" }} />
          <DocCard title="Statuto dell’associazione" desc="Regole organizzative e funzionamento interno." primary={{ href: "/docs/statuto.pdf", label: "Apri Statuto (PDF)" }} />
          <DocCard title={`Bilancio d’esercizio ${year}`} desc="Rendiconto economico-finanziario completo." primary={{ href: `/docs/bilancio-${year}.pdf`, label: `Apri Bilancio ${year} (PDF)` }} />
        </div>

        <p className="mt-6 text-xs text-slate-500">
          Ultimo aggiornamento: {lastUpdated || "—"}. Per segnalazioni scrivi a{" "}
          <a className="underline" href="mailto:trasparenza@cittafutura.it">trasparenza@cittafutura.it</a>.
        </p>
      </section>
    </main>
  );
}

/* --------- UI --------- */
function KPI({ k, l }: { k: string; l: string }) {
  return (
    <div className="rounded-2xl border p-6 text-center bg-white shadow-sm">
      <div className="text-2xl sm:text-3xl font-extrabold">{k}</div>
      <div className="mt-1 text-xs text-slate-600">{l}</div>
    </div>
  );
}
function DocCard({ title, desc, primary }: { title: string; desc: string; primary: { href: string; label: string } }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-slate-600">{desc}</p>
      <div className="mt-4">
        <a href={primary.href} className="inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
          {primary.label}
        </a>
      </div>
    </div>
  );
}

/* --------- Grafico (SVG) --------- */
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
  const PAD_T = 16;
  const PAD_B = 28;
  const PAD_L = horizontal ? 140 : 28;
  const PAD_R = horizontal ? 80 : 28;

  const w = width;
  const h = height;
  const max = Math.max(1, ...data.map((d) => d.value));

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
              const valueX = Math.min(x + val + 8, w - PAD_R + 2);
              return (
                <g key={i}>
                  <rect x={x} y={y} width={val} height={size} fill={color} opacity={0.9} />
                  <text x={PAD_L - 8} y={y + size / 2 + 4} textAnchor="end" fontSize="12" fill="#334155">
                    {truncate(d.label, 28)}
                  </text>
                  <text x={valueX} y={y + size / 2 + 4} fontSize="12" fill="#334155">
                    {valueFormatter(d.value)}
                  </text>
                </g>
              );
            } else {
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
