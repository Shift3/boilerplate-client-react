import { render } from '@testing-library/react';
import {
  clickByTestIdAsync,
  expectInDocByLabelText,
  expectInDocByTestId,
  expectInnerHTMLByRole,
  expectLengthByRole,
  expectMockFunctionCalled,
  expectMockFunctionNotCalled,
  setValueByLabelText,
  formAlertMessageCheck,
} from 'utils/test';
import { SignUpForm } from '../index';
import { Constants } from 'utils/constants';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const { EMAIL_REQUIRED, INVALID_EMAIL, EMAIL_MATCH, FIRST_NAME_REQUIRED, LAST_NAME_REQUIRED } = Constants.errorMessages;

describe('SignupForm', () => {
  const validEmail = 'test@test.com';
  const invalidEmail = 'test.com';
  const mismatchEmail = 'test@tets.com';
  const validName = 'test';
  const shortName = 't';
  const longName = 'thisisclearlywaytoolongandisnotavalidnamebecauseitiswelloverfiftycharacters';

  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(async () => {
    render(
      <ThemeProvider theme={AppTheme}>
        <SignUpForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </ThemeProvider>,
    );

    await setValueByLabelText('Email', validEmail);
    await setValueByLabelText('Confirm Email', validEmail);
    await setValueByLabelText('First Name', validName);
    await setValueByLabelText('Last Name', validName);
  });

  it('Should render email field', () => expectInDocByLabelText('Email'));

  it.skip('Should render confirm email field', () => expectInDocByLabelText('Confirm Email'));

  it.skip('Should render first name field', () => expectInDocByLabelText('First Name'));

  it.skip('Should render last name field', () => expectInDocByLabelText('Last Name'));

  it.skip('Should render sign up button', () => expectInDocByTestId('signUpButton'));

  describe('Valid input', () => {
    it.skip('Should call onSubmit once all form data is valid, ', async () => {
      await clickByTestIdAsync('signUpButton');
      expectMockFunctionCalled(mockOnSubmit);

      mockOnSubmit.mockReset();
    });

    it.skip('Should not display error messages', () => expectLengthByRole('alert', 0));
  });

  describe('Invalid input', () => {
    it.skip('Should not call onSubmit', async () => {
      await setValueByLabelText('Email', '');
      await setValueByLabelText('Confirm Email', '');
      await setValueByLabelText('First Name', '');
      await setValueByLabelText('Last Name', '');
      await clickByTestIdAsync('signUpButton');
      expectMockFunctionNotCalled(mockOnSubmit);

      mockOnSubmit.mockReset();
    });

    it.skip('Should display error messages', async () => {
      await setValueByLabelText('Email', invalidEmail);
      await setValueByLabelText('Confirm Email', mismatchEmail);
      await setValueByLabelText('First Name', longName);
      await setValueByLabelText('Last Name', shortName);
      expectLengthByRole('alert', 2);
    });
  });

  describe('Invalid email', () => {
    it.skip('Should only display invalid email error message', async () => {
      await setValueByLabelText('Email', invalidEmail);
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', INVALID_EMAIL);
    });
  });

  describe('Non matching email', () => {
    it.skip('Should only display email mismatch error message', async () => {
      await setValueByLabelText('Confirm Email', mismatchEmail);
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', EMAIL_MATCH);
    });
  });

  describe('Required email', () => {
    it.skip('Should display email required message', async () => {
      await setValueByLabelText('Email', '');
      await setValueByLabelText('Confirm Email', '');
      expectLengthByRole('alert', 2);
      formAlertMessageCheck(EMAIL_REQUIRED);
    });

    it.skip('Should display emailConfirm required message', async () => {
      await setValueByLabelText('Confirm Email', '');
      await setValueByLabelText('Email', '');
      expectLengthByRole('alert', 2);
      formAlertMessageCheck(EMAIL_REQUIRED);
    });

    it.skip('Should only display first name required message', async () => {
      await setValueByLabelText('First Name', '');
      expectLengthByRole('alert', 1);
      formAlertMessageCheck(FIRST_NAME_REQUIRED);
    });

    it.skip('Should only display last name required message', async () => {
      await setValueByLabelText('Last Name', '');
      expectLengthByRole('alert', 1);
      formAlertMessageCheck(LAST_NAME_REQUIRED);
    });
  });
});
