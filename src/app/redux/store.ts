import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import notificationsSlice from 'core/modules/notifications/infrastructure/store/notificationsSlice';
import { authApi } from 'features/auth/authApi';
import { authSlice } from 'features/auth/authSlice';
import { roleApi } from 'features/user-dashboard/roleApi';
import { userApi } from 'features/user-dashboard/userApi';
import { agencyApi } from 'common/api/agencyApi';
import { agentApi } from 'common/api/agentApi';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createAppStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
  configureStore({
    reducer: {
      auth: authSlice.reducer,
      notifications: notificationsSlice.reducer,
      [agencyApi.reducerPath]: agencyApi.reducer,
      [agentApi.reducerPath]: agentApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [roleApi.reducerPath]: roleApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        agencyApi.middleware,
        agentApi.middleware,
        authApi.middleware,
        roleApi.middleware,
        userApi.middleware,
      ),

    ...options,
  });

export const store = createAppStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
