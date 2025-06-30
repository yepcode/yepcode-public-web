import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      postSummary: z.string(),
      thumbnailImage: image(),
      mainImage: image().optional(),
      mainVideo: z.string().optional(),
      categories: z.array(z.string()).optional(),
    }),
});

export const collections = {
  blog,
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};

import { marked } from "marked";
// @ts-ignore
String.prototype.mdToHtml = function () {
  return marked(this.toString());
};
