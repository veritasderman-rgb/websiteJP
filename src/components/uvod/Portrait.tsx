import Image from 'next/image'
import { uvodContent } from '@/lib/uvod-content'

export const PORTRAIT_SRC = '/media/uvod/portret-josef-pavlovic.jpg'

interface PortraitProps {
  /** Rámeček kolem fotky (1a). */
  borderColor?: string
  /** Zaoblení rohů (1c). */
  rounded?: boolean
  /** Barva popisku pod fotkou. */
  creditColor?: string
  priority?: boolean
  sizes?: string
  /** Design nemá mobilní rozpis — na úzkých displejích portrét omezujeme. */
  className?: string
}

/**
 * Portrét v poměru 3:4 — v designu zástupná šrafura s popiskem
 * „portrét · Aleš Vopát", tady skutečná fotka + kredit pod ní.
 */
export default function Portrait({
  borderColor,
  rounded = false,
  creditColor = '#8A8D94',
  priority = false,
  sizes = '(max-width: 768px) 60vw, 300px',
  className = 'max-w-[300px] max-md:max-w-[240px]',
}: PortraitProps) {
  return (
    <div className={className}>
      <div
        className={`relative aspect-[3/4] overflow-hidden ${rounded ? 'rounded-lg' : ''}`}
        style={borderColor ? { border: `1px solid ${borderColor}` } : undefined}
      >
        <Image
          src={PORTRAIT_SRC}
          alt={`${uvodContent.name} — portrét`}
          fill
          priority={priority}
          className="object-cover"
          sizes={sizes}
        />
      </div>
      <p className="mt-2.5 text-xs" style={{ color: creditColor }}>
        {uvodContent.portraitCredit}
      </p>
    </div>
  )
}
