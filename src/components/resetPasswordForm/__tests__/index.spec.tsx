/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-bracket-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-magic-numbers */
/* eslint-disable require-await */
/* eslint-disable no-undef */
import { act, getAllByRole, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { ResetPasswordForm } from '../index';
import { errorMessages } from '../schema';

const { type, clear, click } = userEvents;
const { getByLabelText, getByTestId, queryAllByRole } = screen;
const { PASSWORD_REQUIRED, PASSWORD_LENGTH, PASSWORD_MATCH } = errorMessages;

let currentPasswordField: HTMLElement;
let newPasswordField: HTMLElement;
let confirmPasswordField: HTMLElement;
let cancelButton: HTMLElement;
let submitButton: HTMLElement;

describe('LoginForm', () => {
  const validPasswprd = '';
  const invalidPassword = '';
  const mismatchPassword = '';

  const setValue = (element: HTMLElement, value: string) =>
    act(async () => {
      clear(element);
      type(element, value);
    });

  const submitClick = () => act(async () => click(submitButton));

  const alertLengthCheck = (length: number) => expect(queryAllByRole('alert')).toHaveLength(length);

  const getAlertMessages = () =>
    getAllByRole('alert').reduce((messages: string[], alert: HTMLElement) => [...messages, alert.innerHTML], []);

  const alertMessageCheck = (message: string) => expect(getAlertMessages().includes(message));

  const mockOnSubmit = jest.fn();

  beforeEach(async () => {
    render(<ResetPasswordForm onSubmit={mockOnSubmit} />);

    currentPasswordField = getByLabelText('Current Password');
    newPasswordField = getByLabelText('New Password');
    confirmPasswordField = getByLabelText('Confirm Password');
    cancelButton = getByTestId('Cancel Button');
    submitButton = getByTestId('Sign Up Button');

    await setValue(currentPasswordField, validPassword);
    await setValue(newPasswordField, validPassword);
    await setValue(confirmPasswordField, validPassword);

    mockOnSubmit.mockReset();
  });

  it('should render current password field', () => {
    expect(currentPasswordField).toBeInTheDocument();
  });

  it('should render confirm password field', () => {
    expect(confirmPasswordField).toBeInTheDocument();
  });

  it('Should render Cancel button', () => {
    expect(cancelButton).toBeInTheDocument();
  });

  it('Should render Submit button', () => {
    expect(submitButton).toBeInTheDocument();
  });

  describe('valid input', () => {
    it('Should call onSubmit once all form data is valid, ', async () => {
      await submitClick();
      expect(mockOnSubmit).toHaveBeenCalled();
    });

    it('should not display error messages', async () => {
      alertLengthCheck(0);
    });
  });

  describe('invalid input', () => {
    it('should not call onSubmit', async () => {
      await setValue(currentPasswordField, '');
      await setValue(newPasswordField, '');
      await setValue(confirmPasswordField, '');

      await submitClick();

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should display error messages', async () => {
      await setValue(currentPasswordField, invalidPassword);
      await setValue(newPasswordField, invalidPassword);
      await setValue(confirmPasswordField, mismatchPassword);

      alertLengthCheck(2);
    });

    describe('invalid password', () => {
      it('should only display password required error message', async () => {
        await setValue(currentPasswordField, '');

        alertLengthCheck(1);
        alertMessageCheck(PASSWORD_REQUIRED);
      });

      it('should only display confirm password required error message', async () => {
        await setValue(confirmPasswordField, '');

        alertLengthCheck(1);
        alertMessageCheck(PASSWORD_REQUIRED);
      });
    });

    describe('non matching password', () => {
      it('should only display password mismatch error message', async () => {
        await setValue(passwordField, validPassword);
        await setValue(confirmPasswordField, shortPassword);

        alertLengthCheck(1);
        alertMessageCheck(PASSWORD_MATCH);
      });
    });
  });

  describe('invalid password length', () => {
    it('should only display password length error message', async () => {
      await setValue(passwordField, shortPassword);
      await setValue(confirmPasswordField, shortPassword);

      alertLengthCheck(1);
      alertMessageCheck(PASSWORD_LENGTH);
    });

    it('should only display password length error message', async () => {
      await setValue(passwordField, longPassword);
      await setValue(confirmPasswordField, longPassword);

      alertLengthCheck(1);
      alertMessageCheck(PASSWORD_LENGTH);
    });
  });
});
