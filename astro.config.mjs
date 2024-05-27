import vercel from '@astrojs/vercel/static';
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
    host: true
  },
  integrations: [tailwind(), mdx(), alpinejs()],
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      domains: ['vadrouille.ch'],
      sizes: [256, 384, 640, 750, 828, 1080, 1200, 1920, 2560],
      formats: ['image/avif']
    }
  })
});