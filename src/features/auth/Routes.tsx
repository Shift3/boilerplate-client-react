import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ActivateAccountPage } from './pages/ActivateAccountPage';
import { ConfirmChangeEmailPage } from '../user-profile/pages/ConfirmChangeEmailPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { LogInPage } from './pages/LoginPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { SignUpPage } from './pages/SignUpPage';

export const Routes: FC = () => (
  <Switch>
    <Route exact path='/auth/login' component={LogInPage} />
    <Route exact path='/auth/signup' component={SignUpPage} />
    <Route exact path='/auth/activate-account/:token' component={ActivateAccountPage} />
    <Route exact path='/auth/confirm-change-email/:token' component={ConfirmChangeEmailPage} />
    <Route exact path='/auth/forgot-password' component={ForgotPasswordPage} />
    <Route exact path='/auth/reset-password/:token' component={ResetPasswordPage} />
  </Switch>
);
