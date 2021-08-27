import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'app/redux';
import { User } from 'common/models/user';
import { environment } from 'environment';

export const userApi = createApi({
  reducerPath: 'userApi',

  baseQuery: fetchBaseQuery({
    baseUrl: `${environment.apiRoute}/users`,

    prepareHeaders: (headers: Headers, { getState }) => {
      const token = (getState() as RootState).auth.session?.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ['User'],

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({ url: '/' }),
      providesTags: ['User'],
    }),

    deleteUser: builder.mutation<void, number>({
      query: (userId) => ({
        url: `/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    // addUser
    // updateUser
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = userApi;