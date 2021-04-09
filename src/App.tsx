import * as Sentry from '@sentry/react'
import React from 'react'
import { LoginPage } from './pages/LoginPage'

const App = (): JSX.Element => (
  <Sentry.ErrorBoundary>
    <LoginPage />
  </Sentry.ErrorBoundary>
)

export default App
