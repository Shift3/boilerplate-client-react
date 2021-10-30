import { act, render, screen } from '@testing-library/react';
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

  it('should render form fields', () => {
    expect(screen.getByRole('textbox', { name: /^email$/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /^Confirm Email$/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /^First Name$/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /^Last Name$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SIGN UP' })).toBeInTheDocument();
  });

  it('should submit form if all form fields are valid', async () => {
    const testFormData = {
      email: 'myemail@test.com',
      confirmEmail: 'myemail@test.com',
      firstName: 'Jonathan',
      lastName: 'Smith',
    };

    await act(async () => {
      const emailInput = screen.getByLabelText(/email/i);
      userEvent.type(emailInput, testFormData.email);

      const confirmEmailInput = screen.getByLabelText(/confirm email/i);
      userEvent.type(confirmEmailInput, testFormData.confirmEmail);

      const firstNameInput = screen.getByLabelText(/first name/i);
      userEvent.type(firstNameInput, testFormData.firstName);

      const lastNameInput = screen.getByLabelText(/last name/i);
      userEvent.type(lastNameInput, testFormData.lastName);
    });

    await act(async () => userEvent.click(screen.getByRole('button', { name: 'SIGN UP' })));

    expect(mockOnSubmit).toHaveBeenCalledWith(testFormData, expect.any(Object));
  });

  it('should not submit the form', async () => {
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'myemail');

    const confirmEmailInput = screen.getByLabelText(/confirm email/i);
    userEvent.type(confirmEmailInput, 'myemail123');

    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, '@%$!');

    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, '456!&');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(4);
  });
});
