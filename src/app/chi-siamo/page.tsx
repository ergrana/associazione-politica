// src/app/chi-siamo/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Chi siamo — La Repubblica degli Italiani nel Mondo",
  description: "Volti, ruoli e contatti diretti dell’associazione.",
};

type Member = {
  name: string;
  role: string;
  img: string;
  bio: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  linkedin?: string;
};

const TEAM: Member[] = [
  {
    name: "Nome Cognome",
    role: "Presidente",
    img: "/images/about/Presidente.jpg",
    bio: "Guida la strategia e le relazioni istituzionali dell’associazione.",
    email: "presidente@cittafutura.it",
    phone: "+39 06 0000 0000",
    whatsapp: "+39 333 0000000",
    facebook: "https://facebook.com/username",
    linkedin: "https://www.linkedin.com/in/username/",
  },
  {
    name: "Nome Cognome",
    role: "Vice-Presidente",
    img: "/images/about/Vice-Presidente.jpg",
    bio: "Coordina progetti, gruppi territoriali e programmi per i giovani.",
    email: "vicepresidenza@cittafutura.it",
    phone: "+39 06 0000 0001",
    whatsapp: "+39 333 0000001",
    facebook: "https://facebook.com/username",
    linkedin: "https://www.linkedin.com/in/username/",
  },
  {
    name: "Nome Cognome",
    role: "Segretario Generale",
    img: "/images/about/Segretario Generale.jpg",
    bio: "Gestisce adesioni, calendario e comunicazioni interne ai soci.",
    email: "segreteria@cittafutura.it",
    phone: "+39 06 0000 0002",
    whatsapp: "+39 333 0000002",
    facebook: "https://facebook.com/username",
    linkedin: "https://www.linkedin.com/in/username/",
  },
  {
    name: "Nome Cognome",
    role: "Revisore dei Conti",
    img: "/images/about/Revisore dei Conti.jpg",
    bio: "Supervisiona bilanci, donazioni e rendicontazione trasparente.",
    email: "revisore@cittafutura.it",
    phone: "+39 06 0000 0003",
    whatsapp: "+39 333 0000003",
    facebook: "https://facebook.com/username",
    linkedin: "https://www.linkedin.com/in/username/",
  },
];

/* ===== Helpers ===== */
const telHref = (pretty?: string) =>
  pretty ? "tel:" + pretty.replace(/[^\d+]/g, "") : undefined;

const waHref = (pretty?: string) =>
  pretty
    ? `https://wa.me/${pretty.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
        "Ciao! Ti scrivo dal sito dell'associazione."
      )}`
    : undefined;

/* ===== Icone (SVG) ===== */
const IconMail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm8 8 9-6V7l-9 6L3 7v.9l9 6z"
    />
  </svg>
);

const IconPhone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M6.6 2.7c.3-.7 1-1.1 1.8-.9l2.4.6c.8.2 1.3 1 1.2 1.8l-.4 2.5c-.1.6-.5 1.1-1 1.3l-1.3.6c1.2 2.3 3.1 4.2 5.4 5.4l.6-1.3c.2-.5.7-.9 1.3-1l2.5-.4c.8-.1 1.6.4 1.8 1.2l.6 2.4c.2.8-.2 1.6-.9 1.9-1.1.5-2.4.8-3.8.8C10.9 18.7 5.3 13.1 5.3 6.9c0-1.3.3-2.6.8-3.7z"
    />
  </svg>
);

const IconWhatsApp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M20 3.9A10 10 0 0 0 3.9 20L3 23l3-1a10 10 0 0 0 14-8.6 10 10 0 0 0 0-9.4zM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-2.4.8.8-2.4-.2-.3A8 8 0 1 1 12 20zm4.4-5.6c-.2-.1-1.3-.7-1.4-.8-.2-.1-.3-.2-.5 0s-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.6l.4-.5c.1-.2.2-.3 0-.5l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.2-.8.5-.3.3-1 1-1 2.4 0 1.4 1 2.7 1.1 2.9a7.7 7.7 0 0 0 3 2.8c.4.2 1.2.4 1.6.5.7.2 1.3.2 1.8.1.6-.1 1.3-.6 1.5-1.2.2-.6.2-1 .1-1.1 0-.1-.2-.1-.3-.1z"
    />
  </svg>
);

const IconFacebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M13 22v-8h3l1-4h-4V8c0-1.2.4-2 2-2h2V2h-3c-3 0-5 2-5 5v3H6v4h3v8h4z"
    />
  </svg>
);

const IconLinkedIn = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM14.5 9c-2.2 0-3.5 1.2-3.5 2.8V21h-4V9h4v1.7C11.6 9.8 13 9 14.9 9 18 9 19 10.8 19 14v7h-4v-6c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.8 1.3V21h-4V9h4v1.4C11.9 9.6 13 9 14.5 9z"
    />
  </svg>
);

