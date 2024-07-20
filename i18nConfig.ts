import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import thLang from "@/locales/th/common.json";
import enLang from "@/locales/en/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enLang,
    },
    th: {
      translation: thLang,
    },
  },
  lng: "th",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
