import { ErrorBoundary } from '@sentry/react';
import { ActivateAccountPage } from 'components/activateAccountPage';
import { ChangePasswordPage } from 'components/changePasswordPage';
import { ForgotPasswordPage } from 'components/forgotPasswordPage';
import { LogInPage } from 'components/loginPage';
import { ResetPasswordPage } from 'components/resetPasswordPage';
import { SignUpPage } from 'components/signupPage';
import { UpdateUserProfilePage } from 'components/updateUserProfilePage';
import { PrivateRoute } from 'containers/PrivateRoute';
import { RoleType } from 'core/modules/user/domain/role';
import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CreateUserPage } from './components/createUserPage/index';
import { DashboardPage } from './components/dashboardPage';
import { FlashMessage } from './components/flashMessage';
import { HolyGrailLayout } from './components/holyGrailLayout';
import { GlobalStyle } from './GlobalStyle';
import AppTheme from './utils/styleValues';

export const App: FC = () => (
  <ErrorBoundary>
    <ThemeProvider theme={AppTheme}>
      <FlashMessage />
      <HolyGrailLayout>
        <Switch>
          <Route exact path='/auth/login' component={LogInPage} />
          <Route exact path='/auth/signup' component={SignUpPage} />
          <Route path='/auth/activate-account/:token' component={ActivateAccountPage} />
          <Route path='/auth/forgot-password' component={ForgotPasswordPage} />
          <Route path='/auth/reset-password/:token' component={ResetPasswordPage} />
          <PrivateRoute exact path='/user/change-password/' component={ChangePasswordPage} />
          <PrivateRoute
            roles={[RoleType.Admin, RoleType.SuperAdmin]}
            exact
            path='/admin/create-user/'
            component={CreateUserPage}
          />
          <PrivateRoute exact path='/user/profile/' component={UpdateUserProfilePage} />
          <PrivateRoute exact path='/' component={DashboardPage} />
        </Switch>
      </HolyGrailLayout>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
