import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://zketsu.vercel.app",
  integrations: [react()],
  output: "static",
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()]
  }
});