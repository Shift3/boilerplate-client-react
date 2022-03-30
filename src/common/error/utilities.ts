import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { UseFormSetError } from 'react-hook-form';
import { ErrorIndexType, ErrorResponse } from '../models';

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return (error as FetchBaseQueryError).data !== undefined;
};

export const isErrorResponse = <T>(data: unknown): data is ErrorResponse<T> => {
  return (data as ErrorResponse<T>).error !== undefined;
};

export const isErrorAString = (error: ErrorIndexType | string): error is string => {
  return typeof error === 'string';
};

export const addServerErrors = <T>(errors: { [P in keyof T]?: string[] }, setError: UseFormSetError<T>) => {
  return Object.keys(errors).forEach(key => {
    setError(key as keyof UseFormSetError<T>, {
      type: 'server',
      message: errors[key as keyof T]!.join('. '),
    });
  });
};
