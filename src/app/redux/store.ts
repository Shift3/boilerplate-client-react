import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'core/modules/auth/infrastructure/store/authSlice';
import notificationsSlice from 'core/modules/notifications/infrastructure/store/notificationsSlice';
import { agencyApi } from 'features/agency-dashboard';
import { userApi } from 'features/user-dashboard/userApi';
import { agentApi } from '../../features/agent-dashboard/agentApi';
import { roleApi } from '../../features/user-dashboard/roleApi';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notifications: notificationsSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [agencyApi.reducerPath]: agencyApi.reducer,
    [agentApi.reducerPath]: agentApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, agencyApi.middleware, agentApi.middleware, roleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
