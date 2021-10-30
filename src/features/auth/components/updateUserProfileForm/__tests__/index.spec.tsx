import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UpdateUserProfileForm } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();
const mockDefaultValues = {
  firstName: 'Firstname',
  lastName: 'Lastname',
  email: 'test@test.com',
};

describe('UpdateUserProfileForm', () => {
  beforeEach(async () => {
    render(
      <ThemeProvider theme={AppTheme}>
        <UpdateUserProfileForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} defaultValues={mockDefaultValues} />
      </ThemeProvider>,
    );
    mockOnSubmit.mockReset();
  });

  it('should render form fields', () => {
    expect(screen.getByLabelText(/^First Name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Last Name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'UPDATE' })).toBeInTheDocument();
  });

  it('should submit form if all form fields are valid', async () => {
    const testFormData = {
      firstName: 'Sam',
      lastName: 'Smith',
      email: 'samsmith@test.com',
    };

    await act(async () => {
      const firstNameInput = screen.getByLabelText(/^First Name$/i);
      userEvent.type(firstNameInput, testFormData.firstName);

      const lastNameInput = screen.getByLabelText(/^Last Name$/i);
      userEvent.type(lastNameInput, testFormData.lastName);

      const emailInput = screen.getByLabelText(/^Email$/i);
      userEvent.type(emailInput, testFormData.email);
    });

    await act(async () => userEvent.click(screen.getByRole('button', { name: 'UPDATE' })));

    expect(mockOnSubmit).toHaveBeenCalledWith(testFormData, expect.any(Object));
  });
});
