import { configureStore } from '@reduxjs/toolkit';
import notificationsSlice from 'core/modules/notifications/infrastructure/store/notificationsSlice';
import { agencyApi } from 'features/agency-dashboard';
import { agentApi } from 'features/agent-dashboard/agentApi';
import { authApi } from 'features/auth/authApi';
import { authSlice } from 'features/auth/authSlice';
import { roleApi } from 'features/user-dashboard/roleApi';
import { userApi } from 'features/user-dashboard/userApi';

const store = configureStore({
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
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
