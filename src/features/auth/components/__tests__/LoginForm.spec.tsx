import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createAppStore } from 'app/redux';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';
import { LogInForm } from '../LoginForm';

const mockOnSubmit = jest.fn();

describe('LoginForm', () => {
  beforeEach(async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Provider store={createAppStore()}>
          <ThemeProvider theme={AppTheme}>
            <LogInForm onSubmit={mockOnSubmit} />
          </ThemeProvider>,
        </Provider>
      </Router>
    );
    mockOnSubmit.mockReset();
  });

  it('should submit form if all form fields are valid', async () => {
    const testFormData = {
      email: 'test123@test.com',
      password: 'Test12345!',
    };

    await act(async () => {
      const emailInput = screen.getByLabelText(/email/i);
      userEvent.type(emailInput, testFormData.email);

      const passwordInput = screen.getByLabelText(/password/i);
      userEvent.type(passwordInput, testFormData.password);
    });

    await act(async () => userEvent.click(screen.getByRole('button', { name: 'Log In' })));

    expect(mockOnSubmit).toHaveBeenCalledWith(testFormData, expect.any(Object));
  });

  it('should validate user inputs and provide error messages', async () => {
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'abcd');

    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(passwordInput, '123');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Log In' }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });
});
