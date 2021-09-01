import { AgentListView, CreateAgentView, EditAgentView } from 'features/agent-dashboard/pages';
import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

export const Routes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} component={AgentListView} />
      <Route path={`${path}/create-agent`} component={CreateAgentView} />
      <Route path={`${path}/edit-agent`} component={EditAgentView} />
    </Switch>
  );
};
