import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UpdateUserProfileForm } from '../UpdateUserProfileForm';
import { ThemeProvider } from 'styled-components';
import light from 'themes/light';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createAppStore } from 'app/redux';

const mockOnSubmit = jest.fn();
const defaultValues = {
  firstName: 'Firstname',
  lastName: 'Lastname',
};

describe('UpdateUserProfileForm', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={createAppStore()}>
            <ThemeProvider theme={light}>
              <UpdateUserProfileForm
                onSubmit={mockOnSubmit}
                defaultValues={defaultValues}
                serverValidationErrors={null}
              />
            </ThemeProvider>
          </Provider>
        </MemoryRouter>,
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
