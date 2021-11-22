import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UpdateUserProfileForm } from '../UpdateUserProfileForm';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();
const defaultValues = {
  firstName: 'Firstname',
  lastName: 'Lastname',
  email: 'test@test.com',
};

describe('UpdateUserProfileForm', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <ThemeProvider theme={AppTheme}>
          <UpdateUserProfileForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} defaultValues={defaultValues} />
        </ThemeProvider>,
      );
    });
    mockOnSubmit.mockReset();
  });

  it('should populate form fields with default values', async () => {
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    expect(firstNameInput).toHaveValue(defaultValues.firstName);
    expect(lastNameInput).toHaveValue(defaultValues.lastName);
    expect(emailInput).toHaveValue(defaultValues.email);
  });

  it('should submit form if all form fields are valid', async () => {
    await act(async () => userEvent.click(screen.getByRole('button', { name: 'UPDATE' })));
    expect(mockOnSubmit).toHaveBeenCalledWith(defaultValues, expect.any(Object));
  });

  it('should validate user inputs and provide error messages', async () => {
    await act(async () => {
      const firstNameInput = screen.getByLabelText(/First Name/i);
      userEvent.clear(firstNameInput);

      const lastNameInput = screen.getByLabelText(/Last Name/i);
      userEvent.clear(lastNameInput);

      const emailInput = screen.getByLabelText(/Email/i);
      userEvent.clear(emailInput);
    });

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'UPDATE' }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(3);
  });
});
