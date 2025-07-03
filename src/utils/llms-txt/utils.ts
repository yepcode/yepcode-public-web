import { starlightLllmsTxtContext } from "./starlightLllmsTxtContext";

/** Get the site title from the Starlight config. */
export function getSiteTitle(): string {
  return starlightLllmsTxtContext.title || "";
}

/** Append a `/` to the passed string if it doesn’t already end with one. */
export function ensureTrailingSlash(path: string) {
  return path.at(-1) === "/" ? path : path + "/";
}
