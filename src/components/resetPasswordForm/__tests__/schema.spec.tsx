/* eslint-disable max-len */
/* eslint-disable space-before-function-paren */
/* eslint-disable computed-property-spacing */
/* eslint-disable no-undef */
import * as yup from 'yup';
import { ResetPasswordFormSchema, errorMessages } from '../schema';

const {
  FIELD_REQUIRED,
  PASSWORD_LENGTH,
  PASSWORD_MUST_MISMATCH,
  PASSWORD_MUST_MATCH,
  PASSWORD_LOWERCASE,
  PASSWORD_UPPERCASE,
  PASSWORD_SPECIAL_CHARACTER,
  PASSWORD_NUMBER,
} = errorMessages;

const validCurrentPassword = 'Password123!';
const validNewPassword = 'Password456!';
const mismatchPassword = 'Password123';
const shortPassword = 'test';
const missingLowerCasePassword = 'PASSWORD123!';
const missingUpperCasePassword = 'password123!';
const missingSpecialCharPassword = 'Password123';
const missingNumberPassword = 'Password!';

const mockFormData = {
  currentPassword: validCurrentPassword,
  newPassword: validNewPassword,
  confirmPassword: validNewPassword,
};

const errorMessageCheck = async (field: string, value: string, message: string) =>
  expect(
    await yup
      .reach(ResetPasswordFormSchema, field)
      .validate(value)
      .catch((err: yup.ValidationError) => err.message),
  ).toEqual(message);

const errorMessageConfirmCheck = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockFormData: Record<string, any>,
  field: string,
  mismatch: string,
  message: string,
) =>
  expect(
    await ResetPasswordFormSchema.validate({ ...mockFormData, [field]: mismatch }).catch((err) => {
      return err.message;
    }),
  ).toEqual(message);

describe('loginFormSchema', () => {
  describe('Valid input data', () => {
    it('Should pass validation', () => expect(ResetPasswordFormSchema.isValidSync(mockFormData)).toBeTruthy());
  });

  describe('Current Password', () => {
    it('Should throw validation error with FIELD_REQUIRED message if empty', async () => {
      await errorMessageCheck('currentPassword', '', FIELD_REQUIRED);
    });
  });

  describe('New Password', () => {
    it('Should throw validation error with FIELD_REQUIRED message if empty', async () => {
      await errorMessageCheck('newPassword', '', FIELD_REQUIRED);
    });

    it('Should throw validation error with PASSWORD_LENGTH message if password is shorter than 8 characters', async () => {
      await errorMessageCheck('newPassword', shortPassword, PASSWORD_LENGTH);
    });

    it('Should throw validation error with PASSWORD_LOWERCASE message if it does not contain at least one lowercase letter', async () => {
      await errorMessageCheck('newPassword', missingLowerCasePassword, PASSWORD_LOWERCASE);
    });

    it('Should throw validation error with PASSWORD_UPPERCASE message if it does not contain at least one uppercase letter', async () => {
      await errorMessageCheck('newPassword', missingUpperCasePassword, PASSWORD_UPPERCASE);
    });

    it('Should throw validation error with PASSWORD_SPECIAL_CHARACTER message it does not contain at least one special character', async () => {
      await errorMessageCheck('newPassword', missingSpecialCharPassword, PASSWORD_SPECIAL_CHARACTER);
    });

    it('Should throw validation error with PASSWORD_NUMBER message if it does not contain at least on number', async () => {
      await errorMessageCheck('newPassword', missingNumberPassword, PASSWORD_NUMBER);
    });

    // Todo: Refactor in next PR with new Yup method
    it('Should throw validation error with PASSWORD_MUST_MISMATCHMATCH message if new password matches current password', async () => {
      const formData = {
        currentPassword: validNewPassword,
        newPassword: validNewPassword,
        confirmPassword: validNewPassword,
      };
      await errorMessageConfirmCheck(formData, 'confirmPassword', mismatchPassword, PASSWORD_MUST_MATCH);
    });
  });

  describe('ConfirmPassword', () => {
    it('Should throw validation error with FIELD_REQUIRED message if empty', async () => {
      const formData = { currentPassword: validCurrentPassword, newPassword: '', confirmPassword: '' };
      await errorMessageConfirmCheck(formData, 'confirmPassword', '', FIELD_REQUIRED);
    });

    it('Should throw validation error with PASSWORD_MUST_MISMATCH message if confirm password does not match new password', async () => {
      const formData = {
        currentPassword: validCurrentPassword,
        newPassword: validNewPassword,
        confirmPassword: '',
      };
      await errorMessageConfirmCheck(formData, 'confirmPassword', mismatchPassword, PASSWORD_MUST_MISMATCH);
    });
  });
});
