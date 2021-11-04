import { render, screen } from '@testing-library/react';
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
});
