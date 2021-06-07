/* eslint-disable jsx-quotes */
import { FC } from 'react';
import { ErrorBoundary } from '@sentry/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import AppTheme from './utils/styleValues';

// Components
import { HomePage } from './components/homePage/HomePage';
import { LogInPage } from './components/loginPage';
import { SignUpPage } from './components/signupPage';
import { ResetPasswordPage } from './components/resetPasswordPage';
import { HolyGrailLayout } from './components/holyGrailLayout';
import { NavBar } from './components/navbar';
import { Footer } from './components/footer';

export const App: FC = () => (
  <ErrorBoundary>
    <ThemeProvider theme={AppTheme}>
      <Router>
        <Switch>
          <HolyGrailLayout leftSidebar={<NavBar />} footer={<Footer />}>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/auth/login' component={LogInPage} />
            <Route exact path='/auth/signup' component={SignUpPage} />
            <Route exact path='/auth/change-password' component={ResetPasswordPage} />
          </HolyGrailLayout>
        </Switch>
      </Router>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
