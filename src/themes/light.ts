import { colors } from './colors';

export default {
  backgroundColor: colors.neutral100,
  textColor: colors.black,
  linkColor: colors.blue600,
  linkHoverColor: colors.blue700,

  borderRadius: '6px',
  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',

  card: {
    backgroundColor: colors.white,
    textColor: colors.black,
  },

  nav: {
    backgroundColor: colors.neutral100,
    borderColor: colors.neutral300,
    textColor: colors.neutral800,

    profileBackground: colors.neutral300,
    profileHoverBackground: colors.neutral400,
    profileText: colors.neutral900,
    smallText: colors.neutral700,

    activeBackground: colors.blue600,
    hoverColor: colors.blue600,
  },

  buttons: {
    primaryBackgroundColor: colors.blue600,
    primaryBorderColor: colors.blue600,
    primaryTextColor: colors.white,
    primaryHoverBackgroundColor: colors.blue500,
    primaryHoverTextColor: colors.white,

    defaultBackgroundColor: colors.neutral200,
    defaultBorderColor: colors.neutral200,
    defaultTextColor: colors.black,
    defaultHoverBackgroundColor: colors.neutral400,
    defaultHoverTextColor: colors.black,

    textColor: colors.neutral50,

    backgroundColor: colors.blue600,
    disabledBackgroundColor: colors.neutral100,
    hoverBackgroundColor: colors.blue500,
  },

  footer: {
    textColor: colors.neutral500,
    height: '35px',
  },

  forms: {
    backgroundColor: colors.neutral100,
    labelColor: colors.neutral800,
    control: colors.black,
    textColor: colors.black,
    errorBorderColor: colors.dangerRed,
    errorTextColor: colors.dangerRed,
  },

  input: {
    backgroundColor: colors.white,
    placeholderColor: colors.neutral200,
    textColor: colors.black,
    borderColor: colors.neutral300,
    disabledBackground: colors.neutral200,
  },

  table: {
    rowHoverColor: colors.neutral300,
  },

  modals: {
    confirmation: {
      contentBackgroundColor: colors.white,
      contentBorderColor: colors.white,
      titleTextColor: colors.black,
      bodyTextColor: colors.neutral700,
      cancelButtonBackgroundColor: colors.neutral100,
      cancelButtonBorderColor: colors.neutral100,
      cancelButtonTextColor: colors.blue600,
      confirmButtonBackgroundColor: colors.blue600,
      confirmButtonBorderColor: colors.blue600,
    },
    logout: {
      backgroundColor: colors.neutral100,
      titleTextColor: colors.blue600,
      textColor: colors.blue600,
    },
  },

  pages: {
    pageHeader: colors.dangerRed,
    h1: colors.black,
    p: colors.neutral700,
  },

  changelogs: {
    accentTextColor: colors.blue600,
  },
};
