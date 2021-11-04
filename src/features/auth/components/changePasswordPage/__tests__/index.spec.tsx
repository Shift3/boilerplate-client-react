import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { expectInDocByTestId } from 'utils/test';
import { createMemoryHistory } from 'history';
import { ChangePasswordPage } from '../index';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

describe('<ChangePasswordPage/>', () => {
  describe('Rendering', () => {
    beforeEach(() =>
      render(
        <ThemeProvider theme={AppTheme}>
          <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
            <ChangePasswordPage />
          </Router>
        </ThemeProvider>,
      ),
    );

    it('Should render the <Wrapper/>', () => expectInDocByTestId('wrapper'));

    it('Should render the <ChangePasswordForm/>', () => expectInDocByTestId('changePasswordForm'));
  });
});
