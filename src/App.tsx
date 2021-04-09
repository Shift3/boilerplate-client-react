import * as Sentry from '@sentry/react'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'

export const App: React.FC = () => (
  <Sentry.ErrorBoundary>
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </Router>
  </Sentry.ErrorBoundary>
)
