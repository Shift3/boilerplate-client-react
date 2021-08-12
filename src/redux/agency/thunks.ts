import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notification, NotificationType } from 'core/modules/notifications/domain/notification';
import notificationsSlice from 'core/modules/notifications/infrastructure/store/notificationsSlice';
import { AppDispatch, RootState } from 'core/redux';
import { Agency } from 'models/agency.model';
import { AgencyService } from 'services/agency.service';
import { ApiErrorResponse } from 'services/api.service';

export const fetchAll = createAsyncThunk<
  Agency[],
  void,
  { state: RootState; dispatch: AppDispatch; rejectValue: ApiErrorResponse }
>('agencies/fetchApp', async (_, { getState, dispatch, rejectWithValue }) => {
  const { auth } = getState();
  const { session } = auth;
  const jwtToken = session?.token ?? '';
  try {
    return await new AgencyService().getAllAgencies(jwtToken);
  } catch (error) {
    const notifiation = new Notification(error.message, NotificationType.Error);
    dispatch(notificationsSlice.actions.addOne(notifiation.toPlainObject()));
    return rejectWithValue(error);
  }
});
