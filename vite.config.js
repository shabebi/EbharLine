
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

/* Emits robots.txt and sitemap.xml at build time using VITE_SITE_URL from .env */
function seoFiles(siteUrl) {
  const today = new Date().toISOString().slice(0, 10);

  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  const alternates = [
    ["ar", `${siteUrl}/ar`],
    ["en", `${siteUrl}/en`],
    ["x-default", `${siteUrl}/ar`],
  ]
    .map(
      ([lang, href]) =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`,
    )
    .join("\n");

  const urlEntry = (loc) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`;

  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    `${urlEntry(`${siteUrl}/ar`)}\n${urlEntry(`${siteUrl}/en`)}\n` +
    `</urlset>\n`;

  return {
    name: "ebhar-seo-files",
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
    },
  };
}


/*
 * GitHub Pages serves only real files. Generate /ar/ and /en/ entry pages
 * so refreshing either language URL does not return a 404.
 */
function languageRoutePages() {
  return {
    name: "github-pages-language-route-pages",
    apply: "build",
    enforce: "post",
    generateBundle(_options, bundle) {
      const entry = bundle["index.html"];

      if (!entry || entry.type !== "asset") {
        this.error("Could not find the built index.html to generate language routes.");
      }

      const html =
        typeof entry.source === "string"
          ? entry.source
          : Buffer.from(entry.source).toString("utf8");

      for (const language of ["ar", "en"]) {
        this.emitFile({
          type: "asset",
          fileName: `${language}/index.html`,
          source: html,
        });
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const siteUrl = (env.VITE_SITE_URL || "https://www.example.com").replace(/\/+$/, "");

  return {
    base: "/EbharLine/",
    plugins: [react(), seoFiles(siteUrl), languageRoutePages()],
  };
});
