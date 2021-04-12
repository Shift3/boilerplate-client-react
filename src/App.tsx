import { ErrorBoundary } from '@sentry/react'
import { FC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ResetPassword from './pages/ResetPasswordPage'
import { Provider as AuthProvider } from './context/auth.context'
import { Provider as FlashMessageProvider } from './context/flashMessage.context'
import FlashMessage from './components/flashMessage/FlashMessage'

export const App: FC = () => (
  <ErrorBoundary>
    <AuthProvider>
      <FlashMessageProvider>
        <FlashMessage/>
      </FlashMessageProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/auth/forgot-password" component={ResetPassword} />
        </Switch>
      </Router>
    </AuthProvider>
  </ErrorBoundary>
)