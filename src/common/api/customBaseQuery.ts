import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { RootState } from 'app/redux';
import { environment } from 'environment';
import * as authLocalStorage from 'features/auth/authLocalStorage';
import { authSlice } from 'features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: environment.apiRoute,
  prepareHeaders: (headers: Headers, { getState }) => {
    const { token } = (getState() as RootState).auth;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
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

  // eslint-disable-next-line no-magic-numbers
  if (result.error && result.error.status === 401) {
    api.dispatch(authSlice.actions.userLoggedOut());
    authLocalStorage.clearAuthState();
  }

  return result;
};
