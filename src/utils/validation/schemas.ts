import * as yup from 'yup';
import { Constants } from '../constants';

export const usernameSchema = {
  username: yup
    .string()
    // Can also use .email() validation that comes with Yup, but we chose to
    // use the RegExp in the Angular BP to keep UX consistent.
    .matches(Constants.patterns.EMAIL_REGEX, Constants.validationMessages.username.MUST_BE_VALID_EMAIL)
    .required(Constants.validationMessages.username.IS_REQUIRED),
};

export const loginPasswordSchema = {
  password: yup.string().required(Constants.validationMessages.password.IS_REQUIRED),
};

export const registerPasswordSchema = {
  password: yup
    .string()
    // Must contain at least 1 uppercase character
    .matches(Constants.patterns.UPPERCASE_REGEX, Constants.validationMessages.password.UPPERCASE_CHARACTER_REQUIRED)
    // Must contain at least 1 lowercase character
    .matches(Constants.patterns.LOWERCASE_REGEX, Constants.validationMessages.password.LOWERCASE_CHARACTER_REQUIRED)
    // Must contain at least 1 numeric character
    .matches(Constants.patterns.DIGIT_REGEX, Constants.validationMessages.password.NUMBER_REQUIRED)
    // Must contain at least 1 special character
    .matches(Constants.patterns.SYMBOL_REGEX, Constants.validationMessages.password.SPECIAL_CHARACTER_REQUIRED)
    .min(8, Constants.validationMessages.password.MIN_LENGTH_REQUIRED)
    .required(Constants.validationMessages.password.IS_REQUIRED),
};
