/* eslint-disable require-await */
import { render } from '@testing-library/react';
import { Constants } from 'utils/constants';
import { ChangePasswordForm } from '../index';
import {
  expectLengthByRole,
  expectInnerHTMLByRole,
  expectMockFunctionNotCalled,
  expectInDocByLabelText,
  expectInDocByTestId,
  clickByTestIdAsync,
  setValueByLabelText,
} from 'utils/test';

const {
  CURRENT_PASSWORD_REQUIRED,
  NEW_PASSWORD_REQUIRED,
  CONFIRM_PASSWORD_REQUIRED,
  PASSWORD_LENGTH,
  PASSWORD_MUST_MISMATCH,
  PASSWORD_MUST_MATCH,
  PASSWORD_LOWERCASE,
  PASSWORD_UPPERCASE,
  PASSWORD_SPECIAL_CHARACTER,
  PASSWORD_NUMBER,
} = Constants.errorMessages;

const validCurrentPassword = 'Password123!';
const validNewPassword = 'Password456!';
const shortPassword = 'Aa1!';
const noSpecialCharPassword = 'Password123';
const noNumberPassword = 'Password!';
const noUppercasePassword = 'password123!';
const noLowercasePassword = 'PASSWORD123!';

const mockOnSubmit = jest.fn();

describe('ChangePasswordForm', () => {
  describe('Rendering', () => {
    beforeEach(() => render(<ChangePasswordForm onSubmit={mockOnSubmit} />));

    it('should render the current password field', () => expectInDocByLabelText('Current Password'));

    it('should render the new password field', () => expectInDocByLabelText('New Password'));

    it('should render the confirm password field', () => expectInDocByLabelText('Confirm Password'));

    it('should render the submit button', () => expectInDocByTestId('submitButton'));

    it('should render the cancel button', () => expectInDocByTestId('cancelButton'));
  });

  describe('With valid input', () => {
    beforeEach(() => render(<ChangePasswordForm onSubmit={mockOnSubmit} />));
    // Open a separate issue to refactor this to handle form data
    it.skip('Should call onSubmit once formData object including password and confirmPassword', async () => {
      await setValueByLabelText('Current Password', validCurrentPassword);
      await setValueByLabelText('New Password', validNewPassword);
      await setValueByLabelText('Confirm Password', validNewPassword);

      await clickByTestIdAsync('submitButton');
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith({
        currentPassword: validCurrentPassword,
        newPassword: validNewPassword,
        confirmPassword: validNewPassword,
      });
      mockOnSubmit.mockReset();
    });

    it('Should not display error messages', () => {
      expectLengthByRole('alert', 0);
    });
  });

  describe('Invalid input', () => {
    beforeEach(async () => {
      render(<ChangePasswordForm onSubmit={mockOnSubmit} />);
      await setValueByLabelText('Current Password', validCurrentPassword);
      await setValueByLabelText('New Password', validNewPassword);
      await setValueByLabelText('Confirm Password', validNewPassword);
    });

    it('Should not call onSubmit', async () => {
      await setValueByLabelText('Current Password', '');
      await setValueByLabelText('New Password', '');
      await setValueByLabelText('Confirm Password', '');
      await clickByTestIdAsync('submitButton');
      expectMockFunctionNotCalled(mockOnSubmit);

      mockOnSubmit.mockReset();
    });

    it('Should display error messages', async () => {
      await setValueByLabelText('Current Password', '');
      await setValueByLabelText('New Password', '');
      await setValueByLabelText('Confirm Password', '');

      expectLengthByRole('alert', 3);
    });
  });

  describe('Invalid password', () => {
    beforeEach(async () => {
      render(<ChangePasswordForm onSubmit={mockOnSubmit} />);
    });

    it('Should only display CURRENT_PASSWORD_REQUIRED error message', async () => {
      await setValueByLabelText('Current Password', 'test');
      await setValueByLabelText('Current Password', '');
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', CURRENT_PASSWORD_REQUIRED);
    });

    it('Should only display NEW_PASSWORD_REQUIRED error message', async () => {
      await setValueByLabelText('Current Password', 'something');
      await setValueByLabelText('New Password', 'test');
      await setValueByLabelText('New Password', '');
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', NEW_PASSWORD_REQUIRED);
    });

    it('Should only display CONFIRM_PASSWORD_REQUIRED error message', async () => {
      await setValueByLabelText('Confirm Password', 'test');
      await setValueByLabelText('Confirm Password', '');
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', CONFIRM_PASSWORD_REQUIRED);
    });

    it('Should only display password length error message', async () => {
      await setValueByLabelText('New Password', shortPassword);
      await setValueByLabelText('Confirm Password', shortPassword);
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', PASSWORD_LENGTH);
    });

    it('Should only display special character required error message', async () => {
      await setValueByLabelText('New Password', noSpecialCharPassword);
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', PASSWORD_SPECIAL_CHARACTER);
    });

    it('Should only display number required error message', async () => {
      await setValueByLabelText('New Password', noNumberPassword);
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', PASSWORD_NUMBER);
    });

    it('Should only display uppercase letter required error message', async () => {
      await setValueByLabelText('New Password', noUppercasePassword);
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', PASSWORD_UPPERCASE);
    });

    it('Should only display lowercase letter required error message', async () => {
      await setValueByLabelText('New Password', noLowercasePassword);
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', PASSWORD_LOWERCASE);
    });

    it('Should only display PASSWORD_MUST_MATCH error message', async () => {
      const nonMatchingPassword = `${validNewPassword}4`;

      await setValueByLabelText('New Password', validNewPassword);
      await setValueByLabelText('Confirm Password', nonMatchingPassword);
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', PASSWORD_MUST_MATCH);
    });

    it('Should only display PASSWORD_MUST_MISMATCH error message', async () => {
      await setValueByLabelText('Current Password', validNewPassword);
      await setValueByLabelText('New Password', validNewPassword);
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', PASSWORD_MUST_MISMATCH);
    });
  });
});
