import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './customBaseQuery';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',

  baseQuery: customBaseQuery,

  // Always refetch data, don't used cache.
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,

  tagTypes: ['Notification'],

  endpoints: builder => ({
    getUnread: builder.query<unknown, void>({
      query: () => {
        return {
          url: `/notifications/?read__isnull=true`,
        };
      },
      providesTags: ['Notification'],
    }),

    getRead: builder.query<unknown, void>({
      query: () => {
        return {
          url: `/notifications/?read__isnull=false`,
        };
      },
      providesTags: ['Notification'],
    }),

    markRead: builder.mutation<void, number>({
      query: notificationId => ({
        url: `/notifications/${notificationId}/mark_read/`,
        method: 'POST',
      }),
      invalidatesTags: ['Notification'],
    }),

    markAllRead: builder.mutation<void, void>({
      query: () => ({
        url: '/notifications/mark_all_read/',
        method: 'POST',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const { useMarkReadMutation, useMarkAllReadMutation, useGetUnreadQuery, useGetReadQuery } = notificationApi;
