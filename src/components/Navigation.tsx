'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/o-mne', label: 'O mně' },
  { href: '/nabidka', label: 'Nabídka' },
  { href: '/blog', label: 'Blog' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 60)
      setHidden(currentY > lastScrollY.current && currentY > 200)
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isHome = pathname === '/'
  const navBg = scrolled
    ? 'bg-white/95 backdrop-blur-sm shadow-sm'
    : isHome
    ? 'bg-transparent'
    : 'bg-white'
  const textColor = scrolled || !isHome ? 'text-primary' : 'text-white'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBg} ${
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link
            href="/"
            className={`font-display text-base tracking-[0.12em] uppercase font-medium transition-colors ${textColor}`}
          >
            Josef Pavlovic
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-xs tracking-[0.15em] uppercase font-sans transition-colors hover:text-accent ${textColor} ${
                    pathname.startsWith(href) ? 'border-b border-accent pb-0.5' : ''
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            aria-label={menuOpen ? 'Zavřít menu' : 'Otevřít menu'}
            onClick={() => setMenuOpen((o) => !o)}
            className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors ${textColor}`}
          >
            <span className={`block w-5 h-px bg-current transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          aria-label="Zavřít menu"
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-6 text-primary p-2"
        >
          <span className="block w-6 h-px bg-current rotate-45 translate-y-px" />
          <span className="block w-6 h-px bg-current -rotate-45 -translate-y-px" />
        </button>
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-display text-3xl text-primary hover:text-accent transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
