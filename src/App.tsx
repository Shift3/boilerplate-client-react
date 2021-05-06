import { FC } from 'react';
import { ErrorBoundary } from '@sentry/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
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

const AppWrapper = styled.div`
  max-width: 100vw;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;
export const App: FC = () => (
  <ErrorBoundary>
    <AppWrapper>
      <AuthProvider>
        <FlashMessageProvider>
          <ThemeProvider theme={AppTheme}>
            <FlashMessage />
            <Router>
              <Switch>
                <HolyGrailLayout leftSidebar={<NavBar />}>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/auth/login" component={LoginPage} />
                  <Route exact path="/auth/forgot-password" component={ResetPasswordPage} />
                </HolyGrailLayout>
              </Switch>
            </Router>
          </ThemeProvider>
        </FlashMessageProvider>
      </AuthProvider>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  </ErrorBoundary>
);
