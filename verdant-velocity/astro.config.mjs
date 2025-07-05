import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://exiled.me",
  integrations: [react(), sentry(), spotlightjs()],
  output: "static",
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()]
  }
});