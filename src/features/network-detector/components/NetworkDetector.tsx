import { FC, PropsWithChildren, useEffect, useState } from 'react';
import * as notificationService from 'common/services/notification';

export const NetworkDetector: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [isDisconnected, setDisconnectedStatus] = useState(false);

  const handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
      const webPing = setInterval(() => {
        fetch('//google.com', {
          mode: 'no-cors',
        })
          .then(() => {
            setDisconnectedStatus(false);
            return clearInterval(webPing);
          })
          .catch(() => setDisconnectedStatus(true));
      }, 2000);
      return;
    }

    setDisconnectedStatus(true);
  };

  useEffect(() => {
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    if (isDisconnected) {
      notificationService.showEndlessErrorMessage('Internet Connection Lost');
    }

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, [isDisconnected]);

  return <>{children}</>;
};
