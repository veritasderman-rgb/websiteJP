import { uvodFontVariables } from '@/lib/uvod-fonts'

/**
 * Varianty osobního rozcestníku mají vlastní hlavičku i patičku přímo v designu,
 * takže se záměrně nepoužívá layout z (frontend) — žádná Navigation ani Footer.
 */
export default function UvodLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${uvodFontVariables} flex-1`}>{children}</div>
}
