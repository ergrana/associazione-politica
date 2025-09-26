// src/app/prenotazioni/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/** ============================== CONFIG ============================== */
// Endpoint per ricevere le richieste (Formcarry o simile)
const FORMCARRY_URL_BOOKING = "https://formcarry.com/s/IL_TUO_ENDPOINT_PRENOTAZIONI";

// Indirizzo sede
const ADDRESS = "Viale Giuseppe Mazzini 73, 00195 Roma";

type SpaceType = "ufficio" | "sala";
type SpaceCfg = {
  id: SpaceType;
  title: string;
  subtitle: string;
  capacity: number;
  minPerHour: number;
  gallery: string[];
  features: string[];
};

const SPACES: Record<SpaceType, SpaceCfg> = {
  ufficio: {
    id: "ufficio",
    title: "Ufficio (1–2 postazioni)",
    subtitle: "Capienza 2 • Min 15 €/h",
    capacity: 2,
    minPerHour: 15,
    gallery: [
      "/images/spazi/ufficio/1.jpg",
      "/images/spazi/ufficio/2.jpg",
      "/images/spazi/ufficio/3.jpg",
      "/images/spazi/ufficio/4.jpg",
    ],
    features: ["Wi-Fi", "Scrivania", "Prese elettriche"],
  },
  sala: {
    id: "sala",
    title: "Sala riunioni (fino a 10 persone)",
    subtitle: "Capienza 10 • Min 30 €/h",
    capacity: 10,
    minPerHour: 30,
    gallery: [
      "/images/spazi/sala/1.jpg",
      "/images/spazi/sala/2.jpg",
      "/images/spazi/sala/3.jpg",
      "/images/spazi/sala/4.jpg",
    ],
    features: ["Wi-Fi", "Schermo/TV", "HDMI", "Lavagna"],
  },
};

