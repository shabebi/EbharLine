/* =====================================================
   CLIENTS AND PARTNERS
   Grid reveal + line motion ported from main.js section 04.
===================================================== */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { logos } from "../../assets";
import "./Partners.css";

/* ---------- CONTENT: ARABIC / ENGLISH ---------- */
const content = {
  ar: { title: "أبرز عملائنا وشركائنا" },
  en: { title: "Selected Clients & Partners" },
};

/* Brand names are kept in both languages so they can be localised later. */
const partners = [
  { id: "siemens-energy", logo: logos.siemensEnergy, name: { ar: "Siemens Energy", en: "Siemens Energy" } },
  { id: "schneider-electric", logo: logos.schneiderElectric, name: { ar: "Schneider Electric", en: "Schneider Electric" } },
  { id: "giz", logo: logos.giz, name: { ar: "GIZ", en: "GIZ" } },
  { id: "aecom", logo: logos.aecom, name: { ar: "AECOM", en: "AECOM" } },
  { id: "arup", logo: logos.arup, name: { ar: "Arup", en: "Arup" } },
  { id: "undp", logo: logos.undp, name: { ar: "UNDP", en: "UNDP" } },
  { id: "world-bank", logo: logos.worldBank, name: { ar: "World Bank", en: "World Bank" } },
  { id: "unicef", logo: logos.unicef, name: { ar: "UNICEF", en: "UNICEF" } },
  { id: "isdb", logo: logos.isdb, name: { ar: "Islamic Development Bank", en: "Islamic Development Bank" } },
  { id: "unops", logo: logos.unops, name: { ar: "UNOPS", en: "UNOPS" } },
];

export default function Partners() {
  const { lang } = useLanguage();
  const t = content[lang];

  const sectionRef = useRef(null);
  const [motionReady, setMotionReady] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }

    setMotionReady(true);

    const observer = new IntersectionObserver(
      (entries, current) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setInView(true);
          current.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const classes = [
    "ep-partners",
    motionReady ? "ep-motion-ready" : "",
    inView ? "ep-in-view" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      ref={sectionRef}
      className={classes}
      id="partners"
      aria-labelledby="partners-title"
    >
      <div className="container">
        <div className="ep-partners__intro">
          <h2 className="ep-partners__title" id="partners-title">
            {t.title}
          </h2>
        </div>

        <div className="ep-partners__stage">
          <ul className="ep-partners__grid">
            {partners.map((partner) => (
              <li key={partner.id}>
                <img src={partner.logo} alt={partner.name[lang]} loading="lazy" />
              </li>
            ))}
          </ul>

          <div className="ep-partners__lines" aria-hidden="true">
            <span className="ep-grid-line ep-grid-line--v ep-grid-line--v1"></span>
            <span className="ep-grid-line ep-grid-line--v ep-grid-line--v2"></span>
            <span className="ep-grid-line ep-grid-line--v ep-grid-line--v3"></span>
            <span className="ep-grid-line ep-grid-line--v ep-grid-line--v4"></span>
            <span className="ep-grid-line ep-grid-line--h ep-grid-line--h1"></span>
            <span className="ep-grid-line ep-grid-line--h ep-grid-line--h2"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
