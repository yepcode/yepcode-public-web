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
      components: {
        SiteTitle: "./src/components/docs/SiteTitle.astro",
        ThemeSelect: "./src/components/docs/ThemeSelect.astro",
        ThemeProvider: "./src/components/docs/ThemeProvider.astro",
      },
      logo: {
        src: "/src/assets/logo-light.svg",
        alt: "YepCode Docs logo",
        replacesTitle: true,
      },
      social: [
        {
          icon: "github",
          label: "YepCode GitHub",
          href: "https://github.com/yepcode",
        },
        {
          icon: "discord",
          label: "YepCode Discord",
          href: "https://community.yepcode.io",
        },
      ],
      favicon: "/favicon.ico",
      customCss: ["./src/styles/docs.css"],
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
