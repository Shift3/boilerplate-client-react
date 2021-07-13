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
import { UserListPage } from './components/userListPage/index';
import { GlobalStyle } from './GlobalStyle';
import AppTheme from './utils/styleValues';

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
            <Route exact path='/auth/user-list' component={UserListPage} />
          </HolyGrailLayout>
        </Switch>
      </Router>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
