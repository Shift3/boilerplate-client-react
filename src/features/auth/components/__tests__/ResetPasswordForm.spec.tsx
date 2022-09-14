import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResetPasswordForm } from '../ResetPasswordForm';
import { ThemeProvider } from 'styled-components';
import light from 'themes/light';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createAppStore } from 'app/redux';
import { ModalProvider } from 'react-modal-hook';

const mockOnSubmit = jest.fn();

describe('ResetPasswordForm', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={createAppStore()}>
            <ModalProvider>
              <ThemeProvider theme={light}>
                <ResetPasswordForm onSubmit={mockOnSubmit} />
              </ThemeProvider>
            </ModalProvider>
          </Provider>
        </MemoryRouter>,
      );
    });
  });

  it('should submit form if all form fields are valid', async () => {
    const testFormData = {
      newPassword: 'Testpass123!',
      confirmPassword: 'Testpass123!',
    };

    const newPasswordInput = screen.getByLabelText(/New Password/i);
    await userEvent.type(newPasswordInput, testFormData.newPassword);

    const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
    await userEvent.type(confirmNewPasswordInput, testFormData.confirmPassword);

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockOnSubmit).toHaveBeenCalledWith(testFormData, expect.any(Object));
  });

  it('should disable the submit button when fields are invalid', async () => {
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button.hasAttribute('disabled')).toBeTruthy();
  });

  it('should enable the submit button when fields are valid', async () => {
    const testFormData = {
      newPassword: 'Testpass123!',
      confirmPassword: 'Testpass123!',
    };

    const newPasswordInput = screen.getByLabelText(/New Password/i);
    await userEvent.type(newPasswordInput, testFormData.newPassword);

    const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
    await userEvent.type(confirmNewPasswordInput, testFormData.confirmPassword);

    const button = screen.getByRole('button', { name: 'Submit' });

    waitFor(() => {
      expect(button.hasAttribute('disabled')).toBeFalsy();
    });
  });

  it('should validate user inputs and provide error messages', async () => {
    const newPasswordInput = screen.getByLabelText(/New Password/i);
    await userEvent.type(newPasswordInput, 'Testpassword123!');

    const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
    await userEvent.type(confirmNewPasswordInput, 'Testpassword123!');

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    waitFor(() => {
      expect(screen.findAllByRole('alert')).toHaveLength(2);
    });
  });
});
