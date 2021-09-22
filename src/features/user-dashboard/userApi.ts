import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'app/redux';
import { User } from 'common/models/user';
import { environment } from 'environment';

export type CreateUserRequest = Pick<User, 'email' | 'firstName' | 'lastName' | 'profilePicture' | 'role' | 'agency'>;
export type UpdateUserRequest = Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'profilePicture' | 'role'>;
export type ForgotPasswordRequest = Pick<User, 'email'>;
export type ResendActivationEmailRequest = Pick<User, 'id'>;

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

    getUserById: builder.query<User, number | string>({
      query: (id) => `/${id}`,
      providesTags: ['User'],
    }),

    createUser: builder.mutation<User, CreateUserRequest>({
      query: (payload) => ({
        url: '/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ id, ...payload }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation<void, number>({
      query: (userId) => ({
        url: `/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
      query: (payload) => ({
        url: '/forgot-password',
        method: 'POST',
        body: payload,
      }),
    }),

    resendActivationEmail: builder.mutation<void, ResendActivationEmailRequest>({
      query: ({ id }) => ({
        url: `/resend-activation-email/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useResendActivationEmailMutation,
} = userApi;
