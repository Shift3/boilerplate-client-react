import { useMarkReadMutation } from 'common/api/notificationApi';
import { AppNotification } from 'common/models/notifications';
import { useContext } from 'react';
import { UnreadNotificationsContext } from '../unreadContext';

export const useMarkRead = () => {
  const { remove } = useContext(UnreadNotificationsContext);
  const [markReadRequest, { isLoading }] = useMarkReadMutation();

  const markRead = async (notification: AppNotification) => {
    if (!notification.read) {
      await markReadRequest(notification.id).unwrap();
      remove(notification);
    }
  };

  return { markRead, isLoading };
};
