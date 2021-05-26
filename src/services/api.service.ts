import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { environment } from 'environment';
import { IMessage } from 'models/message';

declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-explicit-any
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

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
      (res: AxiosResponse) => res.data,
      (err: AxiosError | Error) => {
        let message: IMessage;

        if (axios.isAxiosError(err)) {
          message = err.response?.data;
        } else {
          message = {
            error: 'Internal Server Error',
            message: err.message,
            statusCode: 500,
          };
        }

        return Promise.reject(message);
      },
    );
  }

  public async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: options?.headers,
      params: options?.params,
    };
    return this.axios.get<T>(endpoint, config);
  }

  public async post<T, U>(endpoint: string, payload: U, options?: RequestOptions): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: options?.headers,
      params: options?.params,
    };
    return this.axios.post<T>(endpoint, payload, config);
  }

  public async put<T, U>(endpoint: string, payload: U, options?: RequestOptions): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: options?.headers,
      params: options?.params,
    };
    return this.axios.put<T>(endpoint, payload, config);
  }

  public async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: options?.headers,
      params: options?.params,
    };
    return this.axios.delete<T>(endpoint, config);
  }
}
