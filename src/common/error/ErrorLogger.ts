// Used this approach in order to add a static method to an interface. Link: https://stackoverflow.com/a/66947291/2651247

import { ErrorInfo } from 'react';

class _ErrorLogger {
  static logError: (error: Error, errorInfo: ErrorInfo) => void;
}

export type ErrorLogger = typeof _ErrorLogger;
