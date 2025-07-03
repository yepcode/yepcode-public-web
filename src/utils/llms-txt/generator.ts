import type { APIContext } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import micromatch from "micromatch";
import { starlightLllmsTxtContext } from "./starlightLllmsTxtContext";
import { entryToSimpleMarkdown } from "./entryToSimpleMarkdown";
import { docsSidebar } from "../../pages/docs-sidebar";

const filter = <T extends { id: string }>(
  collection: T[],
  include?: string[],
  exclude?: string[]
): T[] => {
  if (include) {
    collection = collection.filter((doc) =>
      micromatch.isMatch(doc.id, include)
    );
  }
  if (exclude) {
    collection = collection.filter(
      (doc) => !micromatch.isMatch(doc.id, exclude)
    );
  }
  return collection;
};

/**
 * Generates a single plaintext Markdown document from the full website content.
 */
export async function generateLlmsTxt(
  context: APIContext,
  {
    minify,
    description,
    exclude,
    include,
  }: {
    /** Generate a smaller file to fit within smaller context windows. */
    minify: boolean;
    /** Description of the document being generated. Prepended to output inside `<SYSTEM>` tags. */
    description: string | undefined;
    exclude?: string[] | undefined;
    include?: string[] | undefined;
  }
): Promise<string> {
  let docs = await getCollection("docs");
  docs = filter(docs, include, exclude);
  // Use the sidebar to get the order of the docs
  // Flatten the sidebar to get the order of doc slugs
  function flattenSidebar(items: any): string[] {
    const result: string[] = [];
    for (const item of items) {
      if (typeof item === "string") {
        result.push(item);
      } else if (item.slug) {
        result.push(item.slug);
      } else if (item.items) {
        result.push(...flattenSidebar(item.items));
      }
    }
    return result;
  }
  const sidebarOrder = flattenSidebar(docsSidebar);
  const orderMap = new Map(sidebarOrder.map((slug, idx) => [slug, idx]));
  docs = docs.sort((a, b) => {
    const aIdx = orderMap.has(a.id) ? orderMap.get(a.id)! : Infinity;
    const bIdx = orderMap.has(b.id) ? orderMap.get(b.id)! : Infinity;
    return aIdx - bIdx;
  });

  const segments: string[] = [];
  for (const doc of docs) {
    const docSegments = [`# ${doc.data.hero?.title || doc.data.title}`];
    const description = doc.data.hero?.tagline || doc.data.description;
    if (description) docSegments.push(`> ${description}`);
    docSegments.push(await entryToSimpleMarkdown(doc, context, minify));
    segments.push(docSegments.join("\n\n"));
  }
  let blogPosts = await getCollection("blog");
  blogPosts = filter(blogPosts, include, exclude);
  blogPosts = blogPosts.sort((a, b) => {
    return (
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
    );
  });
  for (const blogPost of blogPosts) {
    const docSegments = [`# ${blogPost.data.title}`];
    const description = blogPost.data.postSummary;
    if (description) docSegments.push(`> ${description}`);
    docSegments.push(await entryToSimpleMarkdown(blogPost, context, minify));
    segments.push(docSegments.join("\n\n"));
  }
  if (description) {
    segments.unshift(`<SYSTEM>${description}</SYSTEM>`);
  }
  return segments.join(starlightLllmsTxtContext.pageSeparator);
}
