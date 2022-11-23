import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { RootState } from 'app/redux';
import { environment } from 'environment';
import * as authLocalStorage from 'features/auth/authLocalStorage';
import { authSlice } from 'features/auth/authSlice';
import { StatusCodes } from 'http-status-codes';
import * as notificationService from 'common/services/notification';

const baseQuery = fetchBaseQuery({
  baseUrl: environment.apiRoute,
  prepareHeaders: (headers: Headers, { getState }) => {
    const { token } = (getState() as RootState).auth;
    const currentLanguage = localStorage.getItem('language');

    if (token) {
      headers.set('authorization', `Token ${token}`);
    }

    if (currentLanguage) {
      headers.set('accept-language', currentLanguage);
    }

    return headers;
  },
});

export const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === StatusCodes.UNAUTHORIZED || result.error.status === StatusCodes.FORBIDDEN)
  ) {
    try {
      const { token } = (api.getState() as RootState).auth;

      const response = await fetch(`${environment.apiRoute}/users/me`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (!response.ok) {
        throw response;
      }
    } catch (e) {
      notificationService.showErrorMessage('Your login has expired, please try logging in again.');
      api.dispatch(authSlice.actions.userLoggedOut());
      authLocalStorage.clearAuthState();
    }
  }

  return result;
};
