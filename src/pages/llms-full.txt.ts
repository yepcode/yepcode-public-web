import type { APIRoute } from "astro";
import { generateLlmsTxt } from "../utils/llms-txt/generator";
import { getSiteTitle } from "../utils/llms-txt/utils";
import { starlightLllmsTxtContext } from "@/utils/llms-txt/starlightLllmsTxtContext";

/**
 * Route that generates a single plaintext Markdown document from the full website content.
 */
export const GET: APIRoute = async (context) => {
  const body = await generateLlmsTxt(context, {
    minify: false,
    description: `This is the full developer documentation for ${getSiteTitle()}`,
    exclude: starlightLllmsTxtContext.exclude,
  });
  return new Response(body);
};
