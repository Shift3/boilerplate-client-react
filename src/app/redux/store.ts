import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'core/modules/auth/infrastructure/store/authSlice';
import notificationsSlice from 'core/modules/notifications/infrastructure/store/notificationsSlice';
import { agencyApi } from 'features/admin/agency';
import { userApi } from 'features/admin/user/usersApi';
import { agentApi } from '../../features/agent-dashboard/agentApi';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notifications: notificationsSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [agencyApi.reducerPath]: agencyApi.reducer,
    [agentApi.reducerPath]: agentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, agencyApi.middleware, agentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
