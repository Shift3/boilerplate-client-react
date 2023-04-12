import { BannerContentWrapper } from 'common/styles/utilities';
import { environment } from 'environment';
import { AppErrorBoundary } from 'features/error-boundary/components/AppErrorBoundary';
import { NetworkDetector } from 'features/network-detector/components/NetworkDetector';
import { NotificationsProvider } from 'features/notifications/context';
import { createContext, FC, useMemo, useState } from 'react';
import { ModalProvider } from 'react-modal-hook';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { TransitionGroup } from 'react-transition-group';
import { ThemeProvider } from 'styled-components';
import dark from 'themes/dark';
import light from 'themes/light';
import { GlobalStyle } from '../GlobalStyle';
import { Routes } from './Routes';

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
                  <Routes />
                </BannerContentWrapper>
              </NotificationsProvider>
            </ModalProvider>
          </ThemeProvider>
        </ThemeContext.Provider>
      </NetworkDetector>
    </AppErrorBoundary>
  );
};
