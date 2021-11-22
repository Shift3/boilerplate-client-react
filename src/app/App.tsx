import { ErrorBoundary } from '@sentry/react';
import { Routes as AgencyRoutes } from 'features/agency-dashboard/Routes';
import { Routes as AgentRoutes } from 'features/agent-dashboard/Routes';
import { Routes as AuthRoutes } from 'features/auth/Routes';
import { Routes as UserRoutes } from 'features/user-dashboard/Routes';
import { PrivateRoute } from 'features/rbac';
import { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../GlobalStyle';
import AppTheme from 'utils/styleValues';
import { HolyGrailLayout } from 'common/components/Layout';
import { NotificationContainer } from 'common/components/Notification';
import { NotFoundView } from 'common/components/NotFound';

export const App: FC = () => (
  <ErrorBoundary>
    <ThemeProvider theme={AppTheme}>
      <NotificationContainer />
      <HolyGrailLayout>
        <Switch>
          <Route path='/auth' component={AuthRoutes} />
          <PrivateRoute path='/agents' component={AgentRoutes} />
          <PrivateRoute path='/agencies' component={AgencyRoutes} requiredRoles={['Super Administrator']} />
          <PrivateRoute path='/users' component={UserRoutes} requiredRoles={['Admin', 'Super Administrator']} />
          <Route exact path='/' render={() => <Redirect to='/agents' />} />
          <Route component={NotFoundView} />
        </Switch>
      </HolyGrailLayout>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
