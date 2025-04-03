import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import language files
import enTranslation from "../locales/en.json";
import esTranslation from "../locales/es.json";
import frTranslation from "../locales/fr.json";
import deTranslation from "../locales/de.json";
import zhTranslation from "../locales/zh.json";
import arTranslation from "../locales/ar.json";

const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  },
  fr: {
    translation: frTranslation
  },
  de: {
    translation: deTranslation
  },
  zh: {
    translation: zhTranslation
  },
  ar: {
    translation: arTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
