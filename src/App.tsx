import * as Sentry from '@sentry/react'
import React, { FC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HolyGrailLayout } from './HolyGrailLayout'
import { LoginPage } from './pages/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

export const App: FC = () => (
  <Sentry.ErrorBoundary>
    <Router>
      <HolyGrailLayout>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/auth/forgot-password" component={ResetPasswordPage} />
        </Switch>
      </HolyGrailLayout>
    </Router>
  </Sentry.ErrorBoundary>
)
