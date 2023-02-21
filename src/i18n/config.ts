// import { initReactI18next } from 'react-i18next';
// import translationEN from './en/translation.json';
// import translationES from './es/translation.json';
// import i18next, { Resource } from 'i18next';
// import I18NextHttpBackend from 'i18next-http-backend';
// import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
// import { environment } from 'environment';

// i18next.on('languageChanged', lng => {
//   localStorage.setItem('lng', lng);
// });

// export const languages = [
//   {
//     label: 'English',
//     shortcode: 'en',
//     translation: translationEN,
//   },
//   {
//     label: 'Español',
//     shortcode: 'es',
//     translation: translationES,
//   },
// ];

// const resources: Resource = {};
// languages.forEach(language => {
//   resources[language.shortcode] = {
//     translation: language.translation,
//   };
// });

// i18next
//   .use(I18NextHttpBackend)
//   .use(I18nextBrowserLanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'en',
//     debug: !environment.isProduction && !(process.env.NODE_ENV === 'test'),
//     load: 'languageOnly',
//     detection: {
//       lookupLocalStorage: 'language',
//     },
//     resources,
//     backend: {
//       loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`, // Path to the translation files
//       addPath: `${process.env.PUBLIC_URL}/locales/add/{{lng}}/{{ns}}`,
//     },
//   });

// export default { i18next };
