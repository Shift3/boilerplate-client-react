import { NotFoundView } from 'common/components/NotFound';
import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AgencyListView, CreateAgencyView, UpdateAgencyView } from './pages';
import { HolyGrailLayout } from 'common/components/HolyGrailLayout';

export const Routes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <HolyGrailLayout>
      <Switch>
        <Route exact path={path} component={AgencyListView} />
        <Route exact path={`${path}/create-agency`} component={CreateAgencyView} />
        <Route exact path={`${path}/update-agency/:id`} component={UpdateAgencyView} />
        <Route path={path} component={NotFoundView} />
      </Switch>
    </HolyGrailLayout>
  );
};
