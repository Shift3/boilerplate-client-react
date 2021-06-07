/* eslint-disable computed-property-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
import * as yup from 'yup';
import { SignUpFormSchema, errorMessages } from '../schema';

const {
  EMAIL_REQUIRED,
  INVALID_EMAIL,
  EMAIL_MATCH,
  FIRST_NAME_REQUIRED,
  LAST_NAME_REQUIRED,
  NAME_LENGTH,
} = errorMessages;

describe('SignupFormSchema', () => {
  const validEmail = 'test@test.com';
  const invalidEmail = 'test.com';
  const mismatchEmail = 'test@tets.com';
  const validName = 'test';
  const shortName = 't';
  const longName = 'thisisclearlywaytoolongandisnotavalidnamebecauseitiswelloverfiftycharacters';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    it('Should throw validation error with NAME_LENGTH message if shorter than 2 characters', () =>
      errorMessageCheck('firstName', shortName, NAME_LENGTH));
    it('Should throw validation error with NAME_LENGTH message if longer than 50 characters', () =>
      errorMessageCheck('firstName', longName, NAME_LENGTH));
  });

  describe('Last Name', () => {
    it('Should throw validation error with LAST_NAME_REQUIRED message if empty', () =>
      errorMessageCheck('lastName', '', LAST_NAME_REQUIRED));
    it('Should throw validation error with NAME_LENGTH message if shorter than 2 characters', () =>
      errorMessageCheck('lastName', shortName, NAME_LENGTH));
    it('Should throw validation error with NAME_LENGTH message if longer than 50 characters', () =>
      errorMessageCheck('lastName', longName, NAME_LENGTH));
  });
});
