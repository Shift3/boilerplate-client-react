import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'app/redux';
import { Agent } from 'common/models/agent';
import { environment } from 'environment';

export const agentApi = createApi({
  reducerPath: 'agentApi',

  baseQuery: fetchBaseQuery({
    baseUrl: `${environment.apiRoute}/agents`,
    prepareHeaders: (headers: Headers, { getState }) => {
      const token = (getState() as RootState).auth.session?.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAgents: builder.query<Agent[], void>({
      query: () => ({ url: '/' }),
    })
  })
});

export const { useGetAgentsQuery } = agentApi;