import { LoginForm } from '../LoginForm';
import { act, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';
import userEvent from '@testing-library/user-event';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('LoginForm', () => {
  beforeEach(async () => {
    render(
      <ThemeProvider theme={AppTheme}>
        <LoginForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </ThemeProvider>,
    );
    mockOnSubmit.mockReset();
  });

  it('should submit form if all form fields are valid', async () => {
    const testFormData = {
      email: 'test123@test.com',
      password: 'Test12345!',
    };

    await act(async () => {
      const emailInput = screen.getByLabelText(/email/i);
      userEvent.type(emailInput, testFormData.email);

      const passwordInput = screen.getByLabelText(/password/i);
      userEvent.type(passwordInput, testFormData.password);
    });

    await act(async () => userEvent.click(screen.getByRole('button', { name: 'LOG IN' })));

    expect(mockOnSubmit).toHaveBeenCalledWith(testFormData, expect.any(Object));
  });

  it('should validate user inputs and provide error messages', async () => {
    await act(async () => {
      const emailInput = screen.getByLabelText(/email/i);
      userEvent.type(emailInput, 'bademail');

      const passwordInput = screen.getByLabelText(/password/i);
      userEvent.click(passwordInput);

      // Need to click somewhere else after clicking password field to trigger validation.
      userEvent.click(emailInput);
    });

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'LOG IN' }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });
});
