// RegExp constatns coppied over from Angular Boilerplate.
interface IPattern {
  DIGIT_REGEX: RegExp
  EMAIL_REGEX: RegExp
  SYMBOL_REGEX: RegExp
  US_PHONE_REGEX: RegExp
  LOWERCASE_REGEX: RegExp
  UPPERCASE_REGEX: RegExp
}

interface IUsernamelValidationMessages {
  IS_REQUIRED: string
  MUST_BE_VALID_EMAIL: string
}

interface IPasswordValidationMessages {
  IS_REQUIRED: string
  UPPERCASE_CHARACTER_REQUIRED: string
  LOWERCASE_CHARACTER_REQUIRED: string
  NUMBER_REQUIRED: string
  SPECIAL_CHARACTER_REQUIRED: string
  MIN_LENGTH_REQUIRED: string
}

interface IValidationMessages {
  username: IUsernamelValidationMessages
  password: IPasswordValidationMessages
}

export interface IConstant {
  patterns: IPattern
  validationMessages: IValidationMessages
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
    username: {
      IS_REQUIRED: 'Username is required.',
      MUST_BE_VALID_EMAIL: 'Must be a valid email.',
    },
    password: {
      IS_REQUIRED: 'Password is required.',
      UPPERCASE_CHARACTER_REQUIRED: 'One upper case character required.',
      LOWERCASE_CHARACTER_REQUIRED: 'One lower case character required.',
      NUMBER_REQUIRED: 'One number is required.',
      SPECIAL_CHARACTER_REQUIRED: 'One special character is required',
      MIN_LENGTH_REQUIRED: 'Minimum 8 character required.',
    },
  },
}
