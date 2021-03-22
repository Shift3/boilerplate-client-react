import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../LoginForm'

// Renders Correctly / Test if loginForm has fields
test('renders learn react link', () => {
  render(<LoginForm />)
  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)

  expect(username).toBeInTheDocument()
  expect(password).toBeInTheDocument()
})

describe('input validation', () => {
  test('should not call props.onSubmit if validation fails', () => {
    const testUsername = ''
    const testPassword = ''
    const onSubmit = jest.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    userEvent.type(screen.getByLabelText(/username/i), testUsername)
    userEvent.type(screen.getByLabelText(/password/i), testPassword)
    userEvent.click(screen.getByRole('button'))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('shouldd call props.onSubmit with username and password if validation succeeds', () => {
    const testUsername = 'test@email.com'
    const testPassword = 'Password123!'
    const onSubmit = jest.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    userEvent.type(screen.getByLabelText(/username/i), testUsername)
    userEvent.type(screen.getByLabelText(/password/i), testPassword)
    userEvent.click(screen.getByRole('button'))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(testUsername, testPassword)
  })

  // test('should fail validation if username is empty', () => {})
  // test('should fail validation if password is empty', () => {})
  // test('should fail validation if password is less than 8 characters long', () => {})
  // test('should call props.onSubmit if validation passes', () => {
  // })
})

/* Check that input validations work on form submit. 
- check that inputs are not empty (email, password)
- check if email is valid/formatted
*/

// Check that input validation works on form submit.

// Check that the form submits correctly when inputs have content.

// Check that the request works correctly on success.

// Check that request works correctly on error.

// Check that a token is saved to local storage after a successful request.
