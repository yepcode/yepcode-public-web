// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://yepcode.io",
  integrations: [
    starlight({
      title: "YepCode",
      disable404Route: true,
      expressiveCode: {
        themes: ["dracula", "solarized-light"],
      },
    }),
    mdx(),
    sitemap(),
  ],
});
