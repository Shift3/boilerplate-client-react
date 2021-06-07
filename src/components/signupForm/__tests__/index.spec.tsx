import { render } from '@testing-library/react';
import { clickByRoleAsync, expectInDocByLabelText, expectInDocByRole, expectInnerHTMLByRole, expectLengthByRole, expectMockFunctionCalled, expectMockFunctionNotCalled, setValueByLabelText, formAlertMessageCheck } from 'utils/test';
import { SignupForm } from '../index';
import { errorMessages } from '../schema';

const {
  EMAIL_REQUIRED,
  INVALID_EMAIL,
  EMAIL_MATCH,
  FIRST_NAME_REQUIRED,
  LAST_NAME_REQUIRED,
  NAME_LENGTH,
} = errorMessages;

describe('SignupForm', () => {
  const validEmail = 'test@test.com';
  const invalidEmail = 'test.com';
  const mismatchEmail = 'test@tets.com';
  const validName = 'test';
  const shortName = 't';
  const longName = 'thisisclearlywaytoolongandisnotavalidnamebecauseitiswelloverfiftycharacters';

  const mockOnSubmit = jest.fn();

  beforeEach(async () => {
    render(<SignupForm onSubmit={mockOnSubmit} />);

    await setValueByLabelText('Email', validEmail);
    await setValueByLabelText('Confirm Email', validEmail);
    await setValueByLabelText('First Name', validName);
    await setValueByLabelText('Last Name', validName);
  });

  it('Should render email field', () => 
    expectInDocByLabelText('Email'));

  it('Should render confirm email field', () =>
    expectInDocByLabelText('Confirm Email'));

  it('Should render first name field', () =>
  expectInDocByLabelText('First Name'));

  it('Should render last name field', () =>
    expectInDocByLabelText('Last Name'));

  it('Should render submit button', () =>
  expectInDocByRole('button'));

  describe('Valid input', () => {
    it('Should call onSubmit once all form data is valid, ', async () => {
      await clickByRoleAsync('button');
      expectMockFunctionCalled(mockOnSubmit);

          mockOnSubmit.mockReset();
    });

    it('Should not display error messages', async () =>
      expectLengthByRole('alert', 0));
  });

  describe('Invalid input', () => {
    it('Should not call onSubmit', async () => {
      await setValueByLabelText('Email', '');
      await setValueByLabelText('Confirm Email', '');
      await setValueByLabelText('First Name', '');
      await setValueByLabelText('Last Name', '');
      await clickByRoleAsync('button');
      expectMockFunctionNotCalled(mockOnSubmit);

      mockOnSubmit.mockReset();
    });

    it('Should display error messages', async () => {
      await setValueByLabelText('Email', invalidEmail);
      await setValueByLabelText('Confirm Email', mismatchEmail);
      await setValueByLabelText('First Name', longName);
      await setValueByLabelText('Last Name', shortName);
      expectLengthByRole('alert', 4);
    });
  });

  describe('Invalid email', () => {
    it('Should only display invalid email error message', async () => {
      await setValueByLabelText('Email', invalidEmail);
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', INVALID_EMAIL);
    });
  });

  describe('Non matching email', () => {
    it('Should only display email mismatch error message', async () => {
      await setValueByLabelText('Confirm Email', mismatchEmail);
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', EMAIL_MATCH);
    });
  });

  describe('Required email', () => {
    it('Should display email required message', async () => {
      await setValueByLabelText('Email', '');
      await setValueByLabelText('Confirm Email', '');
      expectLengthByRole('alert', 2);
      formAlertMessageCheck(EMAIL_REQUIRED);
    });

    it('Should display emailConfirm required message', async () => {
      await setValueByLabelText('Confirm Email', '');
      await setValueByLabelText('Email', '');
      expectLengthByRole('alert', 2);
      formAlertMessageCheck(EMAIL_REQUIRED);
    });

    it('Should only display first name required message', async () => {
      await setValueByLabelText('First Name', '');
      expectLengthByRole('alert', 1);
      formAlertMessageCheck(FIRST_NAME_REQUIRED);
    });

    it('Should only display last name required message', async () => {
      await setValueByLabelText('Last Name', '');
      expectLengthByRole('alert', 1);
      formAlertMessageCheck(LAST_NAME_REQUIRED);
    });
  });

  describe('Name length', () => {
    it('Should only display first name length message for being under the range', async () => {
      await setValueByLabelText('First Name', shortName);
      expectLengthByRole('alert', 1);
      formAlertMessageCheck(NAME_LENGTH);
    });

    it('Should only display last name length message for being under the range', async () => {
      await setValueByLabelText('Last Name', shortName);
      expectLengthByRole('alert', 1);
      formAlertMessageCheck(NAME_LENGTH);
    });

    it('Should only display first name length message for being over the range', async () => {
      await setValueByLabelText('First Name', longName);
      expectLengthByRole('alert', 1);
      formAlertMessageCheck(NAME_LENGTH);
    });

    it('Should only display last name length message for being over the range', async () => {
      await setValueByLabelText('Last Name', longName);
      expectLengthByRole('alert', 1);
      formAlertMessageCheck(NAME_LENGTH);
    });
  });
});
