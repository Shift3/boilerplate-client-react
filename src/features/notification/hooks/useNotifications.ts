import { NotificationsContext } from 'app/App';
import { useContext } from 'react';

export const useNotifications = () => {
  return useContext(NotificationsContext);
};
