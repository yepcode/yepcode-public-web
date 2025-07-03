import type { APIRoute } from "astro";
import { generateLlmsTxt } from "../../utils/llms-txt/generator";
import { getSiteTitle } from "../../utils/llms-txt/utils";
import { starlightLllmsTxtContext } from "../../utils/llms-txt/starlightLllmsTxtContext";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const docs = await getCollection("docs");
  return docs.map((doc) => {
    const slug = `${doc.id}`.split("/").slice(1).join("/");
    return {
      params: { slug },
      props: { slug: slug },
    };
  });
}

export const GET: APIRoute = async (context) => {
  const { slug } = context.props;
  const body = await generateLlmsTxt(context, {
    minify: false,
    description: `This is the full developer documentation for ${getSiteTitle()}`,
    include: ["docs/" + slug],
    exclude: starlightLllmsTxtContext.exclude,
  });
  return new Response(body);
};
