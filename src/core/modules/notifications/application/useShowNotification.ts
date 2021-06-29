// React imports
import { useCallback } from 'react';

// App imports
import { useAppDispatch } from 'core/redux';
import { Notification, NotificationType } from '../domain/notification';
import notificationsSlice from '../infrastructure/store/notificationsSlice';

export interface IShowNotificationFacade {
  /**
   * Show a success notification.
   *
   * @param {string} message - The text to be displayed inside the notification.
   * @param {boolean} autoDismiss - If true, the notification will automatically be dismissed after
   *                                `dismissAfterMillis` milliseconds. Default `true`.
   * @param {number} dismissAfterMillis - Number of milliseconds after which the notification will be dismissed if
   *                                      `autoDismiss` is true. Default 5000 ms.
   */
  showSuccessNotification: (message: string, autoDismiss?: boolean, dismissAfterMillis?: number) => void;

  /**
   * Show a error notification.
   *
   * @param {string} message - The text to be displayed inside the notification.
   * @param {boolean} autoDismiss - If true, the notification will automatically be dismissed after
   *                                `dismissAfterMillis` milliseconds. Default `true`.
   * @param {number} dismissAfterMillis - Number of milliseconds after which the notification will be dismissed if
   *                                      `autoDismiss` is true. Default 5000 ms.
   */
  showErrorNotification: (message: string, autoDismiss?: boolean, dismissAfterMillis?: number) => void;

  /**
   * Show a warning notification.
   *
   * @param {string} message - The text to be displayed inside the notification.
   * @param {boolean} autoDismiss - If true, the notification will automatically be dismissed after
   *                                `dismissAfterMillis` milliseconds. Default `true`.
   * @param {number} dismissAfterMillis - Number of milliseconds after which the notification will be dismissed if
   *                                      `autoDismiss` is true. Default 5000 ms.
   */
  showWarningNotification: (message: string, autoDismiss?: boolean, dismissAfterMillis?: number) => void;

  /**
   * Show a info notification.
   *
   * @param {string} message - The text to be displayed inside the notification.
   * @param {boolean} autoDismiss - If true, the notification will automatically be dismissed after
   *                                `dismissAfterMillis` milliseconds. Default `true`.
   * @param {number} dismissAfterMillis - Number of milliseconds after which the notification will be dismissed if
   *                                      `autoDismiss` is true. Default 5000 ms.
   */
  showInfoNotification: (message: string, autoDismiss?: boolean, dismissAfterMillis?: number) => void;
}

/**
 * Custom hook that returns an IShowNotificationFacade.
 */
export const useShowNotification = (): IShowNotificationFacade => {
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
