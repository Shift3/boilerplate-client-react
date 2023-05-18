import translationEN from './en/translation.json';
import commonEN from './en/common.json';
import translationES from './es/translation.json';
import commonES from './es/common.json';
import { environment } from 'environment';
import i18n, { Resource } from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import I18NextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n.on('languageChanged', lng => {
  localStorage.setItem('lng', lng);
});

export const languages = [
  {
    label: 'English',
    shortcode: 'en',
    translation: translationEN,
    common: commonEN,
  },
  {
    label: 'Español',
    shortcode: 'es',
    translation: translationES,
    common: commonES,
  },
];

const resources: Resource = {};
languages.forEach(language => {
  resources[language.shortcode] = {
    translation: language.translation,
    common: language.common,
  };
});

i18n
  .use(I18NextHttpBackend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: !environment.isProduction && !(process.env.NODE_ENV === 'test'),
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
