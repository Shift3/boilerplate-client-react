import { Layout } from 'common/components/Layout';
import { NotFoundView } from 'common/components/NotFoundView';
import { useAuth } from 'features/auth/hooks';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminHomePage } from './pages/AdminHomePage';
import { EditorHomePage } from './pages/EditorHomePage';
import { UserHomePage } from './pages/UserHomePage';

export const HomeRoutes: FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route
          path='/'
          element={
            {
              ADMIN: <AdminHomePage />,
              EDITOR: <EditorHomePage />,
              USER: <UserHomePage />,
            }[user!.role]
          }
        />
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </Layout>
  );
};
