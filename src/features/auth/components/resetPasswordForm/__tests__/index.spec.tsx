import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResetPasswordForm } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('ResetPasswordForm', () => {
  beforeEach(async () => {
    render(
      <ThemeProvider theme={AppTheme}>
        <ResetPasswordForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </ThemeProvider>,
    );
  });

  it('should render form fields', () => {
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeInTheDocument();
  });

  it('should submit form if all form fields are valid', async () => {
    const testFormData = {
      newPassword: 'Testpass123!',
      confirmPassword: 'Testpass123!',
    };

    await act(async () => {
      const newPasswordInput = screen.getByLabelText(/New Password/i);
      userEvent.type(newPasswordInput, testFormData.newPassword);

      const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
      userEvent.type(confirmNewPasswordInput, testFormData.confirmPassword);
    });

    await act(async () => userEvent.click(screen.getByRole('button', { name: 'SUBMIT' })));

    expect(mockOnSubmit).toHaveBeenCalledWith(testFormData, expect.any(Object));
  });
  it('should validate user inputs and provide error messages', async () => {
    const newPasswordInput = screen.getByLabelText(/New Password/i);
    userEvent.type(newPasswordInput, 'Testpassword123!');

    const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
    userEvent.type(confirmNewPasswordInput, 'Testpassword123!');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });
});
