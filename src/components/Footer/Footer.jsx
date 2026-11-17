/* =====================================================
   FOOTER
===================================================== */

import { useLanguage } from "../../context/LanguageContext";
import { getWhatsAppLinkProps } from "../../config/site";
import { brand } from "../../assets";
import { Chevron } from "../Icons/Icons";
import "./Footer.css";

/* ---------- CONTENT: ARABIC / ENGLISH ---------- */
const content = {
  ar: {
    homeLabel: "العودة إلى الرئيسية",
    logoAlt: "رمز إبهار لاين",
    about:
      "حلول مترابطة تجمع الخبرة الهندسية والإدارية والتنفيذية من الفكرة حتى الإنجاز.",
    navLabel: "روابط الفوتر",
    exploreTitle: "تصفح الموقع",
    links: [
      { href: "#about", label: "من نحن" },
      { href: "#sectors", label: "قطاعات العمل" },
      { href: "#fields", label: "مجالات المشاريع" },
      { href: "#events", label: "الأخبار والأحداث" },
    ],
    connectTitle: "لنبدأ الحوار",
    connectText: "للاستفسارات وفرص التعاون، استخدم رابط التواصل المباشر.",
    contact: "تواصل معنا",
    note: "ستضاف بيانات التواصل الرسمية بعد اعتمادها.",
    rights: "جميع الحقوق محفوظة",
  },
  en: {
    homeLabel: "Back to Home",
    logoAlt: "Ebhar Line mark",
    about:
      "Connected solutions bringing engineering, management, and delivery expertise together.",
    navLabel: "Footer navigation",
    exploreTitle: "Explore",
    links: [
      { href: "#about", label: "About Us" },
      { href: "#sectors", label: "Work Sectors" },
      { href: "#fields", label: "Project Fields" },
      { href: "#events", label: "News & Events" },
    ],
    connectTitle: "Let's Connect",
    connectText:
      "For inquiries and opportunities to collaborate, use our direct contact link.",
    contact: "Contact Us",
    note: "Official contact details will be added after approval.",
    rights: "All rights reserved",
  },
};

export default function Footer() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <footer className="el-footer" id="contact">
      <div className="container">
        <div className="el-footer__grid">
          <div className="el-footer__brand">
            <a href="#home" aria-label={t.homeLabel}>
              <img src={brand.iconLogo} alt={t.logoAlt} />
            </a>
            <p>{t.about}</p>
          </div>

          <nav className="el-footer__nav" aria-label={t.navLabel}>
            <h3>{t.exploreTitle}</h3>
            {t.links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="el-footer__contact">
            <h3>{t.connectTitle}</h3>
            <p>{t.connectText}</p>
            <a
              className="el-footer__contact-link"
              data-whatsapp-contact
              {...getWhatsAppLinkProps(lang)}
            >
              <span>{t.contact}</span>
              <Chevron />
            </a>
            <small>{t.note}</small>
          </div>
        </div>

        <div className="el-footer__bottom">
          <span>
            © <span className="current-year">{new Date().getFullYear()}</span> Ebhar Line
          </span>
          <span>{t.rights}</span>
        </div>
      </div>
    </footer>
  );
}
