import { ErrorInfo } from 'react';
import { ErrorLogger } from './ErrorLogger';

export const ConsoleLogger: ErrorLogger = class {
  static logError(error: Error, errorInfo: ErrorInfo) {
    /* eslint-disable no-console */
    console.log(error);
    console.log('ErrorInfo.componentStack:', errorInfo.componentStack);
    /* eslint-enable no-console */
  }
};
