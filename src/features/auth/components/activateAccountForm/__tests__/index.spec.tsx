import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActivateAccountForm } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('ActivateAccountForm', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <ThemeProvider theme={AppTheme}>
          <ActivateAccountForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
        </ThemeProvider>,
      );
    });
    mockOnSubmit.mockReset();
  });

  it('should submit form if all form fields are valid', async () => {
    const testFormData = {
      newPassword: 'Test1234!',
      confirmPassword: 'Test1234!',
    };

    await act(async () => {
      const newPasswordInput = screen.getByLabelText(/New Password/i);
      userEvent.type(newPasswordInput, testFormData.newPassword);

      const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
      userEvent.type(confirmPasswordInput, testFormData.confirmPassword);
    });

    await act(async () => userEvent.click(screen.getByRole('button', { name: 'SUBMIT' })));

    expect(mockOnSubmit).toHaveBeenCalledWith(testFormData, expect.any(Object));
  });

  it('should disable the submit button when fields are invalid', async () => {
    const button = screen.getByRole('button', { name: 'SUBMIT' });
    expect(button.hasAttribute('disabled')).toBeTruthy();
  });

  it('should enable the submit button when fields are valid', async () => {
    const testFormData = {
      newPassword: 'Test1234!',
      confirmPassword: 'Test1234!',
    };

    await act(async () => {
      const newPasswordInput = screen.getByLabelText(/New Password/i);
      userEvent.type(newPasswordInput, testFormData.newPassword);

      const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
      userEvent.type(confirmPasswordInput, testFormData.confirmPassword);
    });

    const button = screen.getByRole('button', { name: 'SUBMIT' });
    expect(button.hasAttribute('disabled')).toBeFalsy();
  });

  it('should validate user inputs and provide error messages', async () => {
    const newPasswordInput = screen.getByLabelText(/New Password/i);
    userEvent.type(newPasswordInput, 'abc');

    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    userEvent.type(confirmPasswordInput, '123');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });
});
