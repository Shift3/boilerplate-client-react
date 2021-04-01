import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { LoginForm } from './LoginForm'

test('renders react boilerplate text', () => {
  const onSubmit = jest.fn()

  render(<LoginForm onSubmit={onSubmit} />)

  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)

  expect(username).toBeInTheDocument()
  expect(password).toBeInTheDocument()
})

describe('input validation', () => {
  test('should call props.onSubmit with username and password if validation succeeds', () => {
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

  test('should fail validation if username is empty', () => {
    const testUsername = ''
    const testPassword = 'Password123!'
    const onSubmit = jest.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    userEvent.type(screen.getByLabelText(/username/i), testUsername)
    userEvent.type(screen.getByLabelText(/password/i), testPassword)
    userEvent.click(screen.getByRole('button'))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('should fail validation if username is not a valid email', () => {
    const testUsername = 'testemail'
    const testPassword = 'Password123!'
    const onSubmit = jest.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    userEvent.type(screen.getByLabelText(/username/i), testUsername)
    userEvent.type(screen.getByLabelText(/password/i), testPassword)
    userEvent.click(screen.getByRole('button'))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('should fail validation if password is empty', () => {
    const testUsername = 'testemail@test.com'
    const testPassword = ''
    const onSubmit = jest.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    userEvent.type(screen.getByLabelText(/username/i), testUsername)
    userEvent.type(screen.getByLabelText(/password/i), testPassword)
    userEvent.click(screen.getByRole('button'))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('should fail validation if password does not contain at least 1 uppercase letter', () => {
    const testUsername = 'testemail@test.com'
    const testPassword = '1abcdefg!'
    const onSubmit = jest.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    userEvent.type(screen.getByLabelText(/username/i), testUsername)
    userEvent.type(screen.getByLabelText(/password/i), testPassword)
    userEvent.click(screen.getByRole('button'))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('should fail validation if password does not contain at least 1 lowercase letter', () => {
    const testUsername = 'testemail@test.com'
    const testPassword = '1ABCDEFG!'
    const onSubmit = jest.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    userEvent.type(screen.getByLabelText(/username/i), testUsername)
    userEvent.type(screen.getByLabelText(/password/i), testPassword)
    userEvent.click(screen.getByRole('button'))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('should fail validation if password does not contain at least 1 number', () => {
    const testUsername = 'testemail@test.com'
    const testPassword = 'Aabcdefg!'
    const onSubmit = jest.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    userEvent.type(screen.getByLabelText(/username/i), testUsername)
    userEvent.type(screen.getByLabelText(/password/i), testPassword)
    userEvent.click(screen.getByRole('button'))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('should fail validation if password does not contain at least 1 special character', () => {
    const testUsername = 'testemail@test.com'
    const testPassword = 'Aabcdefgh'
    const onSubmit = jest.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    userEvent.type(screen.getByLabelText(/username/i), testUsername)
    userEvent.type(screen.getByLabelText(/password/i), testPassword)
    userEvent.click(screen.getByRole('button'))

    expect(onSubmit).not.toHaveBeenCalled()
  })
})
