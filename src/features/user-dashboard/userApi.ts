import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'app/redux';
import { User } from 'common/models/user';
import { environment } from 'environment';

export const userApi = createApi({
  reducerPath: 'userApi',

  baseQuery: fetchBaseQuery({
    baseUrl: `${environment.apiRoute}/users`,
    prepareHeaders: (headers: Headers, { getState }) => {
      // eslint-disable-next-line no-extra-parens
      const token = (getState() as RootState).auth.session?.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({ url: '/' }),
    })
    // addUser
    // deleteUser
    // updateUser
  })
});
// Auto-generated from Redux-toolkit
export const { useGetUsersQuery } = userApi;