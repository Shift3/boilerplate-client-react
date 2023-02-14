import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import * as notificationService from 'common/services/notification';

export const getConnectionStatus = () => {
  return navigator.onLine;
}

export const getRandomNumber = () => {
  return new Date().valueOf().toString();
};

export const NetworkDetector: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [isDisconnected, setDisconnectedStatus] = useState(false);
  const prevDisconnectionStatus = useRef(false);

  const handleConnectionChange = () => {
    setDisconnectedStatus(!getConnectionStatus());
  };

  useEffect(() => {
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    if (isDisconnected) {
      notificationService.showErrorMessage('Internet Connection Lost', getRandomNumber());
      notificationService.showEndlessErrorMessage('You are offline. Any agents that you create will be synced with the server when your connection is restored.');
    } else if (prevDisconnectionStatus.current) {
      notificationService.showSuccessMessage('Internet Connection Restored', getRandomNumber());
    }

    prevDisconnectionStatus.current = isDisconnected;

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, [isDisconnected]);

  return <>{children}</>;
};
