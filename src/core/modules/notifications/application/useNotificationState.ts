// Third-party imports
import { useSelector } from 'react-redux';

// App imports
import { INotification } from '../domain/notification';
import { selectNotifications } from '../infrastructure/store/notificationsSlice';

/**
 * Custom hook to use/subscribe to the notification state. The returned value is reactive and automatically updates
 * whenever the notification state changes.
 */
export const useNotificationState = (): INotification[] => useSelector(selectNotifications);
