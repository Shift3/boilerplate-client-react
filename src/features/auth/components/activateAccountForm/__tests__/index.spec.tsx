import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActivateAccountForm } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('ActivateAccountForm', () => {
  beforeEach(async () => {
    render(
      <ThemeProvider theme={AppTheme}>
        <ActivateAccountForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </ThemeProvider>,
    );
  });

  it('should render the basic fields', () => {
    expect(screen.getByRole('textbox', { name: /^email$/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /^Confirm Email$/i })).toBeInTheDocument();
  });

  it('should validate form fields', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /^email$/i }), {
      target: {
        value: 'testEmail',
      },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /^Confirm Email$/i }), {
      target: {
        value: 'confirmTestEmail',
      },
    });
    fireEvent.submit(screen.getByRole('button', { name: 'SIGN UP' }));
    expect(await screen.findAllByRole('alert')).toHaveLength(4);
    expect(mockOnSubmit).not.toBeCalled();
  });

  it('should render the cancel button', () => {
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
  });

  it('should render the submit button', () => {
    expect(screen.getByRole('button', { name: 'SIGN UP' })).toBeInTheDocument();
  });

  it('should submit the form', async () => {
    const emailInput = screen.getByRole('textbox', { name: /^email/i });
    userEvent.type(emailInput, 'test@email.com');

    const confirmEmailInput = screen.getByRole('textbox', { name: /^Confirm Email$/i });
    userEvent.type(confirmEmailInput, 'test@email.com');

    fireEvent.submit(screen.getByRole('button', { name: 'SIGN UP' }));
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });
});
