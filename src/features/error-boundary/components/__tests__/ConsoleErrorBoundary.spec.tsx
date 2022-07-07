import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConsoleErrorBoundary } from '../ConsoleErrorBoundary';

describe('ConsoleErrorBoundary', () => {
  test('ConsoleErrorBoundary', () => {
    const ThrowError = () => {
      throw new Error('Test');
    };
    render(
      <ConsoleErrorBoundary>
        <ThrowError />
      </ConsoleErrorBoundary>,
    );

    expect(screen.getByTestId('console-errorboundary')).toBeVisible();
  });
});
