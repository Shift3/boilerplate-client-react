import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UpdateUserProfileForm } from '../UpdateUserProfileForm';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const mockOnSubmit = jest.fn();
const defaultValues = {
  firstName: 'Firstname',
  lastName: 'Lastname',
};

describe('UpdateUserProfileForm', () => {
  beforeEach(async () => {
    const history = createMemoryHistory();
    await act(async () => {
      render(
        <Router history={history}>
          <ThemeProvider theme={AppTheme}>
            <UpdateUserProfileForm onSubmit={mockOnSubmit} defaultValues={defaultValues} />
          </ThemeProvider>
        </Router>,
      );
    });
    mockOnSubmit.mockReset();
  });

  it('should submit form if all form fields are valid', async () => {
    await act(async () => userEvent.click(screen.getByRole('button', { name: 'Update' })));
    expect(mockOnSubmit).toHaveBeenCalledWith(defaultValues, expect.any(Object));
  });

  it('should validate user inputs and provide error messages', async () => {
    const firstNameInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstNameInput, '123');

    const lastNameInput = screen.getByLabelText(/Last Name/i);
    userEvent.type(lastNameInput, '567');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Update' }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });
});
