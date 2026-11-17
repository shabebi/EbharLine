/* =====================================================
   ABOUT
   Scroll reveal ported from main.js section 03.
===================================================== */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./About.css";

/* ---------- CONTENT: ARABIC / ENGLISH ---------- */
const content = {
  ar: {
    title: "من نحن",
    lead: "خبرات متعددة، تعمل برؤية واحدة.",
    body: "إبهار لاين شركة متعددة القطاعات، تجمع بين الاستشارات الهندسية وإدارة المشاريع والإنشاءات والمقاولات والبنية التحتية والطاقة والخدمات اللوجستية والتدريب المهني. ومن خلال التكامل بين التخطيط الدقيق والخبرة العملية والتنسيق الفعّال، نقدم حلولاً مترابطة تساعد على تحويل احتياجات المشاريع إلى نتائج واضحة وقابلة للتنفيذ.",
    quote:
      "لا نرى المشروع كمجموعة مراحل منفصلة، بل كرحلة متكاملة من الفكرة إلى الأثر",
  },
  en: {
    title: "About Us",
    lead: "Diverse expertise. One shared vision.",
    body: "Ebhar Line is a multi-sector company combining engineering consultancy, project management, construction, infrastructure and energy, logistics, and professional training. Through integrated planning, practical expertise, and effective coordination, we provide connected solutions that turn project needs into clear and actionable outcomes.",
    quote:
      "We see every project not as isolated stages, but as one connected journey from idea to impact",
  },
};

export default function About() {
  const { lang } = useLanguage();
  const t = content[lang];

  const copyRef = useRef(null);
  const asideRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion || !("IntersectionObserver" in window)) return undefined;

    setReady(true);

    const options = { threshold: 0.12, rootMargin: "0px 0px -7% 0px" };

    const makeObserver = (onVisible) =>
      new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          onVisible();
          observer.unobserve(entry.target);
        });
      }, options);

    const introObserver = makeObserver(() => setIntroVisible(true));
    const quoteObserver = makeObserver(() => setQuoteVisible(true));

    if (copyRef.current) introObserver.observe(copyRef.current);
    if (asideRef.current) quoteObserver.observe(asideRef.current);

    return () => {
      introObserver.disconnect();
      quoteObserver.disconnect();
    };
  }, []);

  const classes = [
    "eh-about",
    ready ? "eh-reveal-ready" : "",
    introVisible ? "eh-intro-visible" : "",
    quoteVisible ? "eh-quote-visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} id="about">
      <div className="container eh-about__layout">
        <div ref={copyRef} className="eh-about__copy">
          <h2>{t.title}</h2>
          <p className="eh-about__lead">{t.lead}</p>
          <p className="eh-about__body">{t.body}</p>
        </div>

        <aside ref={asideRef} className="eh-about__aside">
          <p className="eh-about__quote">
            {t.quote}
            <span className="eh-about__endmark" aria-hidden="true"></span>
          </p>
        </aside>
      </div>
    </section>
  );
}
