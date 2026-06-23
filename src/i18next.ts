import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import es from "./locales/es";

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, es: { translation: es } },
  lng: window.location.pathname.startsWith("/es") ? "es" : "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
