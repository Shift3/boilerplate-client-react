/* eslint-disable array-bracket-spacing */
import * as yup from 'yup';
import Reference from 'yup/lib/Reference';
import { Constants } from '../../utils/constants';

export enum errorMessages {
  FIELD_REQUIRED = 'Field is required.',
  PASSWORD_LENGTH = 'Password must be at least 8 characters.',
  PASSWORD_LOWERCASE = 'Password must contain at least one lowercase letter.',
  PASSWORD_UPPERCASE = 'Password must contain at least one uppercase letter.',
  PASSWORD_SPECIAL_CHARACTER = 'Password must contain at least one special character.',
  PASSWORD_NUMBER = 'Password must contain at least one number.',
  PASSWORD_MISMATCH = 'Passwords must match.',
  PASSWORD_MATCH = 'New password should not match current password.',
}

const minPassLength = 8;

const isMatch = (newPassword: string | undefined, currentPassword: Reference<unknown>) =>
  newPassword !== currentPassword.toString();

export const ResetPasswordFormSchema = yup.object().shape({
  currentPassword: yup.string().required(errorMessages.FIELD_REQUIRED),
  newPassword: yup
    .string()
    .required(errorMessages.FIELD_REQUIRED)
    .min(minPassLength, errorMessages.PASSWORD_LENGTH)
    .matches(Constants.patterns.LOWERCASE_REGEX, errorMessages.PASSWORD_LOWERCASE)
    .matches(Constants.patterns.UPPERCASE_REGEX, errorMessages.PASSWORD_UPPERCASE)
    .matches(Constants.patterns.SYMBOL_REGEX, errorMessages.PASSWORD_SPECIAL_CHARACTER)
    .matches(Constants.patterns.DIGIT_REGEX, errorMessages.PASSWORD_NUMBER)
    .test(errorMessages.PASSWORD_MATCH, (value) => isMatch(value, yup.ref('currentPassword'))),
  confirmPassword: yup
    .string()
    .required(errorMessages.FIELD_REQUIRED)
    .oneOf([yup.ref('newPassword')], errorMessages.PASSWORD_MISMATCH),
});
