import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'core/modules/auth/infrastructure/store/authSlice';
import notificationsSlice from 'core/modules/notifications/infrastructure/store/notificationsSlice';
import { userApi } from 'services/userApi';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notifications: notificationsSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