/* Icona check per i punti chiave del preambolo */
const IconCheck = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
  </svg>
);

/* ===== UI ===== */
function IconButton({
  href,
  label,
  bgClass,
  children,
  external = false,
}: {
  href?: string;
  label: string;
  bgClass: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      title={label}
      aria-label={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${bgClass} text-white shadow-sm ring-1 ring-black/5 hover:scale-105 transition`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <span className="sr-only">{label}</span>
    </a>
  );
}

function PersonCard({ m }: { m: Member }) {
  return (
    <article className="rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="sm:w-44 sm:flex-shrink-0">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={m.img}
              alt={`${m.name} — ${m.role}`}
              width={352}
              height={352}
              className="w-full h-44 sm:h-44 object-cover"
            />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-xl font-bold">{m.name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{m.role}</p>

          <p className="mt-3 text-slate-700 dark:text-slate-200 leading-relaxed">{m.bio}</p>

          {/* Solo icone cliccabili */}
          <div className="mt-4 flex flex-wrap gap-2">
            <IconButton
              href={m.email ? `mailto:${m.email}` : undefined}
              label={`Scrivi a ${m.name}`}
              bgClass="bg-rose-600"
            >
              <IconMail className="h-5 w-5" />
            </IconButton>

            <IconButton
              href={telHref(m.phone)}
              label={`Chiama ${m.name}`}
              bgClass="bg-emerald-600"
            >
              <IconPhone className="h-5 w-5" />
            </IconButton>

            <IconButton
              href={waHref(m.whatsapp)}
              label={`WhatsApp ${m.name}`}
              bgClass="bg-green-600"
              external
            >
              <IconWhatsApp className="h-5 w-5" />
            </IconButton>

            <IconButton
              href={m.facebook}
              label={`Facebook di ${m.name}`}
              bgClass="bg-blue-600"
              external
            >
              <IconFacebook className="h-5 w-5" />
            </IconButton>

            <IconButton
              href={m.linkedin}
              label={`LinkedIn di ${m.name}`}
              bgClass="bg-sky-600"
              external
            >
              <IconLinkedIn className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* HERO — stesso stile delle altre pagine */}
      <section className="relative overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55 -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-white/15 px-3 py-1 rounded-full">
            La Repubblica degli Italiani nel Mondo • Chi siamo
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Chi siamo
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Volti, ruoli e contatti diretti della nostra comunità globale.
          </p>
        </div>
      </section>

      {/* CONTENUTO */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Preambolo */}
        <section className="mb-10 rounded-2xl border bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/60 dark:to-slate-900/60 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold">Il nostro impegno</h2>
          <p className="mt-3 text-slate-700 dark:text-slate-200 leading-relaxed">
            Promuoviamo partecipazione, cultura e opportunità tra Italia e
            diaspora. Lavoriamo con approccio civile, non partitico, costruendo
            reti tra persone, associazioni, imprese e istituzioni. Qui sotto
            trovi i <strong>volti dell’associazione</strong>: contattaci
            direttamente quando vuoi.
          </p>

          <ul className="mt-5 grid sm:grid-cols-3 gap-3">
            <li className="flex items-start gap-2 rounded-xl bg-white/70 dark:bg-slate-900/40 border p-3">
              <IconCheck className="h-5 w-5 text-emerald-600 mt-0.5" />
              <span className="text-sm">
                Reti tra comunità italiane in Italia e all’estero
              </span>
            </li>
            <li className="flex items-start gap-2 rounded-xl bg-white/70 dark:bg-slate-900/40 border p-3">
              <IconCheck className="h-5 w-5 text-indigo-600 mt-0.5" />
              <span className="text-sm">
                Progetti culturali, formazione e inclusione sociale
              </span>
            </li>
            <li className="flex items-start gap-2 rounded-xl bg-white/70 dark:bg-slate-900/40 border p-3">
              <IconCheck className="h-5 w-5 text-amber-600 mt-0.5" />
              <span className="text-sm">
                Trasparenza e responsabilità verso i soci
              </span>
            </li>
          </ul>
        </section>

        {/* Volti dell’associazione */}
        <div className="grid md:grid-cols-2 gap-6">
          {TEAM.map((m) => (
            <PersonCard key={m.name} m={m} />
          ))}
        </div>
      </section>

      {/* CTA finale — stesso stile delle altre pagine */}
      <section className="py-16 bg-slate-50 border-y">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Vuoi entrare nella rete?</h2>
          <p className="mt-2 text-slate-600">
            Collabora con i nostri referenti territoriali o proponi un progetto.
            Siamo sempre felici di conoscere nuove energie.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/partecipa"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Partecipa
            </Link>
            <Link
              href="/contatti"
              className="rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Scrivici
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
