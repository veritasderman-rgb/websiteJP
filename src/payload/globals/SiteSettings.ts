import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Nastavení webu',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Josef Pavlovic' },
    { name: 'tagline', type: 'text', defaultValue: 'Svatební & Fine Art Fotograf' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'instagram', type: 'text', label: 'Instagram URL' },
    { name: 'facebook', type: 'text', label: 'Facebook URL' },
    { name: 'location', type: 'text', defaultValue: 'Mariánské Lázně, Česká republika' },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero fotografie (úvodní stránka)',
    },
    {
      name: 'aboutImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Portrét (sekce O mně)',
    },
    {
      name: 'aboutText',
      type: 'textarea',
      label: 'Krátký text o fotografovi (úvodní stránka)',
    },
    {
      name: 'ctaImage',
      type: 'upload',
      relationTo: 'media',
      label: 'CTA pozadí (sekce Kontakt)',
    },
    {
      name: 'seo',
      type: 'group',
      label: 'Výchozí SEO',
      fields: [
        { name: 'metaTitle', type: 'text', defaultValue: 'Josef Pavlovic — Svatební & Fine Art Fotograf' },
        { name: 'metaDescription', type: 'textarea', defaultValue: 'Profesionální fotograf z Karlovarského kraje. Specializace na svatební fotografii a fine art akt / boudoir.' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
