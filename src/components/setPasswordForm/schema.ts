import * as yup from 'yup';

export enum errorMessages {
    PASSWORD_REQUIRED = "Password is required.",
    PASSWORD_LENGTH = "Password must be between 7 and 12 characters.",
    PASSWORD_MATCH = "Passwords must match."
}

export const SetPasswordFormSchema =  yup.object().shape({
    password: yup.string()
        .min(7, errorMessages.PASSWORD_LENGTH)
        .max(12, errorMessages.PASSWORD_LENGTH)
        .required(errorMessages.PASSWORD_REQUIRED),
    confirmPassword: yup.string()
        .min(7, errorMessages.PASSWORD_LENGTH)
        .max(12, errorMessages.PASSWORD_LENGTH)
        .required(errorMessages.PASSWORD_REQUIRED)
        .oneOf([yup.ref("password"), null], errorMessages.PASSWORD_MATCH),
});