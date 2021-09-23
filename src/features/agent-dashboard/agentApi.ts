import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'app/redux';
import { Agent } from 'common/models/agent';
import { environment } from 'environment';

export type CreateAgentRequest = Pick<
  Agent,
  'description' | 'email' | 'name' | 'phoneNumber' | 'thumbnail' | 'address'
>;

export type UpdateAgentRequest = Pick<
  Agent,
  'id' | 'description' | 'email' | 'name' | 'phoneNumber' | 'thumbnail' | 'address'
>;

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

    getAgentById: builder.query<Agent, number | string>({
      query: (id) => ({ url: `/${id}` }),
      providesTags: ['Agent'],
    }),

    createAgent: builder.mutation<Agent, CreateAgentRequest>({
      query: (payload) => ({
        url: '/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Agent'],
    }),

    updateAgent: builder.mutation<Agent, UpdateAgentRequest>({
      query: ({ id, ...agentUpdate }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: agentUpdate,
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

export const {
  useGetAgentsQuery,
  useGetAgentByIdQuery,
  useCreateAgentMutation,
  useUpdateAgentMutation,
  useDeleteAgentMutation,
} = agentApi;
