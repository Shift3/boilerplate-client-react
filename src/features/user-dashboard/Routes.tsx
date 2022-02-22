import { NotFoundView } from 'common/components/NotFound';
import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { CreateUserView, UpdateUserView, UserListView } from './pages';
import { HolyGrailLayout } from 'common/components/HolyGrailLayout';

export const Routes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <HolyGrailLayout>
      <Switch>
        <Route exact path={path} component={UserListView} />
        <Route exact path={`${path}/create-user`} component={CreateUserView} />
        <Route exact path={`${path}/update-user/:id`} component={UpdateUserView} />
        <Route path={path} component={NotFoundView} />
      </Switch>
    </HolyGrailLayout>
  );
};
