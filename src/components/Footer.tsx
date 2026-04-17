import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-100 bg-white py-10 px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-secondary text-xs tracking-wider uppercase font-sans">
          © {year} Josef Pavlovic
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="https://www.instagram.com/josefpavlovic"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-secondary hover:text-accent transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </Link>
          <Link
            href="mailto:mail@josefpavlovic.cz"
            aria-label="E-mail"
            className="text-secondary hover:text-accent transition-colors text-xs tracking-wider uppercase"
          >
            mail@josefpavlovic.cz
          </Link>
        </div>
        <p className="text-secondary text-xs">
          Mariánské Lázně, Česká republika
        </p>
      </div>
    </footer>
  )
}
