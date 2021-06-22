/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/no-inferrable-types */

// React imports
import { useCallback } from 'react';

// App imports
import { useAppDispatch } from 'core/redux';
import { Notification, NotificationType } from '../domain/notification';
import notificationsSlice from '../infrastructure/store/notificationsSlice';

export interface IShowNotificationInteractor {
  showSuccessNotification: (message: string, autoDismiss?: boolean, dismissAfterMillis?: number) => void;
  showErrorNotification: (message: string, autoDismiss?: boolean, dismissAfterMillis?: number) => void;
  showWarningNotification: (message: string, autoDismiss?: boolean, dismissAfterMillis?: number) => void;
  showInfoNotification: (message: string, autoDismiss?: boolean, dismissAfterMillis?: number) => void;
}

export const useShowNotification = (): IShowNotificationInteractor => {
  const dispatch = useAppDispatch();

  const showNotification = useCallback(
    (message: string, type: NotificationType, autoDismiss: boolean = true, dismissAfterMillis: number = 5000) => {
      const notification = new Notification(message, type);
      dispatch(notificationsSlice.actions.addOne(notification.toPlainObject()));

      if (autoDismiss) {
        setTimeout(() => dispatch(notificationsSlice.actions.removeById(notification.id)), dismissAfterMillis);
      }
    },
    [dispatch],
  );

  const showSuccessNotification = useCallback(
    (message: string, autoDismiss: boolean = true, dismissAfterMillis: number = 5000) =>
      showNotification(message, NotificationType.Success, autoDismiss, dismissAfterMillis),
    [showNotification],
  );

  const showErrorNotification = useCallback(
    (message: string, autoDismiss: boolean = true, dismissAfterMillis: number = 5000) =>
      showNotification(message, NotificationType.Error, autoDismiss, dismissAfterMillis),
    [showNotification],
  );

  const showWarningNotification = useCallback(
    (message: string, autoDismiss: boolean = true, dismissAfterMillis: number = 5000) =>
      showNotification(message, NotificationType.Warning, autoDismiss, dismissAfterMillis),
    [showNotification],
  );

  const showInfoNotification = useCallback(
    (message: string, autoDismiss: boolean = true, dismissAfterMillis: number = 5000) =>
      showNotification(message, NotificationType.Info, autoDismiss, dismissAfterMillis),
    [showNotification],
  );

  return {
    showSuccessNotification,
    showErrorNotification,
    showWarningNotification,
    showInfoNotification,
  };
};
