import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'common/api/customBaseQuery';
import { FilterQueryParams, PaginatedResult, PaginationQueryParams, SearchTextParams, Session } from 'common/models';
import { SortingQueryParams } from 'common/models/sorting';
import { User } from 'common/models/user';
import { QueryParamsBuilder } from './queryParamsBuilder';

export type ActivateAccountRequest = {
  uid: string;
  token: string;
  password: string;
  passwordConfirmation: string;
};
export type ChangePasswordRequest = Pick<User, 'id'> & {
  currentPassword: string;
  newPassword: string;
};
export type ConfirmChangeEmailRequest = {
  token: string;
  uid: string;
};
export type CreateUserRequest = Pick<User, 'email' | 'firstName' | 'lastName' | 'role'>;
export type ForgotPasswordRequest = Pick<User, 'email'>;
export type ForgotPasswordResponse = { message: string };
export type ResendActivationEmailRequest = Pick<User, 'email'>;
export type ResendChangeEmailVerificationEmailRequest = Pick<User, 'id'>;
export type ResetPasswordRequest = {
  uid: string;
  token: string;
  newPassword: string;
};
export type SignUpRequest = Pick<User, 'email' | 'firstName' | 'lastName'>;
export type UpdateProfileRequest = Pick<User, 'firstName' | 'lastName'>;
export type UpdateUserRequest = Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'role'>;
export type UserChangeEmailRequest = Pick<User, 'id' | 'email'>;
export type UpdateProfilePictureRequest = {
  id: string;
  // FormData is associated with HTMLFormElement and not with the form component schema.
  profilePicture: FormData;
};
export type DeleteProfilePictureRequest = Pick<User, 'id'>;

export const userApi = createApi({
  reducerPath: 'userApi',

  baseQuery: customBaseQuery,

  // Always refetch data, don't used cache.
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,

  tagTypes: ['User'],

  endpoints: builder => ({
    getUsers: builder.query<
      PaginatedResult<User>,
      PaginationQueryParams & SortingQueryParams & FilterQueryParams & SearchTextParams
    >({
      query: ({ page, pageSize, sortBy, filters, searchText }) => {
        const queryParams = new QueryParamsBuilder()
          .setSearchParam(searchText)
          .setPaginationParams(page, pageSize)
          .setSortParam(sortBy)
          .setFilterParam(filters)
          .build();
        return { url: `/users/?${queryParams}` };
      },
      providesTags: ['User'],
    }),

    getUserById: builder.query<User, string>({
      query: id => `/users/${id}/`,
      providesTags: ['User'],
    }),

    inviteUser: builder.mutation<User, CreateUserRequest>({
      query: payload => ({
        url: '/users/invitation/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ id, ...payload }) => ({
        url: `/users/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation<void, string>({
      query: userId => ({
        url: `/users/${userId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    changePassword: builder.mutation<Session, ChangePasswordRequest>({
      query: ({ ...payload }) => ({
        url: `/users/set_password/`,
        method: 'POST',
        body: payload,
      }),
    }),

    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: payload => ({
        url: `/users/reset_password/`,
        method: 'POST',
        body: payload,
      }),
    }),

    signUp: builder.mutation<User, SignUpRequest>({
      query: payload => ({
        url: '/users/',
        method: 'POST',
        body: payload,
      }),
    }),

    getMe: builder.query<User, void>({
      query: () => '/users/me/',
    }),

    activateAccount: builder.mutation<User, ActivateAccountRequest>({
      query: payload => ({
        url: `/users/activation/`,
        method: 'POST',
        body: payload,
      }),
    }),

    resetPassword: builder.mutation<User, ResetPasswordRequest>({
      query: payload => ({
        url: `/users/reset_password_confirm/`,
        method: 'POST',
        body: payload,
      }),
    }),

    updateProfile: builder.mutation<User, UpdateProfileRequest>({
      query: ({ ...payload }) => ({
        url: `/users/me/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    requestChangeEmail: builder.mutation<User, UserChangeEmailRequest>({
      query: ({ ...payload }) => ({
        url: `/users/change_email_request/`,
        method: `POST`,
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    resendActivationEmail: builder.mutation<void, ResendActivationEmailRequest>({
      query: ({ email }) => ({
        url: `/users/resend_activation/`,
        method: 'POST',
        body: { email },
      }),
    }),

    resendChangeEmailVerificationEmail: builder.mutation<void, ResendChangeEmailVerificationEmailRequest>({
      query: ({ id }) => ({
        url: `/users/${id}/resend_change_email_request_email/`,
        method: 'POST',
      }),
    }),

    confirmChangeEmail: builder.mutation<User, ConfirmChangeEmailRequest>({
      query: payload => ({
        url: `/users/confirm_change_email/`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    updateProfilePicture: builder.mutation<User, UpdateProfilePictureRequest>({
      query: ({ id, profilePicture }) => ({
        url: `/users/${id}/profile_picture/`,
        method: 'POST',
        body: profilePicture,
      }),
      invalidatesTags: ['User'],
    }),

    deleteProfilePicture: builder.mutation<User, DeleteProfilePictureRequest>({
      query: ({ id }) => ({
        url: `/users/${id}/profile_picture/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useActivateAccountMutation,
  useChangePasswordMutation,
  useConfirmChangeEmailMutation,
  useInviteUserMutation,
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
  useUpdateProfilePictureMutation,
  useDeleteProfilePictureMutation,
} = userApi;
