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

  it('should render the basic fields', () => {
    expect(screen.getByRole('textbox', { name: /^New Password$/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeInTheDocument();
  });

  it('should validate form fields', async () => {
    userEvent.type(screen.getByRole('textbox', { name: /^New Password$/i }), 'abc');
    userEvent.type(screen.getByLabelText(/Confirm Password/i), '123');

    fireEvent.submit(screen.getByRole('button', { name: 'SUBMIT' }));
    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(mockOnSubmit).not.toBeCalled();
  });

  it('should submit the form', async () => {
    const newPasswordInput = screen.getByRole('textbox', { name: /^New Password$/i });
    userEvent.type(newPasswordInput, '123');

    const confirmNewPasswordInput = screen.getByLabelText(/Confirm Password/i);
    userEvent.type(confirmNewPasswordInput, 'abc');

    fireEvent.submit(screen.getByRole('button', { name: 'SUBMIT' }));
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledTimes(1));
  });
});
