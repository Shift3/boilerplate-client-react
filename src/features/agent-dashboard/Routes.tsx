import { NotFoundView } from 'common/components/NotFound';
import { AgentListView, CreateAgentView, UpdateAgentView } from 'features/agent-dashboard/pages';
import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

export const Routes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={AgentListView} />
      <Route exact path={`${path}/create-agent`} component={CreateAgentView} />
      <Route exact path={`${path}/update-agent/:id`} component={UpdateAgentView} />
      <Route path={path} component={NotFoundView} />
    </Switch>
  );
};
