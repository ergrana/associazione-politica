export type Post = {
  id: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  read: string;
  category:
    | "Comunicati"
    | "Territorio"
    | "Iniziative"
    | "Trasparenza"
    | "Eventi"
    | "Partecipazione";
  image: string; // percorso in /public
  slug: string;
  body?: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string; // ISO start
  end?: string; // ISO end
  place: string;
  address: string;
  city: string;
  category: "Assemblea" | "Incontro" | "Volontariato" | "Laboratorio" | "Campagna";
  district?: string;
  cover: string; // percorso in /public
  description: string;
  rsvpUrl?: string;
  body?: string;

  /** ↓ aggiunta per il programma/timeline dell'evento */
  agenda?: { time?: string; title: string; description?: string }[];

  /** opzionali (supportati dalla pagina eventi) */
  donationMin?: number;
  currency?: string;
};

export const POSTS: Post[] = [
  {
    id: "1",
    title: "Approvato il regolamento per i beni comuni",
    excerpt:
      "Un passo decisivo per la cura condivisa di parchi e spazi di quartiere. Il testo introduce patti di collaborazione semplici e accessibili.",
    date: "2025-08-12",
    read: "4 min",
    category: "Trasparenza",
    image: "/images/notizie/trasparenza/regolamento-beni-comuni.jpg",
    slug: "regolamento-beni-comuni-approvato",
    body: `
Il Consiglio comunale ha approvato il nuovo regolamento per i beni comuni, uno strumento che riconosce e valorizza la capacità delle comunità locali di prendersi cura di spazi pubblici, aree verdi e strutture di quartiere. Non si tratta soltanto di un atto tecnico: è il punto di arrivo di un percorso partecipato che ha coinvolto cittadini, scuole e associazioni.

Il regolamento introduce patti di collaborazione agili e chiari, con tempi definiti e responsabilità condivise. L’obiettivo è favorire la nascita di micro-progetti – dall’adozione di un’aiuola alla gestione di una sala civica – in cui il Comune fornisce supporto e strumenti, mentre i cittadini mettono tempo, idee e energie.

Per accompagnare questa nuova fase, saranno attivati sportelli di quartiere dedicati all’ascolto e alla progettazione di comunità. Qui sarà possibile ricevere assistenza nella compilazione delle domande, trovare materiali informativi e condividere buone pratiche già sperimentate altrove.

Nei prossimi mesi pubblicheremo linee guida operative e un calendario di incontri pubblici. Vogliamo che ogni proposta trovi il modo giusto per diventare realtà, mantenendo saldo il principio che la cura del bene comune è un valore che appartiene a tutti.
    `.trim(),
  },
  {
    id: "2",
    title: "Nasce lo Sportello Giovani & Lavoro",
    excerpt: "Orientamento, formazione e opportunità per under 30.",
    date: "2025-08-05",
    read: "3 min",
    category: "Iniziative",
    image: "/images/notizie/iniziative/sportello-giovani-lavoro.jpg",
    slug: "sportello-giovani-lavoro",
    body: `
Con l’apertura dello Sportello Giovani & Lavoro offriamo un punto di riferimento stabile per chi sta muovendo i primi passi nel mondo professionale. Lo sportello nasce per ascoltare, indirizzare e creare connessioni reali tra ragazzi, imprese e percorsi formativi.

Il servizio propone consulenze personalizzate su CV e lettere motivazionali, simulazioni di colloquio e orientamento alla scelta di corsi e tirocini. Non mancherà un’attenzione specifica alle competenze digitali e alle professioni emergenti, con workshop gratuiti curati da professionisti del territorio.

Accanto all’orientamento, attiveremo una rete di aziende disponibili ad aprire le porte a stage e apprendistati di qualità. Vogliamo che ogni giovane possa sperimentare, mettersi alla prova e scoprire il proprio talento in contesti inclusivi e dinamici.

Lo sportello è aperto su appuntamento e a libero accesso in giornate dedicate. Nei prossimi aggiornamenti pubblicheremo il calendario degli incontri e i moduli per iscriversi ai laboratori.
    `.trim(),
  },
  {
    id: "3",
    title: "Quartieri più verdi: al via 200 nuovi alberi",
    excerpt:
      "Partono i cantieri per la piantumazione in 12 scuole e 5 parchi. Un investimento che migliora aria e ombra nelle aree più calde.",
    date: "2025-09-10",
    read: "3 min",
    category: "Territorio",
    image: "/images/notizie/territorio/quartieri-piu-verdi.jpg",
    slug: "quartieri-piu-verdi-200-nuovi-alberi",
    body: `
La messa a dimora di 200 nuovi alberi rappresenta un passo concreto contro le isole di calore che interessano i quartieri più densi. Abbiamo scelto specie adatte al contesto urbano, capaci di garantire ombra estiva e di resistere agli stress climatici, senza trascurare l’importanza della biodiversità.

Le prime piantumazioni interesseranno 12 scuole e 5 parchi: luoghi frequentati ogni giorno da bambini, famiglie e anziani. In ciascun sito un team tecnico curerà la preparazione del terreno e la successiva manutenzione, affinché le piante attecchiscano e crescano in salute.

Il progetto non si ferma alla posa. Stiamo costruendo una rete di volontari di quartiere che, affiancando i servizi comunali, contribuirà all’irrigazione estiva e al monitoraggio delle nuove alberature. Sarà anche un’occasione educativa per imparare a conoscere e rispettare il verde urbano.

Nei prossimi mesi condivideremo una mappa interattiva delle piantumazioni e un programma di attività didattiche rivolte alle scuole. Prendersi cura degli alberi significa prendersi cura della qualità dell’aria, della vivibilità e del futuro della città.
    `.trim(),
  },
  {
    id: "4",
    title: "Bilancio partecipativo: oltre 5.000 proposte raccolte",
    excerpt:
      "Grande successo per l'iniziativa che permette ai cittadini di decidere come investire una parte del bilancio comunale.",
    date: "2025-08-28",
    read: "4 min",
    category: "Partecipazione",
    image: "/images/notizie/partecipazione/bilancio-partecipativo.jpg",
    slug: "bilancio-partecipativo-5000-proposte",
    body: `
Si è conclusa la fase di raccolta delle idee del bilancio partecipativo e il risultato parla da sé: oltre 5.000 proposte arrivate da tutti i quartieri. È la dimostrazione che, quando si crea uno spazio chiaro e accessibile, la cittadinanza risponde con creatività e responsabilità.

Nei prossimi giorni una commissione tecnica valuterà la fattibilità degli interventi, con criteri trasparenti e tempi certi. L’obiettivo è accompagnare ogni proposta, anche quelle non immediatamente realizzabili, verso un percorso di miglioramento o di integrazione con altri progetti.

A ottobre si aprirà la votazione pubblica, completamente online e con punti di supporto fisici per chi ha meno dimestichezza con gli strumenti digitali. Vogliamo che nessuno resti indietro: la partecipazione ha senso se è davvero alla portata di tutti.

Le prime realizzazioni saranno avviate entro l’anno. Pubblicheremo un monitoraggio continuo dello stato di avanzamento, così da garantire che ogni voto si trasformi in un cantiere, un servizio, un cambiamento tangibile.
    `.trim(),
  },
  {
    id: "5",
    title: "Trasporto pubblico notturno: nuovo servizio da ottobre",
    excerpt:
      "Introdotte due nuove linee notturne per collegare i quartieri periferici al centro città durante il weekend.",
    date: "2025-08-20",
    read: "2 min",
    category: "Iniziative",
    image: "/images/notizie/iniziative/trasporto-notturno.jpg",
    slug: "trasporto-pubblico-notturno",
    body: `
Da ottobre saranno attive due linee notturne che collegheranno i quartieri periferici al centro città nelle serate di venerdì e sabato. È una risposta alle richieste di studenti, lavoratori turnisti e famiglie che chiedevano un servizio più sicuro e affidabile anche dopo cena.

I bus effettueranno fermate coordinate con le principali piazze e le aree della movida, riducendo i tempi di attesa e garantendo corse a intervalli regolari. Un sistema di illuminazione alle fermate e l’installazione di pulsanti di emergenza renderanno l’esperienza più confortevole.

Il nuovo servizio notturno non è una misura isolata: si integra con l’estensione delle piste ciclabili e con i progetti di car sharing e taxi collettivo. L’idea è dare alternative reali all’auto privata, soprattutto negli spostamenti brevi e ricorrenti.

Monitoreremo i dati di utilizzo nelle prime settimane per calibrare frequenze e percorsi. Invitiamo chi userà le linee a inviarci suggerimenti: il trasporto pubblico funziona se lo progettiamo insieme a chi lo vive ogni giorno.
    `.trim(),
  },
  {
    id: "6",
    title: "Sport e inclusione: rinnovati 8 campi da basket di quartiere",
    excerpt:
      "Grazie ai fondi europei sono stati ristrutturati e riaperti 8 campi da basket con accesso libero.",
    date: "2025-07-30",
    read: "3 min",
    category: "Comunicati",
    image: "/images/notizie/comunicati/campi-basket.jpg",
    slug: "rinnovati-campi-basket-quartiere",
    body: `
Sono terminati i lavori di riqualificazione di 8 campi da basket di quartiere, finanziati grazie a fondi europei e al cofinanziamento comunale. Le nuove superfici di gioco, l’illuminazione LED e le sedute rendono questi spazi più sicuri e accoglienti per tutte le età.

La scelta di intervenire sui playground nasce dall’idea che lo sport di strada sia un motore di inclusione. Qui si incontrano generazioni diverse, si impara il rispetto delle regole e si costruiscono comunità più coese, a partire dai ragazzi che vivono il quartiere ogni giorno.

Nei prossimi mesi organizzeremo tornei gratuiti, corsi introduttivi e attività aperte a bambine e bambini, con un’attenzione particolare all’accessibilità. Vogliamo che nessuno si senta escluso, perché lo sport è un diritto e un’opportunità educativa.

Invitiamo le associazioni sportive e i gruppi informali a candidarsi per co-gestire gli spazi in orari dedicati. Mettere in rete energie e competenze ci permetterà di mantenere vivi questi luoghi, evitando degrado e vandalismi.
    `.trim(),
  },
  {
    id: "7",
    title: "Cultura diffusa: festival di strada in tutti i municipi",
    excerpt:
      "Musica, teatro e arti visive invaderanno le piazze con un calendario di oltre 50 eventi gratuiti.",
    date: "2025-07-15",
    read: "5 min",
    category: "Eventi",
    image: "/images/notizie/eventi/festival-cultura-diffusa.jpg",
    slug: "festival-cultura-diffusa-2025",
    body: `
Prende il via “Cultura diffusa”, un festival che porta musica, teatro e arti visive nelle piazze di tutti i municipi. L’idea è semplice: avvicinare la cultura a chi non la incontra spesso, trasformando i luoghi quotidiani in palcoscenici a cielo aperto.

Il cartellone prevede oltre cinquanta appuntamenti gratuiti, con un’attenzione particolare agli artisti locali e ai linguaggi contemporanei. Ogni quartiere ospiterà performance pensate per spazi non convenzionali, valorizzando scorci e angoli spesso trascurati.

Non sarà solo spettacolo: laboratori per bambini, talk con gli autori e visite guidate completeranno l’esperienza. Vogliamo che il pubblico non resti spettatore passivo, ma viva il festival come un’occasione di incontro e scoperta.

Il programma completo sarà pubblicato sul sito e sui canali social dell’associazione. Invitiamo tutti a partecipare, a muoversi fra i quartieri e a condividere impressioni e suggerimenti: la cultura è una conversazione che si costruisce insieme.
    `.trim(),
  },
];

