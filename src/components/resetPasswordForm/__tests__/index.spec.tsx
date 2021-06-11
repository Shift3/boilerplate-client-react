import { render } from '@testing-library/react';
import {
  expectLengthByRole,
  expectInnerHTMLByRole,
  expectMockFunctionNotCalled,
  expectInDocByLabelText,
  expectInDocByTestId,
  clickByTestIdAsync,
  setValueByLabelText,
} from 'utils/test';
import { ResetPasswordForm } from '..';
import { errorMessages } from '../schema';

const {
  PASSWORD_MUST_MATCH,
  PASSWORD_MUST_MISMATCH,
  PASSWORD_LENGTH,
  PASSWORD_NUMBER,
  FIELD_REQUIRED,
  PASSWORD_LOWERCASE,
  PASSWORD_UPPERCASE,
  PASSWORD_SPECIAL_CHARACTER,
} = errorMessages;

const validCurrentPassword = 'Password123!';
const validNewPassword = 'Password456!';
const shortPassword = 'T123!';
const noSpecialCharPassword = 'Password123';
const noNumberPassword = 'Password!';
const noUppercasePassword = 'password123!';
const noLowercasePassword = 'PASSWORD123!';

const mockOnSubmit = jest.fn();

describe('ResetPasswordForm', () => {
  describe('Rendering', () => {
    beforeEach(() => render(<ResetPasswordForm onSubmit={mockOnSubmit} />));

    it('should render the current password field', () => expectInDocByLabelText('Current Password'));

    it('should render the new password field', () => expectInDocByLabelText('New Password'));

    it('should render the confirm password field', () => expectInDocByLabelText('Confirm Password'));

    it('should render the submit button', () => expectInDocByTestId('submitButton'));

    it('should render the submit button', () => expectInDocByTestId('cancelButton'));
  });

  describe('With valid input', () => {
    beforeEach(() => render(<ResetPasswordForm onSubmit={mockOnSubmit} />));

    it('Should call onSubmit once formData object including password and confirmPassword', async () => {
      await setValueByLabelText('Current Password', validCurrentPassword);
      await setValueByLabelText('New Password', validNewPassword);
      await setValueByLabelText('Confirm Password', validNewPassword);

      await clickByTestIdAsync('submitButton');
      expect(mockOnSubmit).toHaveBeenCalled();

      mockOnSubmit.mockReset();
    });

    it('Should not display error messages', () => {
      expectLengthByRole('alert', 0);
    });
  });

  describe('Invalid input', () => {
    beforeEach(async () => {
      render(<ResetPasswordForm onSubmit={mockOnSubmit} />);
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
      render(<ResetPasswordForm onSubmit={mockOnSubmit} />);
      await setValueByLabelText('Current Password', validCurrentPassword);
      await setValueByLabelText('New Password', validNewPassword);
      await setValueByLabelText('Confirm Password', validNewPassword);
    });

    it('Should only display password required error message', async () => {
      await setValueByLabelText('Current Password', '');
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', FIELD_REQUIRED);
    });

    it('Should only display new password required error message', async () => {
      await setValueByLabelText('New Password', '');
      expectLengthByRole('alert', 1);
      expectInnerHTMLByRole('alert', FIELD_REQUIRED);
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
