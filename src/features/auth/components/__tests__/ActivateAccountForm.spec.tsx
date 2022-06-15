import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import light from 'themes/light';
import { ActivateAccountForm } from '../ActivateAccountForm';

const mockOnSubmit = jest.fn();

describe('ActivateAccountForm', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <ThemeProvider theme={light}>
          <ActivateAccountForm onSubmit={mockOnSubmit} serverValidationErrors={null} />
        </ThemeProvider>,
      );
    });
    mockOnSubmit.mockReset();
  });

  it('should submit form if all form fields are valid', async () => {
    const testFormData = {
      password: 'Test1234!',
      passwordConfirmation: 'Test1234!',
    };

    await act(async () => {
      const newPasswordInput = screen.getByLabelText(/New Password/i);
      await userEvent.type(newPasswordInput, testFormData.password);

      const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
      await userEvent.type(confirmPasswordInput, testFormData.passwordConfirmation);
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
      password: 'Test1234!',
      passwordConfirmation: 'Test1234!',
    };

    await act(async () => {
      const newPasswordInput = screen.getByLabelText(/New Password/i);
      await userEvent.type(newPasswordInput, testFormData.password);

      const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
      await userEvent.type(confirmPasswordInput, testFormData.passwordConfirmation);
    });

    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button.hasAttribute('disabled')).toBeFalsy();
  });

  it('should validate user inputs and provide error messages', async () => {
    const newPasswordInput = screen.getByLabelText(/New Password/i);
    await userEvent.type(newPasswordInput, 'abc');

    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    await userEvent.type(confirmPasswordInput, '123');

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });
});
