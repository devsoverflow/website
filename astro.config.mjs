import db from "@astrojs/db";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from 'astro/config';
import tailwindcssNesting from "tailwindcss/nesting";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), tailwind(), db(), svelte()],
  output: 'server',
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcssNesting()]
      }
    },
    optimizeDeps: {
      exclude: ["oslo", "astro:db"]
    }
  },
  adapter: vercel({
    imageService: true
  }),
  site: "https://devsoverflow.vercel.app"
});
