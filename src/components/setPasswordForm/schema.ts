import * as yup from 'yup';
import { Constants } from '../../utils/constants';

export enum errorMessages {
    PASSWORD_REQUIRED = "Password is required.",
    PASSWORD_LENGTH = "Password must be at least 8 characters.",
    PASSWORD_LOWERCASE = "Password must contain at least one lowercase letter",
    PASSWORD_UPPERCASE = "Password must contain at least one uppercase letter",
    PASSWORD_SPECIAL_CHARACTER = "Password must contain at least one special character",
    PASSWORD_NUMBER = "Password must contain at least one number",
    PASSWORD_MATCH = "Passwords must match.",
}

export const SetPasswordFormSchema =  yup.object().shape({
    password: yup.string()
        .required(errorMessages.PASSWORD_REQUIRED)
        .min(8, errorMessages.PASSWORD_LENGTH)
        .matches(Constants.patterns.LOWERCASE_REGEX, errorMessages.PASSWORD_LOWERCASE)
        .matches(Constants.patterns.UPPERCASE_REGEX, errorMessages.PASSWORD_UPPERCASE)
        .matches(Constants.patterns.SYMBOL_REGEX, errorMessages.PASSWORD_SPECIAL_CHARACTER)
        .matches(Constants.patterns.DIGIT_REGEX, errorMessages.PASSWORD_NUMBER),
    confirmPassword: yup.string()
        .required(errorMessages.PASSWORD_REQUIRED)
        .oneOf([yup.ref("password"), null], errorMessages.PASSWORD_MATCH),
});