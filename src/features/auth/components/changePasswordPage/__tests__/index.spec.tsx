import { act, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ChangePasswordPage } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

describe('<ChangePasswordPage/>', () => {
  it('should render', async () => {
    await act(async () => {
      render(
        <ThemeProvider theme={AppTheme}>
          <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
            <ChangePasswordPage />
          </Router>
        </ThemeProvider>,
      );
    });
  });
});
