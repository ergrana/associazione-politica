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
  category:
    | "Assemblea"
    | "Incontro"
    | "Volontariato"
    | "Laboratorio"
    | "Campagna";
  district?: string;
  cover: string; // percorso in /public
  description: string;
  rsvpUrl?: string;
  body?: string;
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
    image:
      "/images/notizie/trasparenza/regolamento-beni-comuni.jpg",
    slug: "regolamento-beni-comuni-approvato",
    body: `
**Perché è importante**  
Il regolamento consente a cittadini, scuole e associazioni di prendersi cura di spazi comuni con patti semplici.

**Cosa cambia**  
- sportelli di supporto nei quartieri  
- micro-finanziamento materiali  
- procedure in 15 giorni

Prossimi passi: linee guida e calendario incontri pubblici.
    `.trim(),
  },
  {
    id: "2",
    title: "Nasce lo Sportello Giovani & Lavoro",
    excerpt: "Orientamento, formazione e opportunità per under 30.",
    date: "2025-08-05",
    read: "3 min",
    category: "Iniziative",
    image:
      "/images/notizie/iniziative/sportello-giovani-lavoro.jpg",
    slug: "sportello-giovani-lavoro",
    body: `
Lo sportello offrirà tutoraggio, revisione CV e collegamenti con aziende locali.
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
    image:
      "/images/notizie/territorio/quartieri-piu-verdi.jpg",
    slug: "quartieri-piu-verdi-200-nuovi-alberi",
    body: `
**Perché lo facciamo**
Le isole di calore colpiscono soprattutto i quartieri densi. Gli alberi abbassano la temperatura e migliorano la qualità dell'aria.

**Dove**
- Parco Nord, Parco Sud
- Scuole primarie XX, YY, ZZ

**Prossimi passi**
- Mappatura aiuole da riattivare
- Coinvolgimento volontari per la cura estiva
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
    image:
      "/images/notizie/partecipazione/bilancio-partecipativo.jpg",
    slug: "bilancio-partecipativo-5000-proposte",
    body: `
La partecipazione ha superato ogni aspettativa. Ora una commissione tecnica analizzerà le proposte e selezionerà quelle più fattibili.

**Cosa succede adesso**  
- Fase di valutazione tecnica  
- Votazione pubblica in ottobre  
- Prime realizzazioni entro l'anno
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
    image:
      "/images/notizie/iniziative/trasporto-notturno.jpg",
    slug: "trasporto-pubblico-notturno",
    body: `
Dal prossimo mese sarà attivo il servizio di bus notturni.  
Un passo avanti per la sicurezza e l'inclusione dei giovani.

**Dettagli linee**  
- Linea N1: Centro ↔ Nord  
- Linea N2: Centro ↔ Sud
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
    image:
      "/images/notizie/comunicati/campi-basket.jpg",
    slug: "rinnovati-campi-basket-quartiere",
    body: `
Gli interventi hanno riguardato pavimentazione, illuminazione e accessibilità.  
Verranno organizzati tornei estivi e corsi gratuiti per bambini e adolescenti.
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
    image:
      "/images/notizie/eventi/festival-cultura-diffusa.jpg",
    slug: "festival-cultura-diffusa-2025",
    body: `
Un festival pensato per avvicinare la cultura a chiunque, in ogni quartiere della città.  
Coinvolti più di 120 artisti locali.

**Programma**  
- Concerti serali  
- Laboratori per bambini  
- Mostre all'aperto
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
    cover:
      "/images/eventi/assemblea/mobilita-cittadina.jpg",
    description:
      "Parliamo di sicurezza stradale, piste ciclabili e TPL notturno.",
    rsvpUrl: "#",
    body: `
Programma:
- 18:30 apertura e saluti
- 18:40 interventi tecnici
- 19:20 dibattito
- 19:50 conclusioni
    `.trim(),
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
    cover:
      "/images/eventi/incontro/passeggiata-civica.jpg",
    description:
      "Sopralluogo serale con cittadini e tecnici per mappare i punti critici.",
    rsvpUrl: "#",
    body: `
**Obiettivo**: raccogliere segnalazioni su illuminazione, attraversamenti e videosorveglianza.

- Ritrovo: ore 18:00, lato sud della piazza  
- Conclusione: breve restituzione pubblica
    `.trim(),
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
    cover:
      "/images/eventi/volontariato/pulizia-argine.jpg",
    description:
      "Giornata ecologica con famiglie e scuole: guanti e sacchi forniti.",
    rsvpUrl: "#",
    body: `
Porta una borraccia 🥤. Al termine, merenda condivisa.  
**Partner**: Associazioni ambientaliste locali.
    `.trim(),
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
    cover:
      "/images/eventi/laboratorio/bilancio-partecipativo-nord.jpg",
    description:
      "Facilitazione e tavoli tematici per co-progettare le proposte 2025.",
    rsvpUrl: "#",
    body: `
**Temi**: verde, mobilità, scuola, sport.  
Materiali e pennarelli forniti in sala.
    `.trim(),
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
    cover:
      "/images/eventi/assemblea/mobilita-scolastica.jpg",
    description:
      "Pedibus, piste ciclabili sicure e zone 30 vicino alle scuole.",
    rsvpUrl: "#",
    body: `
Interventi liberi dei genitori e dei dirigenti scolastici.  
**Output**: bozza di piano con priorità per il 2026.
    `.trim(),
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
    cover:
      "/images/eventi/incontro/open-day.jpg",
    description:
      "Conosci i gruppi di lavoro, i progetti e come partecipare attivamente.",
    rsvpUrl: "#",
    body: `
**Corner tematici**: giovani, quartieri, cultura, sport, lavoro.  
Tesseramento e info volontariato.
    `.trim(),
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
    cover:
      "/images/eventi/laboratorio/maratona-spazi.jpg",
    description:
      "Hack-lab cittadino per rigenerare edifici dismessi con usi temporanei.",
    rsvpUrl: "#",
    body: `
Porta una proposta o un render. Le migliori idee saranno inserite nel **dossier 2026**.
    `.trim(),
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
    cover:
      "/images/eventi/campagna/tesseramento-2026.jpg",
    description:
      "Gazebo in tutti i quartieri con materiali informativi e raccolta adesioni.",
    rsvpUrl: "#",
    body: `
**Kit**: modulistica, badge, calendari eventi 2026.  
Volontari benvenuti ai banchetti! 🙌
    `.trim(),
  },
];
