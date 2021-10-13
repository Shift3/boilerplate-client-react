import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { CreateUserView, UpdateUserView, UserListView } from './pages';

export const Routes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={UserListView} />
      <Route path={`${path}/create-user`} component={CreateUserView} />
      <Route path={`${path}/update-user/:id`} component={UpdateUserView} />
    </Switch>
  );
};
