import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignUpForm } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('SignupForm', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={AppTheme}>
        <SignUpForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </ThemeProvider>,
    );
  });

  it('should render the email field', () => {
    expect(screen.getByRole('textbox', { name: /^email$/i })).toBeInTheDocument();
  });
  it('should render the confirm email field', () => {
    expect(screen.getByRole('textbox', { name: /^Confirm Email$/i })).toBeInTheDocument();
  });
  it('should render the first name field', () => {
    expect(screen.getByRole('textbox', { name: /^First Name$/i })).toBeInTheDocument();
  });
  it('should render the last name field', () => {
    expect(screen.getByRole('textbox', { name: /^Last Name$/i })).toBeInTheDocument();
  });
  it('should render the cancel button', () => {
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
  });
  it('should render the sign up button', () => {
    expect(screen.getByRole('button', { name: 'SIGN UP' })).toBeInTheDocument();
  });

  it('should validate form fields', async () => {
    userEvent.type(screen.getByRole('textbox', { name: /^email$/i }), 'testEmail');
    userEvent.type(screen.getByRole('textbox', { name: /^Confirm Email$/i }), 'confirmTestEmail');
    userEvent.type(screen.getByRole('textbox', { name: /^First Name$/i }), '123');
    userEvent.type(screen.getByRole('textbox', { name: /^Last Name$/i }), '456');

    fireEvent.submit(screen.getByRole('button', { name: 'SIGN UP' }));
    expect(await screen.findAllByRole('alert')).toHaveLength(4);
    expect(mockOnSubmit).not.toBeCalled();
  });

  it('should not submit the form', async () => {
    const emailInput = screen.getByRole('textbox', { name: /^email/i });
    userEvent.type(emailInput, 'test');

    const confirmEmailInput = screen.getByRole('textbox', { name: /^Confirm Email$/i });
    userEvent.type(confirmEmailInput, '123');

    const firstNameInput = screen.getByRole('textbox', { name: /^First Name$/i });
    userEvent.type(firstNameInput, '1');

    const lastNameInput = screen.getByRole('textbox', { name: /^Last Name$/i });
    userEvent.type(lastNameInput, '2');

    fireEvent.click(screen.getByRole('button', { name: 'SIGN UP' }));
    await waitFor(() => expect(mockOnSubmit).not.toHaveBeenCalled);
  });

  it('should submit the form', async () => {
    const emailInput = screen.getByRole('textbox', { name: /^email/i });
    userEvent.type(emailInput, 'test@email.com');

    const confirmEmailInput = screen.getByRole('textbox', { name: /^Confirm Email$/i });
    userEvent.type(confirmEmailInput, 'test@email.com');

    const firstNameInput = screen.getByRole('textbox', { name: /^First Name$/i });
    userEvent.type(firstNameInput, 'Test');

    const lastNameInput = screen.getByRole('textbox', { name: /^Last Name$/i });
    userEvent.type(lastNameInput, 'Last');

    fireEvent.submit(screen.getByRole('button', { name: 'SIGN UP' }));
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });
});
