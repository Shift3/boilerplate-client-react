import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import * as notificationService from 'common/services/notification';
import { useTranslation } from 'react-i18next';

export const NetworkDetector: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [isDisconnected, setDisconnectedStatus] = useState(false);
  const prevDisconnectionStatus = useRef(false);
  const { t } = useTranslation('common');

  const handleConnectionChange = () => {
    setDisconnectedStatus(!navigator.onLine);
  };

  const getRandomNumber = () => {
    return new Date().valueOf().toString();
  };

  useEffect(() => {
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    if (isDisconnected) {
      notificationService.showErrorMessage(t('internetConnectionLost'), getRandomNumber());
    } else if (prevDisconnectionStatus.current) {
      notificationService.showSuccessMessage(t('internetConnectionRestored'), getRandomNumber());
    }

    prevDisconnectionStatus.current = isDisconnected;

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, [isDisconnected, t]);

  return <>{children}</>;
};
