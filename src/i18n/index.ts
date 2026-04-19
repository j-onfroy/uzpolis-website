import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./ru.json";
import uz from "./uz.json";
import en from "./en.json";
// const savedLang = localStorage.getItem("language");
// language
i18next.use(initReactI18next).init({
    fallbackLng: "uz",
    // debug: true,
    resources: {
        ru: {
            translation: ru,
        },
        uz: {
            translation: uz,
        },
        en: {
            translation: en,
        },
    },
});
