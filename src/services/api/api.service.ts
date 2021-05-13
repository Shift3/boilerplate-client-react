import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-explicit-any
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export class ApiService {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance?: AxiosInstance) {
    this.axiosInstance =
      axiosInstance ??
      axios.create({
        baseURL: 'http://localhost:3000',
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
      });

    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse) => res.data,
      (error: AxiosError) => Promise.reject(error.response?.data),
    );
  }

  public async post<T, U>(endpoint: string, payload: U, options?: { headers?: unknown; params?: unknown }): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: options?.headers,
      params: options?.params,
    };
    return this.axiosInstance.post<T>(endpoint, payload, config);
  }

  public async put<T, U>(endpoint: string, payload: U, options?: { headers?: unknown; params?: unknown }): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: options?.headers,
      params: options?.params,
    };
    return this.axiosInstance.put<T>(endpoint, payload, config);
  }
}
