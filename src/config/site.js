/* =====================================================
   SITE CONFIG — one place for everything global
===================================================== */

/**
 * Public site address, used for canonical / hreflang / Open Graph / sitemap.
 * Set it once in the `.env` file (VITE_SITE_URL) before deploying.
 */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://www.example.com"
).replace(/\/+$/, "");

/** Language shown at "/" (and for any unknown path). "ar" or "en". */
export const DEFAULT_LANG = "ar";

/** Per-language page settings. Routes: /ar and /en */
export const LANGS = {
  ar: { code: "ar", dir: "rtl", path: "/ar", ogLocale: "ar_AR" },
  en: { code: "en", dir: "ltr", path: "/en", ogLocale: "en_US" },
};

/* -----------------------------------------------------
   WHATSAPP
   Enter the real international number here.
   Digits only, without the + sign.
   Leave empty for the visual prototype (links go to #contact).
----------------------------------------------------- */
export const WHATSAPP_NUMBER = "";

export const WHATSAPP_MESSAGE = {
  ar: "مرحباً، أود الاستفسار عن خدمات إبهار لاين.",
  en: "Hello, I would like to inquire about Ebhar Line services.",
};

/** Props for every WhatsApp / contact link (footer + floating button). */
export function getWhatsAppLinkProps(lang) {
  if (WHATSAPP_NUMBER) {
    return {
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        WHATSAPP_MESSAGE[lang],
      )}`,
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }
  return { href: "#contact" };
}
