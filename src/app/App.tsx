import { AppErrorBoundary } from 'features/error-boundary/components/AppErrorBoundary';
import { Layout } from 'common/components/Layout';
import { NotFoundView } from 'common/components/NotFoundView';
import { Role } from 'common/models';
import { BannerContentWrapper } from 'common/styles/utilities';
import { environment } from 'environment';
import { AgentRoutes } from 'features/agent-dashboard';
import { AuthRoutes, RequireAuth } from 'features/auth';
import { UserRoutes } from 'features/user-dashboard';
import { UpdateUserProfilePage } from 'features/user-profile/pages/UpdateUserProfilePage';
import { createContext, FC, useState, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../GlobalStyle';
import light from 'themes/light';
import dark from 'themes/dark';
import { NetworkDetector } from 'features/network-detector/components/NetworkDetector';
import { ModalProvider } from 'react-modal-hook';
import { TransitionGroup } from 'react-transition-group';

export const ThemeContext = createContext({
  theme: 'light',
  toggle: () => {},
});

export const App: FC = () => {
  const [theme, setTheme] = useState('light');

  const value = useMemo(() => {
    const toggle = () => {
      return theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    return {
      theme,
      toggle,
    };
  }, [theme]);

  return (
    <AppErrorBoundary>
      <ModalProvider rootComponent={TransitionGroup}>
        <NetworkDetector>
          <ThemeContext.Provider value={value}>
            <ThemeProvider theme={theme === 'light' ? light : dark}>
              <GlobalStyle />

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
          </ThemeContext.Provider>
        </NetworkDetector>
      </ModalProvider>
    </AppErrorBoundary>
  );
};
