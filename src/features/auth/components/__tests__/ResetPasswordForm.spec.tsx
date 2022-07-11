import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResetPasswordForm } from '../ResetPasswordForm';
import { ThemeProvider } from 'styled-components';
import light from 'themes/light';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createAppStore } from 'app/redux';

const mockOnSubmit = jest.fn();

describe('ResetPasswordForm', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={createAppStore()}>
            <ThemeProvider theme={light}>
              <ResetPasswordForm onSubmit={mockOnSubmit} serverValidationErrors={null} />
            </ThemeProvider>
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

    await act(async () => {
      const newPasswordInput = screen.getByLabelText(/New Password/i);
      await userEvent.type(newPasswordInput, testFormData.newPassword);

      const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
      await userEvent.type(confirmNewPasswordInput, testFormData.confirmPassword);
    });

    await act(async () => await userEvent.click(screen.getByRole('button', { name: 'Submit' })));

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

    await act(async () => {
      const newPasswordInput = screen.getByLabelText(/New Password/i);
      await userEvent.type(newPasswordInput, testFormData.newPassword);

      const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
      await userEvent.type(confirmNewPasswordInput, testFormData.confirmPassword);
    });

    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button.hasAttribute('disabled')).toBeFalsy();
  });

  it('should validate user inputs and provide error messages', async () => {
    const newPasswordInput = screen.getByLabelText(/New Password/i);
    await userEvent.type(newPasswordInput, 'Testpassword123!');

    const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
    await userEvent.type(confirmNewPasswordInput, 'Testpassword123!');

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });
});
