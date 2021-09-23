import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { RootState } from 'app/redux';
import { User } from 'common/models';
import { environment } from 'environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Session {
  jwtToken: string;
  user: User;
}

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: fetchBaseQuery({
    baseUrl: `${environment.apiRoute}/auth`,

    prepareHeaders: (headers: Headers, { getState }) => {
      const token = (getState() as RootState).auth.session?.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation<Session, LoginRequest>({
      query: (payload) => ({
        url: '/login',
        method: 'POST',
        body: payload,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
    }),
  }),
});
