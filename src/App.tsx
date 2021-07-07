import { ErrorBoundary } from '@sentry/react';
import { ActivateAccountPage } from 'components/activateAccountPage';
import { ChangePasswordPage } from 'components/changePasswordPage';
import { ForgotPasswordPage } from 'components/forgotPasswordPage';
import { LogInPage } from 'components/loginPage';
import { ResetPasswordPage } from 'components/resetPasswordPage';
import { SignUpPage } from 'components/signupPage';
import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { DashboardPage } from './components/dashboardPage';
import { FlashMessage } from './components/flashMessage';
import { HolyGrailLayout } from './components/holyGrailLayout';
import { NavBar } from './components/navbar';
import { PrivateRoute } from './core/modules/auth/presentation/PrivateRoute';
import { GlobalStyle } from './GlobalStyle';
import AppTheme from './utils/styleValues';

export const App: FC = () => (
  <ErrorBoundary>
    <ThemeProvider theme={AppTheme}>
      <FlashMessage />
      <Router>
        <Switch>
          <HolyGrailLayout leftSidebar={<NavBar />}>
            <PrivateRoute authPath='/' component={DashboardPage} isAuth/>
            <Route exact path='/auth/login' component={LogInPage} />
            <Route exact path='/auth/signup' component={SignUpPage} />
            <PrivateRoute  authPath='/auth/activate-account/:token' component={ActivateAccountPage} isAuth/>
            <PrivateRoute  authPath='/users/change-password/:id' component={ChangePasswordPage} isAuth/>
            <PrivateRoute  authPath='/auth/reset-password/:token' component={ResetPasswordPage} isAuth/>
            <PrivateRoute authPath='/auth/forgot-password' component={ForgotPasswordPage}isAuth/>
          </HolyGrailLayout>
        </Switch>
      </Router>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
