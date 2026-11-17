/* =====================================================
   EBHAR LINE — HOMEPAGE
   Arabic (/ar, RTL) and English (/en, LTR) in one app.

   CSS ORDER MATTERS — it mirrors the original style.css:
   base → components (header … footer) → scroll entrances
   → responsive (tablet / mobile) → final overrides.
===================================================== */

import { Fragment } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

import "./styles/base.css";

import IconSprite from "./components/Icons/IconSprite";
import Seo from "./components/Seo/Seo";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Partners from "./components/Partners/Partners";

import "./styles/shared.css";

import Sectors from "./components/Sectors/Sectors";
import ProjectFields from "./components/ProjectFields/ProjectFields";
import NewsEvents from "./components/NewsEvents/NewsEvents";
import ContactCta from "./components/ContactCta/ContactCta";
import Footer from "./components/Footer/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat/WhatsAppFloat";

import "./styles/scroll-entrances.css";
import "./styles/responsive.css";
import "./styles/overrides.css";

function Page() {
  const { lang } = useLanguage();

  // key={lang}: switching language remounts the page, like loading the other
  // HTML file did — entrance animations replay and the menu resets.
  return (
    <Fragment key={lang}>
      <IconSprite />
      <Header />

      <main id="home">
        <Hero />
        <About />
        <Partners />
        <Sectors />
        <ProjectFields />
        <NewsEvents />
        <ContactCta />
      </main>

      <Footer />
      <WhatsAppFloat />
    </Fragment>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Seo />
      <Page />
    </LanguageProvider>
  );
}
