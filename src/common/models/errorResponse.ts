import { ServerValidationErrors } from '.';

export interface ErrorResponse<T> {
  error: ServerValidationErrors<T>;
  message: string;
  statusCode: number;
}
