import { render, screen } from '@testing-library/react';
import { WithLoadingOverlay } from '.';

describe('WithLoadingOverlay', () => {
  describe('when isLoading prop is true', () => {
    beforeEach(() => {
      render(
        <WithLoadingOverlay isLoading>
          <div data-testid='children'></div>
        </WithLoadingOverlay>,
      );
    });

    it('should render a loading spinner', () => {
      const spinner = screen.queryByRole('status');
      expect(spinner).toBeInTheDocument();
    });

    it('should not render nested children', () => {
      const children = screen.queryByTestId('children');
      expect(children).not.toBeInTheDocument();
    });
  });

  describe('when isLoading prop is false', () => {
    beforeEach(() => {
      render(
        <WithLoadingOverlay isLoading={false}>
          <div data-testid='children'></div>
        </WithLoadingOverlay>,
      );
    });

    it('should not render a loading spinner', () => {
      const spinner = screen.queryByRole('status');
      expect(spinner).not.toBeInTheDocument();
    });

    it('should render nested children', () => {
      const children = screen.queryByTestId('children');
      expect(children).toBeInTheDocument();
    });
  });
});
