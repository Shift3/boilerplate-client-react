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

export interface PaymentMethod {
  id: string;
  type: string;
  isDefault: boolean;
  card: {
    last4: string;
    brand: string;
    expMonth: number;
    expYear: number;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  prices: Price[];
  metadata: object;
}

export interface Subscription {
  activeSubscription: {
    id: string;
    currentPeriodEnd: string;
    canceledAt: string;
    plan: {
      id: string;
      interval: SubscriptionInterval;
      amount: string;
      product: Product;
    };
  };

  paymentMethods: PaymentMethod[];

  billingHistory: [
    {
      amount: string;
      date: string;
      description: string;
    },
  ];
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
      query: () => '/payments/plans/',
      providesTags: ['Payment'],
    }),

    getPlanById: builder.query<Plan, string>({
      query: id => ({ url: `/payments/plans/${id}/` }),
      providesTags: ['Payment'],
    }),

    getMySubscription: builder.query<Subscription, void>({
      query: () => '/payments/subscriptions/',
    }),

    confirmSetupIntent: builder.query<{ status: string; id: string }, string>({
      query: (id: string) => `/payments/setup-intent/${id}/`,
    }),

    getSubscription: builder.query<{ status: string; id: string }, string>({
      query: (id: string) => `/payments/subscriptions/${id}/`,
    }),

    createSubscription: builder.mutation<{ clientSecret: string; subscriptionId: string }, string>({
      query: priceId => ({
        url: '/payments/subscriptions/',
        method: 'POST',
        body: { priceId },
      }),
    }),

    cancelActiveSubscription: builder.mutation<Subscription, void>({
      query: () => {
        return {
          url: `/payments/subscriptions/cancel/`,
          method: 'POST',
        };
      },
    }),

    reactivateSubscription: builder.mutation<Subscription, void>({
      query: () => {
        return {
          url: `/payments/subscriptions/reactivate/`,
          method: 'POST',
        };
      },
    }),

    addCardToWallet: builder.mutation<{ clientSecret: string; setupIntentId: string }, void>({
      query: () => ({
        url: '/payments/payment_methods/',
        method: 'POST',
      }),
    }),

    removeCardFromWallet: builder.mutation<void, string>({
      query: id => ({
        url: `/payments/payment_methods/${id}/`,
        method: 'DELETE',
      }),
    }),

    makeCardDefault: builder.mutation<void, string>({
      query: id => ({
        url: `/payments/payment_methods/${id}/make_default/`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetPlanByIdQuery,
  useCreateSubscriptionMutation,
  useGetMySubscriptionQuery,
  useGetSubscriptionQuery,
  useCancelActiveSubscriptionMutation,
  useReactivateSubscriptionMutation,
  useAddCardToWalletMutation,
  useRemoveCardFromWalletMutation,
  useMakeCardDefaultMutation,
  useConfirmSetupIntentQuery,
} = paymentApi;
