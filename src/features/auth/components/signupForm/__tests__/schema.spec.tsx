import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { SignUpFormSchema } from '../schema';

const { EMAIL_REQUIRED, INVALID_EMAIL, EMAIL_MATCH, FIRST_NAME_REQUIRED, LAST_NAME_REQUIRED } = Constants.errorMessages;

describe('SignUpFormSchema', () => {
  const validEmail = 'test@test.com';
  const invalidEmail = 'test.com';
  const mismatchEmail = 'test@tets.com';
  const validName = 'test';

  const formData = {
    email: validEmail,
    confirmEmail: validEmail,
    firstName: validName,
    lastName: validName,
  };

  const errorMessageCheck = async (field: string, value: string, message: string) =>
    expect(
      await yup
        .reach(SignUpFormSchema, field)
        .validate(value)
        .catch((err: yup.ValidationError) => err.message),
    ).toEqual(message);

  const errorMessageConfirmCheck = async (
    formData: Record<string, any>,
    field: string,
    mismatch: string,
    message: string,
  ) =>
    expect(await SignUpFormSchema.validate({ ...formData, [field]: mismatch }).catch((err) => err.message)).toEqual(
      message,
    );

  describe('Valid input data', () => {
    it('Should pass validation', () => expect(SignUpFormSchema.isValidSync(formData)).toBeTruthy());
  });

  describe('Email', () => {
    it('Should throw validation error with EMAIL_REQUIRED message if empty', () => {
      errorMessageCheck('email', '', EMAIL_REQUIRED);
    });

    it('Should throw validation error with INVALID_EMAIL message if not a valid email address', () => {
      errorMessageCheck('email', invalidEmail, INVALID_EMAIL);
    });
  });

  describe('Confirm Email', () => {
    it('Should throw validation error with EMAIL_REQUIRED message if empty', () => {
      errorMessageConfirmCheck({ ...formData, email: '' }, 'confirmEmail', '', EMAIL_REQUIRED);
    });

    it('Should throw validation error with EMAIL_MATCH message if it does not match email', () => {
      errorMessageConfirmCheck(formData, 'confirmEmail', mismatchEmail, EMAIL_MATCH);
    });
  });

  describe('First Name', () => {
    it('Should throw validation error with FIRST_NAME_REQUIRED message if empty', () =>
      errorMessageCheck('firstName', '', FIRST_NAME_REQUIRED));
    it('Should throw validation error with FIRST_NAME_REQUIRED if only contains white space', () =>
      errorMessageCheck('firstName', '  ', FIRST_NAME_REQUIRED));
  });

  describe('Last Name', () => {
    it('Should throw validation error with LAST_NAME_REQUIRED message if empty', () =>
      errorMessageCheck('lastName', '', LAST_NAME_REQUIRED));
    it('Should throw validation error with LAST_NAME_REQUIRED if only contains white space', () =>
      errorMessageCheck('firstName', '  ', FIRST_NAME_REQUIRED));
  });
});
