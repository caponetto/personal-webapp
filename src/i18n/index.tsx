import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const contextPath = process.env["WEBPACK_REPLACE__contextPath"];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "pt"],
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
