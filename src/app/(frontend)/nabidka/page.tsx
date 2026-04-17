import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nabídka',
  description: 'Nabídka fotografických služeb — svatební fotografie, boudoir & akt, portréty. Profesionální přístup, individuální péče.',
}

const services = [
  {
    slug: 'wedding',
    label: 'Svatební fotografie',
    tagline: 'Váš den, váš příběh',
    description:
      'Každá svatba je jiná a každý pár si zaslouží fotografa, který jejich příběh pochopí a zachytí se stejnou autenticitou, s jakou byl prožit. Specializuji se na reportážní přístup doplněný o výtvarné portréty.',
    includes: [
      'Osobní konzultace před focením',
      'Přítomnost na celý svatební den',
      'Online galerie s plným rozlišením',
      'Profesionální zpracování a retuše',
      'Možnost tisknutých alb a tisků',
    ],
    cta: { href: '/kontakt?typ=svatba', label: 'Poptat svatbu' },
    note: 'Cena individuálně dle rozsahu a lokality.',
  },
  {
    slug: 'boudoir',
    label: 'Boudoir & Fine Art Akt',
    tagline: 'Oslava ženskosti a sebedůvěry',
    description:
      'Boudoir fotografie je o oslavě vás — vašeho těla, vaší krásy a vaší odvahy. V atmosféře vzájemné důvěry a profesionálního přístupu vznikají fotografie, které vás překvapí, jak nádherní dokážete být.',
    includes: [
      'Přípravná konzultace a makeup (na přání)',
      'Soukromé studio nebo lokace dle výběru',
      'Plně soukromá online galerie',
      'Diskrétní přístup a respekt k soukromí',
      'Možnost anonym (žádné zveřejňování bez souhlasu)',
    ],
    cta: { href: '/kontakt?typ=boudoir', label: 'Poptat boudoir' },
    note: 'Galerie zveřejňovány pouze s výslovným souhlasem.',
  },
  {
    slug: 'portrait',
    label: 'Portréty',
    tagline: 'Váš autentický obraz',
    description:
      'Osobní, rodinné a profesní portréty zachycené přirozeně a s citem. Ať hledáte nový profilový snímek, rodinné fotografie nebo kreativní portrét — přizpůsobím focení přesně vašim potřebám.',
    includes: [
      'Focení v ateliéru nebo na lokaci',
      'Výběr z nejlepších snímků',
      'Profesionální retuš',
    ],
    cta: { href: '/kontakt?typ=portret', label: 'Poptat portrét' },
    note: 'Rodinná, párová i individuální focení.',
  },
]

export default function NabidkaPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <header className="text-center mb-20">
          <h1 className="font-display text-4xl md:text-6xl text-primary font-light tracking-wide mb-4">
            Nabídka
          </h1>
          <p className="text-secondary font-sans text-sm max-w-md mx-auto leading-relaxed">
            Každé focení přistupuji individuálně — protože každý příběh si zaslouží vlastní přístup.
          </p>
        </header>

        <div className="space-y-24">
          {services.map((service, i) => (
            <article key={service.slug} className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-start ${i % 2 === 1 ? 'md:direction-rtl' : ''}`}>
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <p className="text-accent text-xs tracking-[0.2em] uppercase font-sans mb-3">{service.tagline}</p>
                <h2 className="font-display text-3xl md:text-4xl text-primary font-light mb-6">{service.label}</h2>
                <p className="text-secondary font-sans leading-relaxed mb-8">{service.description}</p>
                <ul className="space-y-2 mb-8">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-sans text-secondary">
                      <span className="text-accent mt-0.5 flex-shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
                {service.note && (
                  <p className="text-xs text-secondary/70 font-sans italic mb-8">{service.note}</p>
                )}
                <Link
                  href={service.cta.href}
                  className="inline-block border border-primary text-primary text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-primary hover:text-white transition-all duration-300 font-sans"
                >
                  {service.cta.label}
                </Link>
              </div>

              {/* Placeholder for gallery preview */}
              <div className={`bg-surface aspect-[4/3] flex items-center justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <Link href={`/portfolio`} className="text-secondary text-xs tracking-[0.15em] uppercase font-sans hover:text-accent transition-colors">
                  Zobrazit galerii →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
