import { ErrorBoundary } from '@sentry/react';
import { ActivateAccountPage } from 'components/activateAccountPage';
import { ChangePasswordPage } from 'components/changePasswordPage';
import { ForgotPasswordPage } from 'components/forgotPasswordPage';
import { LogInPage } from 'components/loginPage';
import { ResetPasswordPage } from 'components/resetPasswordPage';
import { SignUpPage } from 'components/signupPage';
import { UpdateUserProfilePage } from 'components/updateUserProfilePage';
import { Routes as AdminRoutes } from 'features/admin';
import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CreateUserPage } from '../components/createUserPage/index';
import { DashboardPage } from '../components/dashboardPage';
import { FlashMessage } from '../components/flashMessage';
import { HolyGrailLayout } from '../components/holyGrailLayout';
import { PrivateRoute } from '../core/modules/auth/presentation/privateRoute';
import { GlobalStyle } from '../GlobalStyle';
import AppTheme from '../utils/styleValues';

export const App: FC = () => (
  <ErrorBoundary>
    <ThemeProvider theme={AppTheme}>
      <FlashMessage />
      <Router>
        <Switch>
          <HolyGrailLayout>
            <Route exact path='/auth/login' component={LogInPage} />
            <Route exact path='/auth/signup' component={SignUpPage} />
            <Route path='/auth/activate-account/:token' component={ActivateAccountPage} />
            <Route path='/auth/forgot-password' component={ForgotPasswordPage} />
            <Route path='/auth/reset-password/:token' component={ResetPasswordPage} />
            <PrivateRoute path='/user/change-password/' component={ChangePasswordPage} />
            <PrivateRoute path='/admin/create-user/' component={CreateUserPage} />
            <PrivateRoute path='/user/profile/' component={UpdateUserProfilePage} />
            <PrivateRoute exact path='/' component={DashboardPage} />
            <PrivateRoute path='/admin' component={AdminRoutes} />
          </HolyGrailLayout>
        </Switch>
      </Router>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);