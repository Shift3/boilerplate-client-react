import * as yup from 'yup';
import { Constants } from 'utils/constants';

const { errorMessages } = Constants;

export const LogInFormSchema = yup.object().shape({
  email: yup.string().required(errorMessages.EMAIL_REQUIRED).email(errorMessages.INVALID_EMAIL),
  password: yup.string().required(errorMessages.FIELD_REQUIRED),
});