export const EVENTS: EventItem[] = [
  {
    id: "e1",
    title: "Assemblea cittadina sulla mobilità",
    date: "2025-09-15T18:30:00+02:00",
    end: "2025-09-15T20:00:00+02:00",
    place: "Sala Consiliare",
    address: "Piazza del Municipio 1",
    city: "Città",
    category: "Assemblea",
    district: "Centro",
    cover: "/images/eventi/assemblea/mobilita-cittadina.jpg",
    description: "Parliamo di sicurezza stradale, piste ciclabili e TPL notturno.",
    rsvpUrl: "#",
    body: `
Programma:
- 18:30 apertura e saluti
- 18:40 interventi tecnici
- 19:20 dibattito
- 19:50 conclusioni
    `.trim(),
    agenda: [
      { time: "18:30", title: "Accoglienza e registrazione" },
      { time: "18:40", title: "Introduzione", description: "Obiettivi e metodo della serata." },
      { time: "18:50", title: "Relazioni tecniche", description: "Sicurezza stradale e ciclabilità." },
      { time: "19:20", title: "Dibattito", description: "Interventi dal pubblico." },
      { time: "19:50", title: "Conclusioni", description: "Riepilogo e prossimi passi." },
    ],
    donationMin: 5,
    currency: "EUR",
  },
  {
    id: "e2",
    title: "Passeggiata civica: sicurezza e illuminazione",
    date: "2025-09-20T18:00:00+02:00",
    end: "2025-09-20T19:30:00+02:00",
    place: "Piazza Libertà",
    address: "Piazza Libertà 3",
    city: "Città",
    category: "Incontro",
    district: "Centro",
    cover: "/images/eventi/incontro/passeggiata-civica.jpg",
    description: "Sopralluogo serale con cittadini e tecnici per mappare i punti critici.",
    rsvpUrl: "#",
    body: `
**Obiettivo**: raccogliere segnalazioni su illuminazione, attraversamenti e videosorveglianza.

- Ritrovo: ore 18:00, lato sud della piazza  
- Conclusione: breve restituzione pubblica
    `.trim(),
    agenda: [
      { time: "18:00", title: "Ritrovo e briefing" },
      { time: "18:10", title: "Formazione gruppi", description: "Assegnazione dei percorsi." },
      { time: "18:15", title: "Sopralluogo", description: "Raccolta segnalazioni e foto geolocalizzate." },
      { time: "19:10", title: "Rientro in piazza" },
      { time: "19:15", title: "Restituzione veloce", description: "Condivisione criticità emerse." },
    ],
  },
  {
    id: "e3",
    title: "Pulizia argine del fiume",
    date: "2025-09-28T09:30:00+02:00",
    end: "2025-09-28T12:30:00+02:00",
    place: "Parcheggio Lungofiume",
    address: "Via degli Argini 20",
    city: "Città",
    category: "Volontariato",
    district: "Est",
    cover: "/images/eventi/volontariato/pulizia-argine.jpg",
    description: "Giornata ecologica con famiglie e scuole: guanti e sacchi forniti.",
    rsvpUrl: "#",
    body: `
Porta una borraccia 🥤. Al termine, merenda condivisa.  
**Partner**: Associazioni ambientaliste locali.
    `.trim(),
    agenda: [
      { time: "09:30", title: "Accoglienza e kit" },
      { time: "09:45", title: "Briefing sicurezza" },
      { time: "10:00", title: "Pulizia tratti 1-2-3" },
      { time: "12:00", title: "Raccolta sacchi e foto finale" },
      { time: "12:15", title: "Merenda condivisa" },
    ],
  },
  {
    id: "e4",
    title: "Laboratorio: bilancio partecipativo (circoscrizione Nord)",
    date: "2025-10-05T17:30:00+02:00",
    end: "2025-10-05T19:00:00+02:00",
    place: "Centro Civico Nord",
    address: "Via delle Betulle 14",
    city: "Città",
    category: "Laboratorio",
    district: "Nord",
    cover: "/images/eventi/laboratorio/bilancio-partecipativo-nord.jpg",
    description: "Facilitazione e tavoli tematici per co-progettare le proposte 2025.",
    rsvpUrl: "#",
    body: `
**Temi**: verde, mobilità, scuola, sport.  
Materiali e pennarelli forniti in sala.
    `.trim(),
    agenda: [
      { time: "17:30", title: "Intro e regole del gioco" },
      { time: "17:40", title: "Icebreaker" },
      { time: "17:50", title: "Tavoli tematici", description: "Co-progettazione per aree." },
      { time: "18:40", title: "Raccolta output", description: "Condivisione in plenaria." },
      { time: "18:55", title: "Chiusura", description: "Prossime scadenze e follow-up." },
    ],
  },
  {
    id: "e5",
    title: "Assemblea pubblica sulla mobilità scolastica",
    date: "2025-10-12T18:30:00+02:00",
    end: "2025-10-12T20:00:00+02:00",
    place: "Sala Polifunzionale",
    address: "Via Manzoni 7",
    city: "Città",
    category: "Assemblea",
    district: "Sud",
    cover: "/images/eventi/assemblea/mobilita-scolastica.jpg",
    description: "Pedibus, piste ciclabili sicure e zone 30 vicino alle scuole.",
    rsvpUrl: "#",
    body: `
Interventi liberi dei genitori e dei dirigenti scolastici.  
**Output**: bozza di piano con priorità per il 2026.
    `.trim(),
    agenda: [
      { time: "18:30", title: "Saluti e contesto" },
      { time: "18:40", title: "Esperienze Pedibus" },
      { time: "19:00", title: "Proposte piste sicure" },
      { time: "19:20", title: "Interventi liberi" },
      { time: "19:50", title: "Riepilogo e piano 2026" },
    ],
  },
  {
    id: "e6",
    title: "Open day Città Futura",
    date: "2025-11-03T18:00:00+01:00",
    end: "2025-11-03T20:30:00+01:00",
    place: "Spazio Civico",
    address: "Via Roma 8",
    city: "Città",
    category: "Incontro",
    district: "Centro",
    cover: "/images/eventi/incontro/open-day.jpg",
    description:
      "Conosci i gruppi di lavoro, i progetti e come partecipare attivamente.",
    rsvpUrl: "#",
    body: `
**Corner tematici**: giovani, quartieri, cultura, sport, lavoro.  
Tesseramento e info volontariato.
    `.trim(),
    agenda: [
      { time: "18:00", title: "Accoglienza" },
      { time: "18:10", title: "Presentazione associazione" },
      { time: "18:30", title: "Tour dei corner", description: "Rotazioni ogni 15’" },
      { time: "19:30", title: "Q&A" },
      { time: "20:10", title: "Chiusura e networking" },
    ],
  },
  {
    id: "e7",
    title: "Maratona di idee: spazi abbandonati",
    date: "2025-12-01T17:00:00+01:00",
    end: "2025-12-01T20:00:00+01:00",
    place: "Ex Magazzini Comunali",
    address: "Via del Porto 2",
    city: "Città",
    category: "Laboratorio",
    district: "Ovest",
    cover: "/images/eventi/laboratorio/maratona-spazi.jpg",
    description:
      "Hack-lab cittadino per rigenerare edifici dismessi con usi temporanei.",
    rsvpUrl: "#",
    body: `
Porta una proposta o un render. Le migliori idee saranno inserite nel **dossier 2026**.
    `.trim(),
    agenda: [
      { time: "17:00", title: "Kickoff e briefing" },
      { time: "17:10", title: "Formazione team" },
      { time: "17:20", title: "Sprint 1", description: "Raccolta problemi e vincoli." },
      { time: "18:10", title: "Sprint 2", description: "Concept e mock-up." },
      { time: "19:30", title: "Pitch e votazione" },
    ],
  },
  {
    id: "e8",
    title: "Giornata del tesseramento 2026",
    date: "2026-01-15T10:00:00+01:00",
    end: "2026-01-15T18:00:00+01:00",
    place: "Sedi diffuse",
    address: "Vari indirizzi",
    city: "Città",
    category: "Campagna",
    district: "Tutta la città",
    cover: "/images/eventi/campagna/tesseramento-2026.jpg",
    description:
      "Gazebo in tutti i quartieri con materiali informativi e raccolta adesioni.",
    rsvpUrl: "#",
    body: `
**Kit**: modulistica, badge, calendari eventi 2026.  
Volontari benvenuti ai banchetti! 🙌
    `.trim(),
    agenda: [
      { time: "10:00", title: "Apertura gazebo" },
      { time: "12:30", title: "Aggiornamento parziale adesioni" },
      { time: "15:00", title: "Mini talk volontariato" },
      { time: "17:30", title: "Ultimo giro adesioni" },
      { time: "18:00", title: "Chiusura postazioni" },
    ],
  },
];
