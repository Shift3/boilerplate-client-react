import { createApi } from '@reduxjs/toolkit/query/react';
import { FilterQueryParams, PaginatedResult, PaginationQueryParams, SearchTextParams, User } from 'common/models';
import { Farm } from 'common/models/farm';
import { HistoricalRecord } from 'common/models/historicalRecord';
import { SortingQueryParams } from 'common/models/sorting';
import { customBaseQuery } from './customBaseQuery';
import { QueryParamsBuilder } from './queryParamsBuilder';

export type CreateFarmRequest = Pick<
  Farm,
  | 'description'
  | 'email'
  | 'name'
  | 'phoneNumber'
  | 'thumbnail'
  | 'address1'
  | 'address2'
  | 'city'
  | 'state'
  | 'zipCode'
>;

export type UpdateFarmRequest = Pick<
  Farm,
  | 'id'
  | 'description'
  | 'email'
  | 'name'
  | 'phoneNumber'
  | 'thumbnail'
  | 'address1'
  | 'address2'
  | 'city'
  | 'state'
  | 'zipCode'
>;

export const farmApi = createApi({
  reducerPath: 'FarmApi',

  baseQuery: customBaseQuery,

  // Always refetch data, don't used cache.
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,

  tagTypes: ['Farm'],

  endpoints: builder => ({
    getFarms: builder.query<
      PaginatedResult<Farm>,
      PaginationQueryParams & SortingQueryParams & FilterQueryParams & SearchTextParams
    >({
      query: ({ page = 1, pageSize = 10, sortBy, filters, searchText }) => {
        const queryParams = new QueryParamsBuilder()
          .setSearchParam(searchText)
          .setPaginationParams(page, pageSize)
          .setSortParam(sortBy)
          .setFilterParam(filters)
          .build();
        return { url: `/Farms/?${queryParams}` };
      },
      providesTags: ['Farm'],
    }),

    getFarmById: builder.query<Farm, number | string>({
      query: id => ({ url: `/Farms/${id}/` }),
      providesTags: ['Farm'],
    }),

    getFarmHistory: builder.query<PaginatedResult<HistoricalRecord<User>>, string>({
      query: url => url,
    }),

    createFarm: builder.mutation<Farm, CreateFarmRequest>({
      query: payload => ({
        url: '/Farms/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Farm'],
    }),

    updateFarm: builder.mutation<Farm, UpdateFarmRequest>({
      query: ({ id, ...FarmUpdate }) => ({
        url: `/Farms/${id}/`,
        method: 'PUT',
        body: FarmUpdate,
      }),
      invalidatesTags: ['Farm'],
    }),

    deleteFarm: builder.mutation<void, number>({
      query: FarmId => ({
        url: `/Farms/${FarmId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Farm'],
    }),
  }),
});

export const {
  useGetFarmsQuery,
  useGetFarmByIdQuery,
  useGetFarmHistoryQuery,
  useCreateFarmMutation,
  useUpdateFarmMutation,
  useDeleteFarmMutation,
} = farmApi;
