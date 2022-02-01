import { ErrorBoundary } from '@sentry/react';
import { Routes as AgencyRoutes } from 'features/agency-dashboard/Routes';
import { Routes as AgentRoutes } from 'features/agent-dashboard/Routes';
import { Routes as AuthRoutes } from 'features/auth/Routes';
import { PrivateRoute } from 'features/auth/components/privateRoute.tsx';
import { Routes as UserRoutes } from 'features/user-dashboard/Routes';
import { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../GlobalStyle';
import AppTheme from 'utils/styleValues';
import { HolyGrailLayout } from 'common/components/HolyGrailLayout';
import { ChangePasswordPage } from 'features/user-dashboard/pages/ChangePasswordView';
import { NotificationContainer } from 'common/components/Notification';
import { NotFoundView } from 'common/components/NotFound';
import { UpdateUserProfilePage } from 'features/auth/pages/UpdateUserProfilePage';
import { ConfirmationModal } from 'features/confirmation-modal';

export const App: FC = () => (
  <ErrorBoundary>
    <ThemeProvider theme={AppTheme}>
      <ConfirmationModal />
      <NotificationContainer />
      <HolyGrailLayout>
        <Switch>
          <Route path='/auth' component={AuthRoutes} />
          <PrivateRoute exact path='/user/profile/:id' component={UpdateUserProfilePage} />
          <PrivateRoute exact path='/user/change-password/:id' component={ChangePasswordPage} />
          <PrivateRoute path='/agents' component={AgentRoutes} />
          <PrivateRoute path='/agencies' component={AgencyRoutes} requiredRoles={['Super Administrator']} />
          <PrivateRoute path='/users' component={UserRoutes} requiredRoles={['Admin', 'Super Administrator']} />
          <PrivateRoute exact path='/'>
            <Redirect to='/agents' />
          </PrivateRoute>
          <Route component={NotFoundView} />
        </Switch>
      </HolyGrailLayout>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
