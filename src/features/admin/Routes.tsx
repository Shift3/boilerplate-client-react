import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AgencyListView } from './agency/pages/AgencyListView';
import { UserListView } from './users/pages/UserListView';

export const Routes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/agency-list`} component={AgencyListView} />
      <Route path={`${path}/user-list`} component={UserListView} />
    </Switch>
  );
};
