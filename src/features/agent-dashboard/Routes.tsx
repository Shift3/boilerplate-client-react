import { AgentListView, CreateAgentView, UpdateAgentView } from 'features/agent-dashboard/pages';
import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

export const Routes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`} component={AgentListView} />
      <Route path={`${path}/create-agent`} component={CreateAgentView} />
      <Route path={`${path}/update-agent/:id`} component={UpdateAgentView} />
    </Switch>
  );
};
