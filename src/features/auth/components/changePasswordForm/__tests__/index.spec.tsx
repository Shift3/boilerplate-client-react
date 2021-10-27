import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should submit form if all form fields are valid', async () => {
    const currentPasswordInput = screen.getByLabelText(/Current Password/i);
    userEvent.type(currentPasswordInput, 'Test1234!');

    const newPasswordInput = screen.getByLabelText(/New Password/i);
    userEvent.type(newPasswordInput, 'Test1235!');

    const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
    userEvent.type(confirmNewPasswordInput, 'Test1235!');

    userEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
    await waitFor(() =>
      expect(mockOnSubmit).not.toHaveBeenCalledWith(currentPasswordInput, newPasswordInput, confirmNewPasswordInput),
    );
  });

  it('should validate user inputs and provide error messages', async () => {
    const currentPasswordInput = screen.getByLabelText(/Current Password/i);
    userEvent.type(currentPasswordInput, 'abc');

    const newPasswordInput = screen.getByLabelText(/New Password/i);
    userEvent.type(newPasswordInput, '123');

    const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
    userEvent.type(confirmNewPasswordInput, '456');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(3);
  });
});
