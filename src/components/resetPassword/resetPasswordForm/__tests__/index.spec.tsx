/* eslint-disable array-bracket-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-magic-numbers */
/* eslint-disable require-await */
/* eslint-disable no-undef */
import { act, render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import { ResetPasswordForm } from '..';
import { errorMessages } from '../schema';

const { type, clear, click } = userEvents;
const { getAllByRole, getByLabelText, getByRole, queryAllByRole } = screen;
const { PASSWORD_REQUIRED, PASSWORD_LENGTH, PASSWORD_MATCH } = errorMessages;

describe('LoginForm', () => {
  const validPassword = 'Password123!';
  const shortPassword = 'test';
  const longPassword = 'passwordtoolong';

  let passwordField: HTMLElement;
  let confirmPasswordField: HTMLElement;
  let submitButton: HTMLElement;

  const mockOnSubmit = jest.fn();

  const submitClick = () => act(async () => click(submitButton));

  const setValue = (element: HTMLElement, value: string) =>
    act(async () => {
      clear(element);
      type(element, value);
    });

  const alertLengthCheck = (length: number) => expect(queryAllByRole('alert')).toHaveLength(length);

  const getAlertMessages = () =>
    getAllByRole('alert').reduce((messages: string[], alert: HTMLElement) => [...messages, alert.innerHTML], []);

  const alertMessageCheck = (message: string) => expect(getAlertMessages().includes(message));

  beforeEach(async () => {
    render(<ResetPasswordForm onSubmit={mockOnSubmit} />);

    passwordField = getByLabelText('Password');
    confirmPasswordField = getByLabelText('Confirm Password');
    submitButton = getByRole('button');

    await setValue(passwordField, validPassword);
    await setValue(confirmPasswordField, validPassword);

    mockOnSubmit.mockReset();
  });

  it('should render password field', () => {
    expect(passwordField).toBeInTheDocument();
  });

  it('should render confirm password field', () => {
    expect(confirmPasswordField).toBeInTheDocument();
  });

  it('should render submit button', () => {
    expect(submitButton).toBeInTheDocument();
  });

  describe('valid input', () => {
    it('should call onSubmit once formData object including password and confirmPassword', async () => {
      await submitClick();
      expect(mockOnSubmit).toHaveBeenCalled();
    });

    it('should not display error messages', async () => {
      alertLengthCheck(0);
    });
  });

  describe('invalid input', () => {
    it('should not call onSubmit', async () => {
      await setValue(passwordField, '');
      await setValue(confirmPasswordField, '');

      await submitClick();

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should display error messages', async () => {
      await setValue(passwordField, '');
      await setValue(confirmPasswordField, '');

      alertLengthCheck(2);
    });

    describe('invalid password', () => {
      it('should only display password required error message', async () => {
        await setValue(passwordField, '');

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
