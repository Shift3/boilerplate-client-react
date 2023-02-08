import { FieldValues, UseFormSetError } from 'react-hook-form';

export function isKeyOfObject<T extends object>(key: string | number | symbol, obj: T): key is keyof T {
  return key in obj;
}

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object';
};

export const isStringOrNumber = (value: unknown): value is string | number => {
  return typeof value === 'string' || typeof value === 'number';
};

export const isStringArray = (errorValues: unknown): errorValues is string[] => {
  if (Array.isArray(errorValues)) {
    let arrayOnlyContainsStrings = true;
    errorValues.forEach(item => {
      if (typeof item !== 'string') {
        arrayOnlyContainsStrings = false;
      }
    });
    return arrayOnlyContainsStrings;
  }

  return false;
};

export const addServerErrors = <T extends FieldValues>(
  errors: { [P in keyof T]?: string[] },
  setError: UseFormSetError<T>,
): void => {
  return Object.keys(errors).forEach(key => {
    setError(key as keyof UseFormSetError<T>, {
      type: 'server',
      message: errors[key as keyof T]!.join('. '),
    });
  });
};
