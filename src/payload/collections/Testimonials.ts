import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'author', type: 'text', required: true },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'occasion', type: 'text', label: 'Příležitost (např. Svatba 2024)' },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Zobrazit na úvodní stránce',
    },
  ],
}
