import { render } from '@testing-library/react';
import { Constants } from 'utils/constants';
import { LogInForm } from '../LoginForm';
import {
  clickByTestIdAsync,
  expectInDocByLabelText,
  expectInDocByTestId,
  expectLengthByRole,
  expectMockFunctionCalled,
  expectMockFunctionNotCalled,
  setValueByLabelText,
  expectInnerHTMLByRole,
} from 'utils/test';

const { EMAIL_REQUIRED, INVALID_EMAIL, PASSWORD_REQUIRED } = Constants.errorMessages;

describe('LoginForm', () => {
  const validEmail = 'test@email.com';
  const invalidEmail = 'test.com';
  const validPassword = 'Password123!';
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(async () => {
    render(<LogInForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await setValueByLabelText('Email', validEmail);
    await setValueByLabelText('Password', validPassword);
  });

  it('Should render email field', () => expectInDocByLabelText('Email'));

  it('Should render password field', () => expectInDocByLabelText('Password'));

  it('Should render cancel button', () => expectInDocByTestId('cancelButton'));

  it('Should render submit button', () => expectInDocByTestId('submitButton'));

  describe('Valid input', () => {
    it('Should call logIn once formData object is submitted with username and password', async () => {
      await clickByTestIdAsync('submitButton');
      expectLengthByRole('alert', 0);
      expectMockFunctionCalled(mockOnSubmit);
      mockOnSubmit.mockReset();
    });

    it('Should not display error messages', () => expectLengthByRole('alert', 0));
  });

  describe('Invalid input', () => {
    it('should not call onSubmit', async () => {
      await setValueByLabelText('Email', '');
      await setValueByLabelText('Password', '');
      await clickByTestIdAsync('submitButton');
      expectMockFunctionNotCalled(mockOnSubmit);
      mockOnSubmit.mockReset();
    });

    it('Should display error messages', async () => {
      await setValueByLabelText('Email', '');
      await setValueByLabelText('Password', '');
      expectLengthByRole('alert', 2);
    });

    describe('Invalid email', () => {
      it('Should only display EMAIL_REQUIRED error message', async () => {
        await setValueByLabelText('Email', '');
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', EMAIL_REQUIRED);
      });

      it('Should only display INVALID_EMAILerror message', async () => {
        await setValueByLabelText('Email', '');
        await setValueByLabelText('Email', invalidEmail);
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', INVALID_EMAIL);
      });
    });

    describe('Invalid password', () => {
      it('should only display PASSWORD_REQUIRED error message', async () => {
        await setValueByLabelText('Password', '');
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_REQUIRED);
      });
    });
  });
});
