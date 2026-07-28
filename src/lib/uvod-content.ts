/**
 * Obsah osobního rozcestníku (design „Homepage variace" — varianty 1a/1b/1c).
 * Všechny tři varianty sdílejí tenhle obsah, liší se jen typografií a layoutem.
 */

export type UvodArea = {
  title: string
  text: string
  cta: string
  /** Cíl dlaždice. Bez něj se dlaždice nerenderuje jako odkaz. */
  href?: string
}

export type UvodNavItem = {
  label: string
  href?: string
}

const EMAIL = 'josef@josefpavlovic.cz'

export const uvodNav: UvodNavItem[] = [
  { label: 'Úvod', href: '/' },
  { label: 'O mně', href: '/zivotopis' },
  { label: 'Veřejná služba', href: '/verejna-sluzba' },
  { label: 'Projekty', href: '/projekty' },
  { label: 'Produktivita', href: '/produktivita' },
  { label: 'Tvorba', href: '/foto' },
  { label: 'Kontakt', href: `mailto:${EMAIL}` },
]

export const uvodContent = {
  name: 'Josef Pavlovic',
  place: 'Mariánské Lázně',

  lead:
    'Narodil jsem se v Mariánských Lázních, tenkrát tu ještě byla nemocnice. Její rušení mě dovedlo ke zdravotnictví — na chvíli až do sněmovny a na ministerstvo. Jinak žiju tady celý život: při škole jsem začínal na hotelové recepci a dnes týmž hotelům vedu marketing. Tohle město miluju.',

  portraitCaption: 'portrét · Aleš Vopát, album JP',
  portraitCaptionShort: 'portrét · Aleš Vopát',
  portraitCredit: 'Foto Aleš Vopát, 2024',

  areas: [
    {
      title: 'Zdravotnictví a veřejná služba',
      text: 'Náměstek ministra zdravotnictví 2022–2024, Správní rada VZP, resortní tým Pirátů. Co jsem kde dělal.',
      cta: 'Podrobně →',
      href: '/verejna-sluzba',
    },
    {
      title: 'Mariánské Lázně',
      text: 'Zastupitel od roku 2018, předseda správní rady symfonického orchestru. Co se ve městě povedlo a co ne.',
      cta: 'Podrobně →',
      href: '/marianske-lazne',
    },
    {
      title: 'Marketing a destinace',
      text: 'Vedu marketing lázeňského klastru Ensana. Vedle toho stavím marienbad.com.',
      cta: 'Podrobně →',
      href: '/marketing',
    },
    {
      title: 'Co stavím',
      text: 'HSPA Česko, datové pipeline, aplikace. Většinou proto, že to nikdo jiný neudělal.',
      cta: 'Projekty →',
      href: '/projekty',
    },
    {
      title: 'Time management a GTD',
      text: 'Školím týmy i jednotlivce. Napsal jsem k tomu příručku.',
      cta: 'Podrobně →',
      href: '/produktivita',
    },
    {
      title: 'Hry pro radost',
      text: 'Vesmírná strategie a taktika plachetnic. Dvě věci bez jakéhokoli účelu.',
      cta: 'Podrobně →',
      href: '/hry',
    },
    {
      title: 'Tvorba',
      text: 'Česká hlídka, analýzy ke zdravotnictví, fotoaparát.',
      cta: 'Podrobně →',
      href: '/foto',
    },
  ] satisfies UvodArea[],

  nowLabel: 'Právě teď — červenec 2026',
  now: [
    'Dokončuju sociální publikační vrstvu pro HSPA Česko',
    'Chystám kandidátku pro komunální volby v Mariánských Lázních',
    'Dodělávám kampaň pirátské námořní hry, mise 7–11',
  ],

  summaryLabel: 'Zkráceně',
  summary:
    'Začínal jsem ve sněmovně jako asistent poslance, pak jsem vedl resortní tým zdravotnictví u Pirátů a v letech 2022 až 2024 byl náměstkem ministra zdravotnictví. Dneska jsem ve Správní radě VZP. Živí mě marketing lázeňských hotelů, zbytek času stavím datové projekty, školím produktivitu, píšu a fotím.',
  cvLabel: 'Celý životopis →',
  cvHref: '/zivotopis',

  copyright: '© 2026 Josef Pavlovic · Mariánské Lázně',
  email: EMAIL,
}

/**
 * Podstránky rozcestníku. Zatím nesou jen perex převzatý z dlaždice — plný
 * text se dopisuje, proto jsou noindex a nejsou v sitemapě (viz sitemap.ts).
 * Až text přibude, stačí doplnit `body` a zrušit `draft`.
 */
export type HubSection = {
  slug: string
  title: string
  perex: string
  body?: string[]
  /** Bez hotového textu — noindex, mimo sitemapu. */
  draft?: boolean
}

export const hubSections: HubSection[] = [
  {
    slug: 'zivotopis',
    title: 'O mně',
    perex: uvodContent.lead,
    body: [uvodContent.summary],
  },
  ...uvodContent.areas
    .filter((area) => area.href?.startsWith('/') && area.href !== '/foto')
    .map((area) => ({
      slug: area.href!.slice(1),
      title: area.title,
      perex: area.text,
      draft: true,
    })),
]

export function getHubSection(slug: string): HubSection | undefined {
  return hubSections.find((section) => section.slug === slug)
}
