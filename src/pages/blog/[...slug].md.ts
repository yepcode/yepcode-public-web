import type { APIRoute } from "astro";
import { generateLlmsTxt } from "../../utils/llms-txt/generator";
import { getSiteTitle } from "../../utils/llms-txt/utils";
import { starlightLllmsTxtContext } from "../../utils/llms-txt/starlightLllmsTxtContext";
import { type CollectionEntry, getCollection } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { slug: post.id },
  }));
}

export const GET: APIRoute = async (context) => {
  const { slug } = context.props;
  const body = await generateLlmsTxt(context, {
    minify: false,
    description: `This is the full developer documentation for ${getSiteTitle()}`,
    include: [slug],
    exclude: starlightLllmsTxtContext.exclude,
  });
  return new Response(body);
};
