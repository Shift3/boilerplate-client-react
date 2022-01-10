import { createApi } from '@reduxjs/toolkit/query/react';
import { Agency } from 'common/models';
import { customBaseQuery } from 'common/api/customBaseQuery';
import { PaginatedResult, PaginationParams } from './types';

export const agencyApi = createApi({
  reducerPath: 'agencyApi',

  baseQuery: customBaseQuery,

  // Always refetch data, don't used cache.
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,

  tagTypes: ['Agency'],

  endpoints: builder => ({
    getAgencies: builder.query<PaginatedResult<Agency>, PaginationParams>({
      query: ({ page, pageSize }) => ({ url: `/agencies?page=${page}&$pageSize=${pageSize}` }),
      providesTags: ['Agency'],
    }),

    getAgencyById: builder.query<Agency, number | string>({
      query: id => ({ url: `/agencies/${id}` }),
      providesTags: ['Agency'],
    }),

    createAgency: builder.mutation<Agency, Pick<Agency, 'agencyName'>>({
      query: payload => ({
        url: '/agencies',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Agency'],
    }),

    updateAgency: builder.mutation<Agency, Pick<Agency, 'id' | 'agencyName'>>({
      query: ({ id, agencyName }) => ({
        url: `/agencies/${id}`,
        method: 'PUT',
        body: { agencyName },
      }),
      invalidatesTags: ['Agency'],
    }),

    deleteAgency: builder.mutation<void, number>({
      query: agencyId => ({
        url: `/agencies/${agencyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Agency'],
    }),
  }),
});

export const {
  useCreateAgencyMutation,
  useGetAgencyByIdQuery,
  useDeleteAgencyMutation,
  useGetAgenciesQuery,
  useUpdateAgencyMutation,
} = agencyApi;
