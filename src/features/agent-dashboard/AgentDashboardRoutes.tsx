import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AgentListView } from './pages/AgentListView';
import { CreateAgentView } from './pages/CreateAgentView';
import { EditAgentView } from './pages/EditAgentView';

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
