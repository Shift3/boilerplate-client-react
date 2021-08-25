import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AgencyListView } from './pages/AgencyListView';

export const Routes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={AgencyListView} />
    </Switch>
  );
};
