import type { APIRoute } from "astro";
import { starlightLllmsTxtContext } from "../utils/llms-txt/starlightLllmsTxtContext";
import { ensureTrailingSlash, getSiteTitle } from "../utils/llms-txt/utils";

/**
 * Route that generates an introductory summary of this site for LLMs.
 */
export const GET: APIRoute = async (context) => {
  const title = getSiteTitle();
  const description = starlightLllmsTxtContext.description
    ? `> ${starlightLllmsTxtContext.description}`
    : "";
  const site = new URL(
    ensureTrailingSlash(starlightLllmsTxtContext.base ?? ""),
    context.site
  );
  const llmsFullLink = new URL("./llms-full.txt", site);
  const llmsSmallLink = new URL("./llms-small.txt", site);

  const segments = [`# ${title}`];
  if (description) segments.push(description);
  if (starlightLllmsTxtContext.details)
    segments.push(starlightLllmsTxtContext.details);

  // Further documentation links.
  segments.push(`## Documentation Sets`);
  segments.push(
    [
      `- [Abridged documentation](${llmsSmallLink}): a compact version of the documentation for ${getSiteTitle()}, with non-essential content removed`,
      `- [Complete documentation](${llmsFullLink}): the full documentation for ${getSiteTitle()}`,
      ...(starlightLllmsTxtContext.customSets || []).map(
        ({ label, description, slug }) =>
          `- [${label}](${new URL(`./_llms-txt/${slug}.txt`, site)})` +
          (description ? `: ${description}` : "")
      ),
    ].join("\n")
  );

  // Additional notes.
  segments.push(`## Notes`);
  segments.push(`- The complete documentation includes all content from the official documentation
- The content is automatically generated from the same source as the official documentation`);

  // Optional links.
  if (
    starlightLllmsTxtContext.optionalLinks &&
    starlightLllmsTxtContext.optionalLinks.length > 0
  ) {
    segments.push("## Optional");
    segments.push(
      starlightLllmsTxtContext.optionalLinks
        .map(
          (link) =>
            `- [${link.label}](${link.url})${
              link.description ? `: ${link.description}` : ""
            }`
        )
        .join("\n")
    );
  }

  return new Response(segments.join("\n\n") + "\n");
};
