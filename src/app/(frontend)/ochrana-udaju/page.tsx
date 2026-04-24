import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů',
  description: 'Informace o zpracování osobních údajů pro kontaktní formulář.',
}

export default function OchranaUdajuPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-12 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-primary font-light tracking-wide mb-4">
            Ochrana osobních údajů
          </h1>
          <p className="text-secondary font-sans text-sm">
            Informace o tom, jak jsou zpracovány údaje z kontaktního formuláře.
          </p>
        </header>

        <div className="space-y-8 font-sans text-secondary leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="font-display text-2xl text-primary font-light mb-3">Správce údajů</h2>
            <p>
              Správcem osobních údajů je Josef Pavlovic, Mariánské Lázně, Česká republika.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-primary font-light mb-3">Jaké údaje zpracovávám</h2>
            <p>
              Jméno, e-mail, telefon (volitelně), preferované datum focení (volitelně), typ poptávky a text zprávy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-primary font-light mb-3">Účel zpracování</h2>
            <p>
              Údaje slouží výhradně k vyřízení vaší poptávky, domluvě termínu a související komunikaci.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-primary font-light mb-3">Doba uchování</h2>
            <p>
              Údaje uchovávám pouze po nezbytnou dobu potřebnou k vyřízení poptávky a následné komunikaci.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-primary font-light mb-3">Vaše práva</h2>
            <p>
              Máte právo požádat o přístup ke svým údajům, opravu, výmaz, omezení zpracování a podat námitku.
              Pro uplatnění práv mě kontaktujte na e-mailu <a className="underline" href="mailto:mail@josefpavlovic.cz">mail@josefpavlovic.cz</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
