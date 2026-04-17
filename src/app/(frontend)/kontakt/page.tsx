import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktujte Josefa Pavlovice — fotografa z Mariánských Lázní. Poptejte svatbu, boudoir focení nebo portrét.',
}

export default function KontaktPage() {
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact info */}
          <aside>
            <h2 className="font-display text-2xl text-primary font-light mb-8">Jak mě najdete</h2>
            <div className="space-y-6 font-sans text-sm">
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-secondary mb-1">Lokace</p>
                <p className="text-primary">Mariánské Lázně</p>
                <p className="text-secondary">Karlovarský kraj, Česká republika</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-secondary mb-1">E-mail</p>
                <a href="mailto:mail@josefpavlovic.cz" className="text-primary hover:text-accent transition-colors">
                  mail@josefpavlovic.cz
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-secondary mb-1">Instagram</p>
                <a
                  href="https://www.instagram.com/josefpavlovic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors"
                >
                  @josefpavlovic
                </a>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-secondary leading-relaxed">
                  Na zprávy odpovídám zpravidla do 24–48 hodin. Pro urgentní dotazy volejte nebo pište na Instagram.
                </p>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
