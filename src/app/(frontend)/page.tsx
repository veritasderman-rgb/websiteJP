import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../../keystatic.config'
import HeroSection from '@/components/HeroSection'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Josef Pavlovic — Svatební & Fine Art Fotograf',
  description: 'Profesionální fotograf z Mariánských Lázní. Specializace na svatební fotografii a boudoir / fine art akt. Fotografie plné emocí a příběhů.',
}

export const revalidate = false

const categoryLabels: Record<string, string> = {
  wedding: 'Svatby',
  boudoir: 'Boudoir & Akt',
  portrait: 'Portréty',
  architecture: 'Architektura',
  street: 'Ulice & Cestování',
  other: 'Ostatní',
}

export default async function HomePage() {
  const reader = createReader(process.cwd(), keystaticConfig)

  const [settings, allGalleries, allTestimonials] = await Promise.all([
    reader.singletons.siteSettings.read(),
    reader.collections.galleries.all(),
    reader.collections.testimonials.all(),
  ])

  const featuredGalleries = allGalleries
    .filter((g) => g.entry.featured)
    .slice(0, 3)

  const testimonial = allTestimonials.find((t) => t.entry.featured)

  const heroSrc = settings?.heroImage || '/placeholder-hero.jpg'
  const aboutSrc = settings?.aboutImage || null

  return (
    <>
      <HeroSection
        imageSrc={heroSrc}
        title={settings?.siteName || 'Josef Pavlovic'}
        subtitle={settings?.tagline || 'Svatební & Fine Art Fotograf'}
      />

      {featuredGalleries.length > 0 && (
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-16 font-light tracking-wide">
            Výběr z portfolia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGalleries.map(({ slug, entry }) => (
              <Link key={slug} href={`/portfolio/${slug}`} className="group block overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                  {entry.coverImage && (
                    <Image
                      src={entry.coverImage}
                      alt={entry.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="pt-4 pb-2">
                  <h3 className="font-display text-xl text-primary font-light">{entry.title}</h3>
                  <p className="text-secondary text-xs tracking-[0.15em] uppercase font-sans mt-1">
                    {categoryLabels[entry.category] || entry.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-block border border-primary text-primary text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-primary hover:text-white transition-all duration-300 font-sans"
            >
              Celé portfolio
            </Link>
          </div>
        </section>
      )}

      <section className="py-24 bg-surface">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {aboutSrc && (
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={aboutSrc}
                alt="Josef Pavlovic — Fotograf"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
          <div className={aboutSrc ? '' : 'md:col-span-2 max-w-2xl'}>
            <p className="text-xs tracking-[0.2em] uppercase text-accent font-sans mb-4">O fotografovi</p>
            <h2 className="font-display text-3xl md:text-4xl text-primary font-light leading-tight mb-6">
              Fotografie jako příběh
            </h2>
            <p className="text-secondary font-sans leading-relaxed text-base mb-8">
              {settings?.aboutText ||
                'Jsem fotograf z Mariánských Lázní specializující se na svatební fotografii a fine art akt. Každé focení je pro mě jedinečný příběh, který si zaslouží být zachycen s citlivostí a upřímností.'}
            </p>
            <Link
              href="/o-mne"
              className="text-xs tracking-[0.2em] uppercase font-sans text-primary border-b border-primary pb-0.5 hover:text-accent hover:border-accent transition-colors"
            >
              Více o mně →
            </Link>
          </div>
        </div>
      </section>

      {testimonial && (
        <section className="py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <svg className="w-8 h-6 text-accent mx-auto mb-6" fill="currentColor" viewBox="0 0 32 24">
              <path d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l1.6 2.4C10.4 3.6 7.2 6.4 6.4 10.4H12V24H0zm20 0V14.4C20 6.4 24.8 1.6 34.4 0l1.6 2.4c-5.6 1.2-8.8 4-9.6 8H32V24H20z" />
            </svg>
            <blockquote className="font-display text-xl md:text-2xl text-primary font-light italic leading-relaxed mb-6">
              {testimonial.entry.quote}
            </blockquote>
            <cite className="text-secondary text-xs tracking-[0.15em] uppercase font-sans not-italic">
              — {testimonial.entry.author}
              {testimonial.entry.occasion && `, ${testimonial.entry.occasion}`}
            </cite>
          </div>
        </section>
      )}

      <section className="relative py-32 overflow-hidden">
        {settings?.ctaImage && (
          <>
            <Image
              src={settings.ctaImage}
              alt="Kontakt"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/55" />
          </>
        )}
        <div className="relative z-10 text-center px-6">
          <h2 className="font-display text-3xl md:text-5xl text-white font-light tracking-wide mb-4">
            Plánujete svatbu?
          </h2>
          <p className="text-white/70 font-sans text-sm mb-10 max-w-md mx-auto">
            Pojďme společně zachytit váš příběh. Kontaktujte mě a domluvíme se na detailech.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-white text-primary text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-accent hover:text-white transition-all duration-300 font-sans"
          >
            Napište mi
          </Link>
        </div>
      </section>
    </>
  )
}
