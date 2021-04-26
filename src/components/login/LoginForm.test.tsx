import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';
import { Constants } from '../../utils/constants';

describe('LoginForm', () => {
  const validUsername = 'test@email.com';
  const validPassword = 'Password123!';

  let usernameField: HTMLElement;
  let passwordField: HTMLElement;
  let submitButton: HTMLElement;
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    usernameField = screen.getByLabelText(/username/i);
    passwordField = screen.getByLabelText(/password/i);
    submitButton = screen.getByRole('button', {
      name: /submit/i,
    });
    mockOnSubmit.mockReset();
  });

  test('should render', () => {
    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  describe('valid input', () => {
    test('should call onSubmit once formData object including username and password', async () => {
      userEvent.type(usernameField, validUsername);
      userEvent.type(passwordField, validPassword);
      await act(async () => {
        userEvent.click(submitButton);
      });

      const formData = {
        username: validUsername,
        password: validPassword,
      };

      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith(formData);
    });

    test('should not display error messages', async () => {
      userEvent.type(usernameField, validUsername);
      userEvent.type(passwordField, validPassword);
      await act(async () => {
        userEvent.click(submitButton);
      });

      expect(screen.queryAllByRole('alert')).toHaveLength(0);
    });
  });

  describe('invalid input', () => {
    test('should not call onSubmit', async () => {
      userEvent.type(usernameField, '');
      userEvent.type(passwordField, '');
      await act(async () => {
        userEvent.click(submitButton);
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test('should display error messages', async () => {
      userEvent.type(usernameField, '');
      userEvent.type(passwordField, '');
      await act(async () => {
        userEvent.click(submitButton);
      });

      expect(screen.getAllByRole('alert')).toHaveLength(2);
    });

    describe('invalid email', () => {
      test('should only display email error message', async () => {
        userEvent.type(usernameField, '');
        userEvent.type(passwordField, validPassword);
        await act(async () => {
          userEvent.click(submitButton);
        });

        expect(screen.getAllByRole('alert')).toHaveLength(1);
        expect(screen.getByRole('alert').innerHTML).toBe(Constants.validationMessages.username.MUST_BE_VALID_EMAIL);
      });
    });

    describe('invalid password', () => {
      test('should only display password error message', async () => {
        userEvent.type(usernameField, validUsername);
        userEvent.type(passwordField, '');
        await act(async () => {
          userEvent.click(submitButton);
        });

        expect(screen.getAllByRole('alert')).toHaveLength(1);
        expect(screen.getByRole('alert').innerHTML).toBe(Constants.validationMessages.password.IS_REQUIRED);
      });
    });
  });
});
