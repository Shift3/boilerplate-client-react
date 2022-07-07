import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ForgotPasswordForm } from '../ForgotPasswordForm';
import { ThemeProvider } from 'styled-components';
import light from 'themes/light';

const mockOnSubmit = jest.fn();

describe('ForgotPasswordForm', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <ThemeProvider theme={light}>
          <ForgotPasswordForm onSubmit={mockOnSubmit} serverValidationErrors={null} />
        </ThemeProvider>,
      );
    });
    mockOnSubmit.mockReset();
  });

  it('should submit form if all form fields are valid', async () => {
    const testFormData = {
      email: 'Testemail@gmail.com',
    };

    await act(async () => {
      const emailInput = screen.getByLabelText(/Email/i);
      await userEvent.type(emailInput, testFormData.email);
    });

    await act(async () => userEvent.click(screen.getByRole('button', { name: 'Submit' })));

    expect(mockOnSubmit).toHaveBeenCalledWith(testFormData, expect.any(Object));
  });

  it('should disable the submit button when fields are invalid', async () => {
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button.hasAttribute('disabled')).toBeTruthy();
  });

  it('should enable the submit button when fields are valid', async () => {
    const testFormData = {
      email: 'Testemail@gmail.com',
    };

    await act(async () => {
      const emailInput = screen.getByLabelText(/Email/i);
      await userEvent.type(emailInput, testFormData.email);
    });

    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button.hasAttribute('disabled')).toBeFalsy();
  });

  it('should validate user inputs and provide error messages', async () => {
    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, 'abc');

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
  });
});
