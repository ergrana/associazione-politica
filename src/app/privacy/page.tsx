// src/app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informativa Privacy — La Repubblica degli Italiani nel Mondo",
  description:
    "Informativa sul trattamento dei dati personali ai sensi del GDPR e della normativa italiana.",
};

const LAST_UPDATE = "26 settembre 2025";

export default function PrivacyPage() {
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
            La Repubblica degli Italiani nel Mondo • Privacy
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Informativa sul trattamento dei dati personali
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Informazioni rese ai sensi degli artt. 13–14 del Regolamento (UE) 2016/679 (“GDPR”) e del D.lgs. 196/2003 così come modificato dal D.lgs. 101/2018.
          </p>
          <p className="mt-2 text-sm text-white/80">Ultimo aggiornamento: {LAST_UPDATE}</p>
        </div>
      </section>

      {/* BODY */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Indice */}
          <nav aria-label="Indice" className="mb-10">
            <ol className="grid sm:grid-cols-2 gap-2 text-sm">
              {[
                ["Titolare del trattamento", "titolare"],
                ["Tipologie di dati trattati", "dati"],
                ["Finalità e basi giuridiche", "finalita"],
                ["Modalità del trattamento", "modalita"],
                ["Destinatari e fornitori", "destinatari"],
                ["Trasferimenti extra-UE", "trasferimenti"],
                ["Periodo di conservazione", "conservazione"],
                ["Natura del conferimento", "conferimento"],
                ["Diritti dell’interessato", "diritti"],
                ["Sicurezza dei dati", "sicurezza"],
                ["Cookie e servizi di terze parti", "cookie"],
                ["Minori", "minori"],
                ["Modifiche all’informativa", "modifiche"],
                ["Contatti", "contatti"],
              ].map(([label, id]) => (
                <li key={id}>
                  <a className="inline-flex items-center gap-2 text-indigo-700 hover:underline" href={`#${id}`}>
                    <span aria-hidden>•</span> {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Titolare */}
          <section id="titolare" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">1) Titolare del trattamento</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Il Titolare del trattamento è <strong>La Repubblica degli Italiani nel Mondo</strong>, con sede in{" "}
              <strong>Viale Giuseppe Mazzini 73, 00195 Roma</strong>. Per qualunque richiesta relativa alla privacy o
              per esercitare i diritti descritti in questa informativa puoi scrivere a{" "}
              <a className="text-indigo-700 underline" href="mailto:info@cittafutura.it">info@cittafutura.it</a> oppure alla PEC{" "}
              <a className="text-indigo-700 underline" href="mailto:cittafutura@pec.it">cittafutura@pec.it</a>.
            </p>
          </section>

          <Divider />

          {/* Tipologie di dati */}
          <section id="dati" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">2) Tipologie di dati trattati</h2>
            <ul className="mt-3 space-y-2 text-slate-700 leading-relaxed list-disc pl-5">
              <li>
                <strong>Dati anagrafici e di contatto:</strong> nome, cognome, e-mail, telefono, comune/provincia/Paese di residenza, eventuale fascia d’età.
              </li>
              <li>
                <strong>Dati relativi all’iscrizione e partecipazione:</strong> preferenze tematiche, disponibilità a partecipare ad attività o eventi, eventuali ruoli associativi.
              </li>
              <li>
                <strong>Dati di pagamento/donazione:</strong> importo, valuta, identificativo transazione, esito; i dati della carta sono trattati <em>esclusivamente</em> dal fornitore di pagamento (Stripe).
              </li>
              <li>
                <strong>Dati tecnici di navigazione:</strong> indirizzi IP, identificativi dei dispositivi, log, dati aggregati per finalità di sicurezza e statistiche (vedi sezione Cookie).
              </li>
              <li>
                <strong>Contenuti inviati volontariamente:</strong> messaggi e allegati trasmessi via e-mail, modulo web, WhatsApp o canali social.
              </li>
              <li>
                <strong>Dati particolari:</strong> non ne richiediamo né trattiamo intenzionalmente. Eventuali informazioni sensibili inviate spontaneamente saranno trattate nei limiti della richiesta e, ove non necessarie, cancellate.
              </li>
            </ul>
          </section>

          <Divider />

          {/* Finalità e basi giuridiche */}
          <section id="finalita" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">3) Finalità e basi giuridiche del trattamento</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-sm border-separate border-spacing-y-6">
                <thead className="text-slate-500">
                  <tr>
                    <th className="pr-6">Finalità</th>
                    <th className="pr-6">Base giuridica (art. 6 GDPR)</th>
                    <th>Descrizione</th>
                  </tr>
                </thead>
                <tbody className="[&>tr>td]:align-top">
                  <tr>
                    <td className="pr-6 font-medium">Gestione iscrizione e rapporti associativi</td>
                    <td className="pr-6">b) esecuzione di un contratto o misure precontrattuali</td>
                    <td>Raccolta dati per adesione, gestione soci/volontari, invio comunicazioni operative.</td>
                  </tr>
                  <tr>
                    <td className="pr-6 font-medium">Organizzazione eventi e iniziative</td>
                    <td className="pr-6">b) contratto; f) legittimo interesse</td>
                    <td>Registrazioni, liste partecipanti, follow-up e comunicazioni relative all’evento.</td>
                  </tr>
                  <tr>
                    <td className="pr-6 font-medium">Newsletter e comunicazioni informative</td>
                    <td className="pr-6">a) consenso</td>
                    <td>Invio aggiornamenti su attività, progetti e campagne. Revocabile in ogni momento.</td>
                  </tr>
                  <tr>
                    <td className="pr-6 font-medium">Donazioni e pagamenti</td>
                    <td className="pr-6">b) contratto; c) obbligo legale; f) legittimo interesse</td>
                    <td>Trattamento dati transazionali tramite Stripe; adempimenti contabili e fiscali.</td>
                  </tr>
                  <tr>
                    <td className="pr-6 font-medium">Sicurezza e prevenzione abusi</td>
                    <td className="pr-6">f) legittimo interesse</td>
                    <td>Log tecnici, misure anti-spam, monitoraggio uptime e incident response.</td>
                  </tr>
                  <tr>
                    <td className="pr-6 font-medium">Riscontro a richieste</td>
                    <td className="pr-6">a) consenso; b) misure precontrattuali</td>
                    <td>Gestione messaggi ricevuti via e-mail, modulo web, WhatsApp o social.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Ove la base giuridica sia il consenso, la sua mancata prestazione non consente l’invio delle relative comunicazioni ma non pregiudica le altre attività.
              Il consenso è revocabile in ogni momento.
            </p>
          </section>

          <Divider />

          {/* Modalità */}
          <section id="modalita" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">4) Modalità del trattamento</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              I dati sono trattati con strumenti elettronici e, ove necessario, cartacei, con logiche strettamente
              correlate alle finalità indicate e adottando misure tecniche e organizzative adeguate (art. 32 GDPR).
              Il personale autorizzato è istruito e vincolato alla riservatezza.
            </p>
          </section>

          <Divider />

          {/* Destinatari */}
          <section id="destinatari" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">5) Destinatari e fornitori (responsabili ex art. 28)</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Alcuni trattamenti sono svolti per nostro conto da fornitori nominati “Responsabili del trattamento”.
              A titolo esemplificativo:
            </p>
            <ul className="mt-3 space-y-2 text-slate-700 leading-relaxed list-disc pl-5">
              <li>
                <strong>Stripe, Inc./Stripe Payments Europe</strong> — pagamenti online (dati carta gestiti da Stripe; noi non conserviamo i dettagli della carta).
              </li>
              <li>
                <strong>Supabase</strong> (PostgreSQL gestito) — conservazione dati applicativi/operativi (regione UE, ove configurata).
              </li>
              <li>
                <strong>Vercel</strong> — hosting e distribuzione del sito/applicazione.
              </li>
              <li>
                <strong>Resend</strong> — invio e-mail transazionali e di servizio.
              </li>
              <li>
                <strong>Google Workspace</strong> — posta elettronica e produttività; possibile memorizzazione di messaggi e allegati.
              </li>
              <li>
                <strong>WhatsApp (Meta)</strong> — canale di contatto; i messaggi transitano sui server del fornitore.
              </li>
              <li>
                <strong>Formcarry</strong> — raccolta invii da moduli web (iscrizione/contatto).
              </li>
              <li>
                <strong>GitHub</strong> — gestione del codice e pipeline; non usato per conservare dati degli iscritti, salvo eventuali issue inserite volontariamente dagli utenti.
              </li>
              <li>
                <strong>Google Maps/YouTube</strong> — contenuti incorporati (vedi sezione Cookie).
              </li>
              <li>
                <strong>Istituti bancari</strong> — gestione bonifici e movimenti contabili.
              </li>
            </ul>
            <p className="mt-3 text-slate-700">
              L’elenco aggiornato dei Responsabili può essere richiesto scrivendo a{" "}
              <a className="text-indigo-700 underline" href="mailto:info@cittafutura.it">info@cittafutura.it</a>.
            </p>
          </section>

          <Divider />

          {/* Trasferimenti */}
          <section id="trasferimenti" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">6) Trasferimenti di dati verso Paesi extra-UE</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Alcuni fornitori possono comportare trasferimenti verso Paesi extra-UE/SEE (es. USA). Tali trasferimenti
              avvengono, se necessari, sulla base di <em>Clausole Contrattuali Standard</em> (art. 46 GDPR) o di altre
              garanzie adeguate. Copie o riferimenti alle garanzie possono essere richiesti al Titolare.
            </p>
          </section>

          <Divider />

          {/* Conservazione */}
          <section id="conservazione" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">7) Periodo di conservazione</h2>
            <ul className="mt-3 space-y-2 text-slate-700 leading-relaxed list-disc pl-5">
              <li>
                <strong>Dati associativi</strong>: per tutta la durata del rapporto e, successivamente, nei limiti prescrizionali (fino a 10 anni per finalità amministrativo-contabili).
              </li>
              <li>
                <strong>Newsletter</strong>: fino a revoca del consenso o disiscrizione.
              </li>
              <li>
                <strong>Dati evento/contatto</strong>: fino a 24 mesi dal riscontro, salvo necessità ulteriori (controversie, sicurezza).
              </li>
              <li>
                <strong>Dati di pagamento</strong>: secondo i termini previsti dalla normativa fiscale e dalle policy del fornitore di pagamento/banca.
              </li>
              <li>
                <strong>Log tecnici</strong>: tipicamente 6–12 mesi, salvo esigenze di sicurezza.
              </li>
            </ul>
          </section>

          <Divider />

          {/* Conferimento */}
          <section id="conferimento" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">8) Natura del conferimento</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Il conferimento dei dati contrassegnati come obbligatori è necessario per dare seguito alla richiesta di
              iscrizione, partecipazione o donazione. Il mancato conferimento impedisce l’erogazione del relativo
              servizio. Il conferimento per finalità di newsletter è facoltativo.
            </p>
          </section>

          <Divider />

          {/* Diritti */}
          <section id="diritti" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">9) Diritti dell’interessato</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              In qualsiasi momento puoi esercitare i diritti previsti dagli artt. 15–22 GDPR: accesso, rettifica,
              cancellazione, limitazione, portabilità, opposizione, nonché revocare il consenso prestato.
              Hai inoltre il diritto di proporre reclamo all’Autorità Garante per la protezione dei dati personali
              (<em>www.garanteprivacy.it</em>).
            </p>
            <p className="mt-2 text-slate-700">
              Per esercitare i diritti: scrivi a{" "}
              <a className="text-indigo-700 underline" href="mailto:info@cittafutura.it">info@cittafutura.it</a> indicando la richiesta
              e un recapito per il riscontro. Potremmo richiedere informazioni aggiuntive per verificare la tua identità.
            </p>
          </section>

          <Divider />

          {/* Sicurezza */}
          <section id="sicurezza" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">10) Sicurezza dei dati</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Adottiamo misure di sicurezza tecniche e organizzative proporzionate al rischio (crittografia in transito,
              controlli di accesso, backup, segregazione ambienti, policy di minimizzazione). In caso di violazione dei
              dati personali che comporti un rischio per i diritti e le libertà degli interessati, saranno attivate le
              procedure previste dagli artt. 33–34 GDPR.
            </p>
          </section>

          <Divider />

          {/* Cookie */}
          <section id="cookie" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">11) Cookie e contenuti di terze parti</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Il sito può utilizzare cookie tecnici necessari al funzionamento e, previo consenso, cookie di
              misurazione/marketing. Alcuni contenuti incorporati (es. mappe di Google Maps, video YouTube) possono
              impostare cookie di terze parti. Puoi gestire le preferenze tramite l’eventuale banner/cookie manager
              e/o tramite le impostazioni del browser. Ulteriori dettagli sono disponibili nella nostra eventuale cookie policy.
            </p>
          </section>

          <Divider />

          {/* Minori */}
          <section id="minori" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">12) Minori</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              L’iscrizione online è rivolta a maggiorenni. Qualora un minore di 16 anni intendesse aderire,
              il trattamento dei dati basato sul consenso richiede l’autorizzazione del titolare della responsabilità genitoriale (art. 8 GDPR).
            </p>
          </section>

          <Divider />

          {/* Modifiche */}
          <section id="modifiche" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">13) Modifiche all’informativa</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Ci riserviamo di aggiornare la presente informativa per adeguarla a evoluzioni normative o a cambiamenti
              nei trattamenti. Le versioni aggiornate saranno pubblicate in questa pagina con indicazione della data.
            </p>
          </section>

          <Divider />

          {/* Contatti */}
          <section id="contatti" className="scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight">14) Contatti</h2>
            <div className="mt-3 text-slate-700 leading-relaxed">
              <p><strong>Titolare:</strong> La Repubblica degli Italiani nel Mondo</p>
              <p><strong>Sede:</strong> Viale Giuseppe Mazzini 73, 00195 Roma</p>
              <p>
                <strong>E-mail:</strong>{" "}
                <a className="text-indigo-700 underline" href="mailto:info@cittafutura.it">info@cittafutura.it</a>{" "}
                — <strong>PEC:</strong>{" "}
                <a className="text-indigo-700 underline" href="mailto:cittafutura@pec.it">cittafutura@pec.it</a>
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

/* --------- UI helpers --------- */
function Divider() {
  return <div className="my-10 h-px bg-slate-200" />;
}
