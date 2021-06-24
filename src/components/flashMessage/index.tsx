// React imports
import { FC } from 'react';

// Third-party imports
import Alert from 'react-bootstrap/Alert';

// App imports
import { FlashMessageContainer } from './styled';
import { INotification } from 'core/modules/notifications/domain/notification';
import { useNotificationState } from 'core/modules/notifications/application/useNotificationState';
import { useDismissNotification } from 'core/modules/notifications/application/useDismissNotification';

export const FlashMessage: FC = () => {
  const notifications: INotification[] = useNotificationState();
  const { dismissNotification } = useDismissNotification();

  return (
    <FlashMessageContainer data-testid='flashMessageContainer'>
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          variant={notification.type}
          dismissible
          onClose={() => dismissNotification(notification.id)}
        >
          {notification.message}
        </Alert>
      ))}
    </FlashMessageContainer>
  );
};
