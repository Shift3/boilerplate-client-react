import { render } from '@testing-library/react';
import { ResetPasswordForm } from '../';
import { errorMessages } from '../schema';
import { screen } from '@testing-library/react';

import {
  clickByRoleAsync,
  expectLengthByRole,
  setValueByLabelText,
  expectInnerHTMLByRole,
  expectMockFunctionNotCalled,
  expectInDocByLabelText,
  expectInDocByRole,
  expectInDocByTestId,
} from 'utils/test';


const { 
  PASSWORD_MATCH,
  PASSWORD_LENGTH,
  PASSWORD_NUMBER,
  PASSWORD_REQUIRED,
  PASSWORD_LOWERCASE,
  PASSWORD_UPPERCASE,
  PASSWORD_SPECIAL_CHARACTER,
} = errorMessages;

const validCurrentPassword = 'Password123!';
const shortPassword = 'T123!';
const noSpecialCharPassword= 'Password123';
const noNumberPassword = 'Password!';
const noUppercasePassword = 'password123!';
const noLowercasePassword = 'PASSWORD123!';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('LoginForm', () => {


  describe('Rendering', () => {
    beforeEach(() => render(<ResetPasswordForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />));

    it('should render the current password field', () =>
      expectInDocByLabelText('Current Password'));

    it('should render the new password field', () =>
      expectInDocByLabelText('New Password'));

    it('should render the confirm password field', () =>
      expectInDocByLabelText('Confirm Password'));

    it('should render the submit button', () =>
      expectInDocByTestId('submitButton'));
  });

  describe('With valid input', () => {
    beforeEach(() => render(<ResetPasswordForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />));


    it('Should call onSubmit once formData object including password and confirmPassword', async () => {
      // @HERE - pair programming
      await clickByRoleAsync('button');
      expect(mockOnSubmit).toHaveBeenCalled();

      mockOnSubmit.mockReset();
    });

    it('Should not display error messages', async () => {
      expectLengthByRole('alert', 0);
    });
  });

  describe('Invalid input', () => {
    console.log("hitting 4");
    it('Should not call onSubmit', async () => {
      await setValueByLabelText('Password', '');
      await setValueByLabelText('Confirm Password', '');
      await clickByRoleAsync('button');
      expectMockFunctionNotCalled(mockOnSubmit);

      mockOnSubmit.mockReset();
    });

    it('Should display error messages', async () => {
      await setValueByLabelText('Password', '');
      await setValueByLabelText('Confirm Password', '');

      expectLengthByRole('alert', 2);
    });

    describe('Invalid password', () => {
      console.log("hitting 5");
      it('Should only display password required error message', async () => {
        await setValueByLabelText('Password', '');
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_REQUIRED);
      });

      it ('Should only display special character required error message', async () => {
        await setValueByLabelText('Password', noSpecialCharPassword);
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_SPECIAL_CHARACTER);
      });

      it ('Should only display number required error message', async () => {
        await setValueByLabelText('Password', noNumberPassword);
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_NUMBER);
      });

      it ('Should only display uppercase letter required error message', async () => {
        await setValueByLabelText('Password', noUppercasePassword);
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_UPPERCASE);
      });

      it ('Should only display lowercase letter required error message', async () => {
        await setValueByLabelText('Password', noLowercasePassword);
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_LOWERCASE);
      });
      it('Should only display password mismatch error message', async () => {
        await setValueByLabelText('Password', validPassword);
        await setValueByLabelText('Confirm Password', shortPassword);
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_MATCH);
      });
    });
  });
});