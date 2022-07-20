import { ErrorBoundary as SentryErrorBoundary } from '@sentry/react';
import { environment } from 'environment';
import { FC, PropsWithChildren } from 'react';
import { ConsoleErrorBoundary } from './ConsoleErrorBoundary';

export const AppErrorBoundary: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return environment.isProduction ? (
    <SentryErrorBoundary>{children}</SentryErrorBoundary>
  ) : (
    <ConsoleErrorBoundary>{children}</ConsoleErrorBoundary>
  );
};
