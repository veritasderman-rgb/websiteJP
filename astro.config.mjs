import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://josefpavlovic.com',
  output: 'static',
  adapter: vercel(),
  integrations: [mdx()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
