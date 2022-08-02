import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './customBaseQuery';

export interface Price {
  id: string;
  unitAmount: number;
  current: string;
  type: string;
  recurring: {
    interval: string;
    intervalCount: number;
  };
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  metadata: {
    order: string;
  };
  prices: Price[];
}

export const paymentApi = createApi({
  reducerPath: 'paymentApi',

  baseQuery: customBaseQuery,

  // Always refetch data, don't used cache.
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,

  tagTypes: ['Payment'],

  endpoints: builder => ({
    getPlans: builder.query<Plan[], void>({
      query: () => '/plans/',
      providesTags: ['Payment'],
    }),

    getPlanById: builder.query<Plan, string>({
      query: id => ({ url: `/plans/${id}/` }),
      providesTags: ['Payment'],
    }),

    createSubscription: builder.mutation<{ clientSecret: string; subscription_id: string }, string>({
      query: priceId => ({
        url: '/subscriptions/',
        method: 'POST',
        body: { priceId },
      }),
    }),
  }),
});

export const { useGetPlansQuery, useGetPlanByIdQuery, useCreateSubscriptionMutation } = paymentApi;
