import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UpdateUserEmailForm } from '../UpdateUserEmailForm';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();
const defaultValues = {
  email:'Testemail@gmail.com'
};

describe('UpdateUserEmailForm', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <ThemeProvider theme={AppTheme}>
          <UpdateUserEmailForm onSubmit={mockOnSubmit} defaultValues={defaultValues} />
        </ThemeProvider>,
      );
    });
    mockOnSubmit.mockReset();
  });

  it('should submit form if all form fields are valid', async () => {
    await act(async () => userEvent.click(screen.getByRole('button', { name: 'UPDATE' })));
    expect(mockOnSubmit).toHaveBeenCalledWith(defaultValues, expect.any(Object));
  });

  it('should validate user inputs and provide error messages', async () => {
    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, 'Test123@gmail.com');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'UPDATE' }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
  });
});
