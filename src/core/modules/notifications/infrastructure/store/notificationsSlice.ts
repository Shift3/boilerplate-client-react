import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { INotification } from 'core/modules/notifications/domain/notification';
import { RootState } from 'core/redux';

const notificationAdapter = createEntityAdapter<INotification>();

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationAdapter.getInitialState(),
  reducers: {
    addOne: notificationAdapter.addOne,
    removeById: notificationAdapter.removeOne,
  },
});

export default notificationsSlice;

export const notificationSelectors = notificationAdapter.getSelectors<RootState>((state) => state.notifications);
