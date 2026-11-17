/* =====================================================
   HERO
   Includes the desktop "optical alignment" from main.js
   section 02: the artwork is shifted so its edge lines up
   with the red language divider in the header.
===================================================== */

import { useEffect, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { brand } from "../../assets";
import { DownIcon } from "../Icons/Icons";
import "./Hero.css";

/* ---------- CONTENT: ARABIC / ENGLISH ---------- */
const content = {
  ar: {
    titleFirst: "رؤية تتكامل",
    titleSecond: "وأثر يمتد",
    description:
      "نوحّد الخبرات الهندسية والإدارية والتنفيذية لنقدّم حلولاً مترابطة، تواكب احتياجات المشاريع من التخطيط وحتى الإنجاز.",
    scroll: "اكتشف المزيد",
    logo: brand.arFullVerticalLogo,
  },
  en: {
    titleFirst: "Connected Vision",
    titleSecond: "Lasting Impact",
    description:
      "We bring engineering, management, and delivery expertise together to provide integrated solutions from planning through project completion.",
    scroll: "Discover More",
    logo: brand.enFullVerticalLogo,
  },
};

export default function Hero() {
  const { lang } = useLanguage();
  const t = content[lang];

  const visualRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const visual = visualRef.current;
    const logo = logoRef.current;
    const switcher = document.querySelector(".language-switcher");
    const languageIcon = document.querySelector(".language-icon");

    if (!visual || !logo || !switcher) return undefined;

    const desktop = window.matchMedia("(min-width: 1051px)");
    let frame = 0;

    function alignHero() {
      // Reset before measuring so resize cannot accumulate offsets.
      visual.style.setProperty("--eh-optical-shift", "0px");

      if (!desktop.matches) return;

      const rtl = document.documentElement.dir === "rtl";
      const switcherRect = switcher.getBoundingClientRect();
      const logoRect = logo.getBoundingClientRect();

      let dividerX;

      if (rtl) {
        // Arabic divider is at the left edge.
        dividerX = switcherRect.left;
      } else {
        // English divider is immediately before the globe.
        const globeRect = languageIcon?.getBoundingClientRect();
        const gap = parseFloat(getComputedStyle(switcher).columnGap) || 12;

        dividerX = globeRect ? globeRect.left - gap - 2 : switcherRect.right;
      }

      const artworkEdge = rtl ? logoRect.left : logoRect.right;

      // Prevent overcorrection at unusual viewport widths.
      const displacement = Math.max(-90, Math.min(90, dividerX - artworkEdge));

      visual.style.setProperty("--eh-optical-shift", `${displacement.toFixed(1)}px`);
    }

    function scheduleAlignment() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(alignHero);
    }

    window.addEventListener("load", scheduleAlignment, { once: true });
    window.addEventListener("resize", scheduleAlignment, { passive: true });
    if (document.fonts) document.fonts.ready.then(scheduleAlignment);
    scheduleAlignment();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", scheduleAlignment);
      window.removeEventListener("resize", scheduleAlignment);
    };
  }, [lang]);

  return (
    <section className="eh-hero" id="hero">
      <div className="container eh-hero__layout">
        <div className="eh-hero__copy">
          <h1 className="eh-hero__title">
            <span className="eh-title-first">{t.titleFirst}</span>
            <span className="eh-title-second">{t.titleSecond}</span>
          </h1>

          <p className="eh-hero__description">{t.description}</p>
        </div>

        <div ref={visualRef} className="eh-hero__visual" aria-hidden="true">
          <div className="eh-hero__draft">
            <span className="eh-grid-flow eh-grid-flow--h1"></span>
            <span className="eh-grid-flow eh-grid-flow--h2"></span>
            <span className="eh-grid-flow eh-grid-flow--v1"></span>
            <span className="eh-grid-flow eh-grid-flow--v2"></span>
          </div>

          <img ref={logoRef} className="eh-hero__logo" src={t.logo} alt="" />
        </div>
      </div>

      <a className="eh-hero__scroll" href="#about">
        <span>{t.scroll}</span>
        <DownIcon />
      </a>
    </section>
  );
}
