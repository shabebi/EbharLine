/* =====================================================
   FLOATING WHATSAPP  (main.js sections 09 + 10)

   First appearance: 7 seconds after page load.
   Hide immediately while scrolling.
   Return 500ms after scrolling stops.
   Hide while the navigation menu or the footer is visible.
===================================================== */

import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { getWhatsAppLinkProps } from "../../config/site";
import { brand } from "../../assets";
import "./WhatsAppFloat.css";

/* ---------- CONTENT: ARABIC / ENGLISH ---------- */
const content = {
  ar: { label: "التواصل عبر واتساب" },
  en: { label: "Chat on WhatsApp" },
};

export default function WhatsAppFloat() {
  const { lang } = useLanguage();
  const t = content[lang];

  const [ready, setReady] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pageVisible, setPageVisible] = useState(
    () => document.visibilityState === "visible",
  );

  /* Initial 7-second delay (after the page has loaded) */
  useEffect(() => {
    let timer = 0;
    let started = false;

    const begin = () => {
      if (started) return;
      started = true;
      timer = window.setTimeout(() => setReady(true), 7000);
    };

    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    return () => {
      window.removeEventListener("load", begin);
      window.clearTimeout(timer);
    };
  }, []);

  /* Hide on scrolling, return 500ms after it stops */
  useEffect(() => {
    let stopTimer = 0;

    const onScroll = () => {
      setScrolling(true);
      window.clearTimeout(stopTimer);
      stopTimer = window.setTimeout(() => setScrolling(false), 500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(stopTimer);
    };
  }, []);

  /* Tab visibility */
  useEffect(() => {
    const onChange = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  /* Keep hidden while the navigation drawer is open (body.menu-open) */
  useEffect(() => {
    const sync = () => setMenuOpen(document.body.classList.contains("menu-open"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  /* Keep hidden when the footer enters the viewport */
  useEffect(() => {
    const footer = document.querySelector(".el-footer");
    if (!footer || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => setFooterVisible(entries[0]?.isIntersecting || false),
      { threshold: 0 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const shouldShow = ready && !scrolling && !footerVisible && pageVisible && !menuOpen;

  return (
    <a
      className={`el-whatsapp${shouldShow ? " is-visible" : ""}`}
      data-whatsapp-float
      aria-label={t.label}
      title={t.label}
      aria-hidden={!shouldShow}
      tabIndex={shouldShow ? 0 : -1}
      {...getWhatsAppLinkProps(lang)}
    >
      <img src={brand.whatsappIcon} alt="" aria-hidden="true" />
    </a>
  );
}
