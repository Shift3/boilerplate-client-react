import { CreateUserPage } from 'components/createUserPage';
import { UserListView } from 'features/user-dashboard';
import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

export const Routes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/user-list`} component={UserListView} />
      <Route path={`${path}/create-user`} component={CreateUserPage} />
    </Switch>
  );
};
