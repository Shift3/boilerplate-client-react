import { FC } from 'react';
import Alert from 'react-bootstrap/Alert';
import { INotification, NotificationType } from 'core/modules/notifications/domain/notification';
import { useNotificationState } from 'core/modules/notifications/application/useNotificationState';
import { useDismissNotification } from 'core/modules/notifications/application/useDismissNotification';
import styled from 'styled-components';

const FlashMessageContainer = styled.div``;

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
    <FlashMessageContainer data-testid='flashMessageContainer'>
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
  );
};
