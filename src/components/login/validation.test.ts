import { ILoginFormData } from './interfaces'
import { loginFormSchema } from './validation'

describe('loginFormSchema', () => {
  const validUsername = 'test@email.com'
  const validPassword = 'password'

  const testValidInput: ILoginFormData = {
    username: validUsername,
    password: validPassword,
  }

  const testMissingUsername: Partial<ILoginFormData> = {
    username: undefined,
    password: validPassword,
  }

  const testEmptyUsername: ILoginFormData = {
    username: '',
    password: validPassword,
  }

  const testInvalidUsernameFormat: ILoginFormData = {
    username: 'username',
    password: validPassword,
  }

  const testMissingPassword: Partial<ILoginFormData> = {
    username: validUsername,
    password: undefined,
  }

  const testEmptyPassword: ILoginFormData = {
    username: validUsername,
    password: '',
  }

  test('should pass validation', () => {
    expect(loginFormSchema.isValidSync(testValidInput)).toBeTruthy()
  })

  describe('username', () => {
    test('should be required', () => {
      expect(loginFormSchema.isValidSync(testMissingUsername)).toBeFalsy()
    })

    test('should not be an empty string', () => {
      expect(loginFormSchema.isValidSync(testEmptyUsername)).toBeFalsy()
    })

    test('should be of a valid email format', () => {
      expect(loginFormSchema.isValidSync(testInvalidUsernameFormat)).toBeFalsy()
    })
  })

  describe('password', () => {
    test('should be required', () => {
      expect(loginFormSchema.isValidSync(testMissingPassword)).toBeFalsy()
    })

    test('should not be an empty string', () => {
      expect(loginFormSchema.isValidSync(testEmptyPassword)).toBeFalsy()
    })
  })
})
