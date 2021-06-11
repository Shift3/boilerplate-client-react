/* eslint-disable array-bracket-spacing */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-quotes */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ResetPasswordPage } from '..';
import { expectInDocByTestId } from '../../../utils/test';

describe('<ResetPasswordPage/>', () => {
  describe('Rendering', () => {
    beforeEach(() =>
      render(
        <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
          <Switch>
            <Route exact path='/' component={ResetPasswordPage} />
            <Route exact path='/auth/signup' component={() => <div data-testid='test' />} />
          </Switch>
        </Router>,
      ),
    );

    it('Should render the <Wrapper/>', () => expectInDocByTestId('wrapper'));

    it('Should render the <ResetPasswordForm/>', () => expectInDocByTestId('resetPasswordForm'));
  });
});
