import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ErrorResponse } from 'common/models';
import * as notificationService from 'common/services/notification';
import { StatusCodes } from 'http-status-codes';

export const handleApiError = (error: FetchBaseQueryError): void => {
  let message: string;

  switch (error.status) {
    // An HTTP error response was received from the server.
    // Each HTTP error can be handled separately if different logic is needed.
    case StatusCodes.BAD_REQUEST:
    case StatusCodes.UNAUTHORIZED:
    case StatusCodes.FORBIDDEN:
    case StatusCodes.INTERNAL_SERVER_ERROR:
      message = (error.data as ErrorResponse).message;
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
