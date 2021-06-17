/* eslint-disable max-len */
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { ChangePasswordFormSchema } from '../schema';

const {
  CURRENT_PASSWORD_REQUIRED,
  NEW_PASSWORD_REQUIRED,
  CONFIRM_PASSWORD_REQUIRED,
  PASSWORD_LENGTH,
  PASSWORD_MUST_MISMATCH,
  PASSWORD_MUST_MATCH,
  PASSWORD_LOWERCASE,
  PASSWORD_UPPERCASE,
  PASSWORD_SPECIAL_CHARACTER,
  PASSWORD_NUMBER,
} = Constants.errorMessages;

const validCurrentPassword = 'Password123!';
const validNewPassword = 'Password456!';
const mismatchPassword = 'Password321!';
const shortPassword = 'Passw1!';
const missingLowerCasePassword = 'PASSWORD123!';
const missingUpperCasePassword = 'password123!';
const missingSpecialCharPassword = 'Password123';
const missingNumberPassword = 'Password!';

const mockValidFormData = {
  currentPassword: validCurrentPassword,
  newPassword: validNewPassword,
  confirmPassword: validNewPassword,
};

const errorMessageCheck = async (field: string, value: string, message: string) =>
  expect(
    await yup
      .reach(ChangePasswordFormSchema, field)
      .validate(value)
      .catch((err: yup.ValidationError) => err.message),
  ).toEqual(message);

const errorMessageConfirmCheck = async (formData: Record<string, unknown>, message: string) =>
  expect(
    await ChangePasswordFormSchema.validate(formData).catch((err) => {
      return err.message;
    }),
  ).toEqual(message);

describe('ChangePasswordSchema', () => {
  describe('Valid input data', () => {
    it('Should pass validation', () => expect(ChangePasswordFormSchema.isValidSync(mockValidFormData)).toBeTruthy());
  });

  describe('Current Password', () => {
    it('Should throw validation error with CURRENT_PASSWORD_REQUIRED message if empty', async () => {
      await errorMessageCheck('currentPassword', '', CURRENT_PASSWORD_REQUIRED);
    });
  });

  describe('New Password', () => {
    it('Should throw validation error with NEW_PASSWORD_REQUIRED message if empty', async () => {
      await errorMessageCheck('newPassword', '', NEW_PASSWORD_REQUIRED);
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

    it('Should throw validation error with PASSWORD_MUST_MISMATCH message if new password matches current password', async () => {
      const formData = {
        currentPassword: validCurrentPassword,
        newPassword: validCurrentPassword,
        confirmPassword: validCurrentPassword,
      };
      await errorMessageConfirmCheck(formData, PASSWORD_MUST_MISMATCH);
    });
  });

  describe('ConfirmPassword', () => {
    it('Should throw validation error with CONFIRM_PASSWORD_REQUIRED, message if empty', async () => {
      const formData = { currentPassword: validCurrentPassword, newPassword: '', confirmPassword: '' };
      await errorMessageConfirmCheck(formData, CONFIRM_PASSWORD_REQUIRED);
    });

    it('Should throw validation error with PASSWORD_MUST_MATCH message if confirm password does not match new password', async () => {
      const formData = {
        currentPassword: validCurrentPassword,
        newPassword: validNewPassword,
        confirmPassword: mismatchPassword,
      };
      await errorMessageConfirmCheck(formData, PASSWORD_MUST_MATCH);
    });
  });
});
