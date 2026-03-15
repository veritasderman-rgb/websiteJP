import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://josefpavlovic.cz',
  output: 'static',
  build: {
    assets: '_assets',
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  vite: {
    css: {
      preprocessorOptions: {},
    },
  },
});
