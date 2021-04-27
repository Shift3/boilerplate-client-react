import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ApiService } from './api.service'

describe('ApiService', () => {
  let apiService: ApiService
  let axiosInstance: AxiosInstance

  beforeAll(() => {
    axiosInstance = axios.create()
    apiService = new ApiService(axiosInstance)
  })

  it('should be created', () => {
    expect(apiService).toBeTruthy()
  })

  describe('response interceptor', () => {
    describe('on success', () => {
      it('should return response data only', () => {
        const response: AxiosResponse = {
          data: {
            message: 'successful response',
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
          request: {},
          then: jest.fn(),
          catch: jest.fn(),
          finally: jest.fn(),
          [Symbol.toStringTag]: '',
        }

        expect(axiosInstance.interceptors.response.handlers[0].fulfilled(response)).toEqual(response.data)
      })
    })

    describe('on error', () => {
      it('should return error response data only', () => {
        const error: { response: AxiosResponse } = {
          response: {
            data: {
              message: 'request error',
            },
            status: 400,
            statusText: 'Bad Request',
            headers: {},
            config: {},
            request: {},
            then: jest.fn(),
            catch: jest.fn(),
            finally: jest.fn(),
            [Symbol.toStringTag]: '',
          },
        }

        expect(axiosInstance.interceptors.response.handlers[0].rejected(error)).rejects.toEqual(error.response.data)
      })
    })
  })

  describe('post<T, U>()', () => {
    it('should use HTTP POST as the request method', () => {
      const spy = jest.spyOn(axiosInstance, 'post').mockResolvedValueOnce(null)
      const endpoint = '/endpoint'
      const payload = {}

      apiService.post(endpoint, payload)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('put<T, U>()', () => {
    it('should use HTTP PUT as the request method', () => {
      const spy = jest.spyOn(axiosInstance, 'put').mockResolvedValueOnce(null)
      const endpoint = '/endpoint'
      const payload = {}

      apiService.put(endpoint, payload)
      expect(spy).toHaveBeenCalled()
    })
  })
})
