import { colors } from './colors';

export default {
  colors,
  backgroundColor: colors.lightBackground,
  textColor: colors.black,

  nav: {
    backgroundColor: colors.offWhite,
    textColor: colors.darkGrey,
    profileBackground: colors.offWhite,
    profileText: colors.darkGrey,
    smallText: colors.faded,
  },

  buttons: {
    cancelBackgroundColor: colors.lightBackground,
    cancelBorderColor: colors.lightBackground,
    cancelTextColor: colors.black,
    submitBackgroundColor: colors.primary,
    submitBorderColor: colors.primary,
    submitTextColor: colors.white,
    disabledBackgroundColor: colors.lightBackground,
    hoverBackgroundColor: colors.primary,
    textColor: colors.darkAccent,
    // hoverBorderColor:
    // disableBorderColor:
    createBackgroundColor: colors.secondary,
    createBorderColor: colors.secondary,
    createTextColor: colors.white,
    createHoverBackgroundColor: colors.accent,
    createHoverBorderColor: colors.accent,
    backgroundColor: colors.primary,
  },

  footer: {
    backgroundColor: colors.accent,
    textColor: colors.white,
    height: '35px',
  },

  forms: {
    backgroundColor: colors.lightBackground,
    labelColor: colors.darkAccent,
    titleColor: colors.darkAccent,
    control: colors.black,
    textColor: colors.black,
    white: colors.white,
    black: colors.black,
    errorBorderColor: colors.lightAccent,
    errorTextColor: colors.accent,
    errorImageColor: colors.lightAccent,
  },

  modals: {
    confirmation: {
      contentBackgroundColor: colors.white,
      contentBorderColor: colors.white,
      titleTextColor: colors.black,
      bodyTextColor: colors.faded,
      cancelButtonBackgroundColor: colors.lightBackground,
      cancelButtonBorderColor: colors.lightBackground,
      cancelButtonTextColor: colors.primary,
      confirmButtonBackgroundColor: colors.primary,
      confirmButtonBorderColor: colors.primary,
    },
    logout: {
      backgroundColor: colors.lightBackground,
      titleTextColor: colors.primary,
      textColor: colors.primary,
    },
  },

  pages: {
    backgroundColor: colors.white,
    pageHeader: colors.darkGrey,
    p: colors.darkGrey,
    h1: colors.darkGrey,
  },

  tables: {
    borderColor: colors.lightAccent,
    headerBackgroundColor: colors.primary,
    headerTextColor: colors.white,
    backgroundColor: colors.primary,
    textColor: colors.primary,
  },

  changelogs: {
    accentTextColor: colors.primary,
  },
};
