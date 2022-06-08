import { createApi } from '@reduxjs/toolkit/query/react';
import { FilterQueryParams, PaginatedResult, PaginationQueryParams, SearchTextParams } from 'common/models';
import { Agent } from 'common/models/agent';
import { SortingQueryParams } from 'common/models/sorting';
import { customBaseQuery } from './customBaseQuery';
import { QueryParamsBuilder } from './queryParamsBuilder';

export type CreateAgentRequest = Pick<
  Agent,
  'description' | 'email' | 'name' | 'phoneNumber' | 'thumbnail' | 'address'
>;

export type UpdateAgentRequest = Pick<
  Agent,
  'id' | 'description' | 'email' | 'name' | 'phoneNumber' | 'thumbnail' | 'address'
>;

export type GetAgentHistory = {
  id: string | undefined;
  page: number;
  pageSize: number;
};

export const agentApi = createApi({
  reducerPath: 'agentApi',

  baseQuery: customBaseQuery,

  // Always refetch data, don't used cache.
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,

  tagTypes: ['Agent'],

  endpoints: builder => ({
    getAgents: builder.query<
      PaginatedResult<Agent>,
      PaginationQueryParams & SortingQueryParams & FilterQueryParams & SearchTextParams
    >({
      query: ({ page = 1, pageSize = 10, sortBy, filters, searchText }) => {
        const queryParams = new QueryParamsBuilder()
          .setSearchParam(searchText)
          .setPaginationParams(page, pageSize)
          .setSortParam(sortBy)
          .setFilterParam(filters)
          .build();
        return { url: `/agents/?${queryParams}` };
      },
      providesTags: ['Agent'],
    }),

    getAgentById: builder.query<Agent, number | string>({
      query: id => ({ url: `/agents/${id}/` }),
      providesTags: ['Agent'],
    }),

    getAgentHistory: builder.query<PaginatedResult<unknown>, GetAgentHistory>({
      query: arg => {
        const queryParams = new QueryParamsBuilder().setPaginationParams(arg.page, arg.pageSize).build();
        return { url: `/agents/${arg.id}/change-history?${queryParams}` };
      },
    }),

    createAgent: builder.mutation<Agent, CreateAgentRequest>({
      query: payload => ({
        url: '/agents/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Agent'],
    }),

    updateAgent: builder.mutation<Agent, UpdateAgentRequest>({
      query: ({ id, ...agentUpdate }) => ({
        url: `/agents/${id}/`,
        method: 'PUT',
        body: agentUpdate,
      }),
      invalidatesTags: ['Agent'],
    }),

    deleteAgent: builder.mutation<void, number>({
      query: agentId => ({
        url: `/agents/${agentId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Agent'],
    }),
  }),
});

export const {
  useGetAgentsQuery,
  useGetAgentByIdQuery,
  useGetAgentHistoryQuery,
  useCreateAgentMutation,
  useUpdateAgentMutation,
  useDeleteAgentMutation,
} = agentApi;
