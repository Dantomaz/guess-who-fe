import i18next from "i18next";
import translation_en from "./en.json";
import translation_pl from "./pl.json";

i18next.init({
  interpolation: { escapeValue: false }, // react already does escaping
  lng: localStorage.getItem("language") || "en",
  resources: {
    en: translation_en,
    pl: translation_pl,
  },
});
