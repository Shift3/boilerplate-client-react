import { render, screen, within } from '@testing-library/react';
import { NotificationContainer } from 'common/components/Notification';
import * as notificationService from '../notification';

describe('Notification Service', () => {
  beforeEach(() => {
    render(<NotificationContainer />);
  });

  describe('showSuccessMessage', () => {
    it('should show success toast', async () => {
      const message = 'test success message';
      notificationService.showSuccessMessage(message);

      const toast = await screen.findByRole('alert');

      expect(toast).toBeInTheDocument();
      expect(within(toast).getByText(message)).toBeInTheDocument();
    });
  });

  describe('showErrorMessage', () => {
    it('should show error toast', async () => {
      const message = 'test error message';
      notificationService.showErrorMessage(message);

      const toast = await screen.findByRole('alert');

      expect(toast).toBeInTheDocument();
      expect(within(toast).getByText(message)).toBeInTheDocument();
    });
  });
});
