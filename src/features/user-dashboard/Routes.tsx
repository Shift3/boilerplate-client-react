import { Layout } from 'common/components/Layout';
import { NotFoundView } from 'common/components/NotFoundView';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateUserView, UpdateUserView, UserListView } from './pages';
import { UserDetailView } from './pages/UserDetailView';

export const UserRoutes: FC = () => (
  <Layout>
    <Routes>
      <Route path='/' element={<UserListView />} />
      <Route path='/create-user' element={<CreateUserView />} />
      <Route path='/update-user/:id' element={<UpdateUserView />} />
      <Route path='*' element={<NotFoundView />} />
      <Route path='/me' element={<UserDetailView />} />
    </Routes>
  </Layout>
);
