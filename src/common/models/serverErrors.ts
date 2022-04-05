export interface ErrorResponse<T> {
  error: ServerValidationErrors<T>;
  message: string;
  statusCode: number;
}

export type ServerValidationErrors<T> = {
  [key in keyof T]?: string[];
};
