import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { UseFormSetError } from 'react-hook-form';
import { ErrorResponse } from '../models';

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return (error as FetchBaseQueryError).data !== undefined;
};

export const isErrorResponse = <T>(data: unknown): data is ErrorResponse<T> => {
  return (data as ErrorResponse<T>).error !== undefined;
};

export const addServerErrors = <T>(errors: { [P in keyof T]?: string[] }, setError: UseFormSetError<T>): void => {
  return Object.keys(errors).forEach(key => {
    setError(key as keyof UseFormSetError<T>, {
      type: 'server',
      message: errors[key as keyof T]!.join('. '),
    });
  });
};
