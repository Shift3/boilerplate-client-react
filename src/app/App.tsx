import { ErrorBoundary } from '@sentry/react';
import { ActivateAccountPage } from 'components/activateAccountPage';
import { ChangePasswordPage } from 'components/changePasswordPage';
import { ForgotPasswordPage } from 'components/forgotPasswordPage';
import { LogInPage } from 'components/loginPage';
import { ResetPasswordPage } from 'components/resetPasswordPage';
import { SignUpPage } from 'components/signupPage';
import { UpdateUserProfilePage } from 'components/updateUserProfilePage';
import { Routes as AdminRoutes } from 'features/admin';
import { Routes as AgencyRoutes } from 'features/agency-dashboard/Routes';
import { PrivateRoute } from 'features/auth/components/PrivateRoute/PrivateRoute';
import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { DashboardPage } from '../components/dashboardPage/index';
import { FlashMessage } from '../components/flashMessage/index';
import { HolyGrailLayout } from '../components/holyGrailLayout/index';
import { AgentDashboardRoutes } from '../features/agent-dashboard/Routes';
import { GlobalStyle } from '../GlobalStyle';
import AppTheme from '../utils/styleValues';

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
          <PrivateRoute path='/admin' component={AdminRoutes} requiredRoles={['Admin', 'Super Administrator']} />
          <PrivateRoute
            path='/agents'
            component={AgentDashboardRoutes}
            requiredRoles={['Admin', 'Super Administrator']}
          />
          <PrivateRoute path='/agencies' component={AgencyRoutes} requiredRoles={['Admin', 'Super Administrator']} />
          <PrivateRoute exact path='/' component={DashboardPage} />
        </Switch>
      </HolyGrailLayout>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
