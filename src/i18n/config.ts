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
    label: 'Spanish',
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
  // load translation using http -> see /public/locales
  .use(Backend)
  // // detect user language
  .use(LanguageDetector)
  // TODO: IF there is a localStorage options set for language, lets set the language to THAT instead of what we get from LanguageDetector

  // // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    fallbackLng: 'en',
    debug: true,
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
