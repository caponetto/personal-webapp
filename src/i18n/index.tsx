import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const NAMESPACES = ["about", "code", "common", "drawer", "journey", "literal", "personal", "talk", "text"];

i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    debug: false,
    ns: NAMESPACES,
  });

export default i18n;
