import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { LoginForm } from '.';
import { errorMessages } from './schema';

const { type, click, clear } = userEvent;
const { getByLabelText, getByRole, getAllByRole, queryAllByRole } = screen;
const { PASSWORD_REQUIRED, INVALID_EMAIL, EMAIL_REQUIRED } = errorMessages;

describe('LoginForm', () => {
  const validEmail = 'test@email.com';
  const invalidEmail = 'test.com';
  const validPassword = 'Password123!';

  let emailField: HTMLElement;
  let passwordField: HTMLElement;
  let submitButton: HTMLElement;
  const mockOnSubmit = jest.fn();

  const submitClick = () => act(async () => click(submitButton));

  const setValue = (element: HTMLElement, value: string) => act(async () => {
    clear(element);
    type(element, value);
  });

  const alertLengthCheck = (length: number) => expect(queryAllByRole('alert')).toHaveLength(length);

  const getAlertMessages = () => getAllByRole('alert')
  .reduce((messages: string[], alert: HTMLElement) =>  ([ ...messages, alert.innerHTML ]), []);

  const alertMessageCheck = (message: string) => expect(getAlertMessages().includes(message));

  beforeEach(async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    emailField = getByLabelText('Email');
    passwordField = getByLabelText('Password');
    submitButton = getByRole('submit');

    await setValue(emailField, validEmail);
    await setValue(passwordField, validPassword);

    mockOnSubmit.mockReset();
  })

  it('Should render', () => {
    expect(emailField).toBeInTheDocument()
    expect(passwordField).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  describe('Valid input', () => {
    it('Should call onSubmit once formData object including username and password', async () => {
      await submitClick();

      alertLengthCheck(0);
      expect(mockOnSubmit).toHaveBeenCalled();
    })

    it('Should not display error messages', async () => {      
      alertLengthCheck(0);
    })
  })

  describe('Invalid input', () => {
    it('should not call onSubmit', async () => {
      await setValue(emailField, '');
      await setValue(passwordField, '');
      
      await submitClick();

      expect(mockOnSubmit).not.toHaveBeenCalled();
    })

    it('Should display error messages', async () => {
      await setValue(emailField, '');
      await setValue(passwordField, '');

      alertLengthCheck(2);
    })

    describe('Invalid email', () => {
      it('Should only display email required error message', async () => {
        await setValue(emailField, '');

        alertLengthCheck(1);
        alertMessageCheck(EMAIL_REQUIRED);
      })

      it('Should only display invalid email error message', async () => {
        await setValue(emailField, '')
        await setValue(emailField, invalidEmail);

        alertLengthCheck(1);
        alertMessageCheck(INVALID_EMAIL);
      })
    })

    describe('Invalid password', () => {
      it('should only display password required error message', async () => {
        await setValue(passwordField, '');

        alertLengthCheck(1);
        alertMessageCheck(PASSWORD_REQUIRED);
      })
    })
  })
})