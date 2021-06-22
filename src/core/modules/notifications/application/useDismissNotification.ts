// React imports
import { useCallback } from 'react';

// App imports
import { useAppDispatch } from 'core/redux';
import notificationsSlice from '../infrastructure/store/notificationsSlice';

export interface IDismissNotificationInteractor {
  dismissNotification: (notificationId: number) => void;
}

export const useDismissNotification = (): IDismissNotificationInteractor => {
  const dispatch = useAppDispatch();

  const dismissNotification = useCallback(
    (notificationId: number) => dispatch(notificationsSlice.actions.removeById(notificationId)),
    [dispatch],
  );

  return {
    dismissNotification,
  };
};
