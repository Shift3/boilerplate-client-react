import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './';
import { errorMessages } from './schema';

describe('LoginForm', () => {
  const validEmail = 'test@email.com'
  const validPassword = 'Password123!'

  let emailField: HTMLElement
  let passwordField: HTMLElement
  let submitButton: HTMLElement
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    render(<LoginForm onSubmit={mockOnSubmit} />)
    emailField = screen.getByLabelText(/email/i)
    passwordField = screen.getByLabelText(/password/i)
    submitButton = screen.getByRole('button', {
      name: /submit/i,
    })
    mockOnSubmit.mockReset()
  })

  it('should render', () => {
    expect(emailField).toBeInTheDocument()
    expect(passwordField).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  describe('valid input', () => {
    it('should call onSubmit once formData object including username and password', async () => {
      userEvent.type(emailField, validEmail)
      userEvent.type(passwordField, validPassword)
      await act(async () => {
        userEvent.click(submitButton)
      })

      const formData = {
        email: validEmail, 
        password: validPassword
      }

      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(formData)
    })

    it('should not display error messages', async () => {
      userEvent.type(emailField, validEmail)
      userEvent.type(passwordField, validPassword)
      await act(async () => {
        userEvent.click(submitButton)
      })

      expect(screen.queryAllByRole('alert')).toHaveLength(0)
    })
  })

  describe('invalid input', () => {
    it('should not call onSubmit', async () => {
      userEvent.type(emailField, '')
      userEvent.type(passwordField, '')
      await act(async () => {
        userEvent.click(submitButton)
      })

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('should display error messages', async () => {
      userEvent.type(emailField, 't')
      userEvent.type(passwordField, 't')
      await act(async () => {
        userEvent.click(submitButton)
      })

      expect(screen.getAllByRole('alert')).toHaveLength(2)
    })

    describe('invalid email', () => {
      it('should only display email error message', async () => {
        userEvent.type(emailField, '')
        userEvent.type(passwordField, validPassword)
        await act(async () => {
          userEvent.click(submitButton)
        })

        expect(screen.getAllByRole('alert')).toHaveLength(1)
        expect(screen.getByRole('alert').innerHTML).toBe(errorMessages.EMAIL_REQUIRED)
      })
    })

    describe('invalid password', () => {
      it('should only display password error message', async () => {
        userEvent.type(emailField, validEmail)
        userEvent.type(passwordField, '')
        await act(async () => {
          userEvent.click(submitButton)
        })

        expect(screen.getAllByRole('alert')).toHaveLength(1)
        expect(screen.getByRole('alert').innerHTML).toBe(errorMessages.PASSWORD_REQUIRED)
      })
    })
  })
})