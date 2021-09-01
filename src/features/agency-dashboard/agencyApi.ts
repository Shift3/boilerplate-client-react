import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Agency } from 'common/models';
import { RootState } from 'app/redux';
import { environment } from 'environment';

export interface CreateAgencyRequest {
  agencyName: string;
}

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

    createAgency: builder.mutation<Agency, CreateAgencyRequest>({
      query: (payload) => ({
        url: '/',
        method: 'POST',
        body: payload,
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

export const { useCreateAgencyMutation, useDeleteAgencyMutation, useGetAgenciesQuery } = agencyApi;
