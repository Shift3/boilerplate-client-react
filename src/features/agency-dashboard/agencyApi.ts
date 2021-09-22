import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Agency } from 'common/models';
import { RootState } from 'app/redux';
import { environment } from 'environment';

export const agencyApi = createApi({
  reducerPath: 'agencyApi',

  baseQuery: fetchBaseQuery({
    baseUrl: `${environment.apiRoute}/agencies`,

    prepareHeaders: (headers: Headers, { getState }) => {
      const token = (getState() as RootState).auth.session?.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ['Agency'],

  endpoints: (builder) => ({
    getAgencies: builder.query<Agency[], void>({
      query: () => ({ url: '/' }),
      providesTags: ['Agency'],
    }),

    getAgencyById: builder.query<Agency, number | string>({
      query: (id) => `/${id}`,
      providesTags: ['Agency'],
    }),

    createAgency: builder.mutation<Agency, Pick<Agency, 'agencyName'>>({
      query: (payload) => ({
        url: '/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Agency'],
    }),

    updateAgency: builder.mutation<Agency, Pick<Agency, 'id' | 'agencyName'>>({
      query: ({ id, agencyName }) => ({
        url: `${id}`,
        method: 'PUT',
        body: { agencyName },
      }),
      invalidatesTags: ['Agency'],
    }),

    deleteAgency: builder.mutation<void, number>({
      query: (agencyId) => ({
        url: `/${agencyId}`,
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
