/**
 * Obsah osobního webu podle copy decku „josefpavlovic.cz — finální texty webu"
 * (verze 4, 28. 7. 2026). Deck je jediný závazný zdroj textů.
 *
 * Pravidlo: nic tady nesmí být domyšlené. Místa, která deck označuje jako
 * `[DOPLNIT]`, jsou vynechaná — ne vyplněná odhadem. Jejich seznam je
 * v popisu PR, ať je vidět, co ještě chybí.
 *
 * Editorial pravidla z decku: obecné názvy funkcí malým písmenem, oficiální
 * názvy institucí podle jejich zápisu, jméno vždy „Josef Pavlovic" bez háčku,
 * krátké věty, žádné pointy na konci odstavců.
 */

export const EMAIL = 'josef@josefpavlovic.cz'

/* ------------------------------------------------------------------ O mně */

export const oMne = {
  title: 'O mně',
  bio: [
    'Narodil jsem se v Mariánských Lázních — tenkrát tu ještě byla nemocnice — a žiju tady celý život. Při škole jsem začínal na recepci lázeňských hotelů, potom jsem na obchodním oddělení dělal OTA a konference. Občas mě to na chvíli zaválo jinam, ale vždycky jsem se vrátil. Tohle město miluju.',
    'Ke zdravotnictví mě přivedlo právě rušení naší nemocnice. Chtěl jsem pochopit, proč se to děje a co se s tím dá dělat. Od roku 2017 jsem dělal asistenta poslanci Petru Třešňákovi, který byl tehdy místopředsedou zdravotnického výboru. Postupně jsem vedl resortní tým zdravotnictví u Pirátů a v roce 2021 jsem jim připravoval volební program pro zdravotnictví. Zdravotnický deník ho tehdy v nezávislé analýze vyhodnotil jako nejlepší mezi kandidujícími stranami.',
    'V letech 2022 až 2024 jsem byl náměstkem ministra zdravotnictví. Měl jsem veřejné zdraví, péči o matku a dítě a část covidové agendy. Ze všeho, co jsem tam dělal, mi nejvíc zůstaly tři věci. Vláda schválila strategii Baby Friendly Hospital. Vznikla metodika, podle které rodič u hospitalizovaného dítěte není návštěva, a k tomu úprava zákona 372. A do preventivních prohlídek kojenců se dostaly signální výkony ke kojení, což zní jako drobnost, ale znamená to, že se kojení konečně někde eviduje a dá se sledovat.',
    'Vedle toho jsem řídil Centrální řídící tým očkovacích kampaní, zahájil reformu krajských hygienických stanic a rozjížděl síť nemocničních ombudsmanů.',
    'Dneska jsem ve Správní radě VZP, v zastupitelstvu Mariánských Lázní a předsedám správní radě zdejšího symfonického orchestru. Živí mě ale marketing. Vedu ho lázeňským hotelům Ensana — vrátil jsem se vlastně tam, kde jsem začínal. Je to práce o obsazenosti, cenách a o tom, proč sem lidi jezdí.',
    'Vystudoval jsem ekonomiku a management na Západočeské univerzitě v Plzni.',
    'Ve volném čase stavím weby a datové věci. Největší je HSPA Česko, kde měřím výkonnost českého zdravotnictví. Čísla o něm existují, jen je nikdo nedával dohromady. Druhý je marienbad.com, portál o Mariánských Lázních pro cizince. Kromě toho školím time management a napsal jsem k tomu příručku.',
    'Píšu městskou fantasy, cyklus se jmenuje Česká hlídka. Fotím. Dělám dvě hry, vesmírnou strategii a taktiku plachetnic. Cvičím aikidó, běhám, vedu roky stejnou kampaň v Zapomenutých říších a rád testuju dobrou whisky.',
  ],

  mimoPraciLabel: 'Mimo práci',
  mimoPraci: [
    {
      title: 'Běh',
      meta: 'Od 2013 · RunCzech · ČMK',
      text: 'Půlmaratony, občas maraton a výjimečně něco delšího. Tam už jsem ale na hraně: padesát šest kilometrů a dva tisíce šest set metrů převýšení za patnáct hodin v Krkonoších byl můj strop.',
    },
    {
      title: 'Lipová MTB',
      meta: 'Pořádali jsme',
      text: 'Závod horských kol v Lipové jsem několik let pořádal s tátou. Po jeho smrti proběhl ještě jeden ročník jako Memoriál Josefa Pavlovice a tím to skončilo. Bez něj to nedávalo smysl.',
    },
    {
      title: 'Aikidó',
      meta: 'Od 2010 · aikidoml.cz',
      text: 'Členem oddílu Aikidó Mariánské Lázně jsem od roku 2010. Posledních několik let pomáhám našemu senseiovi vést tréninky.',
    },
    {
      title: 'Zapomenuté říše',
      meta: 'Aktivně',
      text: 'Vedu dlouhodobou kampaň v Dungeons & Dragons. K jednomu z vrcholů příběhu vznikly tři symfonické metalové skladby v češtině.',
    },
    {
      title: 'Whisky',
      meta: 'Aktivně',
      text: 'Považuju se za milovníka kvalitní whisky a rád testuju novinky. Nejvíc mě baví ty kouřové.',
    },
  ],

  bioLabel: 'Bio ke zkopírování',
  bios: [
    {
      label: 'Krátká (55 slov)',
      text: 'Josef Pavlovic byl v letech 2022–2024 náměstkem ministra zdravotnictví. Dnes je členem Správní rady VZP ČR, zastupitelem v Mariánských Lázních a předsedou správní rady tamního symfonického orchestru. Živí ho marketing lázeňských hotelů Ensana. Ve volném čase staví HSPA Česko, portál o výkonnosti českého zdravotnictví, a školí time management.',
    },
    {
      label: 'Střední (160 slov)',
      text: 'Josef Pavlovic dělá zdravotní politiku od roku 2017. Začínal jako asistent poslance Petra Třešňáka, tehdy místopředsedy zdravotnického výboru. Potom vedl resortní tým zdravotnictví u Pirátů a připravoval jejich volební program pro zdravotnictví; analýza Zdravotnického deníku ho v roce 2021 vyhodnotila jako nejlepší mezi kandidujícími stranami.\n\nV letech 2022 až 2024 byl náměstkem ministra zdravotnictví. Měl na starosti veřejné zdraví, péči o matku a dítě a část covidové agendy. Za jeho působení vláda schválila strategii Baby Friendly Hospital a vznikla metodika, podle které rodič u hospitalizovaného dítěte není návštěva.\n\nDnes je ve Správní radě VZP ČR, v zastupitelstvu Mariánských Lázní a předsedá správní radě Západočeského symfonického orchestru. Živí ho marketing, vede ho lázeňským hotelům Ensana. Mimo práci staví HSPA Česko a marienbad.com, školí time management, píše a fotí.',
    },
  ],
}

