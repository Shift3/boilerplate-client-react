import { NotFoundView } from 'common/components/NotFound';
import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AgencyListView, CreateAgencyView, UpdateAgencyView } from './pages';

export const Routes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={AgencyListView} />
      <Route exact path={`${path}/create-agency`} component={CreateAgencyView} />
      <Route exact path={`${path}/update-agency/:id`} component={UpdateAgencyView} />
      <Route path={path} component={NotFoundView} />
    </Switch>
  );
};
