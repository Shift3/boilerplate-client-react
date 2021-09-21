// React imports
import { FC } from 'react';

// Third-party imports
import Alert from 'react-bootstrap/Alert';

// App imports
import { FlashMessageContainer } from './styled';
import { INotification, NotificationType } from 'core/modules/notifications/domain/notification';
import { useNotificationState } from 'core/modules/notifications/application/useNotificationState';
import { useDismissNotification } from 'core/modules/notifications/application/useDismissNotification';

const mapNotificationTypeToAlertVariant = {
  [NotificationType.Success]: 'success',
  [NotificationType.Error]: 'danger',
  [NotificationType.Warning]: 'warning',
  [NotificationType.Info]: 'info',
};

export const FlashMessage: FC = () => {
  const notifications: INotification[] = useNotificationState();
  const { dismissNotification } = useDismissNotification();

  return (
    <div className='position-relative'>
      <FlashMessageContainer
        className='position-absolute top-0 start-50 translate-middle-x'
        data-testid='flashMessageContainer'>
        {notifications.map((notification) => (
          <Alert
            key={notification.id}
            variant={mapNotificationTypeToAlertVariant[notification.type]}
            dismissible
            onClose={() => dismissNotification(notification.id)}
          >
            {notification.message}
          </Alert>
        ))}
      </FlashMessageContainer>
    </div>
  );
};
