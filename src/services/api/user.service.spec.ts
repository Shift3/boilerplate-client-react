/**
 * @jest-environment node
 */

import axios, { AxiosInstance } from 'axios'
import { IUserDTO, ResetPasswordRequest, UserDTO } from '../../models/users'
import { ApiService } from './api.service'
import { IForgotPasswordRequest, IMessage, IResetPasswordRequest, UserService } from './user.service'

describe('UserService', () => {
  let axiosInstance: AxiosInstance
  let apiService: ApiService
  let userService: UserService

  const testEmail = 'test@email.com'
  const testPassword = 'Password123$'
  const forgotPasswordRequest: IForgotPasswordRequest = {
    email: testEmail,
  }
  const resetPasswordRequest: IResetPasswordRequest = {
    newPassword: testPassword,
    confirmPassword: testPassword,
  }
  const testUser: IUserDTO = new UserDTO({
    id: 1,
    email: 'test@test.com',
    firstName: 'Test',
    lastName: 'Tester',
    profilePicture: null,
    role: {
      id: 1,
      roleName: 'User',
    },
  })

  beforeAll(() => {
    axiosInstance = axios.create({ baseURL: 'http://localhost:3000' })
    apiService = new ApiService(axiosInstance)
    userService = new UserService(apiService)
  })

  it('should be created', () => {
    expect(userService).toBeTruthy()
  })

  describe('forgotPassword()', () => {
    it('should use POST as request method', () => {
      const spy = jest.spyOn(apiService, 'post').mockResolvedValueOnce(null)
      userService.forgotPassword(forgotPasswordRequest)
      expect(spy).toHaveBeenCalled()
    })

    describe('on success', () => {
      it('should return a status message', async () => {
        const expected: IMessage = {
          message: 'success',
        }
        jest.spyOn(apiService, 'post').mockResolvedValueOnce(expected)
        const actual = await userService.forgotPassword(forgotPasswordRequest)
        expect(actual).toEqual(expected)
      })
    })

    describe('on error', () => {
      it('should reject with status message', () => {
        const expected: IMessage = {
          message: ['email should not be empty'],
          statusCode: 400,
          error: 'Bad Request',
        }
        jest.spyOn(apiService, 'post').mockRejectedValueOnce(expected)
        expect(userService.forgotPassword(forgotPasswordRequest)).rejects.toEqual(expected)
      })
    })
  })

  describe('resetPassword()', () => {
    it('should use PUT as request method', async () => {
      const spy = jest.spyOn(apiService, 'put').mockResolvedValueOnce(null)
      await userService.resetPassword(resetPasswordRequest, '')
      expect(spy).toHaveBeenCalled()
    })

    describe('on success', () => {
      it('should return the requested user', async () => {
        const payload: IResetPasswordRequest = new ResetPasswordRequest()
        const token = ''
        const expected: IUserDTO = { ...testUser }
        jest.spyOn(apiService, 'put').mockResolvedValueOnce(expected)
        const actual = await userService.resetPassword(payload, token)
        expect(actual).toEqual(expected)
      })
    })

    describe('on error', () => {
      it('should reject with status message', async () => {
        const payload: IResetPasswordRequest = new ResetPasswordRequest()
        const token = ''
        const expected: IMessage = {
          message: 'Bad request',
        }
        jest.spyOn(apiService, 'put').mockRejectedValueOnce(expected)
        expect(userService.resetPassword(payload, token)).rejects.toEqual(expected)
      })
    })
  })
})
