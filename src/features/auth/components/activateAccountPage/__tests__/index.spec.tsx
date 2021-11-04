import { act, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ActivateAccountPage } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';
import { createAppStore } from 'app/redux';
import { Provider } from 'react-redux';

describe('<ChangePasswordPage/>', () => {
  it('should render', async () => {
    await act(async () => {
      render(
        <Provider store={createAppStore()}>
          <ThemeProvider theme={AppTheme}>
            <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
              <ActivateAccountPage />
            </Router>
          </ThemeProvider>
        </Provider>,
      );
    });
  });
});
