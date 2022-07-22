import i18n, { Resource } from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEN from './en/translation.json';
import translationES from './es/translation.json';

i18n.on('languageChanged', lng => {
  localStorage.setItem('lng', lng);
});

export const languages = [
  {
    label: 'English',
    shortcode: 'en',
    translation: translationEN,
  },
  {
    label: 'Español',
    shortcode: 'es',
    translation: translationES,
  },
];

const resources: Resource = {};
languages.forEach(language => {
  resources[language.shortcode] = {
    translation: language.translation,
  };
});

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    load: 'languageOnly',
    detection: {
      lookupLocalStorage: 'language',
    },
    resources,
    backend: {
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`, // Path to the translation files
      addPath: `${process.env.PUBLIC_URL}/locales/add/{{lng}}/{{ns}}`,
    },
  });

export default i18n;
