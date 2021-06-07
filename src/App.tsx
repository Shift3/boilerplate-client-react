/* eslint-disable jsx-quotes */
import { FC } from 'react';
import { ErrorBoundary } from '@sentry/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import AppTheme from './utils/styleValues';

// Context
import { Provider as AuthProvider } from './context/auth.context';
import { Provider as FlashMessageProvider } from './context/flashMessage.context';

// Components
import { DashboardPage } from './components/dashboardPage';
import { LogInPage } from './components/logInPage';
import { SignUpPage } from './components/signUpPage';
import { ResetPasswordPage } from './components/resetPasswordPage';
import { FlashMessage } from './components/flashMessage';
import { HolyGrailLayout } from './components/holyGrailLayout';
import { NavBar } from './components/navbar';

export const App: FC = () => (
  <ErrorBoundary>
    <AuthProvider>
      <FlashMessageProvider>
        <ThemeProvider theme={AppTheme}>
          <FlashMessage />
          <Router>
            <Switch>
              <HolyGrailLayout leftSidebar={<NavBar />}>
                <Route exact path='/' component={DashboardPage} />
                <Route exact path='/auth/login' component={LogInPage} />
                <Route exact path='/auth/signup' component={SignUpPage} />
                <Route exact path='/auth/forgot-password' component={ResetPasswordPage} />
              </HolyGrailLayout>
            </Switch>
          </Router>
        </ThemeProvider>
      </FlashMessageProvider>
    </AuthProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
