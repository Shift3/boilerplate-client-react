import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ApiService } from '../apiService';
import { ApiMessage } from '../dtos/api-message';

describe('', () => {
  let axiosInstance: AxiosInstance;
  let apiService: ApiService;

  beforeAll(() => {
    axiosInstance = axios.create();
    apiService = new ApiService(axiosInstance);
  });

  it('should be defined', () => {
    expect(apiService).toBeDefined();
  });

  describe('response interceptor', () => {
    describe('on success', () => {
      it('should return response data', () => {
        const response: AxiosResponse<ApiMessage> = {
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
        };

        expect(axiosInstance.interceptors.response.handlers[0].fulfilled(response)).toEqual(response.data);
      });
    });

    describe('on error', () => {
      it('should return rejected Promise with error response data if error is axios error', () => {
        const error: AxiosError = {
          name: '',
          message: '',
          config: {},
          code: '',
          request: {},
          response: {
            data: {
              error: 'Bad Request',
              message: 'error response',
              statusCode: 400,
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
          isAxiosError: true,
          toJSON: () => ({}),
        };

        expect(axiosInstance.interceptors.response.handlers[0].rejected(error)).rejects.toEqual(error.response?.data);
      });

      // it('should return rejected promise with a 500 Internal Server Error message if error is not axios error', () => {
      //   const error: AxiosError = {
      //     name: '',
      //     message: '',
      //     config: {},
      //     code: '',
      //     request: {},
      //     response: {
      //       data: {
      //         message: 'error response',
      //       },
      //       status: 500,
      //       statusText: '',
      //       headers: {},
      //       config: {},
      //       request: {},
      //       then: jest.fn(),
      //       catch: jest.fn(),
      //       finally: jest.fn(),
      //       [Symbol.toStringTag]: '',
      //     },
      //     isAxiosError: false,
      //     toJSON: () => ({}),
      //   };

      //   expect(axiosInstance.interceptors.response.handlers[0].rejected(error)).rejects.toMatchObject({
      //     error: 'Internal Server Error',
      //     message: (error as Error).message,
      //     statusCode: 500,
      //   });
      // });
    });

    describe('get<T>', () => {
      it('should use HTTP GET as the request method', () => {
        const spy = jest.spyOn(axiosInstance, 'get').mockResolvedValueOnce(null);
        const endpoint = '/endpoint';
        apiService.get(endpoint);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('post<T, U>', () => {
      it('should use HTTP POST as the request method', () => {
        const spy = jest.spyOn(axiosInstance, 'post').mockResolvedValueOnce(null);
        const endpoint = '/endpoint';
        const payload = {};
        apiService.post(endpoint, payload);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('put<T, U>', () => {
      it('should use HTTP PUT as the request method', () => {
        const spy = jest.spyOn(axiosInstance, 'put').mockResolvedValueOnce(null);
        const endpoint = '/endpoint';
        const payload = {};
        apiService.put(endpoint, payload);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('delete<T>', () => {
      it('should use HTTP DELETE as the request method', () => {
        const spy = jest.spyOn(axiosInstance, 'delete').mockResolvedValueOnce(null);
        const endpoint = '/endpoint';
        apiService.delete(endpoint);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
