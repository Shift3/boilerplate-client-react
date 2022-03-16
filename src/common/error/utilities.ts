import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ErrorIndexType, ErrorResponse } from "../models";

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return (error as FetchBaseQueryError).data !== undefined;
}

export const isErrorResponse = (data: string | unknown | undefined): data is ErrorResponse => {
    return (data as ErrorResponse).error !== undefined;
}

export const isErrorAString = (error: ErrorIndexType | string): error is string => {
    return typeof(error) === 'string';
}