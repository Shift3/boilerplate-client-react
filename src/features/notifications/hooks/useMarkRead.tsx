import { useMarkReadMutation } from 'common/api/notificationApi';
import { AppNotification } from 'common/models/notifications';
import { useContext } from 'react';
import { NotificationContext } from '../context';

export const useMarkRead = () => {
  const { remove } = useContext(NotificationContext);
  const [markReadRequest, { isLoading }] = useMarkReadMutation();

  const markRead = async (notification: AppNotification) => {
    if (!notification.read) {
      await markReadRequest(notification.id).unwrap();
      remove(notification);
    }
  };

  return { markRead, isLoading };
};
