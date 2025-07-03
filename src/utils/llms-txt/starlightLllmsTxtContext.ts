import type { StarlightLllmsTextOptions } from "./types";

export const starlightLllmsTxtContext: StarlightLllmsTextOptions = {
  base: "https://yepcode.io",
  projectName: "YepCode",
  title: "YepCode",
  description: "TODO",
  details: "TODO",
  optionalLinks: [
    {
      label: "YepCode API Reference",
      url: "https://cloud.yepcode.io/api/rest/public/swagger-ui/index.html",
      description: "YepCode API Reference",
    },
  ],
  minify: {
    note: true,
    tip: true,
    caution: false,
    danger: false,
    details: true,
    whitespace: true,
    customSelectors: [],
  },
  pageSeparator: "\n\n",
  exclude: ["docs/customer-area/**"],
};
