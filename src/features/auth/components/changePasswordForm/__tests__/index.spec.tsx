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
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

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

describe('ChangePasswordForm', () => {
  const validCurrentPassword = 'Password123!';
  const validNewPassword = 'Password456!';
  const shortPassword = 'Aa1!';
  const noSpecialCharPassword = 'Password123';
  const noNumberPassword = 'Password!';
  const noUppercasePassword = 'password123!';
  const noLowercasePassword = 'PASSWORD123!';

  const mockOnSubmit = jest.fn();

  beforeEach(async () => {
    render(
      <ThemeProvider theme={AppTheme}>
        <ChangePasswordForm onSubmit={mockOnSubmit} />
      </ThemeProvider>,
    );
  });

  describe('With valid input', () => {
    it('should render the current password field', () => expectInDocByLabelText('Current Password'));
    it('should render the new password field', () => expectInDocByLabelText('New Password'));
    it('should render the confirm password field', () => expectInDocByLabelText('Confirm Password'));
    it('should render the submit button', () => expectInDocByTestId('submitButton'));
    it('should render the cancel button', () => expectInDocByTestId('cancelButton'));

    it('Should call onSubmit once with form data', async () => {
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

    describe('Invalid input', () => {
      beforeEach(async () => {
        render(
          <ThemeProvider theme={AppTheme}>
            <ChangePasswordForm onSubmit={mockOnSubmit} />
          </ThemeProvider>,
        );
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
      mockOnSubmit.mockReset();
    });

    describe('Invalid password', () => {
      it('Should only display CURRENT_PASSWORD_REQUIRED error message', async () => {
        await setValueByLabelText('Current Password', 'test');
        await setValueByLabelText('Current Password', '');
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', CURRENT_PASSWORD_REQUIRED);
      });

      it.skip('Should only display NEW_PASSWORD_REQUIRED error message', async () => {
        await setValueByLabelText('Current Password', 'something');
        await setValueByLabelText('New Password', 'test');
        await setValueByLabelText('New Password', '');
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', NEW_PASSWORD_REQUIRED);
      });

      it.skip('Should only display CONFIRM_PASSWORD_REQUIRED error message', async () => {
        await setValueByLabelText('Confirm Password', 'test');
        await setValueByLabelText('Confirm Password', '');
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', CONFIRM_PASSWORD_REQUIRED);
      });

      it.skip('Should only display password length error message', async () => {
        await setValueByLabelText('New Password', shortPassword);
        await setValueByLabelText('Confirm Password', shortPassword);
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_LENGTH);
      });

      it.skip('Should only display special character required error message', async () => {
        await setValueByLabelText('New Password', noSpecialCharPassword);
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_SPECIAL_CHARACTER);
      });

      it.skip('Should only display number required error message', async () => {
        await setValueByLabelText('New Password', noNumberPassword);
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_NUMBER);
      });

      it.skip('Should only display uppercase letter required error message', async () => {
        await setValueByLabelText('New Password', noUppercasePassword);
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_UPPERCASE);
      });

      it.skip('Should only display lowercase letter required error message', async () => {
        await setValueByLabelText('New Password', noLowercasePassword);
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_LOWERCASE);
      });

      it.skip('Should only display PASSWORD_MUST_MATCH error message', async () => {
        const nonMatchingPassword = `${validNewPassword}4`;

        await setValueByLabelText('New Password', validNewPassword);
        await setValueByLabelText('Confirm Password', nonMatchingPassword);
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_MUST_MATCH);
      });

      it.skip('Should only display PASSWORD_MUST_MISMATCH error message', async () => {
        await setValueByLabelText('Current Password', validNewPassword);
        await setValueByLabelText('New Password', validNewPassword);
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_MUST_MISMATCH);
      });
    });
  });
});
