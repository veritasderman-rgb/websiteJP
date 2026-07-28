import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { uvodVariants, getUvodVariant } from '@/lib/uvod-variants'

export const revalidate = false

export function generateStaticParams() {
  return uvodVariants.map((v) => ({ varianta: v.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ varianta: string }>
}): Promise<Metadata> {
  const { varianta } = await params
  const variant = getUvodVariant(varianta)
  if (!variant) return {}
  return {
    title: `Homepage ${variant.id} — ${variant.name}`,
    description: variant.note,
    robots: { index: false, follow: false },
  }
}

export default async function UvodVariantPage({
  params,
}: {
  params: Promise<{ varianta: string }>
}) {
  const { varianta } = await params
  const variant = getUvodVariant(varianta)

  if (!variant) notFound()

  const { Component } = variant
  return <Component />
}
