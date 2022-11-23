import * as NotificationComponents from '../components';
import { AppNotification } from 'common/models/notifications';

export const renderNotification = (notification: AppNotification) => {
  // Dynamic dispatch.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = (NotificationComponents as any)[notification.type];
  // eslint-disable-next-line no-console
  console.assert(
    Component,
    `Could not find notification display component ${notification.type} in notifications/components.tsx\nMake sure to define a handler in that file`,
  );
  if (!Component) {
    // No component for type found.
    return <></>;
  }
  return <Component notification={notification} />;
};
