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

  tagTypes: ['Agent'],

  endpoints: (builder) => ({
    getAgents: builder.query<Agent[], void>({
      query: () => ({ url: '/' }),
      providesTags: ['Agent'],
    }),

    createAgent: builder.mutation<
      Agent,
      Pick<Agent, 'name' | 'email' | 'description' | 'phoneNumber' | 'address' | 'thumbnail'>
    >({
      query: (payload) => ({
        url: '/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Agent'],
    }),

    deleteAgent: builder.mutation<void, number>({
      query: (agentId) => ({
        url: `/${agentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Agent'],
    }),
  }),
});

export const { useGetAgentsQuery, useCreateAgentMutation, useDeleteAgentMutation } = agentApi;
