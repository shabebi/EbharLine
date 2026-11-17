/* =====================================================
   SEO — keeps <head> correct for the active language
   (title, description, canonical, hreflang, Open Graph,
   Twitter card, JSON-LD). index.html already contains the same
   tags for the default language so crawlers that do not run JS
   still get a complete <head>.
===================================================== */

import { useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { LANGS, SITE_URL } from "../../config/site";

/* ---------- CONTENT: ARABIC / ENGLISH ---------- */
const content = {
  ar: {
    siteName: "إبهار لاين",
    title: "إبهار لاين | حلول هندسية وإدارية وتنفيذية متكاملة",
    description:
      "إبهار لاين شركة متعددة القطاعات تقدم الاستشارات الهندسية وإدارة المشاريع والإنشاءات والبنية التحتية والطاقة والخدمات اللوجستية والتدريب المهني.",
  },
  en: {
    siteName: "Ebhar Line",
    title: "Ebhar Line | Integrated Engineering & Project Solutions",
    description:
      "Ebhar Line is a multi-sector company offering engineering consultancy, project management, construction, infrastructure and energy, logistics, and professional training.",
  },
};

/** Find a <head> tag by selector or create it, then apply attributes. */
function upsert(tagName, selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(tagName);
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) =>
    element.setAttribute(name, value),
  );
  return element;
}

export default function Seo() {
  const { lang } = useLanguage();

  useEffect(() => {
    const t = content[lang];
    const other = lang === "ar" ? "en" : "ar";
    const url = `${SITE_URL}${LANGS[lang].path}`;
    const logoUrl = `${SITE_URL}/icon-512.png`;

    document.title = t.title;

    upsert("meta", 'meta[name="description"]', { name: "description", content: t.description });

    upsert("link", 'link[rel="canonical"]', { rel: "canonical", href: url });

    ["ar", "en"].forEach((code) =>
      upsert("link", `link[rel="alternate"][hreflang="${code}"]`, {
        rel: "alternate",
        hreflang: code,
        href: `${SITE_URL}${LANGS[code].path}`,
      }),
    );
    upsert("link", 'link[rel="alternate"][hreflang="x-default"]', {
      rel: "alternate",
      hreflang: "x-default",
      href: `${SITE_URL}${LANGS.ar.path}`,
    });

    const og = {
      "og:type": "website",
      "og:site_name": t.siteName,
      "og:title": t.title,
      "og:description": t.description,
      "og:url": url,
      "og:locale": LANGS[lang].ogLocale,
    };
    Object.entries(og).forEach(([property, value]) =>
      upsert("meta", `meta[property="${property}"]`, { property, content: value }),
    );
    upsert("meta", 'meta[property="og:locale:alternate"]', {
      property: "og:locale:alternate",
      content: LANGS[other].ogLocale,
    });

    const twitter = {
      "twitter:card": "summary",
      "twitter:title": t.title,
      "twitter:description": t.description,
    };
    Object.entries(twitter).forEach(([name, value]) =>
      upsert("meta", `meta[name="${name}"]`, { name, content: value }),
    );

    /* Structured data: Organization + WebSite */
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: t.siteName,
          alternateName: [content.ar.siteName, content.en.siteName],
          url: `${SITE_URL}/`,
          logo: logoUrl,
          description: t.description,
        },
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: url,
          name: t.siteName,
          inLanguage: lang,
          publisher: { "@id": `${SITE_URL}/#organization` },
        },
      ],
    };
    const script = upsert("script", "script#ld-json", {
      id: "ld-json",
      type: "application/ld+json",
    });
    script.textContent = JSON.stringify(jsonLd);
  }, [lang]);

  return null;
}
