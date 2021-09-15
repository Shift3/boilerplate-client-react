import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'app/redux';
import { Role } from 'common/models';
import { environment } from 'environment';

export const roleApi = createApi({
  reducerPath: 'roleApi',

  baseQuery: fetchBaseQuery({
    baseUrl: `${environment.apiRoute}/roles`,

    prepareHeaders: (headers: Headers, { getState }) => {
      const token = (getState() as RootState).auth.session?.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ['Role'],

  endpoints: (builder) => ({
    getRoles: builder.query<Role[], void>({
      query: () => ({ url: '/' }),
      providesTags: ['Role'],
    }),
  })
});

export const { useGetRolesQuery } = roleApi;
