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

  it('should render form fields', () => {
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Confirm Email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^First Name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Last Name$/i)).toBeInTheDocument();
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

  it('should not submit the form', async () => {
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
