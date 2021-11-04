import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ForgotPasswordForm } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('ForgotPasswordForm', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <ThemeProvider theme={AppTheme}>
          <ForgotPasswordForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
        </ThemeProvider>,
      );
    });
    mockOnSubmit.mockReset();
  });

  it('should render form fields', () => {
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeInTheDocument();
  });

  it('should submit form if all form fields are valid', async () => {
    const testFormData = {
      email: 'Testemail@gmail.com',
    };

    await act(async () => {
      const emailInput = screen.getByLabelText(/Email/i);
      userEvent.type(emailInput, testFormData.email);
    });

    await act(async () => userEvent.click(screen.getByRole('button', { name: 'SUBMIT' })));

    expect(mockOnSubmit).toHaveBeenCalledWith(testFormData, expect.any(Object));
  });

  it('should validate user inputs and provide error messages', async () => {
    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, 'abc');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(1);
  });
});
