import { render } from '@testing-library/react';
import { LoginForm } from '../index';
import { errorMessages } from '../schema';
import {
  clickByRoleAsync,
  expectInDocByLabelText,
  expectInDocByRole,
  expectLengthByRole,
  expectMockFunctionCalled,
  expectMockFunctionNotCalled,
  setValueByLabelText,
  expectInnerHTMLByRole
} from '../../../utils/test';

const { PASSWORD_REQUIRED, INVALID_EMAIL, EMAIL_REQUIRED } = errorMessages;

describe('LoginForm', () => {
  const validEmail = 'test@email.com';
  const invalidEmail = 'test.com';
  const validPassword = 'Password123!';
  const mockOnSubmit = jest.fn();


  beforeEach(async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await setValueByLabelText('Email', validEmail); 
    await setValueByLabelText('Password', validPassword);
  });

  it('Should render email field', () => 
    expectInDocByLabelText('Email'));

  it('Should render password field', () => 
    expectInDocByLabelText('Password'));

  it('Should render submit button', () => 
    expectInDocByRole('button'));

  describe('Valid input', () => {
    it('Should call onSubmit once formData object including username and password', async () => {
      await clickByRoleAsync('button');
      expectLengthByRole('alert', 0);
      expectMockFunctionCalled(mockOnSubmit);
      mockOnSubmit.mockReset();
    });

    it('Should not display error messages', async () => 
      expectLengthByRole('alert', 0));
  });

  describe('Invalid input', () => {
    it('should not call onSubmit', async () => {
      await setValueByLabelText('Email', '');
      await setValueByLabelText('Password', '');
      await clickByRoleAsync('button');
      expectMockFunctionNotCalled(mockOnSubmit);
      mockOnSubmit.mockReset();
    });

    it('Should display error messages', async () => {
      await setValueByLabelText('Email', '');
      await setValueByLabelText('Password', '');
      expectLengthByRole('alert', 2);
    });

    describe('Invalid email', () => {
      it('Should only display email required error message', async () => {
        await setValueByLabelText('Email', '');
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', EMAIL_REQUIRED);
      });

      it('Should only display invalid email error message', async () => {
        await setValueByLabelText('Email', '');
        await setValueByLabelText('Email', invalidEmail);
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', INVALID_EMAIL);
      });
    });

    describe('Invalid password', () => {
      it('should only display password required error message', async () => {
        await setValueByLabelText('Password', '');
        expectLengthByRole('alert', 1);
        expectInnerHTMLByRole('alert', PASSWORD_REQUIRED);
      });
    });
  });
});