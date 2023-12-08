import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { initialState } from "./reduxToolkit/weatherSlice";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: " --- Welcome --- ",
        forecast: "--- Forecast ---",
        story: "Story",
        temp: "Temp",
        windSpeed: "Wind-Speed",
        humidity: "Humidity",
        weather: " --- Weather ---",
        mSec: "m/sec",
      },
    },
    ua: {
      translation: {
        Welcome: "Привет",
        forecast: " --- Прогноз --- ",
        story: "История",
        temp: "Температура",
        windSpeed: "Скорость-Ветра",
        humidity: "Влажность",
        weather: " --- Погода --- ",
        mSec: "м/сек",
      },
    },
  },
  lng: "us",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
