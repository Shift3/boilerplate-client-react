import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResetPasswordForm } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('ResetPasswordForm', () => {
  beforeEach(async () => {
    render(
      <ThemeProvider theme={AppTheme}>
        <ResetPasswordForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </ThemeProvider>,
    );
  });

  it('should render the new password field', () => {
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
  });

  it('should render the confirm password field', () => {
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
  });

  it('should render the cancel button', () => {
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
  });

  it('should render the submit button', () => {
    expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeInTheDocument();
  });

  it('should validate form fields', async () => {
    userEvent.type(screen.getByLabelText(/New Password/i), 'abc');
    userEvent.type(screen.getByLabelText(/Confirm Password/i), '123');

    fireEvent.submit(screen.getByRole('button', { name: 'SUBMIT' }));
    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(mockOnSubmit).not.toBeCalled();
  });

  it('should not submit the form', async () => {
    const newPasswordInput = screen.getByLabelText(/New Password/i);
    userEvent.type(newPasswordInput, '123');

    const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
    userEvent.type(confirmNewPasswordInput, 'abc');

    fireEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
    await waitFor(() => expect(mockOnSubmit).not.toHaveBeenCalledTimes);
  });

  it('should submit the form', async () => {
    const newPasswordInput = screen.getByLabelText(/New Password/i);
    userEvent.type(newPasswordInput, 'Testpassword123!');

    const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
    userEvent.type(confirmNewPasswordInput, 'Testpassword123!');

    fireEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled);
  });
});