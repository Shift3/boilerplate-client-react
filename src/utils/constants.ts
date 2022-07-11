import { environment } from '../environment/index';

interface IPattern {
  DIGIT_REGEX: RegExp;
  EMAIL_REGEX: RegExp;
  SYMBOL_REGEX: RegExp;
  US_PHONE_REGEX: RegExp;
  LOWERCASE_REGEX: RegExp;
  UPPERCASE_REGEX: RegExp;
}
interface IErrorMessages {
  FIELD_REQUIRED: string;
  PASSWORD_LENGTH: string;
  PASSWORD_LOWERCASE: string;
  PASSWORD_UPPERCASE: string;
  PASSWORD_SPECIAL_CHARACTER: string;
  PASSWORD_NUMBER: string;
  PASSWORD_MUST_MISMATCH: string;
  PASSWORD_MUST_MATCH: string;
  EMAIL_REQUIRED: string;
  INVALID_EMAIL: string;
  PASSWORD_REQUIRED: string;
  EMAIL_MATCH: string;
  FIRST_NAME_REQUIRED: string;
  LAST_NAME_REQUIRED: string;
  CURRENT_PASSWORD_REQUIRED: string;
  NEW_PASSWORD_REQUIRED: string;
  CONFIRM_PASSWORD_REQUIRED: string;
  ROLE_REQUIRED: string;
  SAME_EMAIL: string;
  VERIFICATION_CODE_REQUIRED: string;
  VERIFICATION_CODE_LENGTH_MISMATCH: string;
  VALID_PROFILE_PICTURE_FORMAT: string;
}

export interface IConstant {
  patterns: IPattern;
  errorMessages: IErrorMessages;
  version: string;
  creationYear: number;
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
  errorMessages: {
    FIELD_REQUIRED: 'Field is required.',
    PASSWORD_LENGTH: 'Password must be at least 8 characters.',
    PASSWORD_LOWERCASE: 'Password must contain at least one lowercase letter.',
    PASSWORD_UPPERCASE: 'Password must contain at least one uppercase letter.',
    PASSWORD_SPECIAL_CHARACTER: 'Password must contain at least one special character.',
    PASSWORD_NUMBER: 'Password must contain at least one number.',
    PASSWORD_MUST_MISMATCH: 'New password should not match current password.',
    PASSWORD_MUST_MATCH: 'Passwords must match.',
    EMAIL_MATCH: 'Email addresses must match.',
    FIRST_NAME_REQUIRED: 'First name is required.',
    LAST_NAME_REQUIRED: 'Last name is required.',
    EMAIL_REQUIRED: 'Email is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    PASSWORD_REQUIRED: 'Password is required.',
    CURRENT_PASSWORD_REQUIRED: 'Current password is required.',
    NEW_PASSWORD_REQUIRED: 'New password is required.',
    CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required.',
    ROLE_REQUIRED: 'Role is required.',
    SAME_EMAIL: 'Email must be different from current value.',
    VERIFICATION_CODE_REQUIRED: 'Verification code is required.',
    VERIFICATION_CODE_LENGTH_MISMATCH: 'Verification code must contain 6 digits.',
    VALID_PROFILE_PICTURE_FORMAT: 'Must select a supported image type (.jpeg, .jpg, or .png).',
  },
  version: environment.version,
  creationYear: 2021,
  SUPPORTED_PROFILE_PICTURE_FORMATS: ['image/jpg', 'image/jpeg', 'image/png'],
};
