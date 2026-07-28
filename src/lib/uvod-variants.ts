import VariantA from '@/components/uvod/VariantA'
import VariantB from '@/components/uvod/VariantB'
import VariantC from '@/components/uvod/VariantC'

export const uvodVariants = [
  {
    id: '1a',
    name: 'Lázeňský deník',
    note: 'Source Serif 4 + Inter · akcent #14606B',
    Component: VariantA,
  },
  {
    id: '1b',
    name: 'Inkoust',
    note: 'Newsreader + Inter · akcent hlubší petrolej oklch(0.40 0.06 210)',
    Component: VariantB,
  },
  {
    id: '1c',
    name: 'Kolonáda',
    note: 'Piazzolla + IBM Plex Sans · teplejší papír, akcent smrková zeleň oklch(0.45 0.07 170)',
    Component: VariantC,
  },
] as const

export type UvodVariantId = (typeof uvodVariants)[number]['id']

export function getUvodVariant(id: string) {
  return uvodVariants.find((v) => v.id === id)
}

/** Podklad plátna, na kterém varianty leží v původním designu. */
export const CANVAS_BG = '#EDEAE3'
