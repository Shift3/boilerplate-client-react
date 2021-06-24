import { FC } from 'react';
import { ErrorBoundary } from '@sentry/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LogInPage } from 'components/loginPage';
import { SignUpPage } from 'components/signupPage';
import { ChangePasswordPage } from 'components/changePasswordPage';
import { DashboardPage } from './components/dashboardPage';
import { FlashMessage } from './components/flashMessage';
import { HolyGrailLayout } from './components/holyGrailLayout';
import { NavBar } from './components/navbar';
import { GlobalStyle } from './GlobalStyle';
import AppTheme from './utils/styleValues';
import { ResetPasswordPage } from 'components/resetPasswordPage';
import { ForgotPasswordPage } from 'components/forgotPasswordPage';
import { ActivateAccountPage } from 'components/activateAccountPage';

export const App: FC = () => (
  <ErrorBoundary>
    <ThemeProvider theme={AppTheme}>
      <FlashMessage />
      <Router>
        <Switch>
          <HolyGrailLayout leftSidebar={<NavBar />}>
            <Route exact path='/' component={DashboardPage} />
            <Route exact path='/auth/login' component={LogInPage} />
            <Route exact path='/auth/signup' component={SignUpPage} />
            <Route exact path='/auth/activate-account/:token' component={ActivateAccountPage} />
            <Route exact path='/users/change-password/:id' component={ChangePasswordPage} />
            <Route exact path='/auth/reset-password/:token' component={ResetPasswordPage} />
            <Route exact path='/auth/forgot-password' component={ForgotPasswordPage} />
          </HolyGrailLayout>
        </Switch>
      </Router>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
