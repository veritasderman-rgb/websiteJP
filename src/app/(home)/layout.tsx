import { uvodFontVariables } from '@/lib/uvod-fonts'

/**
 * Osobní rozcestník má vlastní hlavičku i patičku přímo v designu, takže se
 * záměrně nepoužívá layout z (frontend) — žádná Navigation ani Footer.
 * Platí pro / i pro srovnávací plátno na /uvod.
 */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${uvodFontVariables} flex-1`}>{children}</div>
}
