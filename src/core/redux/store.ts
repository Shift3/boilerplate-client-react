import { configureStore } from '@reduxjs/toolkit';
import notificationsSlice from 'core/modules/notifications/infrastructure/store/notificationsSlice';

const store = configureStore({
  reducer: {
    notifications: notificationsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
