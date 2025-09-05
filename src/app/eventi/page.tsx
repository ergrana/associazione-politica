// src/app/eventi/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { EVENTS } from "@/lib/content";

/** Stesse categorie/UX di prima */
const CATEGORIES = [
  "Tutti",
  "Assemblea",
  "Incontro",
  "Volontariato",
  "Laboratorio",
  "Campagna",
] as const;

export default function EventiPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Tutti");
  const [q, setQ] = useState("");
  const [onlyUpcoming, setOnlyUpcoming] = useState(true);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const list = useMemo(() => {
    const now = new Date();
    return EVENTS
      .filter((e) => (cat === "Tutti" ? true : e.category === cat))
      .filter((e) => {
        if (!onlyUpcoming) return true;
        return new Date(e.date) >= startOfDay(now);
      })
      .filter((e) => {
        if (!q) return true;
        const hay = (e.title + e.description + e.city + e.place).toLowerCase();
        return hay.includes(q.toLowerCase());
      })
      .filter((e) => {
        if (!selectedDay) return true;
        return sameDay(new Date(e.date), selectedDay);
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [cat, q, onlyUpcoming, selectedDay]);

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Image
  src="/images/hero.jpg"
  alt=""
  fill
  className="object-cover -z-10"
/>
<div className="absolute inset-0 bg-black/50 -z-10" /> {/* overlay scuro per testo leggibile */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            La Repubblica degli Italiani nel Mondo • Eventi
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Eventi e iniziative
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Assemblee pubbliche, incontri, volontariato: tutte le occasioni per partecipare.
          </p>

          {/* Filtri + Ricerca + Tendina Calendario */}
          <div className="mt-6">
            {/* pill categorie */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                    cat === c
                      ? "bg-white text-slate-900"
                      : "bg-white/15 text-white hover:bg-white/25"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* barra ricerca + toggle “solo futuri” */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={onlyUpcoming}
                  onChange={(e) => setOnlyUpcoming(e.target.checked)}
                />
                Mostra solo eventi futuri
              </label>

              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cerca titolo, luogo o città…"
                className="rounded-xl bg-white/95 text-slate-900 px-4 py-2 text-sm w-full sm:w-80"
              />

              <button
                onClick={() => setShowCalendar((v) => !v)}
                className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-white/10"
                aria-expanded={showCalendar}
                aria-controls="calendar-dropdown"
                title="Filtra per data"
              >
                <span aria-hidden>📅</span> Calendario
              </button>

              {selectedDay && (
                <button
                  onClick={() => setSelectedDay(null)}
                  className="rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-white/10"
                  title="Rimuovi filtro per giorno"
                >
                  Pulisci giorno
                </button>
              )}
            </div>

            {/* TENDINA CALENDARIO */}
            <div
              id="calendar-dropdown"
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                showCalendar ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-3 rounded-2xl bg-white/95 text-slate-900 p-3 shadow-sm border w-full sm:w-[360px]">
                <MiniCalendar selected={selectedDay} onSelect={setSelectedDay} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LISTA */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {list.length === 0 ? (
          <p className="text-slate-600">Nessun evento trovato.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((e) => (
              <article
                key={e.id}
                className="group rounded-2xl border bg-white overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/eventi/${e.id}`} className="block relative">
                  <Image
                    src={e.cover}
                    alt={e.title}
                    width={800}
                    height={450}
                    className="w-full h-48 object-cover"
                    priority={false}
                  />
                  {/* Badge data */}
                  <div className="absolute top-3 left-3 rounded-xl bg-white/95 text-slate-900 px-3 py-1 text-xs font-semibold shadow">
                    {fmtBadgeDate(e.date, e.end)}
                  </div>
                  {/* Categoria */}
                  <div className="absolute top-3 right-3 rounded-full bg-black/40 text-white px-3 py-1 text-xs font-semibold">
                    {e.category}
                  </div>
                </Link>

                <div className="p-5">
                  <div className="text-xs text-slate-500">
                    {fmtCity(e)} • {fmtShortDate(e.date)}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">{e.title}</h3>
                  <p className="mt-2 text-slate-600 line-clamp-3">{e.description}</p>

                  <div className="mt-3 text-sm text-slate-700">
                    📍 {e.place} — {e.address}, {e.city}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/eventi/${e.id}`}
                      className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      Dettagli
                    </Link>
                    {e.rsvpUrl && (
                      <a
                        href={e.rsvpUrl}
                        className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                        onClick={(ev) => ev.stopPropagation()}
                      >
                        Iscriviti
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA: proponi un evento (solo “Contattaci”) */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Vuoi proporre un evento?</h2>
          <p className="mt-2 text-slate-600">
            Invia luogo, data e descrizione: il nostro team valuterà l’inserimento nel calendario.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <a
              href="/contatti"
              className="inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Contattaci
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Helpers ---------- */
function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function fmtShortDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("it-IT", { year: "numeric", month: "short", day: "2-digit" });
}
function fmtCity(e: { city: string; district?: string }) {
  return e.district ? `${e.city} — ${e.district}` : e.city;
}
function fmtBadgeDate(iso: string, end?: string) {
  const s = new Date(iso);
  const e = end ? new Date(end) : undefined;
  const day = s.toLocaleDateString("it-IT", { day: "2-digit" });
  const mon = s.toLocaleDateString("it-IT", { month: "short" });
  if (!e) return `${day} ${mon}`;
  const same = s.toDateString() === e.toDateString();
  const day2 = e.toLocaleDateString("it-IT", { day: "2-digit" });
  const mon2 = e.toLocaleDateString("it-IT", { month: "short" });
  return same ? `${day} ${mon}` : `${day} ${mon} → ${day2} ${mon2}`;
}

/* ===================== MINI CALENDAR (compatto) ===================== */
function MiniCalendar({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
}) {
  const [cursor, setCursor] = useState(startOfMonth(new Date()));
  const eventsByDay = useMemo(() => groupEventsByDay(EVENTS), []);
  const weeks = buildMonthMatrix(cursor);
  const monthLabel = cursor.toLocaleDateString("it-IT", { month: "long", year: "numeric" });

  function prevMonth() {
    const d = new Date(cursor);
    d.setMonth(d.getMonth() - 1);
    setCursor(startOfMonth(d));
  }
  function nextMonth() {
    const d = new Date(cursor);
    d.setMonth(d.getMonth() + 1);
    setCursor(startOfMonth(d));
  }

  return (
    <div aria-label="Mini calendario per filtrare gli eventi">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={prevMonth}
          className="rounded-lg border px-2 py-1 text-xs hover:bg-slate-50"
          aria-label="Mese precedente"
        >
          ←
        </button>
        <div className="text-sm font-semibold">{capitalize(monthLabel)}</div>
        <button
          onClick={nextMonth}
          className="rounded-lg border px-2 py-1 text-xs hover:bg-slate-50"
          aria-label="Mese successivo"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-slate-600 mb-1">
        {["Lun","Mar","Mer","Gio","Ven","Sab","Dom"].map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.map((week, wi) =>
          week.map((day, di) => {
            const isCurrent = day.getMonth() === cursor.getMonth();
            const key = dayKey(day);
            const hasEvents = (eventsByDay.get(key) || []).length > 0;
            const isSelected = selected && sameDay(day, selected);

            return (
              <button
                type="button"
                key={`${wi}-${di}`}
                onClick={() => onSelect(new Date(day))}
                className={[
                  "min-h-8 rounded-lg border text-xs py-1",
                  isCurrent ? "bg-white" : "bg-slate-50 text-slate-400",
                  isSelected ? "ring-2 ring-indigo-600" : "",
                  "hover:bg-slate-100",
                ].join(" ")}
                title={hasEvents ? "Ci sono eventi in questo giorno" : undefined}
              >
                {/* Numero del giorno: rosso scuro se sono presenti eventi */}
                <span
                  className={[
                    "leading-none",
                    hasEvents ? "text-red-800 font-semibold" : "",
                  ].join(" ")}
                >
                  {day.getDate()}
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ---- funzioni calendario riusate ---- */
function startOfMonth(d: Date) {
  const x = new Date(d);
  x.setDate(1);
  x.setHours(0, 0, 0, 0);
  return x;
}
function dayKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
}
function groupEventsByDay(events: typeof EVENTS) {
  const map = new Map<string, typeof EVENTS>();
  for (const e of events) {
    const key = dayKey(new Date(e.date));
    const arr = map.get(key) || [];
    arr.push(e);
    map.set(key, arr);
  }
  return map;
}
function buildMonthMatrix(cursor: Date) {
  const first = startOfMonth(cursor);
  const firstWeekday = (first.getDay() + 6) % 7; // 0 = lun
  const start = new Date(first);
  start.setDate(first.getDate() - firstWeekday);

  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w++) {
    const row: Date[] = [];
    for (let d = 0; d < 7; d++) {
      const cell = new Date(start);
      cell.setDate(start.getDate() + w * 7 + d);
      row.push(cell);
    }
    weeks.push(row);
  }
  return weeks;
}
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
