import { ErrorBoundary } from '@sentry/react';
import { ActivateAccountPage } from 'features/auth/components/activateAccountPage';
import { ChangePasswordPage } from 'features/auth/components/changePasswordPage';
import { ForgotPasswordPage } from 'features/auth/components/forgotPasswordPage';
import { LogInPage } from 'features/auth/components/loginPage';
import { ResetPasswordPage } from 'features/auth/components/resetPasswordPage';
import { SignUpPage } from 'features/auth/components/signupPage';
import { UpdateUserProfilePage } from 'features/auth/components/updateUserProfilePage';
import { Routes as AgencyRoutes } from 'features/agency-dashboard/Routes';
import { Routes as AgentRoutes } from 'features/agent-dashboard/Routes';
import { Routes as UserRoutes } from 'features/user-dashboard/Routes';
import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { DashboardPage } from 'features/auth/components/dashboardPage/index';
import { FlashMessage } from 'features/auth/components/flashMessage/index';
import { HolyGrailLayout } from 'features/auth/components/holyGrailLayout/index';
import { GlobalStyle } from '../GlobalStyle';
import AppTheme from '../utils/styleValues';
import { PrivateRoute } from 'features/auth/components/privateRoute';

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
          <PrivateRoute exact path='/user/profile/' component={UpdateUserProfilePage} />
          <PrivateRoute path='/agents' component={AgentRoutes} requiredRoles={['Admin', 'Super Administrator']} />
          <PrivateRoute path='/agencies' component={AgencyRoutes} requiredRoles={['Admin', 'Super Administrator']} />
          <PrivateRoute path='/users' component={UserRoutes} requiredRoles={['Admin', 'Super Administrator']} />
          <PrivateRoute exact path='/' component={DashboardPage} />
        </Switch>
      </HolyGrailLayout>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
