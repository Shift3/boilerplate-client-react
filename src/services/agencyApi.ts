import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'core/redux';
import { environment } from 'environment';
import { Agency } from 'models/agency';

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

  endpoints: (builder) => ({
    getAgencies: builder.query<Agency[], void>({
      query: () => ({ url: '/' }),
    }),
  }),
});

export const { useGetAgenciesQuery } = agencyApi;
