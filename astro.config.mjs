import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import { astroImageTools } from "astro-imagetools";
import mdx from "@astrojs/mdx";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), astroImageTools, mdx(), alpinejs()]
});