import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const nav = [
    { href: "/", label: "Home" },
    { href: "/chi-siamo", label: "Chi siamo" },
    { href: "/notizie", label: "Notizie" },
    { href: "/eventi", label: "Eventi" },
    { href: "/prenotazioni", label: "Prenotazioni" },
    { href: "/partecipa", label: "Partecipa" },
    { href: "/contatti", label: "Contatti" },
  ];

  return (
    <footer className="mt-16 bg-slate-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        {/* Colonna brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 font-extrabold">
            <Image
              src="/images/logo.jpg"
              alt="Logo Città Futura"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <span>La Repubblica degli Italiani nel Mondo</span>
          </div>
          <p className="mt-3 text-slate-600 max-w-md">
            Associazione indipendente. Partecipazione, futuro.
          </p>
          <p className="mt-2 text-slate-600 text-sm">
            C.F. 00000000000 • Via dell’Esempio 1, 00000 Città (IT)
          </p>
          <p className="text-slate-600 text-sm">
            Email:{" "}
            <a className="underline" href="mailto:info@cittafutura.it">
              info@cittafutura.it
            </a>{" "}
            • PEC:{" "}
            <a className="underline" href="mailto:cittafutura@pec.it">
              cittafutura@pec.it
            </a>
          </p>
        </div>

        {/* Colonna pagine */}
        <div>
          <p className="font-semibold">Pagine</p>
          <ul className="mt-3 space-y-2 text-slate-600">
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-indigo-600" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonna social */}
        <div>
          <p className="font-semibold">Seguici</p>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>
              <a className="hover:text-indigo-600" href="#" aria-label="Instagram">
                Instagram
              </a>
            </li>
            <li>
              <a className="hover:text-indigo-600" href="#" aria-label="Facebook">
                Facebook
              </a>
            </li>
            <li>
              <a className="hover:text-indigo-600" href="#" aria-label="YouTube">
                YouTube
              </a>
            </li>
            <li>
              <a className="hover:text-indigo-600" href="#" aria-label="Telegram">
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-3">
          <span>
            © {new Date().getFullYear()} La Repubblica degli Italiani nel Mondo — Tutti i diritti
            riservati
          </span>
          <div className="flex gap-4">
            <a
              href="/docs/privacy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Privacy
            </a>
            <Link href="#" className="underline">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
