const colors = {
  primaryBlue: '#3774B6',
  secondaryBlue: '#4AABE8',
  lightAccent: '#9DD6F3',
  accent: '#1F4A78',
  darkAccent: '#22304D',
  lightBackground: '#F2F2F2',
  white: '#FFFFFF',
  black: '000000',
  dangerRed: '#AD0404',

};

export default {
  app: {
    backgroundColor: colors.white,
  },

  buttons: {
    cancelBackgroundColor: colors.lightBackground,
    cancelBorderColor: colors.primaryBlue,
    cancelTextColor: colors.primaryBlue,
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
  },

  modals: {
    confirmation: {
      contentBackgroundColor: colors.lightBackground,
      contentBorderColor: colors.lightBackground,
      titleTextColor: colors.primaryBlue,
      bodyTextColor: colors.primaryBlue,
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
    backgroundColor: colors.white
  },

  tables: {
    borderColor: colors.lightAccent,
    headerBackgroundColor: colors.primaryBlue,
    headerTextColor: colors.white,
    backgroundColor: colors.primaryBlue,
    textColor: colors.primaryBlue
  }
};