import { LoginFormSchema, errorMessages } from './schema';
import * as yup from 'yup';

describe('loginFormSchema', () => {
  const validEmail = 'test@test.com'
  const validPassword = 'password'

  describe('Valid input data', () => {
    it('Should pass validation', () => {
      expect(LoginFormSchema.isValidSync({ email: validEmail, password: validPassword })).toBeTruthy()
    })
  })

  describe('Email', () => {
    it('Should be required', () => {
      expect(yup.reach(LoginFormSchema, "email").validate('').catch((err: yup.ValidationError) => err.message)).toEqual(errorMessages.EMAIL_REQUIRED);
    })

    it('Should be of a valid email format', () => {
      expect(yup.reach(LoginFormSchema, "email").validate('email').catch((err: yup.ValidationError) => err.message)).toEqual(errorMessages.INVALID_EMAIL);
    })
  })

  describe('Password', () => {
    it('Should be required', () => {
      expect(yup.reach(LoginFormSchema, "password").validate('').catch((err: yup.ValidationError) => err.message)).toEqual(errorMessages.PASSWORD_REQUIRED);
    })
  })
})