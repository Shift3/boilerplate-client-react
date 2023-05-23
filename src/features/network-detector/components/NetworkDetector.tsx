import { FC, PropsWithChildren } from 'react';
import { useNetworkDetection } from '../hooks/useNetworkConnection';

export const NetworkDetector: FC<PropsWithChildren<unknown>> = ({ children }) => {
  useNetworkDetection();

  return <>{children}</>;
};
