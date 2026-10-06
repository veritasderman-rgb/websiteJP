import Image from 'next/image'
import Link from 'next/link'
import { uvodContent } from '@/lib/uvod-content'

/**
 * Foto teaser v hero rozcestníku — fotka přes celou výšku sloupce, dole popis
 * a odkaz do fotosekce. Na úzkých displejích je to pás pod portrétem.
 */
export default function FotoTeaser({
  className = '',
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  const teaser = uvodContent.fotoTeaser

  return (
    <Link
      href={teaser.href}
      aria-label={`${teaser.label}: ${teaser.title} — ${teaser.cta}`}
      className={`group relative block overflow-hidden ${className}`}
    >
      <Image
        src={teaser.image}
        alt={teaser.alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        sizes="(max-width: 1024px) 100vw, 32vw"
      />
      {/* Ztmavení dolů, aby text zůstal čitelný na světlé fotce. */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.13em] text-white/80">
          {teaser.label}
        </p>
        <p className="font-[family-name:var(--font-source-serif)] mt-2.5 mb-0 max-w-[14em] text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.2] text-pretty">
          {teaser.title}
        </p>
        <p className="mt-3 mb-0 max-w-[30em] text-sm leading-[1.6] text-pretty text-white/85">
          {teaser.text}
        </p>
        <p className="mt-5 mb-0 text-[13.5px] font-medium underline-offset-4 group-hover:underline">
          {teaser.cta}
        </p>
      </div>
    </Link>
  )
}
