import { ErrorBoundary } from '@sentry/react';
import { Layout } from 'common/components/Layout';
import { NotFoundView } from 'common/components/NotFoundView';
import { Role } from 'common/models';
import { BannerContentWrapper } from 'common/styles/utilities';
import { environment } from 'environment';
import { AgentRoutes } from 'features/agent-dashboard';
import { AuthRoutes, RequireAuth } from 'features/auth';
import { ConfirmationModal } from 'features/confirmation-modal';
import { UserRoutes } from 'features/user-dashboard';
import { UpdateUserProfilePage } from 'features/user-profile/pages/UpdateUserProfilePage';
import { FC, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import dark from 'themes/dark';
import light from 'themes/light';
import { GlobalStyle } from '../GlobalStyle';

export const App: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [theme, setTheme] = useState('light');

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme === 'light' ? light : dark}>
        <GlobalStyle />
        <ConfirmationModal />
        <ToastContainer
          autoClose={5000}
          closeButton
          closeOnClick
          newestOnTop
          hideProgressBar={false}
          position={toast.POSITION.TOP_RIGHT}
          role='alert'
          theme='light'
          limit={3}
          transition={Slide}
        />

        <BannerContentWrapper bannerShowing={environment.environment === 'staging'}>
          <Routes>
            <Route path='/auth/*' element={<AuthRoutes />} />
            <Route
              path='/user/profile/:id'
              element={
                <RequireAuth>
                  <Layout>
                    <UpdateUserProfilePage />
                  </Layout>
                </RequireAuth>
              }
            />
            <Route
              path='/agents/*'
              element={
                <RequireAuth>
                  <AgentRoutes />
                </RequireAuth>
              }
            />
            <Route
              path='/users/*'
              element={
                <RequireAuth allowedRoles={[Role.ADMIN]}>
                  <UserRoutes />
                </RequireAuth>
              }
            />
            <Route path='/' element={<Navigate to='/agents' />} />
            <Route path='*' element={<NotFoundView />} />
          </Routes>
        </BannerContentWrapper>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
