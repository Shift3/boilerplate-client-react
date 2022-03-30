export type ServerValidationErrors<T> = {
  [key in keyof T]?: string[];
};
