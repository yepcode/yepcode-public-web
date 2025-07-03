// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { docsSidebar } from "./src/pages/docs-sidebar";

// https://astro.build/config
export default defineConfig({
  site: "https://yepcode.io",
  integrations: [
    starlight({
      title: "YepCode Docs",
      description:
        "Documentation site of YepCode, the all-in-one platform that connects your services and APIs in the most agile way.",
      disable404Route: true,
      expressiveCode: {
        themes: ["dracula", "solarized-light"],
      },
      sidebar: docsSidebar,
    }),
    mdx(),
    sitemap(),
    icon(),
  ],
  vite: { plugins: [tailwindcss()] },
});
