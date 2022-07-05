import { colors } from './colors';

export default {
  colors,
  backgroundColor: colors.lightBackground,
  textColor: colors.black,

  nav: {
    backgroundColor: colors.offWhite,
  },

  buttons: {
    cancelBackgroundColor: colors.lightBackground,
    cancelBorderColor: colors.lightBackground,
    cancelTextColor: colors.black,
    submitBackgroundColor: colors.primaryBlue,
    submitBorderColor: colors.primaryBlue,
    submitTextColor: colors.white,
    disabledBackgroundColor: colors.lightBackground,
    hoverBackgroundColor: colors.primaryBlue,
    textColor: colors.darkAccent,
    // hoverBorderColor:
    // disableBorderColor:
    createBackgroundColor: colors.secondaryBlue,
    createBorderColor: colors.secondaryBlue,
    createTextColor: colors.white,
    createHoverBackgroundColor: colors.accent,
    createHoverBorderColor: colors.accent,
    backgroundColor: colors.primaryBlue,
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
      cancelButtonTextColor: colors.primaryBlue,
      confirmButtonBackgroundColor: colors.primaryBlue,
      confirmButtonBorderColor: colors.primaryBlue,
    },
    logout: {
      backgroundColor: colors.lightBackground,
      titleTextColor: colors.primaryBlue,
      textColor: colors.primaryBlue,
    },
  },

  pages: {
    backgroundColor: colors.white,
  },

  tables: {
    borderColor: colors.lightAccent,
    headerBackgroundColor: colors.primaryBlue,
    headerTextColor: colors.white,
    backgroundColor: colors.primaryBlue,
    textColor: colors.primaryBlue,
  },

  changelogs: {
    accentTextColor: colors.primaryBlue,
  },
};
