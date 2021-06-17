import * as yup from 'yup';
import { Constants } from '../../utils/constants';

const { errorMessages } = Constants;

export const SignUpFormSchema = yup.object().shape({
  email: yup.string().required(errorMessages.EMAIL_REQUIRED).email(errorMessages.INVALID_EMAIL),
  confirmEmail: yup
    .string()
    .trim()
    .required(errorMessages.EMAIL_REQUIRED)
    .oneOf([yup.ref('email'), null], errorMessages.EMAIL_MATCH),
  firstName: yup.string().trim().required(errorMessages.FIRST_NAME_REQUIRED),
  lastName: yup.string().trim().required(errorMessages.LAST_NAME_REQUIRED),
});