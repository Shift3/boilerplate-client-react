import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LogInForm } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('LoginForm', () => {
  beforeEach(async () => {
    render(
      <ThemeProvider theme={AppTheme}>
        <LogInForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </ThemeProvider>,
    );
    mockOnSubmit.mockReset();
  });

  it('should render form fields', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'LOG IN' })).toBeInTheDocument();
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
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'abcd');

    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(passwordInput, '123');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });
});
