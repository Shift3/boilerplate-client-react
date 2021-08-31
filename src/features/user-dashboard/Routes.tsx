import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { UserListView } from './pages';

export const Routes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={UserListView} />
    </Switch>
  );
};
