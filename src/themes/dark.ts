import { colors } from './colors';

export default {
  backgroundColor: '#222222',
  textColor: colors.white,
  linkColor: colors.blue400,
  linkHoverColor: colors.blue300,

  borderRadius: '6px',
  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)',

  card: {
    backgroundColor: colors.neutral900,
    textColor: colors.white,
  },

  nav: {
    backgroundColor: colors.neutral900,
    borderColor: colors.neutral900,
    textColor: colors.neutral100,

    profileBackground: colors.neutral800,
    profileHoverBackground: colors.neutral700,
    profileText: colors.white,
    smallText: colors.white,

    activeBackground: colors.blue600,
    hoverColor: colors.blue300,
  },

  buttons: {
    primaryBackgroundColor: colors.blue600,
    primaryBorderColor: colors.blue600,
    primaryTextColor: colors.white,
    primaryHoverBackgroundColor: colors.blue500,
    primaryHoverTextColor: colors.white,

    defaultBackgroundColor: colors.neutral700,
    defaultBorderColor: colors.neutral700,
    defaultTextColor: colors.white,
    defaultHoverBackgroundColor: colors.neutral400,
    defaultHoverTextColor: colors.black,

    textColor: colors.neutral50,

    backgroundColor: colors.blue500,
    disabledBackgroundColor: colors.neutral100,
    hoverBackgroundColor: colors.blue500,
  },

  footer: {
    textColor: colors.neutral800,
    height: '35px',
  },

  forms: {
    backgroundColor: colors.neutral100,
    labelColor: colors.neutral50,
    control: colors.black,
    textColor: colors.neutral50,
    errorBorderColor: colors.dangerRed,
    errorTextColor: colors.dangerRed,
  },

  input: {
    backgroundColor: 'transparent',
    placeholderColor: colors.neutral200,
    textColor: colors.white,
    borderColor: colors.neutral700,
    disabledBackground: colors.neutral800,
  },

  table: {
    rowHoverColor: colors.neutral800,
  },

  modals: {
    confirmation: {
      contentBackgroundColor: colors.neutral900,
      contentBorderColor: colors.neutral900,
      titleTextColor: colors.neutral50,
      bodyTextColor: colors.neutral50,
      cancelButtonBackgroundColor: colors.neutral100,
      cancelButtonBorderColor: colors.neutral100,
      cancelButtonTextColor: colors.blue500,
      confirmButtonBackgroundColor: colors.blue500,
      confirmButtonBorderColor: colors.blue500,
    },
    logout: {
      backgroundColor: colors.neutral100,
      titleTextColor: colors.blue500,
      textColor: colors.blue500,
    },
  },

  pages: {
    pageHeader: colors.white,
    h1: colors.white,
    p: colors.neutral400,
  },

  changelogs: {
    accentTextColor: colors.neutral50,
  },
};
