import { notFound } from 'next/navigation'
import SectionPage from '@/components/uvod/SectionPage'
import { getHubSection } from '@/lib/uvod-content'
import { hubSectionMetadata } from '@/lib/hub-section-meta'

const SLUG = 'zivotopis'

export const metadata = hubSectionMetadata(SLUG)
export const revalidate = false

export default function Page() {
  const section = getHubSection(SLUG)
  if (!section) notFound()
  return <SectionPage section={section} />
}
