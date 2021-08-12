import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { environment } from 'environment';
import { ApiMessage } from './dtos/api-message';

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export class ApiService {
  private readonly axios: AxiosInstance;

  constructor(axiosInstance?: AxiosInstance) {
    this.axios =
      axiosInstance ??
      axios.create({
        baseURL: environment.apiRoute,
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
      });

    this.axios.interceptors.response.use(
      (res: AxiosResponse) => res,
      (err: AxiosError | Error) => {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            // The server responded with a 4xx/5xx error.
            const message: ApiMessage = err.response.data;
            return Promise.reject(message);
          }
          if (err.request) {
            // The browser was able to make a request, but didn't receive response.
            throw new Error(err.message);
          }
        }
        // Anything else. Not an axios error, likely error with the app.
        throw err;
      },
    );
  }

  public async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: options?.headers,
      params: options?.params,
    };
    return (await this.axios.get<T>(endpoint, config)).data;
  }

  public async post<T, U>(endpoint: string, payload: U, options?: RequestOptions): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: options?.headers,
      params: options?.params,
    };
    return (await this.axios.post<T>(endpoint, payload, config)).data;
  }

  public async put<T, U>(endpoint: string, payload: U, options?: RequestOptions): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: options?.headers,
      params: options?.params,
    };
    return (await this.axios.put<T>(endpoint, payload, config)).data;
  }

  public async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: options?.headers,
      params: options?.params,
    };
    return (await this.axios.delete<T>(endpoint, config)).data;
  }
}
