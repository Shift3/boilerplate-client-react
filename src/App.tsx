import * as Sentry from '@sentry/react'
import React, { FC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

export const App: FC = () => (
  <Sentry.ErrorBoundary>
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/auth/forgot-password" component={ResetPasswordPage} />
      </Switch>
    </Router>
  </Sentry.ErrorBoundary>
)
