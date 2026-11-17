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

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

function languagePath(code) {
  return `${BASE_PATH}/${code}`;
}

function languageFromPath(pathname) {
  const path = pathname.startsWith(`${BASE_PATH}/`)
    ? pathname.slice(BASE_PATH.length)
    : pathname;

  const first = path.split("/").filter(Boolean)[0];

  return first === "ar" || first === "en" ? first : null;
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => languageFromPath(window.location.pathname) ?? DEFAULT_LANG,
  );

  // Redirect homepage or unknown routes to the default language.
  useEffect(() => {
    if (!languageFromPath(window.location.pathname)) {
      window.history.replaceState(
        null,
        "",
        languagePath(lang) + window.location.hash,
      );
    }
  }, []);

  // Browser back / forward.
  useEffect(() => {
    const onPop = () => {
      setLang(
        languageFromPath(window.location.pathname) ?? DEFAULT_LANG,
      );
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Keep HTML language and direction synchronized.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = LANGS[lang].dir;
  }, [lang]);

  const switchLanguage = useCallback(
    (next) => {
      if (next === lang || !LANGS[next]) return;

      window.history.pushState(null, "", languagePath(next));
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

  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }

  return ctx;
}