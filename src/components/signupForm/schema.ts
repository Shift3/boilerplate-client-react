import * as yup from 'yup';

export enum errorMessages {
    EMAIL_REQUIRED = "Email is required.",
    INVALID_EMAIL = "Please enter a valid email address.",
    EMAIL_MATCH = "Email addresses must match.",
    FIRST_NAME_REQUIRED = "First name is required.",
    LAST_NAME_REQUIRED = "Last name is required.",
    NAME_LENGTH = "names must be between 2 and 50 characters",
}

export const SignupFormSchema =  yup.object().shape({
    email: yup.string()
        .email(errorMessages.INVALID_EMAIL)
        .required(errorMessages.EMAIL_REQUIRED),
    confirmEmail: yup.string()
        .email(errorMessages.INVALID_EMAIL)
        .required(errorMessages.EMAIL_REQUIRED)
        .oneOf([yup.ref("email"), null], errorMessages.EMAIL_MATCH),
    firstName: yup.string()
        .min(2, errorMessages.NAME_LENGTH)
        .max(50, errorMessages.NAME_LENGTH)
        .required(errorMessages.FIRST_NAME_REQUIRED),
    lastName: yup.string()
        .min(2, errorMessages.NAME_LENGTH)
        .max(50, errorMessages.NAME_LENGTH)
        .required(errorMessages.LAST_NAME_REQUIRED)
});