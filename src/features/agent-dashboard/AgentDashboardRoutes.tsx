import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AgentListView } from './pages/AgentListView';
import { CreateAgentView } from './pages/CreateAgentView';
import { DeleteAgentView } from './pages/DeleteAgentView';
import { EditAgentView } from './pages/EditAgentView';

export const AgentDashboardRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/agent-list`} component={AgentListView} />
      <Route path={`${path}/create-agent`} component={CreateAgentView} />
      <Route path={`${path}/edit-agent`} component={EditAgentView} />
      <Route path={`${path}/delete-agent`} component={DeleteAgentView} />
    </Switch>
  );
};
