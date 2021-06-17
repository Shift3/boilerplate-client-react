import * as yup from 'yup';
import { ForgotPasswordFormSchema } from '../schema';
import { Constants } from 'utils/constants';

const { EMAIL_REQUIRED } = Constants.errorMessages;

const validEmail = 'test@test.com';

const formData = {
  email: validEmail,
};

describe('ForgotPasswordFormSchema', () => {
  const errorMessageCheck = async (field: string, value: string, message: string) =>
    expect(
      await yup
        .reach(ForgotPasswordFormSchema, field)
        .validate(value)
        .catch((err: yup.ValidationError) => err.message),
    ).toEqual(message);

  describe('Valid input data', () => {
    it('Should pass validation', () => expect(ForgotPasswordFormSchema.isValidSync(formData)).toBeTruthy());
  });

  describe('Email', () => {
    it('Should throw validation error with EMAIL_REQUIRED message if empty', () => {
      errorMessageCheck('email', '', EMAIL_REQUIRED);
    });
  });
});
