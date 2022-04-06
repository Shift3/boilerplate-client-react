import { NotFoundView } from 'common/components/NotFound';
import { FC, ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateUserView, UpdateUserView, UserListView } from './pages';
import { HolyGrailLayout } from 'common/components/HolyGrailLayout';

const encloseWithHolyGrailLayout = (child: ReactNode, rightAside?: ReactNode) => {
  return <HolyGrailLayout rightAside={rightAside}>{child}</HolyGrailLayout>;
};

export const UserRoutes: FC = () => (
  <Routes>
    <Route path='/' element={encloseWithHolyGrailLayout(<UserListView />, <p>Right Side</p>)} />
    <Route path='/create-user' element={encloseWithHolyGrailLayout(<CreateUserView />)} />
    <Route path='/update-user/:id' element={encloseWithHolyGrailLayout(<UpdateUserView />)} />
    <Route path='*' element={encloseWithHolyGrailLayout(<NotFoundView />)} />
  </Routes>
);
