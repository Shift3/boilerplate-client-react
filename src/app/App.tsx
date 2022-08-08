import { AppErrorBoundary } from 'features/error-boundary/components/AppErrorBoundary';
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
import { createContext, FC, useState, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../GlobalStyle';
import light from 'themes/light';
import dark from 'themes/dark';
import { Notification } from 'common/models/notification';

export const ThemeContext = createContext({
  theme: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle: () => {},
});

export const NotificationsContext = createContext({
  unreadNotifications: [] as Notification[],
  readNotifications: [] as Notification[],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUnread: (unread: Notification[]) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRead: (read: Notification[]) => {},
});

export const App: FC = () => {
  const [theme, setTheme] = useState('light');
  const [unreadNotifications, setUnreadNotifications] = useState<Notification[]>([]);
  const [readNotifications, setReadNotifications] = useState<Notification[]>([]);

  const value = useMemo(() => {
    const toggle = () => {
      return theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    return {
      theme,
      toggle,
    };
  }, [theme]);

  const notifications = useMemo(() => {
    const setUnread = (unread: Notification[]) => {
      setUnreadNotifications(unread);
    };

    const setRead = (read: Notification[]) => {
      setReadNotifications(read);
    };

    return {
      unreadNotifications,
      readNotifications,
      setUnread,
      setRead,
    };
  }, [unreadNotifications, readNotifications]);

  return (
    <AppErrorBoundary>
      <ThemeContext.Provider value={value}>
        <NotificationsContext.Provider value={notifications}>
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
        </NotificationsContext.Provider>
      </ThemeContext.Provider>
    </AppErrorBoundary>
  );
};
