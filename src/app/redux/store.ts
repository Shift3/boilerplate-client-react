import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { agentApi } from 'common/api/agentApi';
import { authApi } from 'common/api/authApi';
import { notificationApi } from 'common/api/notificationApi';
import { userApi } from 'common/api/userApi';
import { paymentApi } from 'common/api/paymentsApi';
import { environment } from 'environment';
import { authSlice } from 'features/auth/authSlice';

export const createAppStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
  configureStore({
    reducer: {
      auth: authSlice.reducer,
      [agentApi.reducerPath]: agentApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [notificationApi.reducerPath]: notificationApi.reducer,
      [paymentApi.reducerPath]: paymentApi.reducer,
    },

    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        agentApi.middleware,
        authApi.middleware,
        userApi.middleware,
        notificationApi.middleware,
        paymentApi.middleware,
      ),
    ...options,
    devTools: !environment.isProduction,
  });

export const store = createAppStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
