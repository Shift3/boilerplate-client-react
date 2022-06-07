module.exports = {
  contextSeparator: '_',

  createOldCatalogs: true,

  defaultNamespace: 'translation',

  defaultValue: '',

  indentation: 2,

  keepRemoved: false,

  keySeparator: '.',

  lexers: {
    hbs: ['HandlebarsLexer'],
    handlebars: ['HandlebarsLexer'],

    htm: ['HTMLLexer'],
    html: ['HTMLLexer'],

    mjs: ['JavascriptLexer'],
    js: ['JavascriptLexer'], // if you're writing jsx inside .js files, change this to JsxLexer
    ts: ['JavascriptLexer'],
    jsx: ['JsxLexer'],
    tsx: ['JsxLexer'],

    default: ['JavascriptLexer'],
  },

  lineEnding: 'auto',

  locales: ['en', 'es'],
  // An array of the locales in your applications

  namespaceSeparator: ':',

  output: 'src/i18n/$LOCALE/translation.json',

  pluralSeparator: '_',

  input: undefined,

  sort: false,

  skipDefaultValues: false,

  useKeysAsDefaultValue: false,

  verbose: false,

  failOnWarnings: false,

  failOnUpdate: false,

  customValueTemplate: null,

  resetDefaultValueLocale: null,

  i18nextOptions: null,
  // If you wish to customize options in internally used i18next instance, you can define an object with any
  // configuration property supported by i18next (https://www.i18next.com/overview/configuration-options).
  // { compatibilityJSON: 'v3' } can be used to generate v3 compatible plurals.
};
