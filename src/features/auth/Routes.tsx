import { NotFoundView } from 'common/components/NotFound';
import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { ActivateAccountPage } from './pages/ActivateAccountPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { LogInPage } from './pages/LoginPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { SignUpPage } from './pages/SignUpPage';

export const Routes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/login`} component={LogInPage} />
      <Route exact path={`${path}/signup`} component={SignUpPage} />
      <Route exact path={`${path}/activate-account/:token`} component={ActivateAccountPage} />
      <Route exact path={`${path}/forgot-password`} component={ForgotPasswordPage} />
      <Route exact path={`${path}/reset-password/:token`} component={ResetPasswordPage} />
      <Route component={NotFoundView} />
    </Switch>
  );
};
