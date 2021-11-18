import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignUpForm } from '../SignUpForm';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('SignUpForm', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <ThemeProvider theme={AppTheme}>
          <SignUpForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
        </ThemeProvider>,
      );
    });
    mockOnSubmit.mockReset();
  });

  it('should submit form if all form fields are valid', async () => {
    const testFormData = {
      email: 'myemail@test.com',
      confirmEmail: 'myemail@test.com',
      firstName: 'Jonathan',
      lastName: 'Smith',
    };

    await act(async () => {
      const emailInput = screen.getByLabelText(/^Email$/i);
      userEvent.type(emailInput, testFormData.email);

      const confirmEmailInput = screen.getByLabelText(/^Confirm Email$/i);
      userEvent.type(confirmEmailInput, testFormData.confirmEmail);

      const firstNameInput = screen.getByLabelText(/^First Name$/i);
      userEvent.type(firstNameInput, testFormData.firstName);

      const lastNameInput = screen.getByLabelText(/^Last Name$/i);
      userEvent.type(lastNameInput, testFormData.lastName);
    });

    await act(async () => userEvent.click(screen.getByRole('button', { name: 'SIGN UP' })));

    expect(mockOnSubmit).toHaveBeenCalledWith(testFormData, expect.any(Object));
  });

  it('should disable the submit button when fields are invalid', async () => {
    const button = screen.getByRole('button', { name: 'SIGN UP' });
    expect(button.hasAttribute('disabled')).toBeTruthy();
  });

  it('should enable the submit button when fields are valid', async () => {
    const testFormData = {
      email: 'myemail@test.com',
      confirmEmail: 'myemail@test.com',
      firstName: 'Jonathan',
      lastName: 'Smith',
    };

    await act(async () => {
      const emailInput = screen.getByLabelText(/^Email$/i);
      userEvent.type(emailInput, testFormData.email);

      const confirmEmailInput = screen.getByLabelText(/^Confirm Email$/i);
      userEvent.type(confirmEmailInput, testFormData.confirmEmail);

      const firstNameInput = screen.getByLabelText(/^First Name$/i);
      userEvent.type(firstNameInput, testFormData.firstName);

      const lastNameInput = screen.getByLabelText(/^Last Name$/i);
      userEvent.type(lastNameInput, testFormData.lastName);
    });

    const button = screen.getByRole('button', { name: 'SIGN UP' });
    expect(button.hasAttribute('disabled')).toBeFalsy();
  });

  it('should validate user inputs and provide error messages', async () => {
    const invalidEmail = 'email';
    const invalidConfirmEmail = 'confirmEmail';
    const whiteSpace = ' ';

    const emailInput = screen.getByLabelText(/^Email$/i);
    userEvent.type(emailInput, invalidEmail);

    const confirmEmailInput = screen.getByLabelText(/^Confirm Email$/i);
    userEvent.type(confirmEmailInput, invalidConfirmEmail);

    const firstNameInput = screen.getByLabelText(/^First Name$/i);
    userEvent.type(firstNameInput, whiteSpace);

    const lastNameInput = screen.getByLabelText(/^Last Name$/i);
    userEvent.type(lastNameInput, whiteSpace);

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'SIGN UP' }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(4);
  });
});
