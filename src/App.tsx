import * as Sentry from '@sentry/react'
import React from 'react'
import HomePage from './pages/HomePage'

const App = (): JSX.Element => (
  <Sentry.ErrorBoundary>
    <HomePage />
  </Sentry.ErrorBoundary>
)

export default App