/* --------------------------------------------------------- Veřejná služba */

export type Role = {
  title: string
  period?: string
  intro?: string
  outcomes: string[]
}

export const verejnaSluzba = {
  title: 'Kde jsem byl — a co z toho vzniklo',
  // Deck měl „Titul je nárok. Níže je…". Autor to nechal přepsat: byl to
  // aforismus (což editorial pravidla decku zakazují) a šlo číst obojím směrem.
  perex: 'U každé funkce je to, co se v ní reálně odehrálo.',

  roles: [
    {
      title: 'Náměstek ministra zdravotnictví',
      period: '2022–2024',
      intro:
        'Nominován Pirátskou stranou, spolupráce s ministrem Válkem. Agenda: veřejné zdraví, péče o matku a dítě, část covidové agendy, elektronizace a otevřená data.',
      outcomes: [
        'Vláda schválila strategii Baby Friendly Hospital.',
        'Metodika pro přítomnost zákonného zástupce u hospitalizovaného dítěte a úprava zákona č. 372 — rodič není návštěva.',
        'Signální výkony ke kojení v preventivních prohlídkách dětí do jednoho roku.',
        'Řízení Centrálního řídícího týmu očkovacích kampaní proti covidu a chřipce; vznik Národního institutu pro zvládání pandemie pod SZÚ.',
        'Zahájení reformy krajských hygienických stanic a novely zákona č. 258/2000 Sb.',
        'Síť nemocničních ombudsmanů a zadání jejich školicího kurzu.',
      ],
    },
    {
      title: 'Vedoucí resortního týmu pro zdravotnictví — Česká pirátská strana',
      intro: 'Odborné zázemí strany pro zdravotní politiku.',
      outcomes: [
        'Hlavní garant volebního programu pro zdravotnictví (2021). Nezávislá analýza Zdravotnického deníku ho vyhodnotila jako nejlepší zdravotnický program mezi kandidujícími stranami.',
      ],
    },
    {
      title: 'Asistent poslance Petra Třešňáka',
      period: 'od 11/2017',
      intro:
        'Petr Třešňák byl v letech 2017–2021 místopředsedou zdravotnického výboru Poslanecké sněmovny.',
      outcomes: ['Odtud vede celá moje dráha ve zdravotní politice.'],
    },
    {
      title: 'Člen Správní rady VZP ČR',
      intro:
        'Správní rada schvaluje zdravotně pojistný plán, rozpočet a nakládání s majetkem největší zdravotní pojišťovny v zemi. Pracovní skupiny pro NIS, finance, investice a fond prevence.',
      outcomes: [
        'Analýza závislosti VZP na jediném dodavateli informačního systému a dopadů bezpečnostního opatření NÚKIB.',
        'Připomínky k preventivnímu programu a ke kritériím hodnocení ředitele VZP.',
      ],
    },
    {
      title: 'Zastupitel města Mariánské Lázně',
      period: 'od 2018',
      intro:
        'Zvolen v letech 2018 a 2022. Zastupitelstvo rozhoduje o rozpočtu města, nakládání s majetkem a územním plánu.',
      outcomes: [
        'Žádost o informace ve věci autorských práv k logu města (2026).',
        'Prosazení aktualizace zakladatelské listiny ZSO tak, aby odpovídala zákonu.',
      ],
    },
    {
      title: 'Předseda správní rady ZSO Mariánské Lázně o.p.s.',
      intro: 'Správní rada odpovídá za hospodaření a strategické směřování orchestru.',
      outcomes: [
        'Vedení výběrového řízení na šéfdirigenta — zvolena Michaela Róza Růžičková.',
        'Narovnání zápisů a povinností vůči rejstříkovému soudu.',
      ],
    },
    {
      title: 'Poradce poslankyně Evy Šrámkové — zdravotní politika',
      intro: 'Podklady, analýzy a příprava interpelací.',
      outcomes: [
        'Interpelace ke kontaminaci kojenecké výživy (cereulid / B. cereus).',
        'Interpelace k digitalizaci českého eHealth.',
      ],
    },
  ] satisfies Role[],

  dalsiAgendyLabel: 'Další agendy',
  dalsiAgendy:
    'Zdraví 2030 · strategická skupina personální stabilizace · zastupování v NERV · čerpání z IROP pro hygieny a SZÚ · vyhláška k bankám mateřského mléka · koncepce péče o matku a dítě, role porodních asistentek · Long Covid · debyrokratizace ordinací PLDD · duševní zdraví dětí s MŠMT · dětské skupiny ve zdravotnických zařízeních · komunikace s WHO k primární péči.',

  temataLabel: 'Témata, ke kterým se vracím',
  temata: [
    {
      title: 'Péče o matku a dítě',
      text: 'Táhne se mi to napříč vším, co dělám. Na ministerstvu iniciativa přátelských porodnic, signální výkony ke kojení, vyhláška k bankám mateřského mléka a propojování nemocnic s komunitními službami. Ve sněmovně interpelace ke kontaminaci kojenecké výživy. Na HSPA Česko data o kojení po jednotlivých porodnicích.',
    },
    {
      title: 'Střety zájmů',
      text: 'Kdo radí státu a kdo na tom vydělává. Vliv výrobců na doporučení k výživě kojenců, závislost VZP na jediném dodavateli informačního systému, zakázky ve městě. Je to pokaždé stejná otázka položená v jiném prostředí.',
    },
  ],

  ocenani: {
    title: 'Genderman roku 2024 — třetí místo',
    text: 'V kategorii Osobnost roku, za podíl na iniciativě přátelských porodnic a na propojování nemocnic s komunitními službami. Cenu uděluje Otevřená společnost mužům, kteří odmítají sexismus a podporují genderovou rovnost. Vyhlášeno v lednu 2025.',
  },

  mesto: {
    title: 'Mariánské Lázně — co se povedlo',
    mojeRukaLabel: 'Moje ruka',
    mojeRukaNote: 'Věci, u kterých jsem byl navrhovatel nebo garant.',
    mojeRuka: [
      'Participativní rozpočet — z 500 tisíc na 1 milion korun ročně',
      'Mobilní rozhlas — přes 500 vyřešených podnětů od občanů',
      'Otevřené účty města a přenosy ze zastupitelstva',
    ],
    koaliceLabel: 'Za koalice, ve které jsem v letech 2018–2022 působil, město dotáhlo',
    koalice:
      'Chopin 85 mil. (dotace 41,4) · zimní stadion 38 mil. (dotace 19,6) · dílny ZŠ Úšovice 16 mil. (dotace 13) · trolejbusy a měnírna, dotace přes 100 mil. · sídliště Plzeňská 5 mil. · 60 mil. do silnic a chodníků · opravy zastávek MHD · discgolf a parkour z participativního rozpočtu · pět tůní, sad, rybníky · návrat múz Olbrama Zoubka, odkup hudebního divadla · UNESCO · fond kultury a fond sportu.',
    opozice: 'Od roku 2022 jsem v opozici.',
    zaver:
      'V komunálních volbách 2026 kandiduju v Mariánských Lázních. Volební program a kampaň mají vlastní web: Pro lepší Mariánské Lázně.',
  },
}

