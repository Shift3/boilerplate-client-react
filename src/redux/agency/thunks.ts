import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notification, NotificationType } from 'core/modules/notifications/domain/notification';
import notificationsSlice from 'core/modules/notifications/infrastructure/store/notificationsSlice';
import { AppDispatch, RootState } from 'core/redux';
import { IAgency } from 'models/agency';
import { AgencyService } from 'services/agency.service';
import { IApiErrorResponse } from 'services/api.service';

export const fetchAll = createAsyncThunk<
  IAgency[],
  void,
  { state: RootState; dispatch: AppDispatch; rejectValue: IApiErrorResponse }
>('agencies/fetchApp', async (_, { getState, dispatch, rejectWithValue }) => {
  const { auth } = getState();
  const { session } = auth;
  const jwtToken = session?.token ?? '';
  try {
    return await new AgencyService().getAllAgencies(jwtToken);
  } catch (error) {
    const notification = new Notification(error.message, NotificationType.Error);
    dispatch(notificationsSlice.actions.addOne(notification.toPlainObject()));
    return rejectWithValue(error);
  }
});
