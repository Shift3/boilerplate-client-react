import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ConsoleErrorBoundary } from '../ConsoleErrorBoundary';

describe('ConsoleErrorBoundary', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let consoleErrorMock: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;

  beforeEach(() => {
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  test('ConsoleErrorBoundary', () => {
    const ThrowError = () => {
      throw new Error('Test');
    };
    render(
      <ConsoleErrorBoundary>
        <ThrowError />
      </ConsoleErrorBoundary>,
    );

    expect(consoleErrorMock).toHaveBeenCalled();
  });
});
