import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignUpForm } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('SignupForm', () => {
  beforeEach(async () => {
    render(
      <ThemeProvider theme={AppTheme}>
        <SignUpForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </ThemeProvider>,
    );
  });

  it('should render the basic fields', () => {
    expect(screen.getByRole('textbox', { name: /^email$/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /^Confirm Email$/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /^First Name$/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /^Last Name$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
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
