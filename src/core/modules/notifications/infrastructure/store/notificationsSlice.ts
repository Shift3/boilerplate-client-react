import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { INotification } from 'core/modules/notifications/domain/notification';
import { RootState } from 'app/redux';

const notificationAdapter = createEntityAdapter<INotification>();

const notificationSelectors = notificationAdapter.getSelectors<RootState>((state) => state.notifications);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationAdapter.getInitialState(),
  reducers: {
    addOne: notificationAdapter.addOne,
    removeById: notificationAdapter.removeOne,
  },
});

export default notificationsSlice;

export const selectNotifications = (state: RootState): INotification[] => notificationSelectors.selectAll(state);
