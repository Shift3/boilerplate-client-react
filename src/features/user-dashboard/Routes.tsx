import { NotFoundView } from 'common/components/NotFound';
import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { CreateUserView, UpdateUserView, UserListView } from './pages';
import { ChangePasswordPage } from './pages/ChangePasswordPage';
import { UpdateUserProfilePage } from './pages/UpdateUserProfilePage';

export const Routes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={UserListView} />
      <Route exact path={`${path}/create-user`} component={CreateUserView} />
      <Route exact path={`${path}/update-user/:id`} component={UpdateUserView} />
      <Route exact path={`${path}/profile/:id`} component={UpdateUserProfilePage} />
      <Route exact path={`${path}/change-password/:id`} component={ChangePasswordPage} />
      <Route path={path} component={NotFoundView} />
    </Switch>
  );
};
