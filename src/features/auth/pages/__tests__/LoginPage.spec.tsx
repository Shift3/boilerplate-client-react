import { render, screen, getRoles } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { LogInPage } from '../LoginPage';
import { Provider } from 'react-redux';
import { createAppStore } from 'app/redux';
import { createMemoryHistory, MemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

describe('<LoginPage/>', () => {
  describe('Rendering', () => {
    beforeEach(() => {
      const history = createMemoryHistory();
      render(
        <Router history={history}>
          <Provider store={createAppStore()}>
            <ThemeProvider theme={AppTheme}>
              <LogInPage />
            </ThemeProvider>
          </Provider>
        </Router>,
      );
    });

    it('Should render a forgot password link', () => {
      const forgotPasswordLink = screen.getByText(/forgot password/i);
      expect(forgotPasswordLink).not.toBeNull();
      expect(getRoles(forgotPasswordLink)).toHaveProperty('link');
    });

    it('Should render a create account button', () => {
      const createAccountButton = screen.getByText(/create account/i);
      expect(createAccountButton).not.toBeNull();
      expect(getRoles(createAccountButton)).toHaveProperty('button');
    });
  });

  describe('navigation', () => {
    let history: MemoryHistory;

    beforeEach(() => {
      history = createMemoryHistory();

      render(
        <Router history={history}>
          <Provider store={createAppStore()}>
            <ThemeProvider theme={AppTheme}>
              <LogInPage />
            </ThemeProvider>
          </Provider>
        </Router>,
      );
    });

    it('Should navigate to /auth/forgot-password when the forgot password button is clicked', () => {
      const link = screen.getByText(/forgot password/i);
      userEvent.click(link);
      expect(history.location.pathname).toBe('/auth/forgot-password');
    });

    it('Should navigate to "/auth/signup" when the "CREATE ACCOUNT" button is clicked', () => {
      const createAccountButton = screen.getByText(/create account/i);
      userEvent.click(createAccountButton);
      expect(history.location.pathname).toBe('/auth/signup');
    });
  });
});
