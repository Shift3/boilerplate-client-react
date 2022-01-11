import { createApi } from '@reduxjs/toolkit/query/react';
import { Agent } from 'common/models/agent';
import { customBaseQuery } from './customBaseQuery';
import { PagedResult, PageableQueryParams } from './paginate';

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

  baseQuery: customBaseQuery,

  // Always refetch data, don't used cache.
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,

  tagTypes: ['Agent'],

  endpoints: builder => ({
    getAgents: builder.query<PagedResult<Agent>, PageableQueryParams>({
      query: ({ page, pageSize }) => ({ url: `/agents&page=${page}&pageSize=${pageSize}` }),
      providesTags: ['Agent'],
    }),

    getAgentById: builder.query<Agent, number | string>({
      query: id => ({ url: `/agents/${id}` }),
      providesTags: ['Agent'],
    }),

    createAgent: builder.mutation<Agent, CreateAgentRequest>({
      query: payload => ({
        url: '/agents',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Agent'],
    }),

    updateAgent: builder.mutation<Agent, UpdateAgentRequest>({
      query: ({ id, ...agentUpdate }) => ({
        url: `/agents/${id}`,
        method: 'PUT',
        body: agentUpdate,
      }),
      invalidatesTags: ['Agent'],
    }),

    deleteAgent: builder.mutation<void, number>({
      query: agentId => ({
        url: `/agents/${agentId}`,
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
