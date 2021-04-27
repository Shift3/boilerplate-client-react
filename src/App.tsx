import { FC } from 'react';
import { ErrorBoundary } from '@sentry/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import AppTheme from './utils/styleValues';

// Context
import { Provider as AuthProvider } from './context/auth.context';
import { Provider as FlashMessageProvider } from './context/flashMessage.context';

// Components
import { HomePage } from './components/homePage/HomePage';
import { LoginPage } from './components/loginPage';
import { ResetPasswordPage } from './components/resetPasswordPage/ResetPasswordPage';
import { FlashMessage } from './components/flashMessage/FlashMessage';
import { HolyGrailLayout } from './components/holyGrailLayout';
import { NavBar } from './components/navbar';
import { Footer } from './components/footer';

export const App: FC = () => (
  <ErrorBoundary>
    <AuthProvider>
      <FlashMessageProvider>
        <ThemeProvider theme={AppTheme}>
          <FlashMessage />
          <Router>
            <Switch>
              <HolyGrailLayout leftSidebar={<NavBar />} footer={<Footer />}>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/auth/login" component={LoginPage} />
                <Route exact path="/auth/forgot-password" component={ResetPasswordPage} />
              </HolyGrailLayout>
            </Switch>
          </Router>
        </ThemeProvider>
      </FlashMessageProvider>
    </AuthProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