/* ---------------------------------------------------------------- Projekty */

export type Project = {
  title: string
  status: string
  url?: string
  text: string
  extra?: string[]
}

export const projekty = {
  title: 'Co stavím',
  perex: 'Většina z toho vznikla proto, že to nikdo jiný neudělal.',

  items: [
    {
      title: 'HSPA Česko',
      status: 'Běží',
      url: 'https://hspa-cesko.cz',
      text: 'Portál, který měří výkonnost českého zdravotnictví podle metodiky health system performance assessment. Automatizované datové pipeline, otevřená metodika, průběžná aktualizace.',
    },
    {
      title: 'marienbad.com',
      status: 'Ve vývoji',
      text: 'Redakční portál o Mariánských Lázních pro německy mluvící a mezinárodní návštěvníky. Ne katalog ubytování — texty o tom, proč sem jezdit.',
    },
    {
      title: 'Ensana Mariánské Lázně',
      status: 'Práce',
      text: 'Marketing klastru lázeňských hotelů: kampaně, věrnostní program, obsah ve čtyřech jazycích, strategie.',
    },
    {
      title: 'NakedTruth',
      status: 'Ve vývoji',
      url: 'https://naked-truth.vercel.app',
      text: 'Kvízová aplikace pro páry.',
    },
  ] satisfies Project[],

  hryLabel: 'Hry pro radost',
  hryPerex: 'Tyhle věci nemají žádný účel. To je celé jejich kouzlo.',
  hry: [
    {
      title: 'WallOfBattle',
      status: 'Prototyp',
      url: 'https://wallofbattle.com',
      text: 'Flotilová taktika ve vesmíru. Stěna bitvy je stará námořní formace — lodě seřazené do linie, aby mohly pálit z boku. Tady se ta linie staví ve třech rozměrech.',
      extra: ['Z jejího enginu vznikla druhá hra na téhle stránce.'],
    },
    {
      title: 'Pirates',
      status: 'Ve vývoji',
      text: 'Boj plachetnic, kde vítr není kulisa, ale hlavní mechanika. Loď potřebuje rychlost, aby se dala řídit. Za ostrovem ztratíš vítr. Vesla ti pomůžou tam, kde plachty nestačí. Boční salvu musíš donést na cíl.',
      extra: [
        'Nepřítel, který zmizí za ostrovem, zůstane na mapě na poslední známé pozici — ne tam, kde doopravdy je.',
        'Kampaň o jedenácti misích s pojmenovanými postavami, adaptivní hudbou a vlastním světem.',
      ],
    },
    {
      title: 'Didaktikon',
      status: 'Hratelné',
      text: 'Epidemiologická detektivka. Hráči dostanou ohnisko nákazy a musí najít zdroj. Vzniklo pro výuku.',
    },
    {
      title: 'Tři židle',
      status: 'Ve vývoji · součást HSPA Česko',
      text: 'Jedno rozhodnutí, tři pohledy: ministr, ředitel nemocnice a pacient. Každý sedí na jiné straně stolu, pracuje s jinými informacemi a nese jiné důsledky.',
    },
  ] satisfies Project[],
}

