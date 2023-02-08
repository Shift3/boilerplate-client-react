import { Layout } from 'common/components/Layout';
import { NotFoundView } from 'common/components/NotFoundView';
import { FarmListView, CreateFarmView, UpdateFarmView } from 'features/farm-dashboard/pages';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

export const FarmRoutes: FC = () => (
  <Layout>
    <Routes>
      <Route path='/' element={<FarmListView />} />
      <Route path='/create-farm' element={<CreateFarmView />} />
      <Route path='/update-farm/:id' element={<UpdateFarmView />} />
      <Route path='/*' element={<NotFoundView />} />
    </Routes>
  </Layout>
);
