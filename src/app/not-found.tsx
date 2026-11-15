import type { Metadata } from 'next'
import HubNotFound from '@/components/uvod/HubNotFound'
import { uvodFontVariables } from '@/lib/uvod-fonts'

export const metadata: Metadata = {
  title: 'Stránka nenalezena',
  robots: { index: false },
}

// Neznámé adresy nepatří do žádné skupiny rout, takže tu není layout
// rozcestníku — písma si stránka musí přinést sama.
export default function NotFound() {
  return (
    <div className={`${uvodFontVariables} flex-1`}>
      <HubNotFound />
    </div>
  )
}
