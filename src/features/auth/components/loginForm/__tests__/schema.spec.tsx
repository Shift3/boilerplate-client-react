import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { LogInFormSchema } from '../schema';

const { EMAIL_REQUIRED, INVALID_EMAIL, PASSWORD_REQUIRED } = Constants.errorMessages;

describe('LoginFormSchema', () => {
  const validEmail = 'test@test.com';
  const invalidEmail = 'test.com';
  const validPassword = 'password';

  const formData = { email: validEmail, password: validPassword };

  const errorMessageCheck = async (field: string, value: string, message: string) =>
    expect(
      await yup
        .reach(LogInFormSchema, field)
        .validate(value)
        .catch((err: yup.ValidationError) => err.message),
    ).toEqual(message);

  describe('Valid input data', () => {
    it('Should pass validation', () => expect(LogInFormSchema.isValidSync(formData)).toBeTruthy());
  });

  describe('Email', () => {
    it('Should be required', async () => {
      await errorMessageCheck('email', '', EMAIL_REQUIRED);
    });
    it('Should be of a valid email format', async () => {
      await errorMessageCheck('email', invalidEmail, INVALID_EMAIL);
    });
  });

  describe('Password', () => {
    it('Should be required', async () => {
      await errorMessageCheck('password', '', PASSWORD_REQUIRED);
    });
  });
});
