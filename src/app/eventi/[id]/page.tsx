// src/app/eventi/[id]/page.tsx
import { EVENTS } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import EventTicketForm from "@/components/EventTicketForm";

/* ------------------------------- STATIC ----------------------------------- */

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const e = EVENTS.find((x) => x.id === id);
  if (!e) return {};

  const title = `${e.title} — Città Futura`;
  const description = e.description ?? "";
  const url = `https://example.com/eventi/${e.id}`; // ← aggiorna dominio

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: e.cover, width: 1200, height: 630, alt: e.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [e.cover] },
  };
}

/* --------------------------------- PAGE ---------------------------------- */

export default async function EventoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const e = EVENTS.find((x) => x.id === id);
  if (!e) return notFound();

  const start = new Date(e.date);
  const end = e.end ? new Date(e.end) : undefined;

  const currency = e.currency ?? "EUR";
  // Prezzo a persona: usa donationMin se presente, fallback 5 €
  const pricePerPerson = e.donationMin ?? 5;

  const addressFull = `${e.address}, ${e.city}`;
  const mapsQuery = encodeURIComponent(addressFull);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  const pageUrl = `https://example.com/eventi/${e.id}`; // ← aggiorna dominio

  // JSON-LD
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.description,
    startDate: new Date(e.date).toISOString(),
    endDate: e.end ? new Date(e.end).toISOString() : undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: e.place, address: addressFull },
    image: [absoluteAsset(e.cover)],
    organizer: { "@type": "Organization", name: "Città Futura" },
    url: pageUrl,
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      {/* HERO */}
      <header className="relative">
        <div className="relative h-[42rem] w-full overflow-hidden">
          <Image
            src={e.cover}
            alt={e.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-10">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-white/90 bg-white/10 ring-1 ring-white/30 px-3 py-1 rounded-full backdrop-blur">
              {e.category ?? "Evento"} • {e.district ?? e.city}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              {e.title}
            </h1>
            <p className="mt-2 text-white/90 max-w-2xl">{e.description}</p>

            <div className="mt-5 text-sm text-white/90">
              {formatDateTime(start, end)} • {e.place} — {addressFull}
            </div>

            {/* Bottoni calendario + Condividi */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={buildIcs(e)}
                download={`${slugify(e.title)}.ics`}
                className="rounded-xl bg-white text-slate-900 px-4 py-2 text-sm font-semibold hover:opacity-90"
              >
                Aggiungi al calendario (.ics)
              </a>
              <a
                href={buildGoogleCalUrl(e)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl ring-1 ring-white/80 text-white px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                Google Calendar
              </a>
              <a
                href={buildOutlookWebUrl(e)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl ring-1 ring-white/80 text-white px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                Outlook Web
              </a>

              {/* Condividi */}
              <div className="ml-1 flex items-center gap-2">
                <span className="text-xs text-white/80">Condividi:</span>

                <a
                  href={shareTwitter(pageUrl, e.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Condividi su X/Twitter"
                  className="w-9 h-9 rounded-full bg-white/15 ring-1 ring-white/30 flex items-center justify-center hover:bg-black hover:ring-black transition"
                  title="Condividi su X/Twitter"
                >
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                    <path className="text-white" d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                  </svg>
                </a>

                <a
                  href={shareFacebook(pageUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Condividi su Facebook"
                  className="w-9 h-9 rounded-full bg-white/15 ring-1 ring-white/30 flex items-center justify-center hover:bg-[#1877F2] hover:ring-[#1877F2] transition"
                  title="Condividi su Facebook"
                >
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                    <path className="text-white" d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                  </svg>
                </a>

                <a
                  href={shareWhatsApp(pageUrl, e.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Condividi su WhatsApp"
                  className="w-9 h-9 rounded-full bg-white/15 ring-1 ring-white/30 flex items-center justify-center hover:bg-[#25D366] hover:ring-[#25D366] transition"
                  title="Condividi su WhatsApp"
                >
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                    <path className="text-white" d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>
                </a>

                <a
                  href={shareTelegram(pageUrl, e.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Condividi su Telegram"
                  className="w-9 h-9 rounded-full bg-white/15 ring-1 ring-white/30 flex items-center justify-center hover:bg-[#0088cc] hover:ring-[#0088cc] transition"
                  title="Condividi su Telegram"
                >
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                    <path className="text-white" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spazio sotto hero */}
      <div className="h-8 lg:h-10" />

      {/* 3 riquadri */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* SINISTRA — Programma */}
          <div className="bg-white shadow-sm rounded-2xl p-5 min-h-[420px]">
            <h2 className="text-lg font-semibold">Programma</h2>

            {e.agenda?.length ? (
              <ol className="mt-6 relative">
                <span className="absolute left-3 top-0 bottom-0 w-px bg-slate-200" />
                {e.agenda.map(
                  (
                    step: { time?: string; title: string; description?: string },
                    idx: number
                  ) => (
                    <li key={idx} className="relative pl-10 py-5">
                      <span className="absolute left-0 top-6 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 rounded-full">
                        <span className="w-3 h-3 rounded-full bg-violet-600" />
                      </span>

                      <p className="text-violet-700 font-semibold text-sm leading-5">
                        {step.time ?? ""}
                      </p>
                      <p className="font-bold leading-6">{step.title}</p>

                      {step.description && (
                        <p className="text-slate-600 text-sm mt-1">{step.description}</p>
                      )}
                    </li>
                  )
                )}
              </ol>
            ) : (
              <p className="mt-2 text-slate-600 text-sm">Il programma sarà pubblicato a breve.</p>
            )}
          </div>

          {/* CENTRO — Prenotazione & pagamento */}
          <div className="bg-white shadow-sm rounded-2xl p-5 min-h-[420px] flex flex-col">
            <h2 className="text-lg font-semibold">Prenota i biglietti</h2>
            <p className="text-sm text-slate-700 mt-1">
              Prezzo a persona: <strong>{formatCurrency(pricePerPerson, currency)}</strong>
            </p>

            <div className="mt-4" id="iscriviti">
              <EventTicketForm
                eventId={e.id}
                title={e.title}
                pricePerPerson={pricePerPerson}
                currency={currency}
                successUrl={`https://example.com/eventi/${e.id}?ok=1`}
                cancelUrl={`https://example.com/eventi/${e.id}?canceled=1`}
              />
            </div>

            <div className="mt-auto rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
              Pagamento sicuro su Stripe; i dati della carta non transitano sui nostri server.
            </div>
          </div>

          {/* DESTRA — Mappa full-card */}
          <div className="bg-white shadow-sm rounded-2xl overflow-hidden min-h-[420px] relative">
            <iframe
              title={`Mappa - ${addressFull}`}
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[420px]"
            />
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Apri su Google Maps: ${addressFull}`}
              className="absolute inset-0"
            />
          </div>
        </div>

        <div className="mt-12">
          <Link href="/eventi" className="text-sm font-semibold text-violet-700 hover:underline">
            ← Torna agli Eventi
          </Link>
        </div>
      </section>

      <div className="h-10" />
    </main>
  );
}

/* ------------------------------- HELPERS ---------------------------------- */

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
    // @ts-ignore
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

function escapeIcs(s: string) {
  return s.replace(/([,;])/g, " ").replace(/\r?\n/g, "\\n");
}

function buildIcs(e: {
  title: string;
  description?: string;
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
    `SUMMARY:${escapeIcs(e.title)}`,
    `DESCRIPTION:${escapeIcs(e.description ?? "")}`,
    `LOCATION:${escapeIcs(loc)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
}

function buildGoogleCalUrl(e: {
  title: string;
  description?: string;
  date: string;
  end?: string;
  place: string;
  address: string;
  city: string;
}) {
  const text = encodeURIComponent(e.title);
  const details = encodeURIComponent(e.description ?? "");
  const location = encodeURIComponent(`${e.place} — ${e.address}, ${e.city}`);
  const dates = `${toIcsDate(new Date(e.date)).replace(/[-:]/g, "")}/${toIcsDate(
    e.end ? new Date(e.end) : new Date(new Date(e.date).getTime() + 60 * 60 * 1000),
  ).replace(/[-:]/g, "")}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&location=${location}&details=${details}`;
}

function buildOutlookWebUrl(e: {
  title: string;
  description?: string;
  date: string;
  end?: string;
  place: string;
  address: string;
  city: string;
}) {
  const subject = encodeURIComponent(e.title);
  const body = encodeURIComponent(e.description ?? "");
  const location = encodeURIComponent(`${e.place} — ${e.address}, ${e.city}`);
  const fmt = (d: Date) =>
    `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(
      2,
      "0",
    )}T${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}:00`;
  const start = fmt(new Date(e.date));
  const end = fmt(e.end ? new Date(e.end) : new Date(new Date(e.date).getTime() + 60 * 60 * 1000));
  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${subject}&startdt=${start}&enddt=${end}&location=${location}&body=${body}`;
}

// utile quando e.cover è un path relativo in /public
function absoluteAsset(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `https://example.com${path}`;
}

// currency formatter
function formatCurrency(n: number, currency = "EUR") {
  return new Intl.NumberFormat("it-IT", { style: "currency", currency }).format(n);
}

/* --------- Share helpers --------- */
function shareTwitter(url: string, text: string) {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
}
function shareFacebook(url: string) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}
function shareWhatsApp(url: string, text: string) {
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`;
}
function shareTelegram(url: string, text: string) {
  return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
}
