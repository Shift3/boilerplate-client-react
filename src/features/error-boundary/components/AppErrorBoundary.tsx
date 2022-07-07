import { ErrorBoundary as SentryErrorBoundary } from '@sentry/react';
import { FC, PropsWithChildren } from 'react';
import { ConsoleErrorBoundary } from './ConsoleErrorBoundary';

interface Environment {
  environment: string;
}

export const AppErrorBoundary: FC<PropsWithChildren<Environment>> = ({ environment, children }) => {
  return environment === 'production' ? (
    <SentryErrorBoundary>{children}</SentryErrorBoundary>
  ) : (
    <ConsoleErrorBoundary>{children}</ConsoleErrorBoundary>
  );
};
