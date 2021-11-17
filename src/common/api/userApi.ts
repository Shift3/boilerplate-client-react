import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'common/api/customBaseQuery';
import { Session } from 'common/models';
import { User } from 'common/models/user';

export type CreateUserRequest = Pick<User, 'email' | 'firstName' | 'lastName' | 'profilePicture' | 'role' | 'agency'>;
export type UpdateUserRequest = Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'profilePicture' | 'role'>;
export type ForgotPasswordRequest = Pick<User, 'email'>;
export type ResendActivationEmailRequest = Pick<User, 'id'>;
export type ChangePasswordRequest = Pick<User, 'id'> & {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
export type SignUpRequest = Pick<User, 'email' | 'firstName' | 'lastName'>;
export type ActivateAccountRequest = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};
export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};
export type UpdateProfileRequest = Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'profilePicture'>;

export const userApi = createApi({
  reducerPath: 'userApi',

  baseQuery: customBaseQuery,

  // Always refetch data, don't used cache.
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,

  tagTypes: ['User'],

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({ url: '/users' }),
      providesTags: ['User'],
    }),

    getUserById: builder.query<User, number | string>({
      query: (id) => `/users/${id}`,
      providesTags: ['User'],
    }),

    createUser: builder.mutation<User, CreateUserRequest>({
      query: (payload) => ({
        url: '/users',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ id, ...payload }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation<void, number>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    changePassword: builder.mutation<Session, ChangePasswordRequest>({
      query: ({ id, ...payload }) => ({
        url: `/users/change-password/${id}`,
        method: 'PUT',
        body: payload,
      }),
    }),

    forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
      query: (payload) => ({
        url: '/users/forgot-password',
        method: 'POST',
        body: payload,
      }),
    }),

    signUp: builder.mutation<User, SignUpRequest>({
      query: (payload) => ({
        url: '/users/signup',
        method: 'POST',
        body: payload,
      }),
    }),

    activateAccount: builder.mutation<User, ActivateAccountRequest>({
      query: ({ token, ...payload }) => ({
        url: `/users/activate-account/${token}`,
        method: 'PUT',
        body: payload,
      }),
    }),

    resetPassword: builder.mutation<User, ResetPasswordRequest>({
      query: ({ token, ...payload }) => ({
        url: `/users/reset-password/${token}`,
        method: 'PUT',
        body: payload,
      }),
    }),

    updateProfile: builder.mutation<User, UpdateProfileRequest>({
      query: ({ id, ...payload }) => ({
        url: `/users/profile/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    resendActivationEmail: builder.mutation<void, ResendActivationEmailRequest>({
      query: ({ id }) => ({
        url: `/users/resend-activation-email/${id}`,
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
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useSignUpMutation,
  useActivateAccountMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useResendActivationEmailMutation,
} = userApi;
