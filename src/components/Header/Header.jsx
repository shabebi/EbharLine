/* =====================================================
   HEADER + NAVIGATION  (+ mobile drawer backdrop)
   Behaviour ported from main.js section 01.
===================================================== */

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import useMediaQuery from "../../hooks/useMediaQuery";
import { LANGS } from "../../config/site";
import { brand } from "../../assets";
import { DownIcon } from "../Icons/Icons";
import "./Header.css";

/* ---------- CONTENT: ARABIC / ENGLISH ---------- */
const content = {
  ar: {
    logo: brand.arLogo,
    logoAlt: "إبهار لاين",
    logoLabel: "إبهار لاين - الرئيسية",
    navLabel: "التنقل الرئيسي",
    home: "الرئيسية",
    sectors: "القطاعات",
    sectorsMenu: [
      "الاستشارات الهندسية",
      "إدارة المشاريع",
      "الإنشاءات والمقاولات",
      "البنية التحتية والطاقة",
      "الخدمات اللوجستية",
      "التدريب المهني",
    ],
    fields: "مجالات المشاريع",
    fieldsMenu: ["المياه والبيئة", "أنظمة الطاقة", "الطرق والنقل"],
    events: "الأحداث",
    languageLabel: "اختيار اللغة",
    arLabel: "العربية",
    enLabel: "English",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
  },
  en: {
    logo: brand.enLogo,
    logoAlt: "Ebhar Line",
    logoLabel: "Ebhar Line - Home",
    navLabel: "Main navigation",
    home: "Home",
    sectors: "Sectors",
    sectorsMenu: [
      "Engineering Consultancy",
      "Project Management",
      "Construction & Contracting",
      "Infrastructure & Energy",
      "Logistics Services",
      "Professional Training",
    ],
    fields: "Project Fields",
    fieldsMenu: ["Water & Environment", "Energy Systems", "Roads & Transport"],
    events: "Events",
    languageLabel: "Select language",
    arLabel: "العربية",
    enLabel: "English",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};

export default function Header() {
  const { lang, switchLanguage } = useLanguage();
  const t = content[lang];

  const isMobile = useMediaQuery("(max-width: 1050px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // "sectors" | "fields" | null

  const hamburgerRef = useRef(null);
  const navRef = useRef(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, []);

  const toggleMenu = () => {
    if (menuOpen) closeMenu();
    else if (isMobile) setMenuOpen(true);
  };

  /* Lock page scroll while the drawer is open (CSS: body.menu-open) */
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  /* Hide the drawer from keyboard / screen readers while closed on mobile */
  useEffect(() => {
    if (navRef.current) navRef.current.inert = isMobile && !menuOpen;
  }, [isMobile, menuOpen]);

  /* Leaving / entering the mobile breakpoint resets the menu */
  useEffect(() => {
    closeMenu();
  }, [isMobile, closeMenu]);

  /* Click outside any dropdown closes the dropdowns */
  useEffect(() => {
    const onDocumentClick = (event) => {
      if (!event.target.closest(".has-submenu")) setOpenDropdown(null);
    };
    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  /* Escape closes everything and returns focus to the hamburger */
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      closeMenu();
      if (menuOpen) hamburgerRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  /* Any link inside the nav closes the mobile drawer */
  const onNavClick = (event) => {
    if (isMobile && event.target.closest("a")) closeMenu();
  };

  const toggleDropdown = (event, id) => {
    event.stopPropagation();
    setOpenDropdown((current) => (current === id ? null : id));
  };

  const hoverProps = (id) => ({
    onMouseEnter: () => {
      if (!isMobile) setOpenDropdown(id);
    },
    onMouseLeave: () => {
      if (!isMobile) setOpenDropdown((current) => (current === id ? null : current));
    },
  });

  const chooseLanguage = (event, code) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    switchLanguage(code);
  };

  const goHome = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="site-logo"
            href={LANGS[lang].path}
            aria-label={t.logoLabel}
            onClick={goHome}
          >
            <img src={t.logo} alt={t.logoAlt} />
          </a>

          <nav
            ref={navRef}
            className={`site-nav${menuOpen ? " is-open" : ""}`}
            id="site-nav"
            aria-label={t.navLabel}
            onClick={onNavClick}
          >
            <div className="nav-items">
              <a className="nav-link is-active" href="#home" aria-current="page">
                {t.home}
              </a>

              <div
                className={`nav-item has-submenu${openDropdown === "sectors" ? " is-open" : ""}`}
                {...hoverProps("sectors")}
              >
                <button
                  className="nav-trigger"
                  type="button"
                  aria-expanded={openDropdown === "sectors"}
                  aria-controls="sectors-menu"
                  onClick={(event) => toggleDropdown(event, "sectors")}
                >
                  <span>{t.sectors}</span>
                  <DownIcon />
                </button>

                <ul className="submenu" id="sectors-menu">
                  {t.sectorsMenu.map((label) => (
                    <li key={label}>
                      <a href="#sectors">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`nav-item has-submenu${openDropdown === "fields" ? " is-open" : ""}`}
                {...hoverProps("fields")}
              >
                <button
                  className="nav-trigger"
                  type="button"
                  aria-expanded={openDropdown === "fields"}
                  aria-controls="fields-menu"
                  onClick={(event) => toggleDropdown(event, "fields")}
                >
                  <span>{t.fields}</span>
                  <DownIcon />
                </button>

                <ul className="submenu" id="fields-menu">
                  {t.fieldsMenu.map((label) => (
                    <li key={label}>
                      <a href="#fields">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <a className="nav-link" href="#events">
                {t.events}
              </a>
            </div>
          </nav>

          <div className="header-controls">
            <div className="language-switcher" dir="ltr" aria-label={t.languageLabel}>
              <img
                className="language-icon"
                src={brand.webIcon}
                alt=""
                aria-hidden="true"
              />
              <a
                className={`lang-link${lang === "ar" ? " is-current" : ""}`}
                href={LANGS.ar.path}
                lang="en"
                aria-label={t.arLabel}
                aria-current={lang === "ar" ? "page" : undefined}
                onClick={(event) => chooseLanguage(event, "ar")}
              >
                AR
              </a>
              <a
                className={`lang-link${lang === "en" ? " is-current" : ""}`}
                href={LANGS.en.path}
                lang="en"
                aria-label={t.enLabel}
                aria-current={lang === "en" ? "page" : undefined}
                onClick={(event) => chooseLanguage(event, "en")}
              >
                EN
              </a>
            </div>

            <button
              ref={hamburgerRef}
              className={`hamburger${menuOpen ? " is-open" : ""}`}
              type="button"
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
              aria-controls="site-nav"
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <button
        className="nav-backdrop"
        type="button"
        aria-label={t.closeMenu}
        tabIndex={-1}
        onClick={closeMenu}
      ></button>
    </>
  );
}
