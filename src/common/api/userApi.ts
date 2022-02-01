import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'common/api/customBaseQuery';
import { PaginatedResult, PaginationQueryParams, Session } from 'common/models';
import { User } from 'common/models/user';

export type ActivateAccountRequest = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};
export type ChangePasswordRequest = Pick<User, 'id'> & {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
export type ConfirmChangeEmailRequest = {
  token: string;
  verificationCode: number;
};
export type CreateUserRequest = Pick<User, 'email' | 'firstName' | 'lastName' | 'profilePicture' | 'role' | 'agency'>;
export type ForgotPasswordRequest = Pick<User, 'email'>;
export type ForgotPasswordResponse = { message: string };
export type ResendActivationEmailRequest = Pick<User, 'id'>;
export type ResendChangeEmailVerificationEmailRequest = Pick<User, 'id'>;
export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};
export type SignUpRequest = Pick<User, 'email' | 'firstName' | 'lastName'>;
export type UpdateProfileRequest = Pick<User, 'id' | 'firstName' | 'lastName' | 'profilePicture'>;
export type UpdateUserRequest = Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'profilePicture' | 'role'>;
export type UserChangeEmailRequest = Pick<User, 'id' | 'email'>;

export const userApi = createApi({
  reducerPath: 'userApi',

  baseQuery: customBaseQuery,

  // Always refetch data, don't used cache.
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,

  tagTypes: ['User'],

  endpoints: builder => ({
    getUsers: builder.query<PaginatedResult<User>, PaginationQueryParams>({
      query: ({ page, pageSize }) => ({ url: `/users?page=${page}&pageSize=${pageSize}` }),
      providesTags: ['User'],
    }),

    getUserById: builder.query<User, number | string>({
      query: id => `/users/${id}`,
      providesTags: ['User'],
    }),

    createUser: builder.mutation<User, CreateUserRequest>({
      query: payload => ({
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
      query: userId => ({
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

    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: payload => ({
        url: '/users/forgot-password',
        method: 'POST',
        body: payload,
      }),
    }),

    signUp: builder.mutation<User, SignUpRequest>({
      query: payload => ({
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

    requestChangeEmail: builder.mutation<User, UserChangeEmailRequest>({
      query: ({ id, ...payload }) => ({
        url: `/users/request-change-email/${id}`,
        method: `PUT`,
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

    resendChangeEmailVerificationEmail: builder.mutation<void, ResendChangeEmailVerificationEmailRequest>({
      query: ({ id }) => ({
        url: `/users/resend-change-email-verification-email/${id}`,
        method: 'GET',
      }),
    }),

    confirmChangeEmail: builder.mutation<User, ConfirmChangeEmailRequest>({
      query: ({ token, ...payload }) => ({
        url: `/users/confirm-change-email/${token}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useActivateAccountMutation,
  useChangePasswordMutation,
  useConfirmChangeEmailMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useRequestChangeEmailMutation,
  useResendActivationEmailMutation,
  useResendChangeEmailVerificationEmailMutation,
  useResetPasswordMutation,
  useSignUpMutation,
  useUpdateProfileMutation,
  useUpdateUserMutation,
} = userApi;
