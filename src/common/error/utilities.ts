import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { FieldError, MultipleFieldErrors } from 'react-hook-form';
import { ErrorIndexType, ErrorResponse } from '../models';

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return (error as FetchBaseQueryError).data !== undefined;
};

export const isErrorResponse = (data: string | unknown | undefined): data is ErrorResponse => {
  return (data as ErrorResponse).error !== undefined;
};

export const isErrorAString = (error: ErrorIndexType | string): error is string => {
  return typeof error === 'string';
};

export const addServerErrors = <T>(errors: { [P in keyof T]?: string[] } | string, setError: any): void => {
  if (typeof errors !== 'string') {
    Object.keys(errors).forEach(key => {
      setError(key, {
        type: 'server',
        message: errors[key as keyof T]!.join('. '),
      });
    });
  }

  if (typeof errors === 'string') {
    for (let i = 0; i < errors.length; i + 1) {
      if (errors[i] as keyof T) {
        setError(errors[i], {
          type: 'server',
          message: errors[i],
        });
      }
    }
  }
};

export const getServerError = (error: unknown): ErrorIndexType | string => {
  let errorData: ErrorResponse;

  if (isFetchBaseQueryError(error)) {
    if (isErrorResponse(error?.data)) {
      errorData = error?.data;

      if (!isErrorAString(errorData.error)) {
        return errorData.error;
      }

      return errorData.message;
    }
  }

  return 'error is not a FetchBaseQueryError';
};
