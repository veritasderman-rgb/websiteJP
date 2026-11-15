import Link from 'next/link'
import HubPage from './HubPage'
import { ACCENT } from './HubChrome'

/** Stránka 404 ve stylu osobního webu, s hlavní navigací. */
export default function HubNotFound() {
  return (
    <HubPage
      title="Stránka nenalezena"
      perex="Tahle adresa neexistuje nebo se přestěhovala."
    >
      <p className="mt-10 max-w-[38em] text-[17px] leading-[1.7]" style={{ color: '#2A2D33' }}>
        Zkuste navigaci nahoře, nebo pokračujte na{' '}
        <Link href="/foto" className="underline" style={{ color: ACCENT }}>
          fotografické portfolio
        </Link>
        .
      </p>
    </HubPage>
  )
}
