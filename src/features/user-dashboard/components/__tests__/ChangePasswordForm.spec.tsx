import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import light from 'themes/light';
import { ChangePasswordForm, FormData } from '../ChangePasswordForm';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createAppStore } from 'app/redux';

describe('ChangePasswordForm', () => {
  const validFormData: FormData = {
    currentPassword: 'old password',
    newPassword: 'New Password 123$',
    confirmPassword: 'New Password 123$',
  };

  const mockOnSubmit = jest.fn();

  beforeEach(async () => {
    // The render() needs to be wrapped in act() because the component has a useEffect() hook
    // that triggers form validation and modifies the form state right after the first render.
    // act() ensures that this update is processed and applied to the DOM before running tests.
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={createAppStore()}>
            <ThemeProvider theme={light}>
              <ChangePasswordForm onSubmit={mockOnSubmit} serverValidationErrors={null} />
            </ThemeProvider>
          </Provider>
        </MemoryRouter>,
      );
    });

    mockOnSubmit.mockReset();
  });

  it('should render form fields', () => {
    expect(screen.getByLabelText(/Current Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should submit form if all form fields are valid', async () => {
    await act(async () => {
      const currentPasswordInput = screen.getByLabelText(/Current Password/i);
      await userEvent.type(currentPasswordInput, validFormData.currentPassword);

      const newPasswordInput = screen.getByLabelText(/New Password/i);
      await userEvent.type(newPasswordInput, validFormData.newPassword);

      const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
      await userEvent.type(confirmNewPasswordInput, validFormData.confirmPassword);
    });

    await act(async () => userEvent.click(screen.getByRole('button', { name: 'Submit' })));

    expect(mockOnSubmit).toHaveBeenCalledWith(validFormData, expect.any(Object));
  });

  it('should disable the submit button if the form is invalid', () => {
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton.hasAttribute('disabled')).toBeTruthy();
  });

  it('should not disable the submit button if the form is valid', async () => {
    await act(async () => {
      const currentPasswordInput = screen.getByLabelText(/Current Password/i);
      await userEvent.type(currentPasswordInput, validFormData.currentPassword);

      const newPasswordInput = screen.getByLabelText(/New Password/i);
      await userEvent.type(newPasswordInput, validFormData.newPassword);

      const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
      await userEvent.type(confirmNewPasswordInput, validFormData.confirmPassword);
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton.hasAttribute('disabled')).toBeFalsy();
  });
});
