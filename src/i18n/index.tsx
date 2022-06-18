import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export enum SupportedLanguages {
  EN = "en",
  PT = "pt",
}

const contextPath = process.env["WEBPACK_REPLACE__contextPath"];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: SupportedLanguages.EN,
    supportedLngs: Object.values(SupportedLanguages),
    ns: ["about", "code", "common", "drawer", "journey", "literal", "personal", "talk", "text"],
    interpolation: {
      escapeValue: false,
    },
    debug: false,
    backend: {
      loadPath: `${contextPath}/static/locales/{{lng}}/{{ns}}.json`,
    },
  });

export default i18n;
