import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getMediaUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'O mně',
  description: 'Jsem Josef Pavlovic, fotograf z Mariánských Lázní. Zachycuji příběhy, emoce a krásu — od svatebních ceremonií po fine art portréty.',
}

export const revalidate = 3600

export default async function OmnePage() {
  let aboutImage: string | null = null
  let aboutText: string | null = null

  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    if (settings?.aboutImage && typeof settings.aboutImage === 'object') {
      aboutImage = getMediaUrl((settings.aboutImage as any).filename)
    }
    aboutText = settings?.aboutText || null
  } catch {}

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl text-primary font-light tracking-wide">
            O mně
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {aboutImage && (
            <div className="relative aspect-[3/4] overflow-hidden sticky top-24">
              <Image
                src={aboutImage}
                alt="Josef Pavlovic — Fotograf"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          <div className={aboutImage ? '' : 'md:col-span-2 max-w-2xl mx-auto'}>
            <div className="space-y-6 font-sans text-secondary leading-relaxed">
              {aboutText ? (
                <p className="text-base">{aboutText}</p>
              ) : (
                <>
                  <p>
                    Jsem Josef Pavlovic, fotograf působící v Mariánských Lázních a jejich okolí. Fotografování mě provází od mládí — nejprve jako koníček, postupně jako způsob, jak sdílet krásu světa s ostatními.
                  </p>
                  <p>
                    Specializuji se na <strong className="text-primary font-medium">svatební fotografii</strong>, kde se snažím zachytit autentické momenty a emoce, které tvoří základ každého příběhu. Každý pár je jedinečný a jejich příběh si zaslouží být vyprávěn jejich vlastním způsobem.
                  </p>
                  <p>
                    Vedle svateb se věnuji <strong className="text-primary font-medium">fine art aktu a boudoir fotografii</strong> — žánru, který vyžaduje maximální důvěru, citlivost a umělecký přístup. Pracuji pouze s klienty, kteří jsou na tuto cestu opravdu připraveni.
                  </p>
                  <p>
                    Fotografuji také portréty, architektonické celky a při cestování zachycuji ulice měst a každodenní život. Mariánské Lázně a Karlovarský kraj jsou mým domovem, ale focení mě zavede kamkoliv.
                  </p>
                </>
              )}
            </div>

            <div className="mt-12 pt-12 border-t border-gray-100">
              <h2 className="font-display text-2xl text-primary font-light mb-6">Kontakt</h2>
              <div className="space-y-2 font-sans text-sm text-secondary">
                <p>📍 Mariánské Lázně, Karlovarský kraj</p>
                <p>✉ mail@josefpavlovic.cz</p>
              </div>
              <div className="mt-8">
                <Link
                  href="/kontakt"
                  className="inline-block border border-primary text-primary text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-primary hover:text-white transition-all duration-300 font-sans"
                >
                  Napište mi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
