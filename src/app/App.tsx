import { Layout } from 'common/components/Layout';
import { NotFoundView } from 'common/components/NotFoundView';
import { Role } from 'common/models';
import { BannerContentWrapper } from 'common/styles/utilities';
import { environment } from 'environment';
import { AgentRoutes } from 'features/agent-dashboard';
import { AuthRoutes, RequireAuth } from 'features/auth';
import { AppErrorBoundary } from 'features/error-boundary/components/AppErrorBoundary';
import { NetworkDetector } from 'features/network-detector/components/NetworkDetector';
import { NotificationsProvider } from 'features/notifications/context';
import { NotificationRoutes } from 'features/notifications/Routes';
import { UserRoutes } from 'features/user-dashboard';
import { UserProfilePage } from 'features/user-profile/pages/UserProfilePage';
import { createContext, FC, useMemo, useState } from 'react';
import { ModalProvider } from 'react-modal-hook';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { TransitionGroup } from 'react-transition-group';
import { ThemeProvider } from 'styled-components';
import dark from 'themes/dark';
import light from 'themes/light';
import { GlobalStyle } from '../GlobalStyle';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const App: FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const themeProviderValue = useMemo(() => {
    const toggleTheme = () => {
      if (theme === 'light') {
        window.localStorage.setItem('theme', 'dark');
        setTheme('dark');
      } else {
        window.localStorage.setItem('theme', 'light');
        setTheme('light');
      }
    };

    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  return (
    <AppErrorBoundary>
      <ModalProvider rootComponent={TransitionGroup}>
        <NetworkDetector>
          <ThemeContext.Provider value={themeProviderValue}>
            <ThemeProvider theme={theme === 'light' ? light : dark}>
              <NotificationsProvider>
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
                            <UserProfilePage />
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
                    <Route
                      path='/notifications/*'
                      element={
                        <RequireAuth>
                          <NotificationRoutes />
                        </RequireAuth>
                      }
                    />

                    <Route path='/' element={<Navigate to='/agents' />} />
                    <Route path='*' element={<NotFoundView />} />
                  </Routes>
                </BannerContentWrapper>
              </NotificationsProvider>
            </ThemeProvider>
          </ThemeContext.Provider>
        </NetworkDetector>
      </ModalProvider>
    </AppErrorBoundary>
  );
};
