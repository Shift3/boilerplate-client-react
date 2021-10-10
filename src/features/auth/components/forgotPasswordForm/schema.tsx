import * as yup from 'yup';
import { Constants } from 'utils/constants';

const { EMAIL_REQUIRED, INVALID_EMAIL } = Constants.errorMessages;

export const ForgotPasswordFormSchema = yup.object().shape({
  email: yup.string().required(EMAIL_REQUIRED).email(INVALID_EMAIL),
});
