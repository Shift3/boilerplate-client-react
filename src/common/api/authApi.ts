import { createApi } from '@reduxjs/toolkit/query/react';
import { Session } from 'common/models';
import { customBaseQuery } from './customBaseQuery';

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: customBaseQuery,

  // Always refetch data, don't used cache.
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    login: builder.mutation<Session, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
