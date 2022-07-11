import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { agentApi } from 'common/api/agentApi';
import { authApi } from 'common/api/authApi';
import { userApi } from 'common/api/userApi';
import { authSlice } from 'features/auth/authSlice';
import { confirmationModalSlice } from 'features/confirmation-modal/slice';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createAppStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
  configureStore({
    reducer: {
      auth: authSlice.reducer,
      confirmationModal: confirmationModalSlice.reducer,
      [agentApi.reducerPath]: agentApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },

    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(agentApi.middleware, authApi.middleware, userApi.middleware),

    ...options,
  });

export const store = createAppStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
