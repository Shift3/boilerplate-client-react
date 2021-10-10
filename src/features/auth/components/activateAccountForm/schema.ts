import * as yup from 'yup';
import { Constants } from '../../../../utils/constants';

const { errorMessages } = Constants;

export const ActivateAccountFormSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required(errorMessages.NEW_PASSWORD_REQUIRED)
    .min(8, errorMessages.PASSWORD_LENGTH)
    .matches(Constants.patterns.LOWERCASE_REGEX, errorMessages.PASSWORD_LOWERCASE)
    .matches(Constants.patterns.UPPERCASE_REGEX, errorMessages.PASSWORD_UPPERCASE)
    .matches(Constants.patterns.SYMBOL_REGEX, errorMessages.PASSWORD_SPECIAL_CHARACTER)
    .matches(Constants.patterns.DIGIT_REGEX, errorMessages.PASSWORD_NUMBER),

  confirmPassword: yup
    .string()
    .required(errorMessages.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref('newPassword')], errorMessages.PASSWORD_MUST_MATCH),
});