/** ============================== PAGE ============================== */
export default function PrenotazioniPage() {
  return (
    <main className="min-h-screen">
      {/* HERO — stesso stile delle altre pagine */}
      <section className="relative overflow-hidden">
        <Image src="/images/hero.jpg" alt="" fill className="object-cover -z-10" />
        <div className="absolute inset-0 bg-black/55 -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-white/15 px-3 py-1 rounded-full">
            La Repubblica degli Italiani nel Mondo • Prenotazioni
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Prenota gli spazi della sede
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Ufficio e sala riunioni disponibili su prenotazione. Contributo libero con minimo orario per tipologia.
          </p>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold">Come funziona</h2>
            <div className="mt-3 text-slate-700 leading-relaxed">
              <p>
                Scegli lo <strong>spazio</strong>, la <strong>data</strong> e l’<strong>orario</strong>. Indica un{" "}
                <strong>contributo libero</strong> a tua scelta: il minimo si calcola in base alle ore prenotate
                (<em>Ufficio da 15 €/h</em>, <em>Sala riunioni da 30 €/h</em>). Dopo l’invio, ti scriveremo per
                confermare disponibilità e dettagli.
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
                <li>Fasce prenotabili: lun–ven, 9:00–19:00 (salvo eventi interni).</li>
                <li>Ufficio: 1–2 persone, Wi-Fi, prese, acqua/caffè.</li>
                <li>Sala riunioni: fino a 10 persone, TV/HDMI, Wi-Fi, tavolo riunioni.</li>
              </ul>
              <p className="mt-3 text-sm text-slate-500">
                Puoi versare in sede o via bonifico; il pagamento online (Stripe) arriverà prossimamente.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Servizi inclusi</h3>
            <ul className="mt-2 text-sm text-slate-700 space-y-1">
              <li>• Wi-Fi ad alta velocità</li>
              <li>• Energia elettrica e climatizzazione</li>
              <li>• Acqua e caffè</li>
              <li>• Assistenza di segreteria (su richiesta)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* DOVE SI TROVA LA SEDE */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold">Dove si trova la sede</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-2xl overflow-hidden border">
            <ClickableMap address={ADDRESS} />
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Viale Giuseppe Mazzini 73</h3>
            <p className="mt-2 text-slate-700 leading-relaxed">
              Siamo a <strong>Roma, quartiere Prati</strong>, lungo Viale Mazzini. Ben collegati con metro e bus,
              a pochi minuti da Piazzale Clodio e dal Lungotevere. Nelle vicinanze sono disponibili parcheggi e
              servizi di ristorazione.
            </p>
            <div className="mt-4 text-sm text-slate-700">
              <div>📍 {ADDRESS}</div>
              <a
                className="mt-2 inline-flex rounded-xl border px-4 py-2 font-semibold hover:bg-slate-50"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apri su Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRENOTA — STEP 1 + STEP 2 */}
      <section className="pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <BookingSection />
      </section>

      {/* CTA finale */}
      <section className="py-16 bg-slate-50 border-y">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Hai esigenze particolari?</h2>
          <p className="mt-2 text-slate-600">
            Per eventi, orari extra o servizi aggiuntivi, scrivici: troviamo insieme la soluzione migliore.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/contatti"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Contattaci
            </Link>
            <a
              href={`mailto:info@cittafutura.it?subject=Richiesta%20personalizzata%20spazi&body=Ciao%2C%20vorrei%20informazioni%20su%20una%20prenotazione%20personalizzata.`}
              className="rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Scrivici via email
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================== BOOKING SECTION ============================== */

function BookingSection() {
  const [space, setSpace] = useState<SpaceType>("ufficio");

  // Modal galleria
  const [galleryFor, setGalleryFor] = useState<SpaceType | null>(null);

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* STEP 1: Scegli lo spazio */}
        <div className="lg:col-span-1">
          <h3 className="text-base font-semibold text-slate-600">
            <span className="mr-2 rounded-full bg-indigo-600/10 px-2.5 py-0.5 text-indigo-700 text-xs font-bold">1</span>
            Scegli lo spazio
          </h3>

          <div className="mt-3 space-y-4">
            {Object.values(SPACES).map((s) => (
              <SpaceCard
                key={s.id}
                space={s}
                selected={space === s.id}
                onSelect={() => setSpace(s.id)}
                onOpenGallery={() => setGalleryFor(s.id)}
              />
            ))}
          </div>
        </div>

        {/* STEP 2: Compila i dettagli */}
        <div className="lg:col-span-2">
          <h3 className="text-base font-semibold text-slate-600">
            <span className="mr-2 rounded-full bg-indigo-600/10 px-2.5 py-0.5 text-indigo-700 text-xs font-bold">2</span>
            Inserisci i dettagli e invia
          </h3>
          <div className="mt-3 rounded-2xl border bg-white p-6 shadow-sm">
            <BookingForm selectedSpace={space} />
          </div>
        </div>
      </div>

      {/* MODAL GALLERIA */}
      {galleryFor && (
        <ModalCarousel
          images={SPACES[galleryFor].gallery}
          title={SPACES[galleryFor].title}
          onClose={() => setGalleryFor(null)}
        />
      )}
    </>
  );
}

