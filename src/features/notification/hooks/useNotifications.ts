import { NotificationsContextType, NotificationsContext } from 'app/App';
import { useContext } from 'react';

export const useNotifications = (): NotificationsContextType => {
  return useContext(NotificationsContext);
};
