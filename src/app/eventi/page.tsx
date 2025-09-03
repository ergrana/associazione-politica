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
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [cat, q, onlyUpcoming]);

  return (
    <main className="min-h-screen">
      {/* HERO identico */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-indigo-500 to-amber-500 opacity-90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            Città Futura • Eventi
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Eventi e iniziative
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Assemblee pubbliche, incontri, volontariato: tutte le occasioni per partecipare.
          </p>

          {/* Filtri identici (pill) + toggle “solo futuri” + search */}
          <div className="mt-6 flex flex-wrap gap-2">
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
          </div>
        </div>
      </section>

      {/* LISTA — card come prima: badge data in overlay, categoria, luogo, CTA */}
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
                  {/* Badge data in alto a sinistra (overlay) */}
                  <div className="absolute top-3 left-3 rounded-xl bg-white/95 text-slate-900 px-3 py-1 text-xs font-semibold shadow">
                    {fmtBadgeDate(e.date, e.end)}
                  </div>
                  {/* Pill categoria in alto a destra (overlay) */}
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

                  {/* Riga luogo */}
                  <div className="mt-3 text-sm text-slate-700">
                    📍 {e.place} — {e.address}, {e.city}
                  </div>

                  {/* CTA come prima: primario “Dettagli”, secondario “RSVP” se presente */}
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
                        Iscriviti / RSVP
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA: proponi un evento */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Vuoi proporre un evento?</h2>
          <p className="mt-2 text-slate-600">
            Invia luogo, data e descrizione: il nostro team valuterà l’inserimento nel calendario.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="/contatti"
              className="inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Contattaci
            </a>
            <a
              href="/partecipa"
              className="inline-flex rounded-xl border px-5 py-3 font-semibold hover:bg-white"
            >
              Diventa volontario
            </a>
          </div>
        </div>
      </section>

      {/* CALENDARIO mensile (semplice, con puntini per giorni con eventi) */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Calendar EVENTS={EVENTS} />
        </div>
      </section>
    </main>
  );
}

/* ---------- Helpers (stessi formati di prima) ---------- */
function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
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
  const sameDay = s.toDateString() === e.toDateString();
  const day2 = e.toLocaleDateString("it-IT", { day: "2-digit" });
  const mon2 = e.toLocaleDateString("it-IT", { month: "short" });
  return sameDay ? `${day} ${mon}` : `${day} ${mon} → ${day2} ${mon2}`;
}

/* ===================== CALENDARIO COMPONENT ===================== */

function Calendar({ EVENTS }: { EVENTS: typeof import("@/lib/content").EVENTS }) {
  const [cursor, setCursor] = useState(startOfMonth(new Date()));

  const eventsByDay = useMemo(() => groupEventsByDay(EVENTS), [EVENTS]);
  const weeks = buildMonthMatrix(cursor);

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

  const monthLabel = cursor.toLocaleDateString("it-IT", { month: "long", year: "numeric" });

  return (
    <div className="rounded-2xl border bg-white p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Calendario eventi — {capitalize(monthLabel)}</h3>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50">← Mese prec.</button>
          <button onClick={nextMonth} className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50">Mese succ. →</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-600 mb-1">
        {["Lun","Mar","Mer","Gio","Ven","Sab","Dom"].map(d => <div key={d} className="py-2">{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.map((week, wi) =>
          week.map((day, di) => {
            const isCurrentMonth = day.getMonth() === cursor.getMonth();
            const key = dayKey(day);
            const dayEvents = eventsByDay.get(key) || [];
            return (
              <div
                key={`${wi}-${di}`}
                className={`min-h-24 rounded-xl border p-2 text-sm ${isCurrentMonth ? "bg-white" : "bg-slate-50 text-slate-400"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{day.getDate()}</span>
                  {dayEvents.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5">
                      ● {dayEvents.length}
                    </span>
                  )}
                </div>

                <ul className="mt-2 space-y-1">
                  {dayEvents.slice(0, 3).map((e) => (
                    <li key={e.id} className="truncate">
                      <Link
                        href={`/eventi/${e.id}`}
                        className="inline-block truncate text-indigo-700 hover:underline"
                        title={e.title}
                      >
                        {shortTime(e.date)} {e.title}
                      </Link>
                    </li>
                  ))}
                  {dayEvents.length > 3 && (
                    <li className="text-xs text-slate-500">+ {dayEvents.length - 3} altri…</li>
                  )}
                </ul>
              </div>
            );
          })
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 text-xs text-slate-600">
        I giorni con ● indicano la presenza di uno o più eventi. Clicca sul titolo per aprire la scheda evento.
      </div>
    </div>
  );
}

/* ---- funzioni calendario ---- */
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
function shortTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
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
/** Costruisce la matrice settimane per il mese del cursor (inizio lunedì) */
function buildMonthMatrix(cursor: Date) {
  const first = startOfMonth(cursor);
  const firstWeekday = (first.getDay() + 6) % 7; // 0 = lun, ... 6 = dom
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
