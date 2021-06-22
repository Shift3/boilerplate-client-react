// Third-party imports
import { useSelector } from 'react-redux';

// App imports
import { INotification } from '../domain/notification';
import { notificationSelectors } from '../infrastructure/store/notificationsSlice';

export const useNotificationState = (): INotification[] => useSelector(notificationSelectors.selectAll);
