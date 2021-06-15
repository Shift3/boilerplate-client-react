import * as yup from 'yup';

export enum errorMessages {
  EMAIL_REQUIRED = 'Email is required.',
  INVALID_EMAIL = 'Please enter a valid email address.',
}

export const ForgotPasswordFormSchema = yup.object().shape({
  email: yup.string().required(errorMessages.EMAIL_REQUIRED).email(errorMessages.INVALID_EMAIL),
});
