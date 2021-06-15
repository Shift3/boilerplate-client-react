import * as yup from 'yup';

export enum errorMessages {
  EMAIL_REQUIRED = 'Email is required.',
  INVALID_EMAIL = 'Please enter a valid email address.',
  EMAIL_MATCH = 'Email addresses must match.',
  FIRST_NAME_REQUIRED = 'First name is required.',
  LAST_NAME_REQUIRED = 'Last name is required.',
  NAME_LENGTH = 'names must be between 2 and 50 characters',
}

const minNameLength = 3;
const maxNameLength = 50;

export const SignUpFormSchema = yup.object().shape({
  email: yup.string().required(errorMessages.EMAIL_REQUIRED).email(errorMessages.INVALID_EMAIL),
  confirmEmail: yup
    .string()
    .required(errorMessages.EMAIL_REQUIRED)
    .oneOf([yup.ref('email'), null], errorMessages.EMAIL_MATCH),
  firstName: yup
    .string()
    .required(errorMessages.FIRST_NAME_REQUIRED)
    .min(minNameLength, errorMessages.NAME_LENGTH)
    .max(maxNameLength, errorMessages.NAME_LENGTH),
  lastName: yup
    .string()
    .required(errorMessages.LAST_NAME_REQUIRED)
    .min(minNameLength, errorMessages.NAME_LENGTH)
    .max(maxNameLength, errorMessages.NAME_LENGTH),
});
