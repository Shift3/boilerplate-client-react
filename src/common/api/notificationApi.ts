import { createApi } from '@reduxjs/toolkit/query/react';
import { PaginatedResult } from 'common/models';
import { AppNotification } from 'common/models/notifications';
import { customBaseQuery } from './customBaseQuery';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: customBaseQuery,
  tagTypes: ['AppNotification'],

  endpoints: builder => ({
    getUnreadNotifications: builder.query<PaginatedResult<AppNotification>, string | null>({
      query: q => q || '/notifications/?read__isnull=true',
      providesTags: ['AppNotification'],
    }),

    getReadNotifications: builder.query<PaginatedResult<AppNotification>, string | null>({
      query: q => q || '/notifications/?read__isnull=false',
      providesTags: ['AppNotification'],
    }),

    getEventToken: builder.query<{ token: string }, void>({
      query: () => '/event-token/',
    }),

    markAllRead: builder.mutation<void, void>({
      query: () => ({
        url: '/notifications/mark_all_read/',
        method: 'POST',
      }),
    }),

    markRead: builder.mutation<void, number>({
      query: notificationId => ({
        url: `notifications/${notificationId}/mark_read/`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetUnreadNotificationsQuery,
  useGetReadNotificationsQuery,
  useMarkAllReadMutation,
  useGetEventTokenQuery,
  useMarkReadMutation,
} = notificationApi;
