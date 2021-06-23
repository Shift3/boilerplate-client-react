import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { environment } from 'environment';
import { Message } from 'models/message';
// import { IMessage } from 'models/message';

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
        if (axios.isAxiosError(err)) {
          if (err.response) {
            // The server responded with a 4xx/5xx error.
            return Promise.reject(new Message(err.response.data));
          }
          if (err.request) {
            // The browser was able to make a request, but didn't receive response.
            return Promise.reject(new Message({ message: err.message }));
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
