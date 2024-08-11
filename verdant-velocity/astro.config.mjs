import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'http://exiled.me',
  base: 'verdant-velocity',
  integrations: [react(), tailwind()],
  output: "hybrid",
  adapter: vercel()
});