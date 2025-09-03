import { EVENTS } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// genera gli id statici
export async function generateStaticParams() {
  return EVENTS.map((e) => ({ id: e.id }));
}

// metadata OG/Twitter per la condivisione
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const e = EVENTS.find((x) => x.id === id);
  if (!e) return {};

  const title = `${e.title} — Città Futura`;
  const description = e.description;
  const url = `https://example.com/eventi/${e.id}`; // ← metti il dominio reale al deploy

  return {
    title,
    description,
    openGraph: {
      type: "website", // ← fix: "event" non è valido in Next 15
      url,
      title,
      description,
      images: [{ url: e.cover, width: 1200, height: 630, alt: e.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [e.cover] },
  };
}

export default async function EventoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Next 15: await params
  const e = EVENTS.find((x) => x.id === id);
  if (!e) return notFound();

  const start = new Date(e.date);
  const end = e.end ? new Date(e.end) : undefined;

  // JSON-LD per migliorare la SEO come Evento (facoltativo ma utile)
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.description,
    startDate: new Date(e.date).toISOString(),
    endDate: e.end ? new Date(e.end).toISOString() : undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: e.place,
      address: `${e.address}, ${e.city}`,
    },
    image: [e.cover],
    organizer: { "@type": "Organization", name: "Città Futura" },
    url: `https://example.com/eventi/${e.id}`, // ← aggiorna dominio
  };

  return (
    <main className="min-h-screen">
      {/* Dati strutturati */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      {/* HERO coerente col resto del sito */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-indigo-500 to-amber-500 opacity-90" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
            {e.category} • {e.district ?? e.city}
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">{e.title}</h1>
          <p className="mt-3 max-w-2xl text-white/90">{e.description}</p>
          <div className="mt-4 text-white/90 text-sm">
            {formatDateTime(start, end)} • {e.place} — {e.address}, {e.city}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={buildIcs(e)}
              download={`${slugify(e.title)}.ics`}
              className="rounded-xl bg-white text-slate-900 px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              Aggiungi al calendario (.ics)
            </a>
            {e.rsvpUrl && (
              <a
                href={e.rsvpUrl}
                className="rounded-xl ring-2 ring-white/80 text-white px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                Iscriviti / RSVP
              </a>
            )}
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Image
          src={e.cover}
          alt={e.title}
          width={1600}
          height={900}
          className="rounded-2xl border w-full h-auto"
          priority
        />

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 prose prose-slate">
            <Markdown>{e.body || "Dettagli in aggiornamento."}</Markdown>
          </section>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">Dove</h3>
              <p className="text-sm text-slate-700 mt-1">
                {e.place}
                <br />
                {e.address}, {e.city}
              </p>
              <Map address={`${e.address}, ${e.city}`} />
            </div>
          </aside>
        </div>

        <div className="mt-10">
          <Link href="/eventi" className="text-sm font-semibold text-indigo-700">
            ← Torna agli Eventi
          </Link>
        </div>
      </article>
    </main>
  );
}

/* ---------------- Helpers (no client-side handlers qui) ---------------- */
function formatDateTime(start: Date, end?: Date) {
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  };
  const s = start.toLocaleString("it-IT", opts);
  if (!end) return s;
  const sameDay = start.toDateString() === end.toDateString();
  const e = end.toLocaleString("it-IT", sameDay ? { hour: "2-digit", minute: "2-digit" } : opts);
  return sameDay ? `${s} – ${e}` : `${s} → ${e}`;
}
function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
function toIcsDate(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}
function buildIcs(e: {
  title: string;
  description: string;
  date: string;
  end?: string;
  place: string;
  address: string;
  city: string;
}) {
  const dtStart = toIcsDate(new Date(e.date));
  const dtEnd = toIcsDate(e.end ? new Date(e.end) : new Date(new Date(e.date).getTime() + 60 * 60 * 1000));
  const loc = `${e.place} — ${e.address}, ${e.city}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CittaFutura//Eventi//IT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${slugify(e.title)}@cittafutura.local`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${e.title.replace(/[,;]/g, " ")}`,
    `DESCRIPTION:${e.description.replace(/[,;]/g, " ")}`,
    `LOCATION:${loc.replace(/[,;]/g, " ")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
}
function Markdown({ children }: { children: string }) {
  const html = children
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/^- (.*$)/gim, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");
  return <div className="prose" dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }} />;
}
function Map({ address }: { address: string }) {
  const q = encodeURIComponent(address);
  return (
    <iframe
      title={`Mappa - ${address}`}
      className="mt-3 h-56 w-full rounded-xl border"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps?q=${q}&output=embed`}
    />
  );
}
