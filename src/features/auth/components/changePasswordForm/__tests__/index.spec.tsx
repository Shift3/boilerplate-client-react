import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { ChangePasswordForm } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();

describe('ChangePasswordForm', () => {
  beforeEach(async () => {
    render(
      <ThemeProvider theme={AppTheme}>
        <ChangePasswordForm onSubmit={mockOnSubmit} />
      </ThemeProvider>,
    );
  });

  it('should render current password field', () => {
    expect(screen.getByLabelText(/Current Password/i)).toBeInTheDocument();
  });

  it('should render new password field', () => {
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
  });

  it('should render confirm password field', () => {
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
  });

  it('should render a cancel button', () => {
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
  });

  it('should render a submit button', () => {
    expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeInTheDocument();
  });

  it('should not submit form if form fields are invalid', async () => {
    user.type(screen.getByLabelText(/Current Password/i), 'abc');
    user.type(screen.getByLabelText(/New Password/i), '123');
    user.type(screen.getByLabelText(/Confirm Password/i), '456');

    fireEvent.submit(screen.getByRole('button', { name: 'SUBMIT' }));
    expect(await screen.findAllByRole('alert')).toHaveLength(3);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should submit form if all form fields are valid', async () => {
    const currentPasswordInput = screen.getByLabelText(/Current Password/i);
    user.type(currentPasswordInput, 'Test1234!');

    const newPasswordInput = screen.getByLabelText(/New Password/i);
    user.type(newPasswordInput, 'Test1235!');

    const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
    user.type(confirmNewPasswordInput, 'Test1235!');

    user.click(screen.getByRole('button', { name: 'SUBMIT' }));
    await waitFor(() =>
      expect(mockOnSubmit).not.toHaveBeenCalledWith(currentPasswordInput, newPasswordInput, confirmNewPasswordInput),
    );
  });

  it('should validate user inputs and provide error messages', async () => {
    const currentPasswordInput = screen.getByLabelText(/Current Password/i);
    user.type(currentPasswordInput, 'abc');

    const newPasswordInput = screen.getByLabelText(/New Password/i);
    user.type(newPasswordInput, '123');

    const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
    user.type(confirmNewPasswordInput, '456');

    await act(async () => {
      user.click(screen.getByRole('button', { name: 'SUBMIT' }));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(3);
  });
});
