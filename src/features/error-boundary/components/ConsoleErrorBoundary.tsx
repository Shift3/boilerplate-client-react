import { ConsoleLogger } from 'common/error/ConsoleLogger';
import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

/* eslint-disable react/destructuring-assignment */
export class ConsoleErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    ConsoleLogger.logError(error, errorInfo);
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1 data-testid='console-errorboundary'>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
