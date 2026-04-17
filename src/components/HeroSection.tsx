'use client'

import Image from 'next/image'
import Link from 'next/link'

interface HeroSectionProps {
  imageSrc: string
  imageAlt?: string
  title?: string
  subtitle?: string
}

export default function HeroSection({
  imageSrc,
  imageAlt = 'Josef Pavlovic — Fotograf',
  title = 'Josef Pavlovic',
  subtitle = 'Svatební & Fine Art Fotograf',
}: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero image with Ken Burns */}
      <div className="absolute inset-0 animate-kenburns">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="animate-fade-in">
          <h1 className="font-display text-white text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.06em] mb-4">
            {title}
          </h1>
          <p className="text-white/80 text-xs md:text-sm tracking-[0.25em] uppercase font-sans mb-10">
            {subtitle}
          </p>
          <Link
            href="/portfolio"
            className="inline-block border border-white/60 text-white text-xs tracking-[0.2em] uppercase px-8 py-3 hover:bg-white hover:text-primary transition-all duration-300 font-sans"
          >
            Zobrazit portfolio
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-bounce">
        <span className="text-white/50 text-xs tracking-[0.2em] uppercase font-sans">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-white/50">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
          <rect x="6.5" y="5" width="3" height="5" rx="1.5" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}
