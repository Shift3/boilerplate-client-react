import { AgentListView, CreateAgentView, EditAgentView } from 'features/agent-dashboard/pages';
import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

export const AgentDashboardRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/agents`} component={AgentListView} />
      <Route path={`${path}/agents/create-agent`} component={CreateAgentView} />
      <Route path={`${path}/agents/edit-agent`} component={EditAgentView} />
    </Switch>
  );
};
