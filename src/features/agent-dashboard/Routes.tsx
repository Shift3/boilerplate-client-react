import { NotFoundView } from 'common/components/NotFound';
import { AgentListView, CreateAgentView, UpdateAgentView } from 'features/agent-dashboard/pages';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HolyGrailLayout } from 'common/components/HolyGrailLayout';

export const AgentRoutes: FC = () => (
  <HolyGrailLayout>
    <Routes>
      <Route path='/' element={<AgentListView />} />
      <Route path='/create-agent' element={<CreateAgentView />} />
      <Route path='/update-agent/:id' element={<UpdateAgentView />} />
      <Route path='/*' element={<NotFoundView />} />
    </Routes>
  </HolyGrailLayout>
);
