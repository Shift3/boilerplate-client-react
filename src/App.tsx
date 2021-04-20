import { FC } from 'react'
import { ErrorBoundary } from '@sentry/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Context
import { Provider as AuthProvider } from './context/auth.context'
import { Provider as FlashMessageProvider } from './context/flashMessage.context'

// Components
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage'
import { FlashMessage } from './components/flashMessage/FlashMessage'
import { HolyGrailLayout } from './components/holyGrailLayout'
import { NavBar } from './components/navbar'
import { Footer } from './components/footer'

export const App: FC = () => (
  <ErrorBoundary>
    <AuthProvider>
      <FlashMessageProvider>
        <FlashMessage />
        <Router>
          <Switch>
            <HolyGrailLayout leftSidebar={<NavBar />} footer={<Footer />}>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/auth/login" component={LoginPage} />
              <Route exact path="/auth/forgot-password" component={ResetPasswordPage} />
            </HolyGrailLayout>
          </Switch>
        </Router>
      </FlashMessageProvider>
    </AuthProvider>
  </ErrorBoundary>
)
