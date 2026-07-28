import type { Metadata } from 'next'
import { getHubSection } from './uvod-content'

/**
 * Metadata podstránky rozcestníku. Rozpracované sekce (`draft`) drží noindex,
 * ať se do vyhledávání nedostane stránka, která zatím nese jen perex.
 */
export function hubSectionMetadata(slug: string): Metadata {
  const section = getHubSection(slug)
  if (!section) return {}

  return {
    title: section.title,
    description: section.perex,
    alternates: { canonical: `/${slug}` },
    ...(section.draft ? { robots: { index: false, follow: true } } : {}),
  }
}
