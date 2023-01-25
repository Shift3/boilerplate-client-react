import { Layout } from 'common/components/Layout';
import { NotFoundView } from 'common/components/NotFoundView';
import { useAuth } from 'features/auth/hooks';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

export const HomeRoutes: FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route
          path='/'
          element={
            user
              ? {
                  ADMIN: <div>Admin</div>,
                  EDITOR: <div>Editor</div>,
                  USER: <div>User</div>,
                }[user.role]
              : null
          }
        />
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </Layout>
  );
};
