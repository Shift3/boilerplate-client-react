// import { ActivateAccountRequest } from './userApi';
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

type SubscriptionInterval = 'month' | 'year';

export interface Subscription {
  activeSubscription: {
    id: string;
    currentPeriodEnd: string;
    canceledAt: string;
    plan: {
      id: string;
      interval: SubscriptionInterval;
      amount: string;
      product: string;
    };
  };

  billingHistory: [
    {
      amount: string;
      date: string;
      description: string;
    },
  ];
}

export type CancelSubscriptionRequest = { id: string };

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

    getMySubscription: builder.query<Subscription, void>({
      query: () => '/subscriptions/active_subscription/',
    }),

    createSubscription: builder.mutation<{ clientSecret: string; subscription_id: string }, string>({
      query: priceId => ({
        url: '/subscriptions/',
        method: 'POST',
        body: { priceId },
      }),
    }),

    cancelActiveSubscription: builder.mutation<Subscription, CancelSubscriptionRequest>({
      query: () => {
        return {
          url: `/subscriptions/cancel/`,
          method: 'POST',
        };
      },
    }),

    reactivateSubscription: builder.mutation<Subscription>({
      query: () => {
        return {
          url: `/subscriptions/reactivate`,
          method: 'POST',
        };
      },
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetPlanByIdQuery,
  useCreateSubscriptionMutation,
  useGetMySubscriptionQuery,
  useCancelActiveSubscriptionMutation,
  useReactivateSubscriptionMutation,
} = paymentApi;
