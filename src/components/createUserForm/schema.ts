import * as yup from 'yup';
import { Constants } from '../../utils/constants';

const { errorMessages } = Constants;

export const CreateUserFormSchema = yup.object().shape({
  firstName: yup.string().trim().required(errorMessages.FIRST_NAME_REQUIRED),
  lastName: yup.string().trim().required(errorMessages.LAST_NAME_REQUIRED),
  email: yup.string().required(errorMessages.EMAIL_REQUIRED).email(errorMessages.INVALID_EMAIL),
  role: yup.string().required(errorMessages.ROLE_REQUIRED),
  angency: yup.string().required(errorMessages.AGENCY_REQUIRED),
});
