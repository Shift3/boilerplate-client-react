import { Layout } from 'common/components/Layout';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotificationListView } from './pages/NotificationListView';

export const NotificationRoutes: FC = () => (
  <Layout>
    <Routes>
      <Route path='/*' element={<NotificationListView />} />
    </Routes>
  </Layout>
);
