import { render, screen, getRoles } from '@testing-library/react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { expectInDocByTestId } from 'utils/test';
import { Provider } from 'react-redux';
import { createAppStore } from 'app/redux';
import { createMemoryHistory, MemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import light from 'themes/light';
import { LogInPage } from '../LoginPage';

describe('<LoginPage/>', () => {
  describe('Rendering', () => {
    let history: MemoryHistory;

    beforeEach(() => {
      history = createMemoryHistory();

      render(
        <HistoryRouter history={history}>
          <Provider store={createAppStore()}>
            <ThemeProvider theme={light}>
              <LogInPage />
            </ThemeProvider>
          </Provider>
        </HistoryRouter>,
      );
    });

    it('Should render the <LoginForm/>', () => expectInDocByTestId('loginForm'));

    it('Should render a forgot password link', () => {
      const forgotPasswordLink = screen.getByText(/forgot password/i);
      expect(forgotPasswordLink).not.toBeNull();
      expect(getRoles(forgotPasswordLink)).toHaveProperty('link');
    });

    it('Should render a create account link', () => {
      const createAccountLink = screen.getByText(/register/i);
      expect(createAccountLink).not.toBeNull();
      expect(getRoles(createAccountLink)).toHaveProperty('link');
    });
  });

  describe('navigation', () => {
    let history: MemoryHistory;

    beforeEach(() => {
      history = createMemoryHistory();

      render(
        <HistoryRouter history={history}>
          <Provider store={createAppStore()}>
            <ThemeProvider theme={light}>
              <LogInPage />
            </ThemeProvider>
          </Provider>
        </HistoryRouter>,
      );
    });

    it('Should navigate to /auth/forgot-password when the forgot password button is clicked', async () => {
      const link = screen.getByText(/forgot password/i);
      await userEvent.click(link);
      expect(history.location.pathname).toBe('/auth/forgot-password');
    });

    it('Should navigate to "/auth/signup" when the "Register" link is clicked', async () => {
      const createAccountButton = screen.getByText(/register/i);
      await userEvent.click(createAccountButton);
      expect(history.location.pathname).toBe('/auth/signup');
    });
  });
});
