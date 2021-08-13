import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { environment } from 'environment';

const createAxiosInstance = (): AxiosInstance =>
  axios.create({
    baseURL: environment.apiRoute,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export interface IApiRequestConfig {
  headers?: Record<string, string>;
}

export interface IApiErrorResponse {
  error?: string;
  message: string;
  statusCode?: number;
}

export interface IApiService {
  get: <T>(endpoint: string, config?: IApiRequestConfig) => Promise<T>;
  post: <T, U>(endpoint: string, payload: U, config?: IApiRequestConfig) => Promise<T>;
  put: <T, U>(endpoint: string, payload: U, config?: IApiRequestConfig) => Promise<T>;
  delete: <T>(endpoint: string, config?: IApiRequestConfig) => Promise<T>;
}

export class ApiService implements IApiService {
  constructor(private axios: AxiosInstance = createAxiosInstance()) {
    // eslint-disable-next-line no-undefined
    this.axios.interceptors.response.use(undefined, this.onResponseRejected);
  }

  private onResponseRejected = (error: AxiosError<IApiErrorResponse>) => {
    // The request was made and the server responded with a 4xx or 5xx error.
    // In this case the response data is an ApiErrorResponse type.
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    // The request was made but no response was received.
    if (error.request) {
      const errorResponse: IApiErrorResponse = { message: 'Network error' };
      return Promise.reject(errorResponse);
    }
    // Something else happened in setting up the request that triggered an Error.
    const errorResponse: IApiErrorResponse = { message: 'Unable to make request' };
    return Promise.reject(errorResponse);
  };

  public async get<T>(endpoint: string, config?: IApiRequestConfig): Promise<T> {
    const requestConfig: AxiosRequestConfig = { ...config };
    const response = await this.axios.get<T>(endpoint, requestConfig);
    return response.data;
  }

  public async post<T, U>(endpoint: string, payload: U, config?: IApiRequestConfig): Promise<T> {
    const requestConfig: AxiosRequestConfig = { ...config };
    const response = await this.axios.post<T>(endpoint, payload, requestConfig);
    return response.data;
  }

  public async put<T, U>(endpoint: string, payload: U, config?: IApiRequestConfig): Promise<T> {
    const requestConfig: AxiosRequestConfig = { ...config };
    const response = await this.axios.put<T>(endpoint, payload, requestConfig);
    return response.data;
  }

  public async delete<T>(endpoint: string, config?: IApiRequestConfig): Promise<T> {
    const requestConfig: AxiosRequestConfig = { ...config };
    const response = await this.axios.delete<T>(endpoint, requestConfig);
    return response.data;
  }
}
