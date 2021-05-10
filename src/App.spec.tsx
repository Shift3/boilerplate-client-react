import { render } from '@testing-library/react'
import React from 'react'
import { App } from './App'

test('renders learn react link', () => {
  const { container } = render(<App />)
  expect(container).toBeInTheDocument()
})