/* ===== SpaceCard (selezione con foto + bottone "Vedi foto") ===== */
function SpaceCard({
  space,
  selected,
  onSelect,
  onOpenGallery,
}: {
  space: (typeof SPACES)[SpaceType];
  selected: boolean;
  onSelect: () => void;
  onOpenGallery: () => void;
}) {
  const cover = space.gallery[0];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border px-3.5 py-3 shadow-sm hover:shadow-md transition relative
      ${selected ? "ring-2 ring-indigo-600 border-indigo-600/60" : "border-slate-300"}`}
    >
      <div className="flex gap-3">
        <div className="h-24 w-36 overflow-hidden rounded-xl flex-shrink-0">
          <Image src={cover} alt="" width={320} height={214} className="h-24 w-36 object-cover" />
        </div>
        <div className="min-w-0">
          <div className="text-lg font-semibold">{space.title}</div>
          <div className="text-sm text-slate-600">{space.subtitle}</div>
          <div className="mt-2 text-sm text-slate-700">{space.features.join(" • ")}</div>

          {/* Bottone Vedi foto (non cambia la selezione) */}
          <div className="mt-2">
            <span
              onClick={(e) => {
                e.stopPropagation();
                onOpenGallery();
              }}
              className="inline-flex cursor-pointer rounded-xl border px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"
            >
              Vedi foto
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

/* ============================== FORM ============================== */

function BookingForm({ selectedSpace }: { selectedSpace: SpaceType }) {
  const cfg = SPACES[selectedSpace];

  const [date, setDate] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [people, setPeople] = useState<number>(1);
  const [donation, setDonation] = useState<number>(cfg.minPerHour);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const durationHours = useMemo(() => {
    if (!start || !end) return 0;
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const mins = eh * 60 + em - (sh * 60 + sm);
    return mins > 0 ? mins / 60 : 0;
  }, [start, end]);

  const minDonationComputed = useMemo(() => {
    const base = cfg.minPerHour;
    return durationHours > 0 ? Math.ceil(durationHours * base) : base;
  }, [cfg.minPerHour, durationHours]);

  useEffect(() => {
    setPeople(1);
    setDonation(SPACES[selectedSpace].minPerHour);
  }, [selectedSpace]);

  const valid =
    date &&
    start &&
    end &&
    durationHours > 0 &&
    people >= 1 &&
    people <= cfg.capacity &&
    name &&
    surname &&
    email &&
    donation >= minDonationComputed &&
    privacy;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setErr(null);
    setOk(false);
    try {
      const form = new FormData();
      form.set("space", selectedSpace);
      form.set("date", date);
      form.set("start", start);
      form.set("end", end);
      form.set("duration_hours", String(durationHours));
      form.set("people", String(people));
      form.set("donation_eur", String(donation));
      form.set("name", name);
      form.set("surname", surname);
      form.set("email", email);
      form.set("phone", phone);
      form.set("note", note);
      form.set("_subject", "Nuova richiesta prenotazione sede");
      form.set("_gotcha", "");

      const res = await fetch(FORMCARRY_URL_BOOKING, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: form,
      });

      if (res.ok) {
        setOk(true);
        setDate("");
        setStart("");
        setEnd("");
        setPeople(1);
        setDonation(cfg.minPerHour);
        setName("");
        setSurname("");
        setEmail("");
        setPhone("");
        setNote("");
        setPrivacy(false);
      } else {
        const j = await res.json().catch(() => null);
        setErr(j?.message || "Invio non riuscito. Riprova più tardi.");
      }
    } catch {
      setErr("Connessione non riuscita. Controlla la rete e riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <SummaryPill
        spaceTitle={cfg.title}
        durationHours={durationHours}
        people={people}
        minDonation={minDonationComputed}
      />

      <div className="grid sm:grid-cols-3 gap-4">
        <Input name="date" label="Data" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <Input name="start" label="Inizio" type="time" value={start} onChange={(e) => setStart(e.target.value)} required />
        <Input name="end" label="Fine" type="time" value={end} onChange={(e) => setEnd(e.target.value)} required />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 items-end">
        <Input
          name="people"
          label={`Partecipanti (max ${cfg.capacity})`}
          type="number"
          min={1}
          max={cfg.capacity}
          value={people}
          onChange={(e) => setPeople(Number(e.target.value || 1))}
          required
        />
        <div className="sm:col-span-2">
          <Input
            name="donation"
            label={`Contributo libero in € (minimo ${minDonationComputed})`}
            type="number"
            min={minDonationComputed}
            step="1"
            value={donation}
            onChange={(e) => setDonation(Number(e.target.value || minDonationComputed))}
            required
          />
          <p className="mt-1 text-xs text-slate-500">
            Il minimo si adatta automaticamente alla durata inserita (tariffa base {cfg.minPerHour} €/h).
          </p>
          {donation < minDonationComputed && (
            <p className="text-xs text-rose-600 mt-1">Aumenta l’importo per raggiungere il minimo richiesto.</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input name="name" label="Nome *" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input name="surname" label="Cognome *" value={surname} onChange={(e) => setSurname(e.target.value)} required />
        <Input name="email" label="Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input name="phone" label="Telefono" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <Textarea
        name="note"
        label="Note (opzionale)"
        placeholder="Es. esigenze tecniche, disposizione tavoli, accessibilità…"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <label className="text-sm text-slate-600">
        <input type="checkbox" className="mr-2" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} required />
        Ho letto e accetto l’{" "}
        <Link href="/privacy" className="underline">
          informativa privacy
        </Link>{" "}
        *
      </label>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={!valid || loading}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          aria-busy={loading}
        >
          {loading ? "Invio in corso…" : "Invia richiesta di prenotazione"}
        </button>

        <span className="sr-only" aria-live="polite">
          {ok ? "Invio riuscito" : err ? "Errore di invio" : ""}
        </span>
        {ok && <span className="text-sm text-emerald-600">Ricevuto! Ti contatteremo per confermare.</span>}
        {err && <span className="text-sm text-rose-600">{err}</span>}
      </div>
    </form>
  );
}

/* ============================== MODAL CAROUSEL ============================== */

function ModalCarousel({
  images,
  title,
  onClose,
}: {
  images: string[];
  title: string;
  onClose: () => void;
}) {
  const [i, setI] = useState(0);

  // blocca scroll body + gestione tastiera
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setI((p) => (p === 0 ? images.length - 1 : p - 1));
      if (e.key === "ArrowRight") setI((p) => (p === images.length - 1 ? 0 : p + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [images.length, onClose]);

  const prevImg = () => setI((p) => (p === 0 ? images.length - 1 : p - 1));
  const nextImg = () => setI((p) => (p === images.length - 1 ? 0 : p + 1));

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — galleria immagini`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold hover:bg-white"
          aria-label="Chiudi galleria"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative h-[65vh]">
          <Image
            src={images[i]}
            alt={`${title} — foto ${i + 1}`}
            fill
            className="object-contain"
            priority
          />
          <button
            onClick={prevImg}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold hover:bg-white"
            aria-label="Foto precedente"
          >
            ←
          </button>
          <button
            onClick={nextImg}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold hover:bg-white"
            aria-label="Foto successiva"
          >
            →
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 py-3 bg-black/30">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-2.5 w-2.5 rounded-full ${i === idx ? "bg-white" : "bg-white/50"}`}
              aria-label={`Vai alla foto ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================== UI BASICS ============================== */

function SummaryPill({
  spaceTitle,
  durationHours,
  people,
  minDonation,
}: {
  spaceTitle: string;
  durationHours: number;
  people: number;
  minDonation: number;
}) {
  return (
    <div className="rounded-xl border bg-white px-4 py-3 text-sm shadow-sm">
      <div className="font-semibold">{spaceTitle}</div>
      <div className="mt-0.5 text-slate-700">
        Durata: {durationHours > 0 ? `${durationHours.toFixed(1)} h` : "—"} • {people} {people === 1 ? "persona" : "persone"}
      </div>
      <div className="mt-1 text-slate-700">
        Minimo richiesto: <strong>{minDonation} €</strong>
      </div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, className = "", ...rest } = props;
  return (
    <label className="text-sm">
      <span className="block text-slate-700 mb-1">
        {label} {props.required ? <span className="text-rose-600" aria-hidden>*</span> : null}
      </span>
      <input {...rest} className={`w-full rounded-xl border px-4 py-2.5 ${className}`} />
    </label>
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  const { label, className = "", ...rest } = props;
  return (
    <label className="text-sm">
      <span className="block text-slate-700 mb-1">{label}</span>
      <textarea {...rest} className={`w-full rounded-xl border px-4 py-2.5 min-h-[110px] ${className}`} />
    </label>
  );
}

function ClickableMap({ address }: { address: string }) {
  const q = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps?q=${q}&z=16&output=embed`;
  return (
    <iframe
      src={mapUrl}
      title={`Mappa - ${address}`}
      className="w-full h-72"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
