import { NotFoundView } from 'common/components/NotFound';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateUserView, UpdateUserView, UserListView } from './pages';
import { HolyGrailLayout } from 'common/components/HolyGrailLayout';

export const UserRoutes: FC = () => (
  <HolyGrailLayout>
    <Routes>
      <Route path='/' element={<UserListView />} />
      <Route path='/create-user' element={<CreateUserView />} />
      <Route path='/update-user/:id' element={<UpdateUserView />} />
      <Route path='*' element={<NotFoundView />} />
    </Routes>
  </HolyGrailLayout>
);
