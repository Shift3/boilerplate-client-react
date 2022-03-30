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

export const addServerErrors = <T>(
  errors: { [P in keyof T]?: string[] } | string,
  setError: (...args: any[]) => void,
  possibleFields?: string[],
): void => {
  if (typeof errors !== 'string') {
    Object.keys(errors).forEach(key => {
      setError(key, {
        type: 'server',
        message: errors[key as keyof T]!.join('. '),
      });
    });
  }

  if (typeof errors === 'string' && possibleFields) {
    errors.split(' ').forEach(word => {
      if (possibleFields.includes(word)) {
        setError(word, {
          type: 'server',
          message: errors,
        });
      }
    });
  }
};

export const identifyAndRetrieveServerError = (error: FetchBaseQueryError): ErrorIndexType | string | null => {
  let errorData: ErrorResponse;

  if (isErrorResponse(error?.data)) {
    errorData = error?.data;

    if (!isErrorAString(errorData.error)) {
      return errorData.error;
    }

    return errorData.message;
  }

  return null;
};
