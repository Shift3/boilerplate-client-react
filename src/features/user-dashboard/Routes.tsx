import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { CreateUserView, UserListView } from './pages';

export const Routes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/create-user`} component={CreateUserView} />
      <Route exact path={`${path}`} component={UserListView} />
    </Switch>
  );
};