/* ------------------------------------------------------------ Produktivita */

export const produktivita = {
  title: 'Školím lidi zvládat práci tak, aby jim nepřerostla přes hlavu',
  body: [
    'Vycházím z metody Getting Things Done, ale bez její sektářské verze. Cílem není mít dokonalý systém, ale mít volnou hlavu.',
    'Ke kurzu patří návody na konkrétní nástroje: Todoist, OneNote, Google Workspace, Notion. Vybírám podle toho, v čem lidi už pracují, ne podle toho, co je zrovna v módě.',
    'Napsal jsem k tomu příručku produktivity, kterou dostane každý účastník.',
    'Školím týmy i jednotlivce. Pokud vás to zajímá, napište mi.',
  ],
  items: [
    {
      title: 'Příručka produktivity',
      status: 'Hotové',
      text: 'Kniha o tom, jak si postavit systém, který slouží vám, a ne naopak. Existuje ve verzi připravené k tisku.',
    },
    {
      title: 'Návody k nástrojům',
      status: 'Hotové',
      text: 'Todoist, OneNote, Google Workspace. Plus samostatný průvodce osobním znalostním managementem v Notionu a kalendáři.',
    },
  ] satisfies Project[],
}

/* ----------------------------------------------------------------- Tvorba */

export const tvorba = {
  title: 'Psaní a fotografie',
  perex:
    'Dvě věci, které spolu na první pohled nesouvisí. Obojí je hledání toho, jak něco doopravdy funguje.',

  beletrieLabel: 'Beletrie',
  beletrie: [
    {
      title: 'Česká hlídka',
      status: 'cyklus, rozepsáno',
      text: 'Městská fantasy v současném Česku. Existují lidé, kteří vidí víc než ostatní, říkají si Jiní a žijí mezi námi. Nad příměřím mezi Světlem a Tmou dohlíží Noční a Denní hlídka.',
    },
    { title: 'Hlína a světlo', status: 'díl cyklu', text: '' },
    { title: 'Požehnání v krvi', status: 'díl cyklu', text: '' },
  ] satisfies Project[],

  analyzyLabel: 'Analýzy a texty',
  analyzy: [
    {
      title: 'Kontaminace kojenecké výživy',
      status: 'interpelace, sněmovna',
      text: 'Podklad a text interpelace k případu cereulidu a Bacillus cereus v kojenecké výživě.',
    },
    {
      title: 'Digitalizace českého eHealth',
      status: 'interpelace, sněmovna',
      text: 'Kde stojí české elektronické zdravotnictví a co brzdí jeho zavádění.',
    },
    {
      title: 'Závislost na dodavateli informačního systému',
      status: 'analýza, VZP',
      text: 'Rozbor situace kolem IT zakázek VZP a bezpečnostního opatření NÚKIB.',
    },
  ] satisfies Project[],

  fotografieLabel: 'Fotografie',
  fotografie:
    'Svatby, portréty, architektura a volná tvorba. Portfolio má vlastní sekci s galeriemi, nabídkou a kontaktem na focení.',
  fotografieCta: 'Otevřít fotoportfolio →',
  fotografieHref: '/foto',
}

/* ---------------------------------------------------------------- Kontakt */

export const kontakt = {
  title: 'Napište mi',
  perex: 'Spolupráce, zdravotní politika, Mariánské Lázně, focení — cokoli z toho.',
  mediaLabel: 'Pro média',
  media: [
    'Bio ke zkopírování ve třech délkách — v sekci O mně.',
    'Kontakt pro rozhovory a odborné komentáře.',
    'Správný tvar jména: Josef Pavlovic — bez háčku, nikdy „Pavlovič".',
  ],
}
