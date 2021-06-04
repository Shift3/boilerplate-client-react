/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable array-bracket-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-use-before-define */
/* eslint-disable require-await */
/* eslint-disable no-undef */
import { act, render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { SignupForm } from '../index';
import { errorMessages } from '../schema';

const { type, click, clear } = userEvent;
const { getByLabelText, getAllByRole, queryAllByRole, getByTestId } = screen;
const {
  EMAIL_REQUIRED,
  INVALID_EMAIL,
  EMAIL_MATCH,
  FIRST_NAME_REQUIRED,
  LAST_NAME_REQUIRED,
  NAME_LENGTH,
} = errorMessages;

let emailField: HTMLElement;
let confirmEmailField: HTMLElement;
let firstNameField: HTMLElement;
let lastNameField: HTMLElement;
let cancelButton: HTMLElement;
let signupButton: HTMLElement;

describe('SignupForm', () => {
  const validEmail = 'test@test.com';
  const invalidEmail = 'test.com';
  const mismatchEmail = 'test@tets.com';
  const validName = 'test';
  const shortName = 't';
  const longName = 'thisisclearlywaytoolongandisnotavalidnamebecauseitiswelloverfiftycharacters';

  const setValue = (element: HTMLElement, value: string) =>
    act(async () => {
      clear(element);
      type(element, value);
    });

  const submitClick = () => act(async () => click(signupButton));

  const alertLengthCheck = (length: number) => expect(queryAllByRole('alert')).toHaveLength(length);

  const getAlertMessages = () =>
    getAllByRole('alert').reduce((messages: string[], alert: HTMLElement) => [...messages, alert.innerHTML], []);

  const alertMessageCheck = (message: string) => expect(getAlertMessages().includes(message));

  const mockOnSubmit = jest.fn();

  beforeEach(async () => {
    render(<SignupForm onSubmit={mockOnSubmit} />);

    emailField = getByLabelText('Email');
    confirmEmailField = getByLabelText('Confirm Email');
    firstNameField = getByLabelText('First Name');
    lastNameField = getByLabelText('Last Name');
    cancelButton = getByTestId('Cancel Button');
    signupButton = getByTestId('Sign Up Button');

    await setValue(emailField, validEmail);
    await setValue(confirmEmailField, validEmail);
    await setValue(firstNameField, validName);
    await setValue(lastNameField, validName);

    mockOnSubmit.mockReset();
  });

  it('Should render email field', () => {
    expect(emailField).toBeInTheDocument();
  });

  it('Should render confirm email field', () => {
    expect(confirmEmailField).toBeInTheDocument();
  });

  it('Should render first name field', () => {
    expect(firstNameField).toBeInTheDocument();
  });

  it('Should render last name field', () => {
    expect(lastNameField).toBeInTheDocument();
  });

  it('Should render Sign Up button', () => {
    expect(signupButton).toBeInTheDocument();
  });

  it('Should render Cancel button', () => {
    expect(cancelButton).toBeInTheDocument();
  });

  describe('Valid input', () => {
    it('Should call onSubmit once all form data is valid, ', async () => {
      await submitClick();
      expect(mockOnSubmit).toHaveBeenCalled();
    });

    it('Should not display error messages', async () => {
      alertLengthCheck(0);
    });
  });

  describe('Invalid input', () => {
    it('Should not call onSubmit', async () => {
      await setValue(emailField, '');
      await setValue(confirmEmailField, '');
      await setValue(firstNameField, '');
      await setValue(lastNameField, '');

      await submitClick();

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('Should display error messages', async () => {
      await setValue(emailField, invalidEmail);
      await setValue(confirmEmailField, mismatchEmail);
      await setValue(firstNameField, longName);
      await setValue(lastNameField, shortName);

      alertLengthCheck(4);
    });
  });

  describe('Invalid email', () => {
    it('Should only display invalid email error message', async () => {
      await setValue(emailField, invalidEmail);

      alertLengthCheck(1);
      alertMessageCheck(INVALID_EMAIL);
    });
  });

  describe('Non matching email', () => {
    it('Should only display email mismatch error message', async () => {
      await setValue(confirmEmailField, mismatchEmail);

      alertLengthCheck(1);
      alertMessageCheck(EMAIL_MATCH);
    });
  });

  describe('Required email', () => {
    it('Should display email required message', async () => {
      await setValue(emailField, '');
      await setValue(confirmEmailField, '');

      alertLengthCheck(2);
      alertMessageCheck(EMAIL_REQUIRED);
    });

    it('Should display emailConfirm required message', async () => {
      await setValue(confirmEmailField, '');
      await setValue(emailField, '');

      alertLengthCheck(2);
      alertMessageCheck(EMAIL_REQUIRED);
    });

    it('Should only display first name required message', async () => {
      await setValue(firstNameField, '');

      alertLengthCheck(1);
      alertMessageCheck(FIRST_NAME_REQUIRED);
    });

    it('Should only display last name required message', async () => {
      await setValue(lastNameField, '');

      alertLengthCheck(1);
      alertMessageCheck(LAST_NAME_REQUIRED);
    });
  });

  describe('Name length', () => {
    it('Should only display first name length message for being under the range', async () => {
      await setValue(firstNameField, shortName);

      alertLengthCheck(1);
      alertMessageCheck(NAME_LENGTH);
    });

    it('Should only display last name length message for being under the range', async () => {
      await setValue(lastNameField, shortName);

      alertLengthCheck(1);
      alertMessageCheck(NAME_LENGTH);
    });

    it('Should only display first name length message for being over the range', async () => {
      await setValue(firstNameField, longName);

      alertLengthCheck(1);
      alertMessageCheck(NAME_LENGTH);
    });

    it('Should only display last name length message for being over the range', async () => {
      await setValue(lastNameField, longName);

      alertLengthCheck(1);
      alertMessageCheck(NAME_LENGTH);
    });
  });

  describe('On Cancel', () => {
    let history: MemoryHistory;

    beforeEach(() => {
      cleanup();
      history = createMemoryHistory();
      history.push('/');

      render(
        <Router history={history}>
          <SignupForm onSubmit={mockOnSubmit} />
        </Router>,
      );
    });

    it('should navigate back to the previous route', async () => {
      history.push('/');
      await act(async () => click(cancelButton));
      expect(history.location.pathname).toBe('/');
    });

    it('should navigate to sign up page', async () => {
      history.push('/auth/signup');
      await act(async () => click(signupButton));
      expect(history.location.pathname).toBe('/auth/signup');
    });
  });
});
