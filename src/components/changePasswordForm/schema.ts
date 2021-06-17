import * as yup from 'yup';
import { Constants } from '../../utils/constants';

const { errorMessages } = Constants;

export const ChangePasswordFormSchema = yup.object().shape({
  currentPassword: yup.string().required(errorMessages.FIELD_REQUIRED),
  newPassword: yup
    .string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(Constants.patterns.LOWERCASE_REGEX, errorMessages.PASSWORD_LOWERCASE)
    .matches(Constants.patterns.UPPERCASE_REGEX, errorMessages.PASSWORD_UPPERCASE)
    .matches(Constants.patterns.SYMBOL_REGEX, errorMessages.PASSWORD_SPECIAL_CHARACTER)
    .matches(Constants.patterns.DIGIT_REGEX, errorMessages.PASSWORD_NUMBER)
    .notOneOf([yup.ref('currentPassword')], errorMessages.PASSWORD_MUST_MISMATCH),

  confirmPassword: yup
    .string()
    .required(errorMessages.FIELD_REQUIRED)
    .oneOf([yup.ref('newPassword')], errorMessages.PASSWORD_MUST_MATCH),
});
