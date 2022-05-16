import { Layout } from 'common/components/Layout';
import { NotFoundView } from 'common/components/NotFoundView';
import { AgentListView, CreateAgentView, UpdateAgentView } from 'features/agent-dashboard/pages';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

export const AgentRoutes: FC = () => (
  <Layout>
    <Routes>
      <Route path='/' element={<AgentListView />} />
      <Route path='/create-agent' element={<CreateAgentView />} />
      <Route path='/update-agent/:id' element={<UpdateAgentView />} />
      <Route path='/*' element={<NotFoundView />} />
    </Routes>
  </Layout>
);
