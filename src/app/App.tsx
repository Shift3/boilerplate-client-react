import { ErrorBoundary } from '@sentry/react';
import { Routes as AgencyRoutes } from 'features/agency-dashboard/Routes';
import { Routes as AgentRoutes } from 'features/agent-dashboard/Routes';
import { PrivateRoute } from 'features/rbac';
import { Routes as UserRoutes } from 'features/user-dashboard/Routes';
import { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../GlobalStyle';
import AppTheme from 'utils/styleValues';
import { HolyGrailLayout } from 'common/components/Layout';
import { NotificationContainer } from 'common/components/Notification';
import { NotFoundView } from 'common/components/NotFound';
import { Routes as AuthRoutes } from 'features/auth/Routes';
import { UpdateUserProfilePage } from 'features/user-dashboard/updateUserProfilePage';

export const App: FC = () => (
  <ErrorBoundary>
    <ThemeProvider theme={AppTheme}>
      <NotificationContainer />
      <HolyGrailLayout>
        <Switch>
          <Route path='/auth' component={AuthRoutes} />
          <PrivateRoute exact path='/user/profile/' component={UpdateUserProfilePage} />
          <PrivateRoute path='/agents' component={AgentRoutes} />
          <PrivateRoute path='/agencies' component={AgencyRoutes} requiredRoles={['Admin', 'Super Administrator']} />
          <PrivateRoute path='/users' component={UserRoutes} requiredRoles={['Admin', 'Super Administrator']} />
          <Route exact path='/' render={() => <Redirect to='/agents' />} />
          <Route component={NotFoundView} />
        </Switch>
      </HolyGrailLayout>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
