/* =====================================================
   CONTACT CTA
===================================================== */

import { useLanguage } from "../../context/LanguageContext";
import RevealItem from "../Reveal/RevealItem";
import { Chevron } from "../Icons/Icons";
import "./ContactCta.css";

/* ---------- CONTENT: ARABIC / ENGLISH ---------- */
const content = {
  ar: {
    title: "لنبدأ مشروعك القادم.",
    text: "خبرات متكاملة، وحلول تبدأ بفهم احتياجاتك.",
    link: "تواصل معنا",
  },
  en: {
    title: "Let's Start Your Next Project.",
    text: "Integrated expertise and practical solutions begin with understanding your needs.",
    link: "Contact Us",
  },
};

export default function ContactCta() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section className="el-cta" id="contact-cta" aria-labelledby="el-cta-title">
      <div className="container el-cta__inner">
        <RevealItem as="h2" id="el-cta-title">
          {t.title}
        </RevealItem>
        <RevealItem as="p">{t.text}</RevealItem>

        <RevealItem as="a" className="el-cta__link" href="#contact">
          <span>{t.link}</span>
          <Chevron />
        </RevealItem>
      </div>
    </section>
  );
}
