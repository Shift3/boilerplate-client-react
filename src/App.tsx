import * as Sentry from '@sentry/react'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ResetPassword from './pages/ResetPasswordPage'

export const App: React.FC = () => (
  <Sentry.ErrorBoundary>
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/auth/forgot-password" component={ResetPassword} />
      </Switch>
    </Router>
  </Sentry.ErrorBoundary>
)
