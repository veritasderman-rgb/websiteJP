import type { Metadata } from 'next'
import HubPage, { Card, Prose } from '@/components/uvod/HubPage'
import { produktivita } from '@/lib/hub-content'

export const metadata: Metadata = {
  title: 'Produktivita',
  description:
    'Školím týmy i jednotlivce v time managementu. Vycházím z Getting Things Done, ale bez její sektářské verze. Napsal jsem k tomu příručku.',
  alternates: { canonical: '/produktivita' },
}

export const revalidate = false

export default function ProduktivitaPage() {
  return (
    <HubPage title={produktivita.title} activeHref="/produktivita">
      <Prose paragraphs={produktivita.body} />

      <section className="mt-14">
        {produktivita.items.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </section>
    </HubPage>
  )
}
