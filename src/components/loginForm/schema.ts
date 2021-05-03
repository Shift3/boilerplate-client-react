import * as yup from 'yup';

export enum errorMessages {
    PASSWORD_REQUIRED = "Password is required.",
    INVALID_EMAIL = "Please enter a valid email.",
    EMAIL_REQUIRED = "Email is required."
}

export const LoginFormSchema = yup.object().shape({
    email: yup.string()
        .email(errorMessages.INVALID_EMAIL)
        .required(errorMessages.EMAIL_REQUIRED),
    password: yup.string()
        .required(errorMessages.PASSWORD_REQUIRED),
});