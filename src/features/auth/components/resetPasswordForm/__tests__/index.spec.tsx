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
    expect(screen.getByRole('textbox', { name: /^Confirm Password$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeInTheDocument();
  });

  // it('should validate form fields', async () => {
  //   userEvent.type(screen.getByRole('textbox', { name: /^email$/i }), 'testEmail');
  //   userEvent.type(screen.getByRole('textbox', { name: /^Confirm Email$/i }), 'confirmTestEmail');
  //   userEvent.type(screen.getByRole('textbox', { name: /^First Name$/i }), '123');
  //   userEvent.type(screen.getByRole('textbox', { name: /^Last Name$/i }), '456');

  //   fireEvent.submit(screen.getByRole('button', { name: 'SIGN UP' }));
  //   expect(await screen.findAllByRole('alert')).toHaveLength(4);
  //   expect(mockOnSubmit).not.toBeCalled();
  // });

  // it('should submit the form', async () => {});
});
