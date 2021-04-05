import React from 'react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  const validUsername = 'test@email.com'
  const validPassword = 'Password123!'

  let usernameField: HTMLElement
  let passwordField: HTMLElement
  let submitButton: HTMLElement
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    render(<LoginForm onSubmit={mockOnSubmit} />)
    usernameField = screen.getByLabelText(/username/i)
    passwordField = screen.getByLabelText(/password/i)
    submitButton = screen.getByRole('button', {
      name: /submit/i,
    })
  })

  test('should render', () => {
    expect(usernameField).toBeInTheDocument()
    expect(passwordField).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  describe('input validation', () => {
    test('should call onSubmit with username and password if validation succeeds', async () => {
      mockOnSubmit.mockReset()

      userEvent.type(usernameField, validUsername)
      userEvent.type(passwordField, validPassword)
      await act(async () => {
        userEvent.click(submitButton)
      })

      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(validUsername, validPassword)
    })

    describe('username', () => {
      test('should fail validation if username is empty', async () => {
        const testUsername = ''

        mockOnSubmit.mockReset()

        userEvent.type(usernameField, testUsername)
        userEvent.type(passwordField, validPassword)
        await act(async () => {
          userEvent.click(submitButton)
        })

        expect(mockOnSubmit).not.toHaveBeenCalled()
      })

      test('should fail validation if username is not a valid email', async () => {
        const testUsername = 'testemail'

        mockOnSubmit.mockReset()

        userEvent.type(usernameField, testUsername)
        userEvent.type(passwordField, validPassword)
        await act(async () => {
          userEvent.click(submitButton)
        })

        expect(mockOnSubmit).not.toHaveBeenCalled()
      })
    })

    describe('password', () => {
      test('should fail validation if password is empty', async () => {
        const testPassword = ''

        mockOnSubmit.mockReset()

        userEvent.type(usernameField, validUsername)
        userEvent.type(passwordField, testPassword)
        await act(async () => {
          userEvent.click(submitButton)
        })

        expect(mockOnSubmit).not.toHaveBeenCalled()
      })

      test('should fail validation if password is less than 8 characters long', async () => {
        const testPassword = 'Test1!'

        mockOnSubmit.mockReset()

        userEvent.type(usernameField, validUsername)
        userEvent.type(passwordField, testPassword)
        await act(async () => {
          userEvent.click(submitButton)
        })

        expect(mockOnSubmit).not.toHaveBeenCalled()
      })

      test('should fail validation if password does not contain at least 1 uppercase letter', async () => {
        const testPassword = '1abcdefg!'

        mockOnSubmit.mockReset()

        userEvent.type(usernameField, validUsername)
        userEvent.type(passwordField, testPassword)
        await act(async () => {
          userEvent.click(submitButton)
        })

        expect(mockOnSubmit).not.toHaveBeenCalled()
      })

      test('should fail validation if password does not contain at least 1 lowercase letter', async () => {
        const testPassword = '1ABCDEFG!'

        mockOnSubmit.mockReset()

        userEvent.type(usernameField, validUsername)
        userEvent.type(passwordField, testPassword)
        await act(async () => {
          userEvent.click(submitButton)
        })

        expect(mockOnSubmit).not.toHaveBeenCalled()
      })

      test('should fail validation if password does not contain at least 1 number', async () => {
        const testPassword = 'Aabcdefg!'

        mockOnSubmit.mockReset()

        userEvent.type(usernameField, validUsername)
        userEvent.type(passwordField, testPassword)
        await act(async () => {
          userEvent.click(submitButton)
        })

        expect(mockOnSubmit).not.toHaveBeenCalled()
      })

      test('should fail validation if password does not contain at least 1 special character', async () => {
        const testPassword = 'Aabcdefgh'

        mockOnSubmit.mockReset()

        userEvent.type(usernameField, validUsername)
        userEvent.type(passwordField, testPassword)
        await act(async () => {
          userEvent.click(submitButton)
        })

        expect(mockOnSubmit).not.toHaveBeenCalled()
      })
    })
  })
})
