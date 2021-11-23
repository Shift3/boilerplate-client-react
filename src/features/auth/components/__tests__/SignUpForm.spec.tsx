import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignUpForm } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('SignupForm', () => {
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
    const emailInput = screen.getByLabelText(/^Email$/i);
    userEvent.type(emailInput, 'myemail');

    const confirmEmailInput = screen.getByLabelText(/^Confirm Email$/i);
    userEvent.type(confirmEmailInput, 'myemail123');

    const firstNameInput = screen.getByLabelText(/^First Name$/i);
    userEvent.type(firstNameInput, '@%$!');

    const lastNameInput = screen.getByLabelText(/^Last Name$/i);
    userEvent.type(lastNameInput, '456!&');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'SIGN UP' }));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(4);
  });
});
