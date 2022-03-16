import { ErrorIndexType } from ".";

export interface ErrorResponse {
  error: ErrorIndexType | string;
  message: string;
  statusCode: number;
}