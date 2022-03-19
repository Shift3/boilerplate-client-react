import { UseFormSetError } from 'react-hook-form';

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object';
};

export const addServerErrors = <T>(errors: { [P in keyof T]?: string[] }, setError: UseFormSetError<T>): void => {
  return Object.keys(errors).forEach(key => {
    setError(key as keyof UseFormSetError<T>, {
      type: 'server',
      message: errors[key as keyof T]!.join('. '),
    });
  });
};
