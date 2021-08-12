import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'core/modules/auth/infrastructure/store/authSlice';
import notificationsSlice from 'core/modules/notifications/infrastructure/store/notificationsSlice';
import agencySlice from 'redux/agency/slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notifications: notificationsSlice.reducer,
    agencies: agencySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
