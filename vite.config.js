import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

/* Emits robots.txt and sitemap.xml at build time using VITE_SITE_URL from .env */
function seoFiles(siteUrl) {
  const today = new Date().toISOString().slice(0, 10);

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (env.VITE_SITE_URL || "https://www.example.com").replace(/\/+$/, "");

  return {
    plugins: [react(), seoFiles(siteUrl)],
  };
});
