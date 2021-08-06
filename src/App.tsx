import { ErrorBoundary } from '@sentry/react';
import { UpdateUserProfilePage } from 'pages/UpdateUserProfile';
import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { DashboardPage } from './pages/Dashboard';
import { FlashMessage } from './components/flashMessage';
import { HolyGrailLayout } from './components/holyGrailLayout';
import { PrivateRoute } from './core/modules/auth/presentation/privateRoute';
import { GlobalStyle } from './GlobalStyle';
import AppTheme from './utils/styleValues';
import { LoginPage } from './pages/Login';
import { SignUpPage } from 'pages/SignUp';
import { ActivateAccountPage } from 'pages/ActivateAccount';
import { ForgotPasswordPage } from 'pages/ForgotPassword';
import { ResetPasswordPage } from 'pages/ResetPassword';
import { ChangePasswordPage } from 'pages/ChangePassword';
import { CreateUserPage } from 'pages/CreateUser';

export const App: FC = () => (
  <ErrorBoundary>
    <ThemeProvider theme={AppTheme}>
      <FlashMessage />
      <Router>
        <Switch>
          <HolyGrailLayout>
            <Route exact path='/auth/login' component={LoginPage} />
            <Route exact path='/auth/signup' component={SignUpPage} />
            <Route path='/auth/activate-account/:token' component={ActivateAccountPage} />
            <Route path='/auth/forgot-password' component={ForgotPasswordPage} />
            <Route path='/auth/reset-password/:token' component={ResetPasswordPage} />
            <PrivateRoute path='/user/change-password/' component={ChangePasswordPage} />
            <PrivateRoute path='/admin/create-user/' component={CreateUserPage} />
            <PrivateRoute path='/user/profile/' component={UpdateUserProfilePage} />
            <PrivateRoute exact path='/' component={DashboardPage} />
          </HolyGrailLayout>
        </Switch>
      </Router>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
