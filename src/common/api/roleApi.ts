import { createApi } from '@reduxjs/toolkit/query/react';
import { Role } from 'common/models';
import { customBaseQuery } from './customBaseQuery';

export const roleApi = createApi({
  reducerPath: 'roleApi',

  baseQuery: customBaseQuery,

  // Always refetch data, don't used cache.
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,

  tagTypes: ['Role'],

  endpoints: (builder) => ({
    getRoles: builder.query<Role[], void>({
      query: () => ({ url: '/roles' }),
      providesTags: ['Role'],
    }),
  }),
});

export const { useGetRolesQuery } = roleApi;
