import { environment } from '../environment/index';

interface IPattern {
  DIGIT_REGEX: RegExp;
  EMAIL_REGEX: RegExp;
  SYMBOL_REGEX: RegExp;
  US_PHONE_REGEX: RegExp;
  LOWERCASE_REGEX: RegExp;
  UPPERCASE_REGEX: RegExp;
}
interface IValidationMessages {
  fieldRequired: string;
  passwordLength: string;
  passwordLowercase: string;
  passwordUppercase: string;
  passwordSpecialCharacter: string;
  passwordNumber: string;
  passwordMustMismatch: string;
  passwordMustMatch: string;
  emailMatch: string;
  nameRequired: string;
  firstNameRequired: string;
  lastNameRequired: string;
  emailRequired: string;
  invalidEmail: string;
  passwordRequired: string;
  currentPasswordRequired: string;
  newPasswordRequired: string;
  confirmPasswordRequired: string;
  roleRequired: string;
  sameEmail: string;
  verificationCodeRequired: string;
  verificationCodeLengthMismatch: string;
  validProfilePictureFormat: string;
  descriptionRequired: string;
  phoneNumberInvalid: string;
  phoneNumberRequired: string;
  cityRequired: string;
  stateRequired: string;
  zipCodeRequired: string;
}

export interface IConstant {
  patterns: IPattern;
  validationMessages: IValidationMessages;
  passwordMinLength: number;
  version: string;
  creationYear: number;
  applicationName: string;
  footerCopyright: string;
  environmentName: string;
  SUPPORTED_PROFILE_PICTURE_FORMATS: string[];
}

export const Constants: IConstant = {
  patterns: {
    DIGIT_REGEX: /[0-9]/,
    // eslint-disable-next-line no-useless-escape
    EMAIL_REGEX: /^[a-z0-9!#$%&'*+\/=?^_\`{|}~.-]+@[a-z0-9]([a-z0-9-])+(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    SYMBOL_REGEX: /[-+_!@#$%^&*,.?]/,
    US_PHONE_REGEX: /(^\d{10}$)/,
    LOWERCASE_REGEX: /(?=.*[a-z])/,
    UPPERCASE_REGEX: /(?=.*[A-Z])/,
  },
  validationMessages: {
    fieldRequired: 'validationMessages.fieldRequired',
    passwordLength: 'validationMessages.passwordLength',
    passwordLowercase: 'validationMessages.passwordLowercase',
    passwordUppercase: 'validationMessages.passwordUppercase',
    passwordSpecialCharacter: 'validationMessages.passwordSpecialCharacter',
    passwordNumber: 'validationMessages.passwordNumber',
    passwordMustMismatch: 'validationMessages.passwordMustMismatch',
    passwordMustMatch: 'validationMessages.passwordMustMatch',
    emailMatch: 'validationMessages.emailMatch',
    nameRequired: 'validationMessages.nameRequired',
    firstNameRequired: 'validationMessages.firstNameRequired',
    lastNameRequired: 'validationMessages.lastNameRequired',
    emailRequired: 'validationMessages.emailRequired',
    invalidEmail: 'validationMessages.invalidEmail',
    passwordRequired: 'validationMessages.passwordRequired',
    currentPasswordRequired: 'validationMessages.currentPasswordRequired',
    newPasswordRequired: 'validationMessages.newPasswordRequired',
    confirmPasswordRequired: 'validationMessages.confirmPasswordRequired',
    roleRequired: 'validationMessages.roleRequired',
    sameEmail: 'validationMessages.sameEmail',
    verificationCodeRequired: 'validationMessages.verificationCodeRequired',
    verificationCodeLengthMismatch: 'validationMessages.verificationCodeLengthMismatch',
    validProfilePictureFormat: 'validationMessages.validProfilePictureFormat',
    descriptionRequired: 'validationMessages.descriptionRequired',
    phoneNumberInvalid: 'validationMessages.phoneNumberInvalid',
    phoneNumberRequired: 'validationMessages.phoneNumberRequired',
    cityRequired: 'validationMessages.cityRequired',
    stateRequired: 'validationMessages.stateRequired',
    zipCodeRequired: 'validationMessages.zipCodeRequired',
  },
  passwordMinLength: 8,
  version: environment.version,
  environmentName: environment.environment,
  creationYear: 2021,
  applicationName: 'BW React Boilerplate',
  footerCopyright: '© Bitwise Industries',
  SUPPORTED_PROFILE_PICTURE_FORMATS: ['image/jpg', 'image/jpeg', 'image/png'],
};
