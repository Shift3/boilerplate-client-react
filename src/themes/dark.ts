import { colors } from './colors';

export default {
  colors,
  backgroundColor: colors.accent,
  textColor: colors.offWhite,

  nav: {
    backgroundColor: colors.accent,
  },

  buttons: {
    cancelBackgroundColor: colors.lightBackground,
    cancelBorderColor: colors.lightBackground,
    cancelTextColor: colors.black,
    submitBackgroundColor: colors.secondary,
    submitBorderColor: colors.secondary,
    submitTextColor: colors.white,
    disabledBackgroundColor: colors.lightBackground,
    hoverBackgroundColor: colors.secondary,
    textColor: colors.offWhite,
    // hoverBorderColor:
    // disableBorderColor:
    createBackgroundColor: colors.accent,
    createBorderColor: colors.accent,
    createTextColor: colors.offWhite,
    createHoverBackgroundColor: colors.accent,
    createHoverBorderColor: colors.accent,
    backgroundColor: colors.secondary,
  },

  footer: {
    backgroundColor: colors.accent,
    textColor: colors.offWhite,
    height: '35px',
  },

  forms: {
    backgroundColor: colors.lightBackground,
    labelColor: colors.darkAccent,
    titleColor: colors.darkAccent,
    control: colors.black,
    textColor: colors.offWhite,
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
      titleTextColor: colors.offWhite,
      bodyTextColor: colors.offWhite,
      cancelButtonBackgroundColor: colors.lightBackground,
      cancelButtonBorderColor: colors.lightBackground,
      cancelButtonTextColor: colors.secondary,
      confirmButtonBackgroundColor: colors.secondary,
      confirmButtonBorderColor: colors.secondary,
    },
    logout: {
      backgroundColor: colors.lightBackground,
      titleTextColor: colors.secondary,
      textColor: colors.secondary,
    },
  },

  pages: {
    backgroundColor: colors.white,
  },

  tables: {
    borderColor: colors.lightAccent,
    headerBackgroundColor: colors.secondary,
    headerTextColor: colors.offWhite,
    backgroundColor: colors.secondary,
    textColor: colors.offWhite,
  },

  changelogs: {
    accentTextColor: colors.offWhite,
  },
};
