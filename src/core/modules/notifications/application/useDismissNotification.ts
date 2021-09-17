// React imports
import { useCallback } from 'react';

// App imports
import { useAppDispatch } from 'app/redux';
import notificationsSlice from '../infrastructure/store/notificationsSlice';

export interface IDismissNotificationFacade {
  /**
   * Dismiss (i.e. remove) a notification.
   *
   * @param {number} id - The id of the notification to be dismissed.
   */
  dismissNotification: (id: number) => void;
}

/**
 * Custom hook that returns an IDismissNotification Facade.
 */
export const useDismissNotification = (): IDismissNotificationFacade => {
  const dispatch = useAppDispatch();

  const dismissNotification = useCallback(
    (notificationId: number) => dispatch(notificationsSlice.actions.removeById(notificationId)),
    [dispatch],
  );

  return {
    dismissNotification,
  };
};
