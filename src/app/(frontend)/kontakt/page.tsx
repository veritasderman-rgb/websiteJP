import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../../../keystatic.config'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktujte Josefa Pavlovice — fotografa z Mariánských Lázní. Poptejte svatbu, boudoir focení nebo portrét.',
}

export default async function KontaktPage() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const settings = await reader.singletons.siteSettings.read()
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.CONTACT_TO_EMAIL || settings?.email || 'mail@josefpavlovic.cz'
  const instagram = settings?.instagram || 'josefpavlovic'
  const location = settings?.location || 'Mariánské Lázně, Česká republika'
  const phone = settings?.phone || ''

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl text-primary font-light tracking-wide mb-4">
            Kontakt
          </h1>
          <p className="text-secondary font-sans text-sm max-w-md mx-auto">
            Rád se dozvím o vašem plánovaném focení. Napište mi a brzy se ozvu.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.35fr] gap-12 lg:gap-16 items-start">
          <aside className="bg-surface px-6 py-8 md:px-8 md:py-10">
            <h2 className="font-display text-2xl text-primary font-light mb-6">Přímý kontakt</h2>
            <p className="text-secondary font-sans text-sm leading-relaxed mb-8">
              Formulář odešle poptávku na stejný e-mail. Když spěcháte, napište přímo.
            </p>
            <div className="space-y-6 font-sans text-sm">
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-secondary mb-1">Lokace</p>
                <p className="text-primary">{location}</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-secondary mb-1">E-mail</p>
                <a href={`mailto:${email}`} className="text-primary hover:text-accent transition-colors">
                  {email}
                </a>
              </div>
              {phone && (
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-secondary mb-1">Telefon</p>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-primary hover:text-accent transition-colors">
                    {phone}
                  </a>
                </div>
              )}
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-secondary mb-1">Instagram</p>
                <a
                  href={`https://www.instagram.com/${instagram.replace(/^@/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors"
                >
                  @{instagram.replace(/^@/, '')}
                </a>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-secondary leading-relaxed">
                  Na zprávy odpovídám zpravidla do 24-48 hodin. Pro urgentní dotazy napište přímo na e-mail nebo Instagram.
                </p>
              </div>
            </div>
          </aside>

          <div>
            <ContactForm contactEmail={email} />
          </div>
        </div>
      </div>
    </div>
  )
}
