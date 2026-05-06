import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import enTranslation from "./locales/en/translation.json"
import ptTranslation from "./locales/pt/translation.json"
import esTranslation from "./locales/es/translation.json"

const resources = {
  en: {
    translation: enTranslation,
  },
  pt: {
    translation: ptTranslation,
  },
  es: {
    translation: esTranslation,
  },
}

const getInitialLanguage = () => {
  const supportedLangs = ["en", "pt", "es"]

  try {
    const stored =
      localStorage.getItem("lang") || localStorage.getItem("i18nextLng")
    if (stored && supportedLangs.includes(stored)) return stored
  } catch (e) {}

  const browserLang =
    typeof navigator !== "undefined" ? navigator.language.split("-")[0] : null
  if (browserLang && supportedLangs.includes(browserLang)) return browserLang

  return "pt"
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
