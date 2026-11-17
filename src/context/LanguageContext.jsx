/* =====================================================
   LANGUAGE CONTEXT
   Language comes from the URL:  /ar  (Arabic, RTL)
                                 /en  (English, LTR)
   It also keeps <html lang> and <html dir> in sync, because
   the CSS relies on  html[lang="…"]  and  html[dir="…"].
===================================================== */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_LANG, LANGS } from "../config/site";

const LanguageContext = createContext(null);

function languageFromPath(pathname) {
  const first = pathname.split("/")[1];
  return first === "ar" || first === "en" ? first : null;
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => languageFromPath(window.location.pathname) ?? DEFAULT_LANG,
  );

  // "/" or unknown path  →  /ar or /en (keeps hash if any)
  useEffect(() => {
    if (languageFromPath(window.location.pathname) !== lang) {
      window.history.replaceState(
        null,
        "",
        LANGS[lang].path + window.location.hash,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Browser back / forward between /ar and /en
  useEffect(() => {
    const onPop = () =>
      setLang(languageFromPath(window.location.pathname) ?? DEFAULT_LANG);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Keep <html lang dir> in sync (layout effect = before paint)
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = LANGS[lang].dir;
  }, [lang]);

  const switchLanguage = useCallback(
    (next) => {
      if (next === lang || !LANGS[next]) return;
      window.history.pushState(null, "", LANGS[next].path);
      setLang(next);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    },
    [lang],
  );

  const value = useMemo(
    () => ({
      lang,
      dir: LANGS[lang].dir,
      isArabic: lang === "ar",
      switchLanguage,
    }),
    [lang, switchLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
