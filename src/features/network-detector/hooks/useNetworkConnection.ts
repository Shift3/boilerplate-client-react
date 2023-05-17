import { useState, useRef, useEffect } from 'react';
import * as notificationService from 'common/services/notification';

export const getRandomNumber = () => {
  return new Date().valueOf().toString();
};

export const useNetworkDetection = () => {
  const [isDisconnected, setDisconnectedStatus] = useState(false);
  const prevDisconnectionStatus = useRef(false);

  const handleConnectionChange = () => {
    setDisconnectedStatus(!navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    if (isDisconnected) {
      notificationService.showErrorMessage('Internet Connection Lost', getRandomNumber());
    } else if (prevDisconnectionStatus.current) {
      notificationService.showSuccessMessage('Internet Connection Restored', getRandomNumber());
    }

    prevDisconnectionStatus.current = isDisconnected;

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, [isDisconnected]);

  return { isDisconnected };
};
