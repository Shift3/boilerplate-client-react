import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { isObject, isStringArray } from 'common/error/utilities';
import * as notificationService from 'common/services/notification';
import { StatusCodes } from 'http-status-codes';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export const handleApiError = (error: FetchBaseQueryError): void => {
  let message = '';

  switch (error.status) {
    /* eslint-disable */
    // An HTTP error response was received from the server.
    // Each HTTP error can be handled separately if different logic is needed.
    case StatusCodes.BAD_REQUEST:

    case StatusCodes.UNAUTHORIZED:

    case StatusCodes.FORBIDDEN:

    case StatusCodes.INTERNAL_SERVER_ERROR:
      /* eslint-enable */
      if (isObject(error.data)) {
        if (isStringArray(error.data.nonFieldErrors)) {
          message = error.data.nonFieldErrors.join(' ');
        }
      }
      break;

    // An error occured during the execution of the fetch function.
    // No response received from the server.
    case 'FETCH_ERROR':
      if (navigator.onLine) {
        message = 'Connection to servers is not available.';
      } else {
        message = 'No Internet Connection.';
      }
      break;

    // All other cases.
    default:
      message = 'Unable to complete request.';
  }

  notificationService.showErrorMessage(message);
};
