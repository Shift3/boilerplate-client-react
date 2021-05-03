import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SetPasswordForm } from './';
import { errorMessages } from './schema';

describe('LoginForm', () => {
  const validPassword = 'Password123!';
  const shortPassword= 'test';
  const longPassword = 'passwordtoolong';

  let passwordField: HTMLElement;
  let confirmPasswordField: HTMLElement;
  let submitButton: HTMLElement;
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<SetPasswordForm onSubmit={mockOnSubmit} />)
    passwordField = screen.getByLabelText(/password/i)
    confirmPasswordField = screen.getByLabelText(/confirm password/i)
    submitButton = screen.getByRole('button', {
      name: /submit/i,
    })
    mockOnSubmit.mockReset()
  })

  it('should render', () => {
    expect(passwordField).toBeInTheDocument()
    expect(confirmPasswordField).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  describe('valid input', () => {

    it('should call onSubmit once formData object including password and confirmPassword', async () => {
      userEvent.type(passwordField, validPassword)
      userEvent.type(confirmPasswordField, validPassword)
      await act(async () => {
        userEvent.click(submitButton)
      })

      const formData = {
        password: validPassword, 
        confirmPassword: validPassword
      }

      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(formData)
    })

    it('should not display error messages', async () => {
      userEvent.type(passwordField, validPassword)
      userEvent.type(confirmPasswordField, validPassword)
      await act(async () => {
        userEvent.click(submitButton)
      })

      expect(screen.queryAllByRole('alert')).toHaveLength(0)
    })
  })

  describe('invalid input', () => {

    it('should not call onSubmit', async () => {
      userEvent.type(passwordField, '')
      userEvent.type(confirmPasswordField, '')
      await act(async () => {
        userEvent.click(submitButton)
      })

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('should display error messages', async () => {
      userEvent.type(passwordField, 't')
      userEvent.type(passwordField, 't')
      await act(async () => {
        userEvent.click(submitButton)
      })

      expect(screen.getAllByRole('alert')).toHaveLength(2)
    })

    describe('invalid password', () => {

      it('should only display password required error message', async () => {
        userEvent.type(passwordField, '')
        userEvent.type(passwordField, '')
        await act(async () => {
          userEvent.click(submitButton)
        })

        expect(screen.getAllByRole('alert')).toHaveLength(1)
        expect(screen.getByRole('alert').innerHTML).toBe(errorMessages.PASSWORD_REQUIRED)
      })
    })

    describe('non matching password', () => {

      it('should only display password mismatch error message', async () => {
        userEvent.type(passwordField, validPassword)
        userEvent.type(confirmPasswordField, 'test')
        await act(async () => {
          userEvent.click(submitButton)
        })

        expect(screen.getAllByRole('alert')).toHaveLength(1)
        expect(screen.getByRole('alert').innerHTML).toBe(errorMessages.PASSWORD_MATCH)
      })
    })
  })

  describe('invalid password length', () => {

    it('should only display password length error message', async () => {
      userEvent.type(passwordField, shortPassword)
      userEvent.type(confirmPasswordField, shortPassword)
      await act(async () => {
        userEvent.click(submitButton)
      })

      expect(screen.getAllByRole('alert')).toHaveLength(1)
      expect(screen.getByRole('alert').innerHTML).toBe(errorMessages.PASSWORD_MATCH)
    })

    it('should only display password length error message', async () => {
      userEvent.type(passwordField, longPassword)
      userEvent.type(confirmPasswordField, longPassword)
      await act(async () => {
        userEvent.click(submitButton)
      })
  
      expect(screen.getAllByRole('alert')).toHaveLength(1)
      expect(screen.getByRole('alert').innerHTML).toBe(errorMessages.PASSWORD_MATCH)
    })
  })
})
