import * as yup from 'yup';
import { SetPasswordFormSchema, errorMessages } from '../schema';

const {
  PASSWORD_REQUIRED,
  PASSWORD_LENGTH,
  PASSWORD_MATCH,
  PASSWORD_LOWERCASE,
  PASSWORD_UPPERCASE,
  PASSWORD_SPECIAL_CHARACTER,
  PASSWORD_NUMBER,
} = errorMessages;

describe('loginFormSchema', () => {
  const validPassword = 'Password123!';
  const mismatchPassword = 'Password123';
  const blankPassword = '';
  const shortPassword = 'test';
  const missingLowerCasePassword = 'PASSWORD123!';
  const missingUpperCasePassword = 'password123!';
  const missingSpecialCharPassword = 'Password123';
  const missingNumberPassword = 'Password!';

  const formData = {
    password: validPassword,
    confirmPassword: validPassword,
  };

  const errorMessageCheck = async (field: string, value: string, message: string) =>
    expect(
      await yup
        .reach(SetPasswordFormSchema, field)
        .validate(value)
        .catch((err: yup.ValidationError) => err.message),
    ).toEqual(message);

  const errorMessageConfirmCheck = async (
    formData: Record<string, any>,
    field: string,
    mismatch: string,
    message: string,
  ) =>
    expect(
      await SetPasswordFormSchema.validate({ ...formData, [field]: mismatch }).catch((err) => err.message),
    ).toEqual(message);

  describe('Valid input data', () => {
    it('Should pass validation', () => expect(SetPasswordFormSchema.isValidSync(formData)).toBeTruthy());
  });

  describe('Password', () => {
    it('Should throw validation error with PASSWORD_REQUIRED message if empty', async () => {
      await errorMessageCheck('password', '', PASSWORD_REQUIRED);
    });

    it('Should throw validation error with PASSWORD_LENGTH message if password is shorter than 8 characters', async () => {
      await errorMessageCheck('password', shortPassword, PASSWORD_LENGTH);
    });

    it('Should throw validation error with PASSWORD_LOWERCASE message if it does not contain at least one lowercase letter', async () => {
      await errorMessageCheck('password', missingLowerCasePassword, PASSWORD_LOWERCASE);
    });

    it('Should throw validation error with PASSWORD_UPPERCASE message if it does not contain at least one uppercase letter', async () => {
      await errorMessageCheck('password', missingUpperCasePassword, PASSWORD_UPPERCASE);
    });

    it('Should throw validation error with PASSWORD_SPECIAL_CHARACTER message it does not contain at least one special character', async () => {
      await errorMessageCheck('password', missingSpecialCharPassword, PASSWORD_SPECIAL_CHARACTER);
    });

    it('Should throw validation error with PASSWORD_NUMBER message if it does not contain at least on number', async () => {
      await errorMessageCheck('password', missingNumberPassword, PASSWORD_NUMBER);
    });
  });

  describe('ConfirmPassword', () => {
    const updatedFormData = { password: '', confirmPassword: '' };
    it('Should throw validation error with PASSWORD_REQUIRED message if empty', async () => {
      await errorMessageConfirmCheck(updatedFormData, 'confirmPassword', blankPassword, PASSWORD_REQUIRED);
    });

    it('Should throw validation error with PASSWORD_MATCH message if it does not match password', async () => {
      await errorMessageConfirmCheck(formData, 'confirmPassword', mismatchPassword, PASSWORD_MATCH);
    });
  });
});
