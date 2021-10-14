/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import "assets/css/normalize.css";
import "assets/css/index.css";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-http-backend";
import i18next from "i18next";

import en from "i18n/en.json";
import es from "i18n/es.json";

const options = {
  order: ["querystring", "navigator"],
  lookupQuerystring: "lng"
};
i18next.
  use(XHR).
  use(LanguageDetector).
  init({
    interpolation: { escapeValue: false },
    // lng: 'en',
    detection: options,
    fallbackLng: "en",
    supportedLngs: ["en", "es"],
    resources: {
      en: { common: en },
      es: { common: es }
    },

    debug: false
  });

ReactDOM.render(
  <BrowserRouter path="/">
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
