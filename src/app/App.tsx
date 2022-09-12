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
import { HomeRoutes } from 'features/user-dashboard/HomeRoutes';
import { UserProfilePage } from 'features/user-profile/pages/UserProfilePage';
import { createContext, FC, useMemo, useState } from 'react';
import { ModalProvider } from 'react-modal-hook';
import { Route, Routes } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { TransitionGroup } from 'react-transition-group';
import { ThemeProvider } from 'styled-components';
import dark from 'themes/dark';
import light from 'themes/light';
import { GlobalStyle } from '../GlobalStyle';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { ConfirmSubscription } from 'features/memberships/ConfirmSubscription';
import { ConfirmSetupIntent } from 'features/memberships/ConfirmSetupIntent';

export const stripePromise: Promise<Stripe | null> = loadStripe(
  'pk_test_51LKnI7LBoYuqAVlJCiBaRj3JGO7ud4yqqxSwwaG94okOq4jB3hUQkEwR9eFJYIEvSWewbK9eZhN95gxiuy7bujHA00c47wfziI',
);

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
      <NetworkDetector>
        <ThemeContext.Provider value={themeProviderValue}>
          <ThemeProvider theme={theme === 'light' ? light : dark}>
            <ModalProvider rootComponent={TransitionGroup}>
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
                      path='/user/profile'
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
                      path='/payment_methods/:id/confirm/'
                      element={
                        <RequireAuth>
                          <Layout>
                            <ConfirmSetupIntent />
                          </Layout>
                        </RequireAuth>
                      }
                    />

                    <Route
                      path='/subscriptions/:id/confirm/'
                      element={
                        <RequireAuth>
                          <Layout>
                            <ConfirmSubscription />
                          </Layout>
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

                    <Route
                      path='/'
                      element={
                        <RequireAuth allowedRoles={[Role.ADMIN, Role.EDITOR, Role.USER]}>
                          <HomeRoutes />
                        </RequireAuth>
                      }
                    />
                    <Route path='*' element={<NotFoundView />} />
                  </Routes>
                </BannerContentWrapper>
              </NotificationsProvider>
            </ModalProvider>
          </ThemeProvider>
        </ThemeContext.Provider>
      </NetworkDetector>
    </AppErrorBoundary>
  );
};
