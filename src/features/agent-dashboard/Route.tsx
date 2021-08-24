import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AgentListView } from './pages/AgentListView';

export const Routes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/agent-list`} component={AgentListView} />
    </Switch>
  );
};
