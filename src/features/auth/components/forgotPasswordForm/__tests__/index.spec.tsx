import { render } from '@testing-library/react';
import { Constants } from 'utils/constants';
import {
  clickByTestIdAsync,
  expectInDocByLabelText,
  expectInDocByTestId,
  expectInnerHTMLByRole,
  expectLengthByRole,
  expectMockFunctionCalled,
  setValueByLabelText,
  formAlertMessageCheck,
} from 'utils/test';
import { ForgotPasswordForm } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const { EMAIL_REQUIRED, INVALID_EMAIL } = Constants.errorMessages;

describe('ForgotPasswordForm', () => {
  const validEmail = 'test@test.com';
  const invalidEmail = 'test.com';

  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(async () => {
    render(
      <ThemeProvider theme={AppTheme}>
        <ForgotPasswordForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </ThemeProvider>,
    );

    await setValueByLabelText('Email', validEmail);
  });

  it('Should render email field', () => expectInDocByLabelText('Email'));

  it('Should render submit button', () => expectInDocByTestId('submitButton'));

  it('Should render cancel button', () => expectInDocByTestId('cancelButton'));

  describe('Valid input', () => {
    it('Should call onSubmit once all form data is valid, ', async () => {
      await clickByTestIdAsync('submitButton');
      expectMockFunctionCalled(mockOnSubmit);

      mockOnSubmit.mockReset();
    });

    it('Should not display error messages', () => expectLengthByRole('alert', 0));
  });

  describe('Invalid email', () => {
    it('Should only display invalid email error message', async () => {
      await setValueByLabelText('Email', invalidEmail);
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', INVALID_EMAIL);
    });
  });

  describe('Required email', () => {
    it('Should display email required message', async () => {
      await setValueByLabelText('Email', '');
      expectLengthByRole('alert', 1);
      formAlertMessageCheck(EMAIL_REQUIRED);
    });
  });
});
