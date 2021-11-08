import { ErrorBoundary } from '@sentry/react';
import { Routes as AgencyRoutes } from 'features/agency-dashboard/Routes';
import { Routes as AgentRoutes } from 'features/agent-dashboard/Routes';
import { DashboardPage } from 'features/auth/components/dashboardPage';
import { PrivateRoute } from 'features/auth/components/privateRoute.tsx';
import { Routes as UserRoutes } from 'features/user-dashboard/Routes';
import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../GlobalStyle';
import AppTheme from 'utils/styleValues';
import { HolyGrailLayout } from 'features/auth/components/holyGrailLayout';
import { LogInPage } from 'features/auth/components/loginPage';
import { SignUpPage } from 'features/auth/components/signupPage';
import { ActivateAccountPage } from 'features/auth/components/activateAccountPage';
import { ForgotPasswordPage } from 'features/auth/components/forgotPasswordPage';
import { ResetPasswordPage } from 'features/auth/components/resetPasswordPage';
import { UpdateUserProfilePage } from 'features/auth/components/updateUserProfilePage';
import { NotificationContainer } from 'common/components/Notification';
import { NotFoundView } from 'common/components/NotFound';

export const App: FC = () => (
  <ErrorBoundary>
    <ThemeProvider theme={AppTheme}>
      <NotificationContainer />
      <HolyGrailLayout>
        <Switch>
          <Route exact path='/auth/login' component={LogInPage} />
          <Route exact path='/auth/signup' component={SignUpPage} />
          <Route exact path='/auth/activate-account/:token' component={ActivateAccountPage} />
          <Route exact path='/auth/forgot-password' component={ForgotPasswordPage} />
          <Route exact path='/auth/reset-password/:token' component={ResetPasswordPage} />
          <PrivateRoute exact path='/user/profile/' component={UpdateUserProfilePage} />
          <PrivateRoute path='/agents' component={AgentRoutes} />
          <PrivateRoute path='/agencies' component={AgencyRoutes} requiredRoles={['Admin', 'Super Administrator']} />
          <PrivateRoute path='/users' component={UserRoutes} requiredRoles={['Admin', 'Super Administrator']} />
          <PrivateRoute exact path='/' component={DashboardPage} />
          <Route path='/' component={NotFoundView} />
        </Switch>
      </HolyGrailLayout>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
