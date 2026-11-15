import Link from 'next/link'

/** Text stránky 404 pro fotografickou část (hlavičku a patičku dodá layout). */
export default function NotFoundContent() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        <p className="text-accent text-xs tracking-[0.2em] uppercase font-sans mb-3">Chyba 404</p>
        <h1 className="font-display text-4xl md:text-6xl text-primary font-light tracking-wide mb-6">
          Stránka nenalezena
        </h1>
        <p className="text-secondary font-sans text-sm max-w-md mx-auto leading-relaxed mb-10">
          Tahle adresa neexistuje nebo se přestěhovala. Zkuste portfolio, nebo se vraťte na úvod.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/foto/portfolio"
            className="inline-block bg-primary text-white text-xs tracking-[0.18em] uppercase px-8 py-4 hover:bg-accent transition-colors font-sans"
          >
            Portfolio
          </Link>
          <Link
            href="/foto"
            className="inline-block border border-primary text-primary text-xs tracking-[0.18em] uppercase px-8 py-4 hover:bg-primary hover:text-white transition-colors font-sans"
          >
            Fotografie — úvod
          </Link>
          <Link
            href="/"
            className="inline-block border border-primary text-primary text-xs tracking-[0.18em] uppercase px-8 py-4 hover:bg-primary hover:text-white transition-colors font-sans"
          >
            Osobní web
          </Link>
        </div>
      </div>
    </div>
  )
}
