import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import theme from 'utils/styleValues';
import { ChangePasswordForm, FormData } from '../ChangePasswordForm';

describe('ChangePasswordForm', () => {
  const validFormData: FormData = {
    oldPassword: 'old password',
    newPassword: 'New Password 123$',
    confirmPassword: 'New Password 123$',
  };

  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(async () => {
    // The render() needs to be wrapped in act() because the component has a useEffect() hook
    // that triggers form validation and modifies the form state right after the first render.
    // act() ensures that this update is processed and applied to the DOM before running tests.
    await act(async () => {
      render(
        <ThemeProvider theme={theme}>
          <ChangePasswordForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
        </ThemeProvider>,
      );
    });

    mockOnSubmit.mockReset();
  });

  it('should render form fields', () => {
    expect(screen.getByLabelText(/Current Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeInTheDocument();
  });

  it('should validate form and show error messages on render', () => {
    expect(screen.getAllByRole('alert')).toHaveLength(3);
  });

  it('should submit form if all form fields are valid', async () => {
    await act(async () => {
      const currentPasswordInput = screen.getByLabelText(/Current Password/i);
      userEvent.type(currentPasswordInput, validFormData.oldPassword);

      const newPasswordInput = screen.getByLabelText(/New Password/i);
      userEvent.type(newPasswordInput, validFormData.newPassword);

      const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
      userEvent.type(confirmNewPasswordInput, validFormData.confirmPassword);
    });

    await act(async () => userEvent.click(screen.getByRole('button', { name: 'SUBMIT' })));

    expect(mockOnSubmit).toHaveBeenCalledWith(validFormData, expect.any(Object));
  });

  it('should disable the submit button if the form is invalid', () => {
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton.hasAttribute('disabled')).toBeTruthy();
  });

  it('should not disable the submit button if the form is valid', async () => {
    await act(async () => {
      const currentPasswordInput = screen.getByLabelText(/Current Password/i);
      userEvent.type(currentPasswordInput, validFormData.oldPassword);

      const newPasswordInput = screen.getByLabelText(/New Password/i);
      userEvent.type(newPasswordInput, validFormData.newPassword);

      const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
      userEvent.type(confirmNewPasswordInput, validFormData.confirmPassword);
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton.hasAttribute('disabled')).toBeFalsy();
  });
});
